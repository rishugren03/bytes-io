"use client";

import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";
import dynamic from "next/dynamic";

const CTAScene = dynamic(
  () => import("./three-scenes").then((mod) => mod.CTAScene),
  { ssr: false }
);

export function CTASection() {
  return (
    <section className="relative py-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative rounded-[2rem] overflow-hidden"
        >
          {/* 3D Globe */}
          <CTAScene />

          {/* Animated gradient background */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-purple-500/20 to-pink-500/20 animate-gradient-shift" />
          <div className="absolute inset-0 bg-[#050505]/60 backdrop-blur-sm" />

          {/* Grid overlay */}
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage:
                "linear-gradient(to right, #ffffff10 1px, transparent 1px), linear-gradient(to bottom, #ffffff10 1px, transparent 1px)",
              backgroundSize: "30px 30px",
            }}
          />

          {/* Floating orbs */}
          <motion.div
            animate={{
              x: [0, 30, -20, 0],
              y: [0, -20, 10, 0],
            }}
            transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
            className="absolute top-10 right-20 w-32 h-32 bg-primary/20 rounded-full blur-[60px]"
          />
          <motion.div
            animate={{
              x: [0, -20, 30, 0],
              y: [0, 15, -25, 0],
            }}
            transition={{ repeat: Infinity, duration: 10, ease: "easeInOut" }}
            className="absolute bottom-10 left-20 w-40 h-40 bg-purple-500/20 rounded-full blur-[80px]"
          />

          {/* Content */}
          <div className="relative z-10 py-20 px-8 md:px-16 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/20 bg-primary/10 text-primary text-xs font-mono uppercase tracking-widest mb-8"
            >
              <Sparkles size={14} />
              <span>Join Today</span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white tracking-tight mb-6"
            >
              Ready to{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-cyan-300 to-purple-400">
                level up?
              </span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="text-white/40 text-lg max-w-xl mx-auto mb-10"
            >
              Be part of a community that builds, competes, and grows
              together. Your next chapter starts here.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
            >
              <Link
                href="/login"
                className="group relative inline-flex items-center gap-3 px-12 py-5 rounded-full bg-primary text-black font-bold text-lg overflow-hidden transition-all hover:scale-105 active:scale-95 shadow-[0_0_50px_rgba(0,209,255,0.4)] hover:shadow-[0_0_80px_rgba(0,209,255,0.6)]"
              >
                {/* Shimmer effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000 ease-in-out" />
                <span className="relative z-10">Get Started</span>
                <ArrowRight
                  size={20}
                  className="relative z-10 group-hover:translate-x-1 transition-transform"
                />
              </Link>
            </motion.div>

            {/* Social proof */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.7 }}
              className="mt-10 flex items-center justify-center gap-3"
            >
              <div className="flex -space-x-2">
                {["AK", "PR", "RK", "SM", "DN"].map((initials, i) => (
                  <div
                    key={initials}
                    className="w-8 h-8 rounded-full border-2 border-[#050505] bg-gradient-to-br from-primary/40 to-purple-500/40 flex items-center justify-center text-[9px] font-bold text-white"
                    style={{ zIndex: 5 - i }}
                  >
                    {initials}
                  </div>
                ))}
              </div>
              <span className="text-white/30 text-sm">
                Be among the first to join
              </span>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
