"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { MessageSquare, Star, Zap, Clock, ShieldCheck, Mail, ArrowRight, Video } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const MENTORS = [
  { 
    id: 1, 
    name: "David Kim", 
    role: "Core Contributor", 
    expertise: ["Compilers", "Rust", "WebGPU"], 
    sessions: 45, 
    rating: 4.9, 
    availability: "Tue, Thu Evening",
    avatar: "https://i.pravatar.cc/150?u=1"
  },
  { 
    id: 2, 
    name: "Sarah Chen", 
    role: "Senior Engineer", 
    expertise: ["React", "System Design", "FinTech"], 
    sessions: 32, 
    rating: 4.8, 
    availability: "Mon, Wed Afternoon",
    avatar: "https://i.pravatar.cc/150?u=2"
  },
  { 
    id: 3, 
    name: "Leo Zhang", 
    role: "DevOps Architect", 
    expertise: ["Kubernetes", "AWS", "Security"], 
    sessions: 28, 
    rating: 5.0, 
    availability: "Weekend Mornings",
    avatar: "https://i.pravatar.cc/150?u=4"
  },
];

export default function MentorshipPage() {
  return (
    <div className="space-y-12 pb-20">
      <header className="space-y-2">
        <h1 className="text-4xl font-bold tracking-tight text-white font-mono">
           <span className="text-primary mr-2">{">"}</span>
           Mentorship Matcher
        </h1>
        <p className="text-white/40 font-mono text-sm max-w-2xl">
           Connect 1-on-1 with senior engineers and club leads. Schedule 
           code reviews, mock interviews, or architecture sessions.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {MENTORS.map((mentor, index) => (
          <motion.div
            key={mentor.id}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            className="p-8 rounded-3xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.04] hover:border-primary/20 transition-all group relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
               <ShieldCheck size={80} className="text-primary" />
            </div>

            <div className="flex flex-col items-center text-center space-y-4">
               <div className="relative">
                  <div className="w-24 h-24 rounded-2xl overflow-hidden border-2 border-white/5 group-hover:border-primary/50 transition-all">
                     <img src={mentor.avatar} alt={mentor.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="absolute -bottom-2 -right-2 bg-primary text-black p-1.5 rounded-lg shadow-lg">
                     <Star size={12} fill="currentColor" />
                  </div>
               </div>

               <div className="space-y-1">
                  <h3 className="text-xl font-bold text-white group-hover:text-primary transition-colors">{mentor.name}</h3>
                  <div className="flex items-center justify-center gap-2 text-xs font-mono text-white/40 uppercase tracking-widest">
                     <span className="text-primary/60">{mentor.role}</span>
                     <span className="w-1 h-1 rounded-full bg-white/10" />
                     <span>{mentor.sessions} Sessions</span>
                  </div>
               </div>

               <div className="flex flex-wrap justify-center gap-2 pt-2">
                  {mentor.expertise.map(s => (
                     <Badge key={s} variant="outline" className="bg-white/5 border-white/10 text-white/60 text-[10px] py-0">{s}</Badge>
                  ))}
               </div>

               <div className="w-full pt-8 space-y-4">
                  <div className="flex items-center justify-between text-[10px] font-mono uppercase tracking-[0.2em] text-white/20 px-2">
                     <div className="flex items-center gap-1.5"><Clock size={12} /> Availability</div>
                     <span className="text-white/60">{mentor.availability}</span>
                  </div>
                  
                  <div className="flex gap-2">
                     <Button className="flex-1 bg-primary text-black font-bold h-12 flex items-center gap-2">
                        Request Sync
                        <Video size={16} />
                     </Button>
                     <Button variant="outline" size="icon" className="h-12 w-12 border-white/10 bg-white/5 text-white/60">
                        <Mail size={18} />
                     </Button>
                  </div>
               </div>
            </div>
          </motion.div>
        ))}
      </div>

      <section className="p-8 md:p-12 rounded-3xl border border-white/5 bg-white/[0.01] relative overflow-hidden group">
         <div className="absolute inset-0 bg-primary/5 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
         <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
               <h2 className="text-3xl font-bold text-white">Become a Mentor</h2>
               <p className="text-white/40 leading-relaxed font-mono text-sm">
                  Are you a senior engineer with a passion for teaching? Apply to 
                  become a mentor and help shape the next generation of Codewave talent. 
                  Earn exclusive badges and Power Score bonuses.
               </p>
               <Button className="border border-white/10 text-white bg-white/5 hover:bg-white/10 flex items-center gap-2">
                  Apply for Mentorship Track <ArrowRight size={18} />
               </Button>
            </div>
            <div className="grid grid-cols-2 gap-4">
               {[1,2,3,4].map(i => (
                  <div key={i} className="aspect-square rounded-2xl border border-white/5 bg-white/[0.02] flex flex-col items-center justify-center p-4 text-center space-y-2">
                     <div className="text-primary font-bold text-2xl">{i*10}+</div>
                     <div className="text-[10px] text-white/20 uppercase tracking-widest font-mono">Sessions/Mo</div>
                  </div>
               ))}
            </div>
         </div>
      </section>
    </div>
  );
}
