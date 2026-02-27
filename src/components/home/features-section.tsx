"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import {
  Trophy,
  Code2,
  Network,
  ShieldCheck,
  Library,
  Users,
} from "lucide-react";

const features = [
  {
    icon: Trophy,
    title: "Live Leaderboard",
    description:
      "Compete with fellow developers. Your GitHub contributions, project quality, and community engagement all contribute to your Power Score.",
    color: "from-yellow-500/20 to-orange-500/20",
    borderColor: "hover:border-yellow-500/30",
    iconColor: "text-yellow-400",
  },
  {
    icon: Code2,
    title: "Project Showcase",
    description:
      "Ship your projects and get them featured. From weekend hacks to production apps — every build deserves the spotlight.",
    color: "from-primary/20 to-blue-500/20",
    borderColor: "hover:border-primary/30",
    iconColor: "text-primary",
  },
  {
    icon: Network,
    title: "Hackathons & Events",
    description:
      "Join monthly coding challenges, hackathons, and workshops. Build under pressure, learn fast, and win prizes.",
    color: "from-purple-500/20 to-pink-500/20",
    borderColor: "hover:border-purple-500/30",
    iconColor: "text-purple-400",
  },
  {
    icon: ShieldCheck,
    title: "Mentorship Program",
    description:
      "Connect with experienced developers who guide your growth. 1-on-1 sessions, code reviews, and career advice.",
    color: "from-green-500/20 to-emerald-500/20",
    borderColor: "hover:border-green-500/30",
    iconColor: "text-green-400",
  },
  {
    icon: Library,
    title: "Resource Library",
    description:
      "Curated tutorials, roadmaps, and tools handpicked by the community. Everything you need to level up your skills.",
    color: "from-rose-500/20 to-red-500/20",
    borderColor: "hover:border-rose-500/30",
    iconColor: "text-rose-400",
  },
  {
    icon: Users,
    title: "Developer Community",
    description:
      "A tight-knit crew of passionate builders. Share ideas, collaborate on projects, and grow together.",
    color: "from-indigo-500/20 to-violet-500/20",
    borderColor: "hover:border-indigo-500/30",
    iconColor: "text-indigo-400",
  },
];

export function FeaturesSection() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section ref={ref} className="relative py-32 overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-primary/5 rounded-full blur-[150px]" />

      <div className="relative z-10 max-w-7xl mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.5 }}
            className="inline-block px-4 py-1.5 rounded-full border border-primary/20 bg-primary/5 text-primary text-xs font-mono uppercase tracking-widest mb-6"
          >
            Features
          </motion.span>
          <h2 className="text-3xl sm:text-4xl md:text-6xl font-bold text-white tracking-tight mb-6">
            Everything you need to{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-400">
              level up
            </span>
          </h2>
          <p className="text-white/40 text-lg max-w-2xl mx-auto">
            The complete toolkit for ambitious developers. From showcasing your
            work to climbing the ranks.
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{
                delay: index * 0.1,
                duration: 0.6,
                ease: [0.16, 1, 0.3, 1],
              }}
              whileHover={{ y: -8, scale: 1.02 }}
              className={`group relative p-8 rounded-3xl border border-white/[0.06] bg-white/[0.02] backdrop-blur-sm transition-all duration-500 ${feature.borderColor} hover:bg-white/[0.04] cursor-default overflow-hidden`}
            >
              {/* Hover gradient */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl`}
              />

              {/* Corner glow */}
              <div className="absolute -top-20 -right-20 w-40 h-40 bg-primary/10 rounded-full blur-[60px] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="relative z-10">
                <div
                  className={`inline-flex p-3 rounded-2xl bg-white/[0.04] border border-white/[0.06] mb-5 group-hover:border-white/10 transition-colors`}
                >
                  <feature.icon size={24} className={feature.iconColor} />
                </div>

                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-white transition-colors">
                  {feature.title}
                </h3>
                <p className="text-white/40 leading-relaxed text-sm group-hover:text-white/60 transition-colors">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
