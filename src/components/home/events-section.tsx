"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Calendar, MapPin, ArrowRight, Clock } from "lucide-react";
import Link from "next/link";

const events = [
  {
    title: "ByteHack 2026",
    date: "Mar 15-16",
    time: "48 Hours",
    location: "Virtual + Campus",
    description:
      "Our flagship hackathon. Build anything, ship fast, win big. Open to all skill levels.",
    tag: "Hackathon",
    tagColor: "bg-purple-500/20 text-purple-300 border-purple-500/30",
    featured: true,
  },
  {
    title: "System Design Workshop",
    date: "Mar 22",
    time: "3 Hours",
    location: "Online",
    description:
      "Learn scalable architecture patterns from senior engineers at top tech companies.",
    tag: "Workshop",
    tagColor: "bg-blue-500/20 text-blue-300 border-blue-500/30",
    featured: false,
  },
  {
    title: "Open Source Sprint",
    date: "Apr 1-7",
    time: "1 Week",
    location: "GitHub",
    description:
      "Contribute to popular open source projects. Mentors available to guide pull requests.",
    tag: "Sprint",
    tagColor: "bg-green-500/20 text-green-300 border-green-500/30",
    featured: false,
  },
  {
    title: "Demo Day",
    date: "Apr 15",
    time: "2 Hours",
    location: "Campus Auditorium",
    description:
      "Present your projects to the community. Get feedback, make connections, celebrate your work.",
    tag: "Showcase",
    tagColor: "bg-orange-500/20 text-orange-300 border-orange-500/30",
    featured: false,
  },
];

export function EventsSection() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section ref={ref} className="relative py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute top-1/3 right-0 w-[500px] h-[500px] bg-purple-500/5 rounded-full blur-[150px]" />

      <div className="relative z-10 max-w-7xl mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <span className="inline-block px-4 py-1.5 rounded-full border border-purple-500/20 bg-purple-500/5 text-purple-300 text-xs font-mono uppercase tracking-widest mb-6">
            Events
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-6xl font-bold text-white tracking-tight mb-6">
            What&apos;s{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
              happening
            </span>
          </h2>
          <p className="text-white/40 text-lg max-w-2xl mx-auto">
            From hackathons to workshops, there&apos;s always something to
            build, learn, and collaborate on.
          </p>
        </motion.div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {events.map((event, index) => (
            <motion.div
              key={event.title}
              initial={{ opacity: 0, x: index % 2 === 0 ? -40 : 40 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{
                delay: index * 0.15,
                duration: 0.7,
                ease: [0.16, 1, 0.3, 1],
              }}
              whileHover={{ y: -4 }}
              className={`group relative p-8 rounded-3xl border border-white/[0.06] bg-white/[0.02] backdrop-blur-sm overflow-hidden transition-all duration-300 hover:border-white/10 hover:bg-white/[0.04] ${
                event.featured ? "lg:col-span-2" : ""
              }`}
            >
              {/* Featured event gradient bar */}
              {event.featured && (
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-primary" />
              )}

              <div className="relative z-10 flex flex-col md:flex-row md:items-center gap-6">
                {/* Date block */}
                <div className="flex-shrink-0 w-20 h-20 rounded-2xl bg-white/[0.04] border border-white/[0.06] flex flex-col items-center justify-center">
                  <span className="text-primary text-xs font-mono uppercase tracking-wider">
                    {event.date.split(" ")[0]}
                  </span>
                  <span className="text-white text-lg font-bold">
                    {event.date.split(" ")[1] || event.date.split("-")[0]}
                  </span>
                </div>

                {/* Content */}
                <div className="flex-1 space-y-3">
                  <div className="flex items-center gap-3 flex-wrap">
                    <h3 className="text-xl font-bold text-white">
                      {event.title}
                    </h3>
                    <span
                      className={`px-3 py-0.5 rounded-full text-[10px] font-mono uppercase tracking-widest border ${event.tagColor}`}
                    >
                      {event.tag}
                    </span>
                  </div>
                  <p className="text-white/40 text-sm leading-relaxed">
                    {event.description}
                  </p>
                  <div className="flex items-center gap-4 text-white/30 text-xs font-mono">
                    <span className="flex items-center gap-1">
                      <Clock size={12} /> {event.time}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin size={12} /> {event.location}
                    </span>
                  </div>
                </div>

                {/* Arrow */}
                <ArrowRight
                  size={20}
                  className="text-white/20 group-hover:text-primary group-hover:translate-x-1 transition-all flex-shrink-0"
                />
              </div>
            </motion.div>
          ))}
        </div>

        {/* View all link */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8 }}
          className="text-center mt-12"
        >
          <Link
            href="/hackathons"
            className="inline-flex items-center gap-2 text-primary text-sm font-medium hover:gap-3 transition-all"
          >
            View all events <ArrowRight size={16} />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
