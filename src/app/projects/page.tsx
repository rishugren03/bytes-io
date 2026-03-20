import { getProjects, getFeaturedProjects } from "@/lib/actions/projects";
import { createClient } from "@/utils/supabase/server";
import prisma from "@/lib/prisma";
import { ProjectsClient } from "./projects-client";

export default async function ProjectsPage() {
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

  const projects = await getProjects();
  const featured = await getFeaturedProjects();

  return (
    <main>
      <ProjectsClient 
        initialProjects={projects} 
        featuredProjects={featured}
        userId={user?.id || null}
        userStatus={userStatus}
      />
    </main>
  );
}
