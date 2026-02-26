"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Zap, CheckCircle2, Circle, Lock, ArrowRight, ShieldCheck, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import { toggleSkill, getProfile } from "@/lib/actions/skills";

const SKILL_TREE_TEMPLATE = [
  {
    category: "The Frontend Core",
    description: "Master the art of the pixel and user interaction.",
    skills: [
      { id: "Semantic HTML & Accessibility", name: "Semantic HTML & Accessibility", role: "UI Apprentice" },
      { id: "Modern CSS & Tailwind v4", name: "Modern CSS & Tailwind v4", role: "Stylist" },
      { id: "React 19 & Next.js 15", name: "React 19 & Next.js 15", role: "Web Architect" },
      { id: "Framer Motion & Micro-interactions", name: "Framer Motion & Micro-interactions", role: "Animation Wizard" },
    ]
  },
  {
    category: "The Backend Engine",
    description: "Data, security, and the logic that powers the world.",
    skills: [
      { id: "PostgreSQL & Database Design", name: "PostgreSQL & Database Design", role: "Data Guard" },
      { id: "Serverless & Edge Functions", name: "Serverless & Edge Functions", role: "Edge Scout" },
      { id: "Auth Systems (JWT, OAuth, Clerk)", name: "Auth Systems (JWT, OAuth, Clerk)", role: "Guardian" },
      { id: "System Design & Scalability", name: "System Design & Scalability", role: "Systems Lead", locked: true },
    ]
  },
  {
    category: "The Forge (DevOps & Tools)",
    description: "Automate, deploy, and scale with confidence.",
    skills: [
      { id: "Docker & Containerization", name: "Docker & Containerization", role: "Container Pilot" },
      { id: "CI/CD Pipelines", name: "CI/CD Pipelines", role: "Automation Eng" },
      { id: "Cloud Infrastructure (AWS/Vercel)", name: "Cloud Infrastructure (AWS/Vercel)", role: "Cloud Master", locked: true },
    ]
  }
];

export default function SkillsPage() {
  const [userTechStack, setUserTechStack] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState<string | null>(null);
  const supabase = createClient();
  const router = useRouter();

  useEffect(() => {
    const fetchUserSkills = async () => {
      setLoading(true);
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const result = await getProfile(user.id);
        if (result.success && result.profile) {
          setUserTechStack(result.profile.techStack || []);
        }
      }
      setLoading(false);
    };
    fetchUserSkills();
  }, [supabase]);

  const toggleMastery = async (skillId: string, isLocked?: boolean) => {
    if (isLocked || updating) return;

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      router.push("/login");
      return;
    }

    setUpdating(skillId);
    
    const result = await toggleSkill(user.id, skillId);

    if (result.success && result.techStack) {
      setUserTechStack(result.techStack);
    } else if (result.error) {
      console.error("Error updating skills:", result.error);
    }
    
    setUpdating(null);
  };

  return (
    <div className="space-y-12 pb-20">
      <header className="space-y-2">
        <h1 className="text-4xl font-bold tracking-tight text-white font-mono">
           <span className="text-primary mr-2">{">"}</span>
           The Skill Tree
        </h1>
        <p className="text-white/40 font-mono text-sm max-w-2xl">
           Track your progress, master new technologies, and unlock club-specific roles. 
           Mastered skills contribute to your Power Score.
        </p>
      </header>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-40 space-y-4">
           <Loader2 className="text-primary animate-spin" size={40} />
           <p className="text-white/20 font-mono text-xs uppercase tracking-[0.3em]">Loading Neural Map...</p>
        </div>
      ) : (
        <div className="grid gap-12">
          {SKILL_TREE_TEMPLATE.map((category) => (
            <div key={category.category} className="space-y-6">
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-white/5 pb-4">
                 <div className="space-y-1">
                    <h2 className="text-2xl font-bold text-white">{category.category}</h2>
                    <p className="text-white/40 text-sm font-mono">{category.description}</p>
                 </div>
                 <div className="text-[10px] font-mono text-white/20 uppercase tracking-[0.2em]">
                    {category.skills.filter(s => userTechStack.includes(s.id)).length} / {category.skills.length} Mastered
                 </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {category.skills.map((skill) => {
                  const isMastered = userTechStack.includes(skill.id);
                  const isUpdating = updating === skill.id;
                  
                  return (
                    <div 
                      key={skill.id}
                      onClick={() => toggleMastery(skill.id, skill.locked)}
                      className={cn(
                        "p-6 rounded-2xl border transition-all cursor-pointer group relative overflow-hidden",
                        skill.locked ? "bg-black/40 border-white/5 opacity-50 cursor-not-allowed" : 
                        isMastered ? "bg-primary/5 border-primary/30" : "bg-white/[0.02] border-white/10 hover:border-white/20",
                        isUpdating && "animate-pulse"
                      )}
                    >
                      {skill.locked && (
                         <div className="absolute inset-0 flex items-center justify-center bg-black/60 z-10">
                            <Lock size={20} className="text-white/40" />
                         </div>
                      )}

                      <div className="flex flex-col h-full justify-between gap-4">
                        <div className="space-y-3">
                          <div className={cn(
                            "p-2 rounded-lg w-fit transition-colors",
                            isMastered ? "bg-primary text-black" : "bg-white/5 text-white/40"
                          )}>
                            {isMastered ? <CheckCircle2 size={18} /> : isUpdating ? <Loader2 size={18} className="animate-spin" /> : <Circle size={18} />}
                          </div>
                          <h4 className={cn(
                            "font-bold text-sm leading-tight transition-colors",
                            isMastered ? "text-white" : "text-white/60 group-hover:text-white"
                          )}>
                            {skill.name}
                          </h4>
                        </div>

                        <div className="pt-4 border-t border-white/5 mt-auto">
                           <div className="text-[10px] text-white/20 uppercase tracking-widest font-mono mb-1">Unlocks Role</div>
                           <div className={cn(
                              "text-xs font-bold flex items-center gap-1",
                              isMastered ? "text-primary" : "text-white/40"
                           )}>
                              <ShieldCheck size={12} />
                              {skill.role}
                           </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      )}

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        className="p-8 rounded-3xl border border-primary/20 bg-primary/5 flex flex-col md:flex-row items-center justify-between gap-8"
      >
        <div className="space-y-2">
           <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <Zap className="text-primary" />
              Ready for your first Role?
           </h3>
           <p className="text-white/60 text-sm max-w-xl font-mono">
              Complete the "Frontend Core" track to unlock the <b>@Architect</b> Discord role and gain write access to the main gallery.
           </p>
        </div>
        <Button className="bg-primary text-black font-bold h-12 px-8 flex items-center gap-2">
           Claim Achievement
           <ArrowRight size={18} />
        </Button>
      </motion.div>
    </div>
  );
}
