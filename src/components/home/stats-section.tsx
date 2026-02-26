"use client";

import { motion, useMotionValue, useSpring, useInView } from "framer-motion";
import { useEffect, useRef } from "react";
import { Users, Code, Zap, Calendar } from "lucide-react";

function AnimatedCounter({
  target,
  suffix = "",
  duration = 2,
}: {
  target: number;
  suffix?: string;
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, {
    damping: 60,
    stiffness: 100,
    duration: duration * 1000,
  });
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      motionValue.set(target);
    }
  }, [isInView, target, motionValue]);

  useEffect(() => {
    const unsubscribe = springValue.on("change", (latest) => {
      if (ref.current) {
        ref.current.textContent = Math.floor(latest).toLocaleString() + suffix;
      }
    });
    return unsubscribe;
  }, [springValue, suffix]);

  return <span ref={ref}>0{suffix}</span>;
}

const stats = [
  {
    icon: Users,
    label: "Active Members",
    value: 500,
    suffix: "+",
    description: "Developers building together",
  },
  {
    icon: Code,
    label: "Projects Shipped",
    value: 120,
    suffix: "+",
    description: "Open source & beyond",
  },
  {
    icon: Calendar,
    label: "Events Hosted",
    value: 50,
    suffix: "+",
    description: "Hackathons, workshops & talks",
  },
  {
    icon: Zap,
    label: "Avg Power Score",
    value: 2400,
    suffix: "",
    description: "Community engagement metric",
  },
];

export function StatsSection() {
  return (
    <section className="relative py-32">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/[0.02] to-transparent" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <span className="inline-block px-4 py-1.5 rounded-full border border-primary/20 bg-primary/5 text-primary text-xs font-mono uppercase tracking-widest mb-6">
            Impact
          </span>
          <h2 className="text-4xl md:text-6xl font-bold text-white tracking-tight mb-6">
            The numbers speak{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-cyan-300">
              for themselves
            </span>
          </h2>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{
                delay: index * 0.15,
                duration: 0.6,
                ease: [0.16, 1, 0.3, 1] as const,
              }}
              whileHover={{ y: -6 }}
              className="group relative p-8 rounded-3xl border border-white/[0.06] bg-white/[0.02] text-center overflow-hidden transition-all hover:border-primary/20 hover:bg-white/[0.04]"
            >
              {/* Radial glow on hover */}
              <div className="absolute inset-0 bg-gradient-to-b from-primary/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl" />

              <div className="relative z-10">
                <div className="inline-flex p-3 rounded-2xl bg-primary/10 border border-primary/20 mb-5">
                  <stat.icon size={24} className="text-primary" />
                </div>
                <div className="text-5xl font-bold text-white mb-2 tabular-nums">
                  <AnimatedCounter
                    target={stat.value}
                    suffix={stat.suffix}
                  />
                </div>
                <div className="text-white/40 font-mono text-xs uppercase tracking-widest mb-2">
                  {stat.label}
                </div>
                <p className="text-white/30 text-sm">{stat.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
