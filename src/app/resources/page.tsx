"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Search, BookOpen, Video, FileText, Download, ExternalLink, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const RESOURCES = [
  { id: 1, title: "Modern Web Arch (2026)", type: "Slides", category: "Core Development", author: "Lead Engineer", likes: 124, date: "Feb 12" },
  { id: 2, title: "WebGPU Deep Dive Training", type: "Video", category: "Graphics", author: "Graphics Team", likes: 89, date: "Feb 10" },
  { id: 3, title: "Next.js 15 & React 19 Cheat Sheet", type: "PDF", category: "Tutorials", author: "Senior Dev", likes: 312, date: "Feb 05" },
  { id: 4, title: "System Design for Scale", type: "Slides", category: "Architecture", author: "Club President", likes: 156, date: "Jan 28" },
  { id: 5, title: "Introduction to Rust in Wasm", type: "Video", category: "Performance", author: "Systems Lead", likes: 67, date: "Jan 22" },
  { id: 6, title: "Building Glassmorphic UIs with Tailwind", type: "PDF", category: "Design", author: "UI Lead", likes: 198, date: "Jan 18" },
];

export default function ResourcesPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredResources = RESOURCES.filter(res => 
    res.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    res.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-12 pb-20">
      <header className="space-y-4">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-2">
             <h1 className="text-4xl font-bold tracking-tight text-white font-mono">
                <span className="text-primary mr-2">{">"}</span>
                Resource Library
             </h1>
             <p className="text-white/40 font-mono text-sm max-w-xl">
                The collective knowledge of Codewave. Discover workshop slides, 
                recorded sessions, and cheat sheets vetted by seniors.
             </p>
          </div>
          
          <div className="flex items-center gap-2">
             <div className="relative group flex-1 md:w-80">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-primary transition-colors" size={18} />
                <Input 
                  placeholder="Search resources..." 
                  className="pl-10 bg-white/5 border-white/10 focus-visible:ring-primary/50 text-white"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
             </div>
             <Button variant="outline" size="icon" className="border-white/10 bg-white/5 text-white/60">
                <Filter size={18} />
             </Button>
          </div>
        </div>
      </header>

      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredResources.map((res, index) => (
          <motion.div
            key={res.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="p-6 rounded-2xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.04] hover:border-primary/20 transition-all group"
          >
            <div className="flex items-start justify-between mb-4">
               <div className={cn(
                  "p-3 rounded-xl bg-white/5 border border-white/10 transition-colors group-hover:bg-primary/10 group-hover:border-primary/30",
                  res.type === "Video" ? "text-red-400" : res.type === "Slides" ? "text-blue-400" : "text-amber-400"
               )}>
                  {res.type === "Video" ? <Video size={20} /> : res.type === "Slides" ? <BookOpen size={20} /> : <FileText size={20} />}
               </div>
               <div className="text-[10px] font-mono text-white/20 uppercase tracking-widest">{res.date}</div>
            </div>

            <div className="space-y-2">
               <h3 className="text-lg font-bold text-white group-hover:text-primary transition-colors line-clamp-1">{res.title}</h3>
               <div className="flex items-center gap-3">
                  <Badge variant="outline" className="text-[9px] border-white/10 bg-white/5 text-white/40 uppercase tracking-tighter">{res.category}</Badge>
                  <span className="text-[10px] text-white/20 font-mono">By {res.author}</span>
               </div>
            </div>

            <div className="flex items-center justify-between pt-6 mt-4 border-t border-white/5">
                <div className="flex items-center gap-2 text-[10px] font-mono text-white/40 uppercase">
                   <Download size={14} className="text-primary/40" />
                   {res.likes} Saves
                </div>
                <Button size="sm" variant="ghost" className="h-8 text-xs text-white/40 hover:text-white hover:bg-white/5 group-hover:text-primary" asChild>
                   <a href="#" className="flex items-center gap-1.5">
                      Open <ExternalLink size={12} />
                   </a>
                </Button>
            </div>
          </motion.div>
        ))}
      </section>
    </div>
  );
}
