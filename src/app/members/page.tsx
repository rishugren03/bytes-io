import prisma from "@/lib/prisma";
import { MembersClient } from "./members-client";

export default async function MembersPage() {
  const members = await prisma.profile.findMany({
    where: { status: "approved" },
    orderBy: { powerScore: 'desc' },
  });

  return (
    <main>
      <MembersClient initialMembers={members} />
    </main>
  );
}
