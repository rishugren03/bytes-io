import prisma from "@/lib/prisma";
import { LeaderboardClient } from "./leaderboard-client";
import { createClient } from "@/utils/supabase/server";
import { Prisma } from "@prisma/client";
import { calculatePowerScore } from "@/lib/score";

type Profile = Prisma.ProfileGetPayload<{}>;

export const revalidate = 3600; // Cache for 1 hour

import { unstable_cache } from "next/cache";

const getTopUsers = unstable_cache(
  async () => {
    return prisma.profile.findMany({
      where: {
        status: "approved"
      },
      orderBy: {
        powerScore: 'desc'
      },
      take: 50
    });
  },
  ["leaderboard-top-50"],
  { revalidate: 3600, tags: ["leaderboard"] }
);

export default async function LeaderboardPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  
  const usersData = await getTopUsers();

  // Update the array map to not fetch calculated scores on load.
  // We'll rely on the existing powerScore in the DB for the initial render,
  // and introduce a periodic cache revalidation.
  
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
