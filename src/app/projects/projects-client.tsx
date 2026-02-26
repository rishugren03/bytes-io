"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Rocket, Terminal, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ProjectCard } from "@/components/project-card";
import { registerProject } from "@/lib/actions/projects";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";

interface ProjectsClientProps {
  initialProjects: any[];
}

export function ProjectsClient({ initialProjects }: ProjectsClientProps) {
  const [isAddingProject, setIsAddingProject] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    repo_url: "",
    tags: "",
  });
  
  const router = useRouter();
  const supabase = createClient();

  const handleRegister = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      router.push("/login");
      return;
    }

    setSubmitting(true);
    const tagsArray = formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag !== "");
    
    const result = await registerProject({
      title: formData.title,
      repoUrl: formData.repo_url,
      tags: tagsArray,
      ownerId: user.id,
    });

    if (result.success) {
      setIsAddingProject(false);
      setFormData({ title: "", repo_url: "", tags: "" });
      router.refresh(); // Refresh server data
    } else {
      alert(result.error);
    }
    setSubmitting(false);
  };

  return (
    <div className="space-y-12 pb-20">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-2">
          <h1 className="text-4xl font-bold tracking-tight text-white font-mono">
            <span className="text-primary mr-2">{">"}</span>
            Hall of Fame
          </h1>
          <p className="text-white/40 font-mono text-sm max-w-xl">
             Every great idea starts with a commit. Browse the ecosystem of 
             projects built by Codewave engineers.
          </p>
        </div>
        
        <Button 
          onClick={() => setIsAddingProject(true)}
          className="bg-primary text-black font-bold hover:shadow-[0_0_20px_rgba(0,209,255,0.4)] transition-all flex items-center gap-2"
        >
          <Plus size={18} />
          Register Project
        </Button>
      </header>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
         {initialProjects.map((project) => (
           <ProjectCard 
              key={project.id} 
              title={project.title}
              description={project.description || "No description provided."}
              tags={project.tags || []}
              repoUrl={project.repoUrl}
              demoUrl={project.demoUrl}
              stars={project.stars || 0}
              openIssues={0}
              lastUpdated="Recent"
            />
         ))}
         
         {initialProjects.length === 0 && (
           <div className="col-span-full py-20 text-center border border-dashed border-white/5 rounded-3xl bg-white/[0.01]">
             <Terminal className="mx-auto text-white/10 mb-4" size={40} />
             <p className="text-white/40 font-mono">The archive is empty. Be the first to ship.</p>
           </div>
         )}
      </section>

      {/* Project Submission Modal */}
      <AnimatePresence>
        {isAddingProject && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
              onClick={() => setIsAddingProject(false)}
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-xl bg-zinc-900 border border-white/10 p-8 rounded-3xl shadow-2xl space-y-6"
            >
              <div className="space-y-2">
                 <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                    <Rocket className="text-primary" />
                    Ship a Project
                 </h2>
                 <p className="text-white/40 text-sm font-mono">Fill in the details to list your repository in the Hall of Fame.</p>
              </div>

              <div className="space-y-4">
                 <div className="space-y-1.5">
                    <label className="text-xs font-mono text-white/40 uppercase tracking-widest pl-1">Project Title</label>
                    <Input 
                      placeholder="e.g. WaveEngine" 
                      className="bg-white/5 border-white/10 focus-visible:ring-primary/50 text-white" 
                      value={formData.title}
                      onChange={(e) => setFormData({...formData, title: e.target.value})}
                    />
                 </div>
                 <div className="space-y-1.5">
                    <label className="text-xs font-mono text-white/40 uppercase tracking-widest pl-1">GitHub Repository URL</label>
                    <Input 
                      placeholder="https://github.com/your-org/repo" 
                      className="bg-white/5 border-white/10 focus-visible:ring-primary/50 text-white" 
                      value={formData.repo_url}
                      onChange={(e) => setFormData({...formData, repo_url: e.target.value})}
                    />
                 </div>
                 <div className="space-y-1.5">
                    <label className="text-xs font-mono text-white/40 uppercase tracking-widest pl-1">Tech Stack (comma separated)</label>
                    <Input 
                      placeholder="React, Rust, Tailwind" 
                      className="bg-white/5 border-white/10 focus-visible:ring-primary/50 text-white" 
                      value={formData.tags}
                      onChange={(e) => setFormData({...formData, tags: e.target.value})}
                    />
                 </div>
              </div>

              <div className="flex gap-4 pt-4">
                 <Button 
                   className="flex-1 bg-primary text-black font-bold h-12" 
                   onClick={handleRegister}
                   disabled={submitting}
                 >
                    {submitting ? "Processing..." : "Register Project"}
                 </Button>
                 <Button 
                   variant="outline" 
                   className="bg-white/5 border-white/10 text-white h-12 px-8" 
                   onClick={() => setIsAddingProject(false)}
                 >
                    Cancel
                 </Button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
