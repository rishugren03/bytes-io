import prisma from "@/lib/prisma";
import { LeaderboardClient } from "./leaderboard-client";
import { createClient } from "@/utils/supabase/server";
import { Prisma } from "@prisma/client";
import { calculatePowerScore } from "@/lib/score";

type Profile = Prisma.ProfileGetPayload<{}>;

export default async function LeaderboardPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  
  const usersData = await prisma.profile.findMany({
    where: {
      status: "approved"
    }
  });

  // Calculate scores for all users to ensure leaderboard is always fresh
  // Note: in a large scale production app, this should be a cron job, but here we calculate on load
  const usersWithScores = await Promise.all(
    usersData.map(async (u) => {
      const powerScore = await calculatePowerScore(u.id);
      
      // Update the DB asynchronously without awaiting the result to keep page fast
      prisma.profile.update({
        where: { id: u.id },
        data: { powerScore }
      }).catch(err => console.error("Failed to update cache score for", u.id, err));

      return {
        ...u,
        powerScore
      };
    })
  );

  // Sort them dynamically since we just got the fresh scores
  const sortedUsers = usersWithScores.sort((a, b) => b.powerScore - a.powerScore);

  const usersWithRank = sortedUsers.map((u: Profile, i: number) => ({
    ...u,
    rank: i + 1,
    change: "minus"
  }));

  const currentUser = user ? (usersWithRank.find(u => u.id === user.id) ?? null) : null;

  return (
    <main>
      <LeaderboardClient users={usersWithRank} currentUser={currentUser} />
    </main>
  );
}
