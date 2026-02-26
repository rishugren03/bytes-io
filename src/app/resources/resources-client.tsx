"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BookOpen, Plus, ExternalLink, Loader2, Terminal, Search, X, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface ResourcesClientProps {
  initialResources: any[];
  userId: string | null;
}

const CATEGORIES = ["General", "Frontend", "Backend", "DevOps", "AI/ML", "System Design", "Career"];

export function ResourcesClient({ initialResources, userId }: ResourcesClientProps) {
  const [showForm, setShowForm] = useState(false);
  const [filter, setFilter] = useState("");
  const [category, setCategory] = useState("All");
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({ title: "", description: "", url: "", category: "General" });

  const filteredResources = initialResources.filter((r: any) => {
    const matchesSearch = r.title.toLowerCase().includes(filter.toLowerCase()) || 
                          r.description?.toLowerCase().includes(filter.toLowerCase());
    const matchesCategory = category === "All" || r.category === category;
    return matchesSearch && matchesCategory;
  });

  const handleSubmit = async () => {
    if (!userId) return;
    setSubmitting(true);

    const { createResource } = await import("@/lib/actions/resources");
    const result = await createResource({
      createdById: userId,
      title: formData.title,
      description: formData.description,
      url: formData.url,
      category: formData.category,
    });

    if (result.success) {
      setShowForm(false);
      setFormData({ title: "", description: "", url: "", category: "General" });
      window.location.reload();
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
            Resource Library
          </h1>
          <p className="text-white/40 font-mono text-sm max-w-xl">
            The collective knowledge of Bytes.io. Share tutorials, resources, 
            and reference material with the community.
          </p>
        </div>

        {userId && (
          <Button 
            onClick={() => setShowForm(true)}
            className="bg-primary text-black font-bold hover:shadow-[0_0_20px_rgba(0,209,255,0.4)] transition-all flex items-center gap-2"
          >
            <Plus size={18} />
            Share Resource
          </Button>
        )}
      </header>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/20" />
          <Input 
            placeholder="Search resources..." 
            className="pl-10 bg-white/5 border-white/10 text-white"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          />
        </div>
        <div className="flex gap-2 overflow-x-auto scrollbar-none">
          {["All", ...CATEGORIES].map((c) => (
            <button
              key={c}
              onClick={() => setCategory(c)}
              className={`px-3 py-1.5 rounded-full text-xs font-mono whitespace-nowrap transition-colors ${
                category === c ? "bg-primary text-black font-bold" : "bg-white/5 text-white/40 border border-white/10 hover:bg-white/10"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      {/* Resource List */}
      <section className="space-y-4">
        {filteredResources.map((resource: any, index: number) => (
          <motion.a
            key={resource.id}
            href={resource.url}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.03 }}
            className="flex items-start gap-4 p-6 rounded-2xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.04] hover:border-primary/20 transition-all group"
          >
            <div className="p-2 rounded-xl bg-primary/10 border border-primary/20 mt-0.5">
              <BookOpen size={16} className="text-primary" />
            </div>
            <div className="flex-1 space-y-1">
              <div className="flex items-start justify-between">
                <h3 className="text-white font-bold group-hover:text-primary transition-colors">{resource.title}</h3>
                <ExternalLink size={16} className="text-white/20 group-hover:text-primary transition-colors flex-shrink-0 mt-1" />
              </div>
              {resource.description && (
                <p className="text-white/40 text-sm font-mono line-clamp-2">{resource.description}</p>
              )}
              <div className="flex items-center gap-3 pt-1 text-[10px] text-white/20 font-mono uppercase tracking-widest">
                <span className="px-2 py-0.5 rounded-full border border-white/5 bg-white/5">{resource.category}</span>
                <span className="flex items-center gap-1">
                  <User size={10} />
                  @{resource.createdBy?.username || "anon"}
                </span>
                <span>{new Date(resource.createdAt).toLocaleDateString()}</span>
              </div>
            </div>
          </motion.a>
        ))}

        {filteredResources.length === 0 && initialResources.length > 0 && (
          <div className="py-16 text-center border border-dashed border-white/5 rounded-3xl bg-white/[0.01]">
            <p className="text-white/40 font-mono">No resources match your filters.</p>
          </div>
        )}

        {initialResources.length === 0 && (
          <div className="py-20 text-center border border-dashed border-white/5 rounded-3xl bg-white/[0.01]">
            <Terminal className="mx-auto text-white/10 mb-4" size={40} />
            <p className="text-white/40 font-mono">No resources shared yet.</p>
            {userId && <p className="text-white/20 font-mono text-xs mt-2">Be the first to share a resource!</p>}
          </div>
        )}
      </section>

      {/* Share Resource Modal */}
      <AnimatePresence>
        {showForm && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setShowForm(false)} />
            <motion.div initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }} className="relative w-full max-w-md bg-zinc-900 border border-white/10 p-8 rounded-3xl shadow-2xl space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-white flex items-center gap-2"><BookOpen className="text-primary" size={20} />Share Resource</h2>
                <button onClick={() => setShowForm(false)} className="text-white/40 hover:text-white"><X size={18} /></button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="text-[10px] font-mono text-white/40 uppercase tracking-[0.2em] mb-2 block">Title</label>
                  <Input placeholder="e.g. React Design Patterns" className="bg-white/5 border-white/10 text-white" value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} />
                </div>
                <div>
                  <label className="text-[10px] font-mono text-white/40 uppercase tracking-[0.2em] mb-2 block">Description (optional)</label>
                  <textarea placeholder="Brief description of the resource" className="w-full rounded-md border px-3 py-2 min-h-[80px] bg-white/5 border-white/10 text-white focus:ring-1 focus:ring-primary/50 focus:outline-none text-sm" value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} />
                </div>
                <div>
                  <label className="text-[10px] font-mono text-white/40 uppercase tracking-[0.2em] mb-2 block">URL</label>
                  <Input placeholder="https://..." className="bg-white/5 border-white/10 text-white" value={formData.url} onChange={(e) => setFormData({...formData, url: e.target.value})} />
                </div>
                <div>
                  <label className="text-[10px] font-mono text-white/40 uppercase tracking-[0.2em] mb-2 block">Category</label>
                  <div className="flex flex-wrap gap-2">
                    {CATEGORIES.map((c) => (
                      <button key={c} onClick={() => setFormData({...formData, category: c})}
                        className={`px-3 py-1.5 rounded-full text-xs font-mono transition-colors ${formData.category === c ? "bg-primary text-black font-bold" : "bg-white/5 text-white/40 border border-white/10 hover:bg-white/10"}`}
                      >
                        {c}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <Button onClick={handleSubmit} disabled={submitting || !formData.title || !formData.url} className="w-full h-12 bg-primary text-black font-bold rounded-2xl shadow-[0_0_20px_rgba(0,209,255,0.3)]">
                {submitting ? <><Loader2 className="animate-spin mr-2\" size={16} /> Sharing...</> : "Share Resource"}
              </Button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
