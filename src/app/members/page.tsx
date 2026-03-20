import prisma from "@/lib/prisma";
import { MembersClient } from "./members-client";
import { unstable_cache } from "next/cache";

const getMembers = unstable_cache(
  async () => {
    return prisma.profile.findMany({
      where: { status: "approved" },
      orderBy: { powerScore: 'desc' },
      take: 50
    });
  },
  ["members-list"],
  { revalidate: 60, tags: ["members"] }
);

export default async function MembersPage() {
  const members = await getMembers();

  return (
    <main>
      <MembersClient initialMembers={members} />
    </main>
  );
}
