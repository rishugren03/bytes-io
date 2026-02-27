"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Terminal, Code2, User, Rocket, Check, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import { updateProfile } from "@/lib/actions/profile";

export default function OnboardingPage() {
  const router = useRouter();
  const supabase = createClient();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    username: "",
    leetcode_username: "",
    github_username: "",
    tech_stack: [] as string[],
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        router.push("/login");
        return;
      }
      setFormData(prev => ({ ...prev, github_username: user.user_metadata?.user_name || "" }));
    };
    checkUser();
  }, [router, supabase]);

  const handleSubmit = async () => {
    setLoading(true);
    const { data: { user } } = await supabase.auth.getUser();
    
    if (user) {
      const result = await updateProfile(user.id, {
        username: formData.username,
        leetcodeUsername: formData.leetcode_username,
        techStack: formData.tech_stack,
      });

      if (!result.success) {
        alert(result.error);
        setLoading(false);
        return;
      }
      
      router.push("/");
      router.refresh();
    }
  };

  const STYLES = {
    card: "p-8 rounded-3xl border border-white/5 bg-white/[0.02] backdrop-blur-xl relative overflow-hidden",
    label: "text-[10px] font-mono text-white/40 uppercase tracking-[0.2em] mb-2 block",
    input: "bg-white/5 border-white/10 text-white focus-visible:ring-primary/50 text-lg py-6",
  };

  return (
    <div className="md:px-20 px-8 max-w-xl mx-auto py-20 min-h-[80vh] flex flex-col justify-center">
      <AnimatePresence mode="wait">
        {step === 1 && (
          <motion.div 
            key="step1"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-8"
          >
            <div className="space-y-2">
               <h1 className="text-4xl font-bold text-white tracking-tighter">Initialize <span className="text-primary italic">Profile.</span></h1>
               <p className="text-white/40 font-mono text-sm leading-relaxed">Choose your unique handle and verify your GitHub identity.</p>
            </div>

            <div className={STYLES.card}>
               <div className="space-y-6">
                  <div>
                     <label className={STYLES.label}>Club Handle</label>
                     <div className="relative">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-primary/40 font-mono">@</span>
                        <Input 
                          placeholder="quant_dev" 
                          className={`${STYLES.input} pl-8 font-mono`}
                          value={formData.username}
                          onChange={(e) => setFormData({...formData, username: e.target.value})}
                        />
                     </div>
                  </div>
                  <div>
                     <label className={STYLES.label}>GitHub Instance</label>
                     <div className="p-4 rounded-xl border border-white/5 bg-white/5 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                           <div className="w-10 h-10 rounded-lg bg-zinc-800 border border-white/10 overflow-hidden">
                              <img src={`https://github.com/${formData.github_username}.png`} alt="GH" />
                           </div>
                           <div className="font-mono text-sm text-white">@{formData.github_username}</div>
                        </div>
                        <Check className="text-primary" size={16} />
                     </div>
                  </div>
                  <Button onClick={() => setStep(2)} className="w-full h-14 bg-primary text-black font-bold rounded-2xl flex items-center justify-center gap-2">
                     Next Stage <ArrowRight size={18} />
                  </Button>
               </div>
            </div>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div 
            key="step2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-8"
          >
            <div className="space-y-2">
               <h1 className="text-4xl font-bold text-white tracking-tighter">Sync <span className="text-primary italic">Competitions.</span></h1>
               <p className="text-white/40 font-mono text-sm leading-relaxed">Connect your competitive platforms to start building your Power Score.</p>
            </div>

            <div className={STYLES.card}>
               <div className="space-y-6">
                  <div>
                     <label className={STYLES.label}>LeetCode Username</label>
                     <Input 
                       placeholder="leetcode_id" 
                       className={STYLES.input}
                       value={formData.leetcode_username}
                       onChange={(e) => setFormData({...formData, leetcode_username: e.target.value})}
                     />
                  </div>
                  <div>
                     <label className={STYLES.label}>Primary Stack</label>
                     <div className="flex flex-wrap gap-2">
                        {["Next.js", "Rust", "Python", "Go", "Solana", "AI/ML"].map(tech => (
                           <button
                             key={tech}
                             onClick={() => {
                               const exists = formData.tech_stack.includes(tech);
                               setFormData({
                                 ...formData, 
                                 tech_stack: exists ? formData.tech_stack.filter(t => t !== tech) : [...formData.tech_stack, tech]
                               })
                             }}
                             className={`px-4 py-2 rounded-xl border font-mono text-xs transition-all ${
                               formData.tech_stack.includes(tech) 
                               ? "bg-primary border-primary text-black font-bold" 
                               : "bg-white/5 border-white/10 text-white/40 hover:border-white/20"
                             }`}
                           >
                             {tech}
                           </button>
                        ))}
                     </div>
                  </div>
                  <div className="flex gap-4">
                     <Button variant="outline" onClick={() => setStep(1)} className="flex-1 h-14 border-white/10 text-white rounded-2xl">Back</Button>
                     <Button 
                       onClick={handleSubmit} 
                       disabled={loading}
                       className="flex-[2] h-14 bg-primary text-black font-bold rounded-2xl flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(34,197,94,0.3)]"
                     >
                        {loading ? "Processing..." : "Finish Setup"} <Rocket size={18} />
                     </Button>
                  </div>
               </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
