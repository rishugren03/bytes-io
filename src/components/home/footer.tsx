"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  Github,
  Twitter,
  Linkedin,
  Instagram,
  ArrowUp,
  Heart,
} from "lucide-react";

const footerLinks = {
  Platform: [
    { name: "Leaderboard", href: "/leaderboard" },
    { name: "Project Showcase", href: "/projects" },
    { name: "Resource Library", href: "/resources" },
    { name: "Member Registry", href: "/members" },
  ],
  Community: [
    { name: "Hackathons", href: "/hackathons" },
    { name: "Mentorship", href: "/mentorship" },
    { name: "Join Us", href: "/login" },
  ],
};

const socialLinks = [
  { icon: Github, href: "https://github.com/rishugren03/bytes-io", label: "GitHub" },
  { icon: Twitter, href: "#", label: "Twitter" },
  { icon: Linkedin, href: "#", label: "LinkedIn" },
  { icon: Instagram, href: "#", label: "Instagram" },
];

// Generate dots for the BYTES.IO text
function DotText() {
  const text = "BYTES.IO";
  const dotSize = 4;
  const gap = 2;
  
  // Simple 5x7 pixel font for each character
  const charMap: Record<string, number[][]> = {
    B: [
      [1,1,1,0],
      [1,0,0,1],
      [1,1,1,0],
      [1,0,0,1],
      [1,0,0,1],
      [1,1,1,0],
      [0,0,0,0],
    ],
    Y: [
      [1,0,0,1],
      [1,0,0,1],
      [0,1,1,0],
      [0,1,1,0],
      [0,1,1,0],
      [0,1,1,0],
      [0,0,0,0],
    ],
    T: [
      [1,1,1,1],
      [0,1,1,0],
      [0,1,1,0],
      [0,1,1,0],
      [0,1,1,0],
      [0,1,1,0],
      [0,0,0,0],
    ],
    E: [
      [1,1,1,1],
      [1,0,0,0],
      [1,1,1,0],
      [1,0,0,0],
      [1,0,0,0],
      [1,1,1,1],
      [0,0,0,0],
    ],
    S: [
      [0,1,1,1],
      [1,0,0,0],
      [0,1,1,0],
      [0,0,0,1],
      [0,0,0,1],
      [1,1,1,0],
      [0,0,0,0],
    ],
    ".": [
      [0,0,0,0],
      [0,0,0,0],
      [0,0,0,0],
      [0,0,0,0],
      [0,0,0,0],
      [0,1,0,0],
      [0,0,0,0],
    ],
    I: [
      [1,1,1,0],
      [0,1,0,0],
      [0,1,0,0],
      [0,1,0,0],
      [0,1,0,0],
      [1,1,1,0],
      [0,0,0,0],
    ],
    O: [
      [0,1,1,0],
      [1,0,0,1],
      [1,0,0,1],
      [1,0,0,1],
      [1,0,0,1],
      [0,1,1,0],
      [0,0,0,0],
    ],
  };

  const dots: { x: number; y: number; delay: number }[] = [];
  let offsetX = 0;

  for (const char of text) {
    const grid = charMap[char];
    if (!grid) continue;
    for (let row = 0; row < grid.length; row++) {
      for (let col = 0; col < grid[row].length; col++) {
        if (grid[row][col]) {
          dots.push({
            x: offsetX + col * (dotSize + gap),
            y: row * (dotSize + gap),
            delay: Math.random() * 2,
          });
        }
      }
    }
    offsetX += (grid[0]?.length || 4) * (dotSize + gap) + (dotSize + gap);
  }

  const totalWidth = offsetX;
  const totalHeight = 7 * (dotSize + gap);

  return (
    <div className="absolute inset-0 flex items-center justify-center overflow-hidden pointer-events-none">
      <svg
        viewBox={`0 0 ${totalWidth} ${totalHeight}`}
        className="w-full max-w-5xl opacity-[0.04]"
        preserveAspectRatio="xMidYMid meet"
      >
        {dots.map((dot, i) => (
          <motion.circle
            key={i}
            cx={dot.x + dotSize / 2}
            cy={dot.y + dotSize / 2}
            r={dotSize / 2}
            fill="#00d1ff"
            initial={{ opacity: 0.3 }}
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{
              repeat: Infinity,
              duration: 3,
              delay: dot.delay,
              ease: "easeInOut",
            }}
          />
        ))}
      </svg>
    </div>
  );
}

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative mt-20 overflow-hidden">
      {/* Top gradient border */}
      <div className="absolute top-0 left-0 right-0 h-px">
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
          className="h-full bg-gradient-to-r from-transparent via-primary/50 to-transparent origin-center"
        />
      </div>

      {/* Big BYTES.IO dots background */}
      <DotText />

      {/* Background glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-primary/5 rounded-full blur-[150px]" />
      <div className="absolute top-1/3 right-0 w-[300px] h-[300px] bg-purple-500/5 rounded-full blur-[120px]" />

      <div className="relative z-10 max-w-7xl mx-auto px-4">
        {/* Main Footer Content */}
        <div className="py-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="flex items-center gap-3"
            >
              <div className="relative">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-cyan-300 flex items-center justify-center font-bold text-black text-sm">
                  B.
                </div>
                <div className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-green-400 border-2 border-[#050505]" />
              </div>
              <div>
                <span className="text-white font-bold text-xl tracking-tight">
                  Bytes.io
                </span>
                <span className="block text-white/30 text-[10px] font-mono uppercase tracking-widest">
                  The Engineer Platform
                </span>
              </div>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1, duration: 0.6 }}
              className="text-white/30 text-sm leading-relaxed max-w-md"
            >
              Where code meets momentum. A community of passionate builders
              pushing the limits, one commit at a time.
            </motion.p>

            {/* Social Icons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="flex items-center gap-3"
            >
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target={social.href.startsWith("http") ? "_blank" : undefined}
                  rel={social.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  whileHover={{ y: -3, scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="group w-10 h-10 rounded-xl border border-white/[0.06] bg-white/[0.02] flex items-center justify-center text-white/30 hover:text-primary hover:border-primary/30 hover:bg-primary/5 transition-all duration-300"
                  aria-label={social.label}
                >
                  <social.icon size={18} />
                </motion.a>
              ))}
            </motion.div>

            {/* Live status */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="flex items-center gap-2 text-white/20 text-xs font-mono"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-400" />
              </span>
              All systems operational
            </motion.div>
          </div>

          {/* Link Columns */}
          {Object.entries(footerLinks).map(([title, links], colIndex) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 * (colIndex + 1), duration: 0.6 }}
            >
              <h3 className="text-white font-semibold text-sm mb-6">
                {title}
              </h3>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="group text-white/30 hover:text-white text-sm transition-colors duration-200 flex items-center gap-2"
                    >
                      <span className="w-0 group-hover:w-2 h-px bg-primary transition-all duration-300" />
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/[0.06] py-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="flex items-center gap-1 text-white/20 text-xs font-mono"
          >
            <span>© 2026 Bytes.io</span>
            <span className="mx-2">·</span>
            <span className="flex items-center gap-1">
              Made with{" "}
              <motion.span
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
              >
                <Heart size={12} className="text-red-400 fill-red-400" />
              </motion.span>{" "}
              by builders
            </span>
          </motion.div>

          {/* Back to Top */}
          <motion.button
            whileHover={{ y: -2, scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={scrollToTop}
            className="group flex items-center gap-2 px-4 py-2 rounded-full border border-white/[0.06] bg-white/[0.02] text-white/30 hover:text-primary hover:border-primary/20 hover:bg-primary/5 transition-all duration-300 text-xs font-mono"
          >
            <ArrowUp
              size={14}
              className="group-hover:-translate-y-0.5 transition-transform"
            />
            Back to top
          </motion.button>
        </div>
      </div>
    </footer>
  );
}
