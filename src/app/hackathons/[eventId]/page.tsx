import { getEventWithProblems } from "@/lib/actions/problems";
import { createClient } from "@/utils/supabase/server";
import prisma from "@/lib/prisma";
import { EventDetailClient } from "./event-detail-client";
import { notFound } from "next/navigation";

export default async function EventDetailPage({ params }: { params: Promise<{ eventId: string }> }) {
  const { eventId } = await params;
  const event = await getEventWithProblems(eventId);

  if (!event) {
    notFound();
  }

  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  let isAdmin = false;
  if (user) {
    const profile = await prisma.profile.findUnique({
      where: { id: user.id },
      select: { role: true },
    });
    isAdmin = profile?.role === "admin";
  }

  return (
    <main className="md:px-20 px-8">
      <EventDetailClient
        event={event}
        isAdmin={isAdmin}
        userId={user?.id || null}
      />
    </main>
  );
}
