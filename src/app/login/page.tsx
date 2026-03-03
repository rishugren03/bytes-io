"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Github, GithubIcon, Terminal, ArrowRight, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { createClient } from "@/utils/supabase/client";

export default function LoginPage() {
   const [loading, setLoading] = useState(false);
   const supabase = createClient();

   const handleGitHubLogin = async () => {
      setLoading(true);
      const params = new URLSearchParams(window.location.search);
      const nextUrl = params.get("next") || "/";

      const { error } = await supabase.auth.signInWithOAuth({
         provider: "github",
         options: {
            redirectTo: `${window.location.origin}/auth/callback?next=${encodeURIComponent(nextUrl)}`,
         },
      });

      if (error) {
         console.error("Auth error:", error.message);
         setLoading(false);
      }
   };

   return (
      <div className="md:px-20 px-8 flex flex-col items-center justify-center min-h-[80vh] space-y-12">
         <header className="text-center space-y-4">
            <motion.div
               initial={{ scale: 0.8, opacity: 0 }}
               animate={{ scale: 1, opacity: 1 }}
               className="w-20 h-20 bg-primary/10 border border-primary/20 rounded-3xl flex items-center justify-center mx-auto mb-8 mx-auto"
            >
               <Terminal className="text-primary" size={40} />
            </motion.div>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tighter text-white">
               Authenticate <span className="text-primary italic">Identity.</span>
            </h1>
            <p className="text-white/40 font-mono text-sm max-w-sm mx-auto">
               Bytes.io uses GitHub for engineer verification. Your session will be
               secured with end-to-end encryption.
            </p>
         </header>

         <section className="w-full max-w-sm space-y-6">
            <Button
               onClick={handleGitHubLogin}
               disabled={loading}
               className="w-full h-14 bg-white text-black font-bold text-lg flex items-center justify-center gap-3 hover:bg-white/90 transition-all rounded-2xl"
            >
               {loading ? (
                  <div className="w-5 h-5 border-2 border-black/20 border-t-black rounded-full animate-spin" />
               ) : (
                  <>
                     <Github size={24} />
                     Continue with GitHub
                  </>
               )}
            </Button>

            <div className="flex items-center gap-4 text-white/20">
               <div className="h-[1px] flex-1 bg-white/5" />
               <span className="text-[10px] font-mono uppercase tracking-widest">Secure Handshake</span>
               <div className="h-[1px] flex-1 bg-white/5" />
            </div>

            <div className="p-6 rounded-2xl border border-white/5 bg-white/[0.02] space-y-3">
               <div className="flex items-center gap-2 text-primary">
                  <ShieldCheck size={16} />
                  <span className="text-xs font-bold uppercase tracking-widest">Protected Environment</span>
               </div>
               <p className="text-[10px] text-white/40 leading-relaxed font-mono">
                  By continuing, you agree to allow Bytes.io to sync your public GitHub
                  contributions and repositories for your Power Score.
               </p>
            </div>
         </section>

         <footer className="pt-12">
            <Button variant="link" className="text-white/20 text-[10px] uppercase font-mono tracking-[0.3em] hover:text-white transition-colors">
               Terms of Deployment — 2026.v4
            </Button>
         </footer>
      </div>
   );
}
