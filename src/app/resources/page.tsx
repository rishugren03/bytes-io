import { getResources } from "@/lib/actions/resources";
import { createClient } from "@/utils/supabase/server";
import prisma from "@/lib/prisma";
import { ResourcesClient } from "./resources-client";

export default async function ResourcesPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  let userStatus: string | null = null;
  if (user) {
    const profile = await prisma.profile.findUnique({
      where: { id: user.id },
      select: { status: true },
    });
    userStatus = profile?.status || null;
  }

  const resources = await getResources();

  return (
    <main>
      <ResourcesClient 
        initialResources={resources} 
        userId={user?.id || null}
        userStatus={userStatus}
      />
    </main>
  );
}
