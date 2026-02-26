import { getEvents } from "@/lib/actions/events";
import { createClient } from "@/utils/supabase/server";
import prisma from "@/lib/prisma";
import { EventsClient } from "./events-client";

export default async function EventsPage() {
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

  const events = await getEvents();

  return (
    <main>
      <EventsClient 
        initialEvents={events} 
        isAdmin={isAdmin} 
        userId={user?.id || null} 
      />
    </main>
  );
}
