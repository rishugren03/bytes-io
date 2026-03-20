"use client";

import { motion, useMotionValue, useTransform } from "framer-motion";
import { useEffect, useState, useCallback, useMemo } from "react";
import { ArrowRight, ChevronDown, Trophy } from "lucide-react";
import Link from "next/link";
import dynamic from "next/dynamic";
import type { Engine, ISourceOptions } from "@tsparticles/engine";
import { User } from "@supabase/supabase-js";

const Particles = dynamic(() => import("@tsparticles/react").then((mod) => mod.default), { ssr: false });

const HeroScene = dynamic(
  () => import("./three-scenes").then((mod) => mod.HeroScene),
  { ssr: false }
);

const headlineWords = ["Build.", "Compete.", "Ship."];

export function HeroSection({ user }: { user?: User | null }) {
  const [displayText, setDisplayText] = useState("");
  const [showCursor, setShowCursor] = useState(true);
  const [particlesReady, setParticlesReady] = useState(false);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useTransform(mouseY, [0, 800], [5, -5]);
  const rotateY = useTransform(mouseX, [0, 1400], [-5, 5]);

  const typewriterText = ">> Welcome to the coding revolution_";

  useEffect(() => {
    const initParticles = async () => {
      if (typeof window === 'undefined' || window.innerWidth < 768) return; // Skip particles on mobile/server
      const { initParticlesEngine } = await import("@tsparticles/react");
      const { loadSlim } = await import("@tsparticles/slim");
      await initParticlesEngine(async (engine: Engine) => {
        await loadSlim(engine);
      });
      setParticlesReady(true);
    };
    initParticles();
  }, []);

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setDisplayText(typewriterText.slice(0, i));
      i++;
      if (i > typewriterText.length) clearInterval(interval);
    }, 60);
    const cursorInterval = setInterval(() => setShowCursor((p) => !p), 530);
    return () => {
      clearInterval(interval);
      clearInterval(cursorInterval);
    };
  }, []);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (window.matchMedia('(pointer: coarse)').matches) return;
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    },
    [mouseX, mouseY]
  );

  const particlesOptions: ISourceOptions = useMemo(
    () => ({
      fullScreen: false,
      fpsLimit: 60,
      particles: {
        number: { value: 60, density: { enable: true } },
        color: { value: ["#00d1ff", "#7c3aed", "#06b6d4"] },
        shape: { type: "circle" },
        opacity: {
          value: { min: 0.1, max: 0.4 },
          animation: { enable: true, speed: 0.8, sync: false },
        },
        size: {
          value: { min: 1, max: 3 },
          animation: { enable: true, speed: 2, sync: false },
        },
        move: {
          enable: true,
          speed: { min: 0.3, max: 1 },
          direction: "none" as const,
          random: true,
          straight: false,
          outModes: { default: "out" as const },
        },
        links: {
          enable: true,
          distance: 150,
          color: "#00d1ff",
          opacity: 0.08,
          width: 1,
        },
      },
      interactivity: {
        events: {
          onHover: { enable: true, mode: "grab" },
        },
        modes: {
          grab: { distance: 180, links: { opacity: 0.25 } },
        },
      },
      detectRetina: true,
    }),
    []
  );

  const containerVariants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.2, delayChildren: 0.3 },
    },
  };

  const wordVariants = {
    hidden: { opacity: 0, y: 60, rotateX: -40 },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const },
    },
  };

  return (
    <section
      className="relative flex flex-col items-center justify-center min-h-[100vh] text-center overflow-hidden -mt-24 pt-24"
      onMouseMove={handleMouseMove}
    >
      {/* Particle Background */}
      {particlesReady && (
        <Particles
          className="absolute inset-0 -z-10"
          options={particlesOptions}
        />
      )}

      {/* 3D Scene */}
      {/* <HeroScene /> */}

      {/* Gradient Orbs */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[80px] md:blur-[120px] animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-purple-500/10 rounded-full blur-[70px] md:blur-[100px] animate-pulse [animation-delay:1s]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-500/5 rounded-full blur-[100px] md:blur-[150px]" />

      {/* Content */}
      <motion.div
        style={{ rotateX, rotateY, perspective: 1000 }}
        className="relative z-10 space-y-8 max-w-7xl mx-auto px-6"
      >
        {/* Status Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/20 bg-primary/5 backdrop-blur-sm"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
          </span>
          <span className="text-primary text-xs font-mono uppercase tracking-widest">
            System Online
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="text-4xl sm:text-6xl md:text-8xl lg:text-9xl font-bold tracking-tighter leading-[0.9]"
        >
          {headlineWords.map((word, i) => (
            <motion.span
              key={word}
              variants={wordVariants}
              className={`inline-block mr-4 md:mr-6 ${i === 1
                  ? "text-transparent bg-clip-text bg-gradient-to-r from-primary via-cyan-300 to-purple-400"
                  : i === 2
                    ? "italic text-primary"
                    : "text-white"
                }`}
            >
              {word}
            </motion.span>
          ))}
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="text-lg md:text-xl text-white/50 max-w-2xl mx-auto leading-relaxed"
        >
          The ultimate platform for coders who ship. Join a community of
          builders, compete on leaderboards, and showcase your work.
        </motion.p>

        {/* Terminal Text */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="font-mono text-sm text-white/30 h-6"
        >
          {displayText}
          {showCursor && <span className="text-primary">█</span>}
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.8 }}
          className="flex flex-col sm:flex-row gap-4 justify-center pt-4"
        >
          {user ? (
            <Link
              href="/leaderboard"
              className="group relative flex items-center justify-center gap-3 px-10 py-4 rounded-full bg-primary text-black font-bold text-lg overflow-hidden transition-all hover:scale-105 active:scale-95 shadow-[0_0_40px_rgba(0,209,255,0.3)] hover:shadow-[0_0_60px_rgba(0,209,255,0.5)]"
            >
              <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-in-out" />
              View Leaderboard
              <Trophy
                size={20}
                className="group-hover:translate-x-1 transition-transform"
              />
            </Link>
          ) : (
            <Link
              href="/login"
              className="group relative flex items-center justify-center gap-3 px-10 py-4 rounded-full bg-primary text-black font-bold text-lg overflow-hidden transition-all hover:scale-105 active:scale-95 shadow-[0_0_40px_rgba(0,209,255,0.3)] hover:shadow-[0_0_60px_rgba(0,209,255,0.5)]"
            >
              <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-in-out" />
              Join the Registry
              <ArrowRight
                size={20}
                className="group-hover:translate-x-1 transition-transform"
              />
            </Link>
          )}

          <Link
            href="/projects"
            className="group flex items-center justify-center gap-3 px-10 py-4 rounded-full border border-white/10 bg-white/5 text-white font-semibold text-lg backdrop-blur-sm transition-all hover:bg-white/10 hover:border-white/20 active:scale-95"
          >
            <span className="w-2 h-2 rounded-full bg-green-400 group-hover:animate-ping" />
            View Showcase
          </Link>
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-white/20 text-xs font-mono uppercase tracking-widest">
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
        >
          <ChevronDown size={20} className="text-white/20" />
        </motion.div>
      </motion.div>
    </section>
  );
}
