"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Quote } from "lucide-react";

const testimonials = [
  {
    name: "Arjun Mehta",
    role: "Full-Stack Developer",
    avatar: "AM",
    quote:
      "Bytes.io pushed me to ship my first open-source project. The leaderboard keeps me motivated every single week.",
    gradient: "from-primary to-cyan-300",
  },
  {
    name: "Priya Sharma",
    role: "ML Engineer",
    avatar: "PS",
    quote:
      "The mentorship program connected me with amazing engineers. I landed my dream internship thanks to this community.",
    gradient: "from-purple-400 to-pink-400",
  },
  {
    name: "Rahul Kapoor",
    role: "Frontend Developer",
    avatar: "RK",
    quote:
      "ByteHack changed my perspective on building products. The energy and collaboration here is unmatched.",
    gradient: "from-orange-400 to-yellow-400",
  },
];

// Ticker items - member avatars/names for the scrolling marquee
const tickerMembers = [
  "Alex", "Jordan", "Sanya", "Dev", "Mira", "Kiran", "Rohan", "Neha",
  "Vikram", "Ananya", "Aarav", "Ishaan", "Diya", "Kabir", "Riya",
  "Arjun", "Zara", "Vivaan", "Meera", "Samar", "Tara", "Reyansh",
  "Aisha", "Dhruv", "Nisha", "Harsh", "Pooja", "Sid", "Avni", "Yash",
];

export function CommunitySection() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.05 });

  return (
    <section ref={ref} className="relative py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute top-1/2 left-0 w-[600px] h-[400px] bg-primary/5 rounded-full blur-[150px] -translate-y-1/2" />

      <div className="relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 px-4"
        >
          <span className="inline-block px-4 py-1.5 rounded-full border border-primary/20 bg-primary/5 text-primary text-xs font-mono uppercase tracking-widest mb-6">
            Community
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-6xl font-bold text-white tracking-tight mb-6">
            Built by{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-400">
              builders
            </span>
          </h2>
          <p className="text-white/40 text-lg max-w-2xl mx-auto">
            Hear from members who&apos;ve leveled up their skills, shipped
            projects, and found their tribe.
          </p>
        </motion.div>

        {/* Scrolling Marquee - Row 1 */}
        <div className="relative mb-4">
          <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[#050505] to-transparent z-10" />
          <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-[#050505] to-transparent z-10" />
          <div className="flex gap-3 animate-marquee">
            {[...tickerMembers, ...tickerMembers].map((name, i) => (
              <div
                key={`${name}-${i}`}
                className="flex-shrink-0 flex items-center gap-2 px-4 py-2 rounded-full border border-white/[0.06] bg-white/[0.02]"
              >
                <div className="w-6 h-6 rounded-full bg-gradient-to-br from-primary/40 to-purple-500/40 flex items-center justify-center text-[10px] font-bold text-white">
                  {name[0]}
                </div>
                <span className="text-white/50 text-xs font-medium whitespace-nowrap">
                  {name}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Scrolling Marquee - Row 2 (reverse) */}
        <div className="relative mb-20">
          <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[#050505] to-transparent z-10" />
          <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-[#050505] to-transparent z-10" />
          <div className="flex gap-3 animate-marquee-reverse">
            {[...tickerMembers.slice(15), ...tickerMembers.slice(15)].map(
              (name, i) => (
                <div
                  key={`rev-${name}-${i}`}
                  className="flex-shrink-0 flex items-center gap-2 px-4 py-2 rounded-full border border-white/[0.06] bg-white/[0.02]"
                >
                  <div className="w-6 h-6 rounded-full bg-gradient-to-br from-orange-500/40 to-pink-500/40 flex items-center justify-center text-[10px] font-bold text-white">
                    {name[0]}
                  </div>
                  <span className="text-white/50 text-xs font-medium whitespace-nowrap">
                    {name}
                  </span>
                </div>
              )
            )}
          </div>
        </div>

        {/* Testimonial Cards */}
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 40, rotateY: -10 }}
              animate={inView ? { opacity: 1, y: 0, rotateY: 0 } : {}}
              transition={{
                delay: 0.3 + index * 0.15,
                duration: 0.7,
                ease: [0.16, 1, 0.3, 1],
              }}
              whileHover={{ y: -6 }}
              className="group relative p-8 rounded-3xl border border-white/[0.06] bg-white/[0.02] backdrop-blur-sm overflow-hidden"
            >
              {/* Top gradient line */}
              <div
                className={`absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r ${testimonial.gradient} opacity-40 group-hover:opacity-100 transition-opacity`}
              />

              <Quote
                size={20}
                className="text-white/10 mb-4"
              />
              <p className="text-white/60 text-sm leading-relaxed mb-6 italic">
                &ldquo;{testimonial.quote}&rdquo;
              </p>
              <div className="flex items-center gap-3">
                <div
                  className={`w-10 h-10 rounded-full bg-gradient-to-br ${testimonial.gradient} flex items-center justify-center text-sm font-bold text-white`}
                >
                  {testimonial.avatar}
                </div>
                <div>
                  <div className="text-white text-sm font-semibold">
                    {testimonial.name}
                  </div>
                  <div className="text-white/30 text-xs font-mono">
                    {testimonial.role}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
