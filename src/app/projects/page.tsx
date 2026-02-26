import { getProjects, getFeaturedProjects } from "@/lib/actions/projects";
import { createClient } from "@/utils/supabase/server";
import { ProjectsClient } from "./projects-client";

export default async function ProjectsPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  
  const projects = await getProjects();
  const featured = await getFeaturedProjects();

  return (
    <main>
      <ProjectsClient 
        initialProjects={projects} 
        featuredProjects={featured}
        userId={user?.id || null} 
      />
    </main>
  );
}
