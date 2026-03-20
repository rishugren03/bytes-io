import prisma from "./src/lib/prisma";
import { createClient } from "./src/utils/supabase/server";
import { calculatePowerScore } from "./src/lib/score";

async function main() {
  // Since we can't access Supabase auth from a plain script easily,
  // let's just set the githubUsername for existing users manually.
  // The repo owner is rishugren03, and 'its yash' is the admin user.
  
  // First, let's check all users
  const users = await prisma.profile.findMany({
    select: { id: true, username: true, githubUsername: true, leetcodeUsername: true }
  });
  console.log("Current users:", users);
  console.log("\n--- Please provide your GitHub username to set it. ---");
  console.log("For now, trying to calculate score with LeetCode only...\n");
  
  // Calculate and update scores for all users (even without GitHub)
  for (const user of users) {
    const score = await calculatePowerScore(user.id);
    
    // Update the DB with the new score
    await prisma.profile.update({
      where: { id: user.id },
      data: { powerScore: score }
    });
    
    console.log(`Updated "${user.username}" powerScore to ${score}`);
  }
  
  console.log("\nDone! Scores updated in DB.");
}

main().catch(console.error);
