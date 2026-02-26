import prisma from "@/lib/prisma";
import { MentorsClient } from "./mentors-client";

export default async function MentorshipPage() {
  // Fetch all admin profiles as mentors
  const admins = await prisma.profile.findMany({
    where: { role: "admin" },
    orderBy: { powerScore: "desc" },
  });

  return (
    <main>
      <MentorsClient mentors={admins} />
    </main>
  );
}
