"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Rocket, Terminal, Loader2, Star, Trophy, ExternalLink, Github, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useRouter } from "next/navigation";

interface ProjectsClientProps {
  initialProjects: any[];
  featuredProjects: any[];
  userId: string | null;
}

export function ProjectsClient({ initialProjects, featuredProjects, userId }: ProjectsClientProps) {
  const [showForm, setShowForm] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [ratingProjectId, setRatingProjectId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    repoUrl: "",
    demoUrl: "",
    tags: "",
  });
  const router = useRouter();

  const handleSubmit = async () => {
    if (!userId) return;
    setSubmitting(true);

    const { registerProject } = await import("@/lib/actions/projects");
    const result = await registerProject({
      title: formData.title,
      description: formData.description,
      repoUrl: formData.repoUrl,
      demoUrl: formData.demoUrl,
      tags: formData.tags.split(",").map(t => t.trim()).filter(Boolean),
      ownerId: userId,
    });

    if (result.success) {
      setShowForm(false);
      setFormData({ title: "", description: "", repoUrl: "", demoUrl: "", tags: "" });
      router.refresh();
    } else {
      alert(result.error);
    }
    setSubmitting(false);
  };

  const handleRate = async (projectId: string, score: number) => {
    if (!userId) return;
    
    const { rateProject } = await import("@/lib/actions/projects");
    await rateProject(projectId, userId, score);
    setRatingProjectId(null);
    router.refresh();
  };

  const getUserRating = (project: any) => {
    if (!userId) return 0;
    const rating = project.ratings?.find((r: any) => r.userId === userId);
    return rating?.score || 0;
  };

  return (
    <div className="md:px-20 px-8 space-y-12 pb-20">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-2">
          <h1 className="text-4xl font-bold tracking-tight text-white font-mono">
            <span className="text-primary mr-2">{">"}</span>
            Project Showcase
          </h1>
          <p className="text-white/40 font-mono text-sm max-w-xl">
            Every great idea starts with a commit. Browse the ecosystem of 
            projects built by Bytes.io engineers.
          </p>
        </div>

        {userId && (
          <Button 
            onClick={() => setShowForm(true)}
            className="bg-primary text-black font-bold hover:shadow-[0_0_20px_rgba(0,209,255,0.4)] transition-all flex items-center gap-2"
          >
            <Plus size={18} />
            Submit Project
          </Button>
        )}
      </header>

      {/* Hall of Fame */}
      {featuredProjects.length > 0 && (
        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <Trophy className="text-yellow-400" size={24} />
            <h2 className="text-2xl font-bold text-white">Hall of Fame</h2>
            <Badge className="text-[10px] uppercase tracking-widest border border-yellow-400/20 bg-yellow-400/10 text-yellow-400">
              Top Rated
            </Badge>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredProjects.map((project: any, index: number) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="p-6 rounded-3xl border border-yellow-400/20 bg-yellow-400/[0.02] hover:bg-yellow-400/[0.05] transition-all group relative overflow-hidden"
              >
                <div className="absolute top-3 right-3">
                  <Trophy size={16} className="text-yellow-400" />
                </div>
                <div className="space-y-3">
                  <h3 className="text-lg font-bold text-white group-hover:text-yellow-400 transition-colors">{project.title}</h3>
                  {project.description && <p className="text-white/40 text-sm line-clamp-2">{project.description}</p>}
                  <div className="flex items-center gap-1">
                    {[1,2,3,4,5].map(s => (
                      <Star key={s} size={14} className={s <= Math.round(project.averageRating) ? "text-yellow-400 fill-yellow-400" : "text-white/10"} />
                    ))}
                    <span className="text-yellow-400 font-mono text-xs ml-1">{project.averageRating.toFixed(1)}</span>
                  </div>
                  <div className="text-[10px] text-white/20 font-mono">
                    by @{project.owner?.username || "unknown"} • {project.ratings?.length || 0} ratings
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      )}

      {/* All Projects */}
      <section className="space-y-6">
        <h2 className="text-xl font-bold text-white">All Projects</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {initialProjects.map((project: any, index: number) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.03 }}
              className="p-6 rounded-3xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.04] hover:border-primary/20 transition-all group relative"
            >
              <div className="space-y-4">
                <div className="space-y-2">
                  <h3 className="text-lg font-bold text-white group-hover:text-primary transition-colors">{project.title}</h3>
                  {project.description && <p className="text-white/40 text-sm line-clamp-2">{project.description}</p>}
                </div>

                {project.tags && project.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1.5">
                    {project.tags.map((tag: string) => (
                      <span key={tag} className="text-[10px] px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-white/50 font-mono">{tag}</span>
                    ))}
                  </div>
                )}

                <div className="flex items-center gap-1">
                  {[1,2,3,4,5].map(s => (
                    <Star key={s} size={14} className={s <= Math.round(project.averageRating || 0) ? "text-primary fill-primary" : "text-white/10"} />
                  ))}
                  <span className="text-white/40 font-mono text-xs ml-1">{(project.averageRating || 0).toFixed(1)}</span>
                  <span className="text-white/20 text-[10px] ml-1">({project.ratings?.length || 0})</span>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-white/5">
                  <div className="text-[10px] text-white/20 font-mono">@{project.owner?.username || "unknown"}</div>
                  <div className="flex items-center gap-2">
                    {project.repoUrl && (
                      <a href={project.repoUrl} target="_blank" rel="noopener noreferrer" className="text-white/30 hover:text-white transition-colors">
                        <Github size={14} />
                      </a>
                    )}
                    {project.demoUrl && (
                      <a href={project.demoUrl} target="_blank" rel="noopener noreferrer" className="text-white/30 hover:text-primary transition-colors">
                        <ExternalLink size={14} />
                      </a>
                    )}
                    {userId && project.ownerId !== userId && (
                      <button 
                        onClick={() => setRatingProjectId(ratingProjectId === project.id ? null : project.id)}
                        className="text-xs text-primary/70 font-mono hover:text-primary transition-colors flex items-center gap-1"
                      >
                        <Star size={12} /> Rate
                      </button>
                    )}
                  </div>
                </div>

                {/* Rating Picker */}
                <AnimatePresence>
                  {ratingProjectId === project.id && (
                    <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="overflow-hidden">
                      <div className="flex items-center gap-2 p-3 rounded-xl bg-white/5 border border-white/10">
                        <span className="text-[10px] text-white/40 font-mono mr-2">Your rating:</span>
                        {[1,2,3,4,5].map(s => (
                          <button key={s} onClick={() => handleRate(project.id, s)} className="transition-transform hover:scale-125">
                            <Star size={20} className={s <= getUserRating(project) ? "text-primary fill-primary" : "text-white/20 hover:text-primary"} />
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          ))}

          {initialProjects.length === 0 && (
            <div className="col-span-full py-20 text-center border border-dashed border-white/5 rounded-3xl bg-white/[0.01]">
              <Terminal className="mx-auto text-white/10 mb-4" size={40} />
              <p className="text-white/40 font-mono">No projects submitted yet.</p>
              {userId && <p className="text-white/20 font-mono text-xs mt-2">Be the first to showcase your project!</p>}
            </div>
          )}
        </div>
      </section>

      {/* Submit Project Modal */}
      <AnimatePresence>
        {showForm && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setShowForm(false)} />
            <motion.div initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }} className="relative w-full max-w-md bg-zinc-900 border border-white/10 p-8 rounded-3xl shadow-2xl space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-white flex items-center gap-2"><Rocket className="text-primary" size={20} />Submit Project</h2>
                <button onClick={() => setShowForm(false)} className="text-white/40 hover:text-white"><X size={18} /></button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="text-[10px] font-mono text-white/40 uppercase tracking-[0.2em] mb-2 block">Project Title</label>
                  <Input placeholder="My Awesome Project" className="bg-white/5 border-white/10 text-white" value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} />
                </div>
                <div>
                  <label className="text-[10px] font-mono text-white/40 uppercase tracking-[0.2em] mb-2 block">Description</label>
                  <textarea placeholder="What does your project do?" className="w-full rounded-md border px-3 py-2 min-h-[80px] bg-white/5 border-white/10 text-white focus:ring-1 focus:ring-primary/50 focus:outline-none text-sm" value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} />
                </div>
                <div>
                  <label className="text-[10px] font-mono text-white/40 uppercase tracking-[0.2em] mb-2 block">GitHub Repo URL</label>
                  <Input placeholder="https://github.com/..." className="bg-white/5 border-white/10 text-white" value={formData.repoUrl} onChange={(e) => setFormData({...formData, repoUrl: e.target.value})} />
                </div>
                <div>
                  <label className="text-[10px] font-mono text-white/40 uppercase tracking-[0.2em] mb-2 block">Demo URL (optional)</label>
                  <Input placeholder="https://myproject.vercel.app" className="bg-white/5 border-white/10 text-white" value={formData.demoUrl} onChange={(e) => setFormData({...formData, demoUrl: e.target.value})} />
                </div>
                <div>
                  <label className="text-[10px] font-mono text-white/40 uppercase tracking-[0.2em] mb-2 block">Tags (comma-separated)</label>
                  <Input placeholder="react, ai, web3" className="bg-white/5 border-white/10 text-white" value={formData.tags} onChange={(e) => setFormData({...formData, tags: e.target.value})} />
                </div>
              </div>

              <Button onClick={handleSubmit} disabled={submitting || !formData.title || !formData.repoUrl} className="w-full h-12 bg-primary text-black font-bold rounded-2xl shadow-[0_0_20px_rgba(0,209,255,0.3)]">
                {submitting ? <><Loader2 className="animate-spin mr-2" size={16} /> Submitting...</> : "Submit Project"}
              </Button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
