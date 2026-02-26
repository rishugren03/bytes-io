import prisma from "@/lib/prisma";
import { LeaderboardClient } from "./leaderboard-client";
import { createClient } from "@/utils/supabase/server";
import { Profile } from "@prisma/client";

export default async function LeaderboardPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  
  const usersData = await prisma.profile.findMany({
    orderBy: {
      powerScore: 'desc'
    }
  });

  const usersWithRank = usersData.map((u: Profile, i: number) => ({
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
