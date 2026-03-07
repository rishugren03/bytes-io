import prisma from "@/lib/prisma";

const WEIGHTS = {
  GITHUB: 0.4,
  LEETCODE: 0.4,
  PROJECTS: 0.2,
};

async function getGithubScore(username: string): Promise<number> {
  if (!username) return 0;
  
  try {
    const res = await fetch(`https://api.github.com/users/${username}`);
    const data = await res.json();
    
    if (data.message === "Not Found") return 0;
    
    // Basic heuristic: 1 point per public repo, 5 points per follower
    const publicRepos = data.public_repos || 0;
    const followers = data.followers || 0;
    
    return publicRepos + (followers * 5);
  } catch (error) {
    console.error("Failed to fetch Github data for", username, error);
    return 0;
  }
}

async function getLeetcodeScore(username: string): Promise<number> {
  if (!username) return 0;
  
  try {
    const query = `
      query getUserProfile($username: String!) {
        matchedUser(username: $username) {
          submitStatsGlobal {
            acSubmissionNum {
              difficulty
              count
            }
          }
        }
      }
    `;

    const res = await fetch('https://leetcode.com/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Referer': 'https://leetcode.com',
      },
      body: JSON.stringify({
        query,
        variables: { username }
      })
    });

    if (!res.ok) {
      console.warn('LeetCode GraphQL returned status', res.status, 'for', username);
      return 0;
    }

    const text = await res.text();
    if (!text || text.startsWith('<')) {
      console.warn('LeetCode returned non-JSON for', username);
      return 0;
    }

    const json = JSON.parse(text);
    const submissions = json?.data?.matchedUser?.submitStatsGlobal?.acSubmissionNum;
    
    if (!submissions || !Array.isArray(submissions)) return 0;

    let easy = 0, medium = 0, hard = 0;
    for (const item of submissions) {
      if (item.difficulty === 'Easy') easy = item.count;
      else if (item.difficulty === 'Medium') medium = item.count;
      else if (item.difficulty === 'Hard') hard = item.count;
    }

    console.log(`[LeetCode] ${username}: Easy=${easy}, Medium=${medium}, Hard=${hard}`);
    
    // Easy * 1, Medium * 3, Hard * 5
    return (easy * 1) + (medium * 3) + (hard * 5);
  } catch (error) {
    console.error("Failed to fetch Leetcode data for", username, error);
    return 0;
  }
}

async function getProjectsScore(userId: string): Promise<number> {
  try {
    const projectCount = await prisma.project.count({
      where: { ownerId: userId }
    });
    
    // Basic heuristic: 50 points per project in the club registry
    return projectCount * 50;
  } catch (error) {
    console.error("Failed to count projects for", userId, error);
    return 0;
  }
}

export async function calculatePowerScore(userId: string): Promise<number> {
  const profile = await prisma.profile.findUnique({
    where: { id: userId },
    select: {
      githubUsername: true,
      leetcodeUsername: true,
      id: true
    }
  });

  if (!profile) return 0;

  const githubRaw = await getGithubScore(profile.githubUsername || "");
  const leetcodeRaw = await getLeetcodeScore(profile.leetcodeUsername || "");
  const projectsRaw = await getProjectsScore(profile.id);

  // Normalizing scores out of 1000 total points roughly.
  // 400 max for GitHub, 400 max for Leetcode, 200 max for Projects.
  // To keep it simple, we cap each category to its max contribution if needed,
  // or just apply the ratio. Let's apply a ratio to scale raw scores.
  
  // Scaling factors:
  // Let's assume a "great" Github is 200 raw points (40 repos * 1 + 32 followers * 5)
  // Let's assume a "great" Leetcode is 1000 raw points (100E, 200M, 60H)
  // Let's assume a "great" Projects is 200 raw points (4 projects)
  
  // Since the user didn't specify the math out of total points, I'll calculate the final power score as:
  // (GithubRaw * Weight) + (LeetcodeRaw * Weight) + (ProjectsRaw * Weight)
  // But adjusted so 1 raw point is relatively meaningful.
  
  const githubWeighted = Math.min(githubRaw, 500) * 2 * WEIGHTS.GITHUB; // up to 400 pts
  const leetcodeWeighted = Math.min(leetcodeRaw, 1000) * 1 * WEIGHTS.LEETCODE; // up to 400 pts
  const projectsWeighted = Math.min(projectsRaw, 500) * 2 * WEIGHTS.PROJECTS; // up to 200 pts

  console.log(`[Score Debug] User: ${userId}`);
  console.log(`- Github: Raw=${githubRaw}, Weighted=${githubWeighted}`);
  console.log(`- Leetcode: Raw=${leetcodeRaw}, Weighted=${leetcodeWeighted}`);
  console.log(`- Projects: Raw=${projectsRaw}, Weighted=${projectsWeighted}`);

  const totalScore = Math.round(githubWeighted + leetcodeWeighted + projectsWeighted);
  
  return totalScore;
}
