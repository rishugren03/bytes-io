import prisma from "@/lib/prisma";
import { MembersClient } from "./members-client";

export default async function MembersPage() {
  const members = await prisma.profile.findMany({
    orderBy: {
      powerScore: 'desc'
    }
  });

  return (
    <main>
      <MembersClient initialMembers={members} />
    </main>
  );
}
