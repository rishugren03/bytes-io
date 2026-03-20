"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Rocket, Code2, Flame, GitBranch } from "lucide-react";
import dynamic from "next/dynamic";

const ManifestoScene = dynamic(
  () => import("./three-scenes").then((mod) => mod.ManifestoScene),
  { ssr: false }
);

const mantras = [
  {
    icon: Rocket,
    title: "Ship Fast, Learn Faster",
    description:
      "Don't wait for perfect. Push your code, get feedback, iterate. The best developers are the ones who ship.",
    gradient: "from-primary/20 to-blue-500/20",
    iconColor: "text-primary",
  },
  {
    icon: Flame,
    title: "Stay Hungry, Stay Building",
    description:
      "Every line of code is a step forward. Every bug fixed is a lesson learned. Keep the fire burning.",
    gradient: "from-orange-500/20 to-yellow-500/20",
    iconColor: "text-orange-400",
  },
  {
    icon: GitBranch,
    title: "Collaborate, Don't Compete",
    description:
      "The strongest code is written together. Open source your ideas, review each other's work, grow as a team.",
    gradient: "from-green-500/20 to-emerald-500/20",
    iconColor: "text-green-400",
  },
  {
    icon: Code2,
    title: "Your Portfolio Is Your Resume",
    description:
      "Recruiters don't care about your GPA. They care about what you've built. Start building your story today.",
    gradient: "from-purple-500/20 to-pink-500/20",
    iconColor: "text-purple-400",
  },
];

export function ManifestoSection() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section ref={ref} className="relative py-32 overflow-hidden">
      {/* 3D Wave Grid */}
      <ManifestoScene />

      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500/20 to-transparent" />
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 60, ease: "linear" }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] md:w-[600px] md:h-[600px] rounded-full border border-white/[0.02]"
        />
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ repeat: Infinity, duration: 80, ease: "linear" }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] md:w-[800px] md:h-[800px] rounded-full border border-white/[0.015]"
        />
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 100, ease: "linear" }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] md:w-[1000px] md:h-[1000px] rounded-full border border-white/[0.01]"
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <span className="inline-block px-4 py-1.5 rounded-full border border-primary/20 bg-primary/5 text-primary text-xs font-mono uppercase tracking-widest mb-6">
            Our Manifesto
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-6xl font-bold text-white tracking-tight mb-6">
            Code is our{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-purple-400 to-pink-400">
              superpower
            </span>
          </h2>
          <p className="text-white/40 text-lg max-w-2xl mx-auto">
            We believe in building things that matter. No gatekeeping, no
            egos — just passionate coders pushing boundaries.
          </p>
        </motion.div>

        {/* Mantra Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {mantras.map((mantra, index) => (
            <motion.div
              key={mantra.title}
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{
                delay: index * 0.15,
                duration: 0.7,
                ease: [0.16, 1, 0.3, 1] as const,
              }}
              whileHover={{ y: -6 }}
              className="group relative p-8 md:p-10 rounded-3xl border border-white/[0.06] bg-white/[0.02] backdrop-blur-sm overflow-hidden transition-all duration-300 hover:border-white/10"
            >
              {/* Hover gradient */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${mantra.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
              />

              <div className="relative z-10 flex gap-5">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded-2xl bg-white/[0.04] border border-white/[0.06] flex items-center justify-center group-hover:border-white/10 transition-colors">
                    <mantra.icon size={22} className={mantra.iconColor} />
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white mb-2">
                    {mantra.title}
                  </h3>
                  <p className="text-white/40 text-sm leading-relaxed group-hover:text-white/60 transition-colors">
                    {mantra.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Motivational quote */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8, duration: 1 }}
          className="text-center mt-16"
        >
          <p className="text-white/20 text-sm font-mono italic">
            &quot;Talk is cheap. Show me the code.&quot; — Linus Torvalds
          </p>
        </motion.div>
      </div>
    </section>
  );
}
