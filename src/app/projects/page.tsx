import { getProjects } from "@/lib/actions/projects";
import { ProjectsClient } from "./projects-client";

export default async function ProjectsPage() {
  const projects = await getProjects();

  return (
    <main>
      <ProjectsClient initialProjects={projects} />
    </main>
  );
}
