"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Users, Code, Zap, ArrowRight } from "lucide-react";
import Link from "next/link";

const typewriterText = "Initializing Bytes.io...";

export default function Home() {
  const [displayText, setDisplayText] = useState("");
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setDisplayText(typewriterText.slice(0, i));
      i++;
      if (i > typewriterText.length) clearInterval(interval);
    }, 100);

    const cursorInterval = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 500);

    return () => {
      clearInterval(interval);
      clearInterval(cursorInterval);
    };
  }, []);

  return (
    <div className="space-y-24">
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-4"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/20 bg-primary/5 text-primary text-xs font-mono uppercase tracking-widest">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            System Online
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold tracking-tighter text-white">
            Where Code Meets <br />
            <span className="text-primary italic">Momentum.</span>
          </h1>
          
          <div className="font-mono text-xl text-white/50 h-8">
            {displayText}
            {showCursor && <span className="text-primary">|</span>}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="flex flex-col sm:flex-row gap-4"
        >
          <Link
            href="/login"
            className="group relative flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-primary text-black font-semibold overflow-hidden transition-all hover:scale-105 active:scale-95"
          >
            <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500 ease-in-out" />
            Join the Registry
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </Link>
          
          <Link
            href="/projects"
            className="flex items-center justify-center gap-2 px-8 py-4 rounded-full border border-white/10 bg-white/5 text-white font-semibold backdrop-blur-sm transition-all hover:bg-white/10 active:scale-95"
          >
            View Showcase
          </Link>
        </motion.div>
      </section>

      {/* Live Stats Grid */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard 
          icon={<Users className="text-primary" />}
          label="Active Members"
          value="—"
          description="Join the first wave"
          delay={0.2}
        />
        <StatCard 
          icon={<Code className="text-primary" />}
          label="Projects Shipped"
          value="0"
          description="Be the first to ship"
          delay={0.4}
        />
        <StatCard 
          icon={<Zap className="text-primary" />}
          label="Power Score"
          value="0"
          description="Start building your score"
          delay={0.6}
        />
      </section>

      {/* Feature Highlight */}
      <section className="rounded-3xl border border-white/10 bg-white/[0.02] p-8 md:p-12 overflow-hidden relative">
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 blur-[100px] -mr-32 -mt-32 rounded-full" />
        <div className="relative z-10 grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-white">The &quot;Engineer-Core&quot; Lifestyle</h2>
            <p className="text-white/60 leading-relaxed">
              Bytes.io is an accelerator for your technical career. 
              Sync your GitHub, climb the leaderboard, showcase your 
              projects, and connect with mentors.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4">
             <div className="p-4 rounded-2xl border border-white/5 bg-white/[0.02] space-y-2">
                <div className="text-primary text-xs font-mono uppercase tracking-tighter">Live</div>
                <div className="text-white font-bold">Leaderboard</div>
             </div>
             <div className="p-4 rounded-2xl border border-white/5 bg-white/[0.02] space-y-2">
                <div className="text-primary text-xs font-mono uppercase tracking-tighter">New</div>
                <div className="text-white font-bold">Project Showcase</div>
             </div>
             <div className="p-4 rounded-2xl border border-white/5 bg-white/[0.02] space-y-2">
                <div className="text-primary text-xs font-mono uppercase tracking-tighter">Live</div>
                <div className="text-white font-bold">Events Portal</div>
             </div>
             <div className="p-4 rounded-2xl border border-white/5 bg-white/[0.02] space-y-2">
                <div className="text-primary text-xs font-mono uppercase tracking-tighter">New</div>
                <div className="text-white font-bold">Mentorship</div>
             </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function StatCard({ icon, label, value, description, delay }: { icon: React.ReactNode, label: string, value: string, description: string, delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.5 }}
      whileHover={{ y: -5 }}
      className="p-8 rounded-3xl border border-white/10 bg-white/[0.02] group transition-all hover:bg-white/[0.04] hover:border-primary/20 relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity blur-3xl -z-10" />
      <div className="flex items-center gap-4 mb-4">
        <div className="p-2 rounded-xl bg-primary/10 border border-primary/20">
          {icon}
        </div>
        <span className="text-white/40 font-mono text-sm tracking-widest uppercase">{label}</span>
      </div>
      <div className="text-4xl font-bold text-white mb-2">{value}</div>
      <p className="text-white/40 text-sm leading-relaxed">{description}</p>
    </motion.div>
  );
}
