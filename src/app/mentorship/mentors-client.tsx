"use client";

import React from "react";
import { motion } from "framer-motion";
import { ShieldCheck, Github, Code2, Terminal, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

interface MentorsClientProps {
  mentors: any[];
}

export function MentorsClient({ mentors }: MentorsClientProps) {
  return (
    <div className="md:px-20 px-8 space-y-12 pb-20">
      <header className="space-y-2">
        <h1 className="text-4xl font-bold tracking-tight text-white font-mono">
          <span className="text-primary mr-2">{">"}</span>
          Mentors
        </h1>
        <p className="text-white/40 font-mono text-sm max-w-xl">
          Connect with Bytes.io admins and mentors. These are the people 
          helping shape the next generation of Bytes.io talent.
        </p>
      </header>

      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mentors.map((mentor: any, index: number) => (
          <motion.div
            key={mentor.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="p-8 rounded-3xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.04] hover:border-primary/20 transition-all group relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
              <ShieldCheck size={48} />
            </div>

            <div className="relative z-10 space-y-4">
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center overflow-hidden flex-shrink-0">
                  {mentor.avatarUrl ? (
                    <img src={mentor.avatarUrl} alt={mentor.fullName || ""} className="w-full h-full object-cover rounded-2xl" />
                  ) : (
                    <Users size={24} className="text-primary" />
                  )}
                </div>
                <div className="min-w-0">
                  <h3 className="text-lg font-bold text-white group-hover:text-primary transition-colors truncate">
                    {mentor.fullName || mentor.username || "Admin"}
                  </h3>
                  <p className="text-white/40 font-mono text-xs">@{mentor.username || "admin"}</p>
                </div>
              </div>

              <Badge className="text-[10px] uppercase tracking-widest border border-primary/20 bg-primary/10 text-primary">
                <ShieldCheck size={10} className="mr-1" /> Admin
              </Badge>

              {mentor.bio && (
                <p className="text-white/40 text-sm leading-relaxed line-clamp-3">{mentor.bio}</p>
              )}

              {mentor.techStack && mentor.techStack.length > 0 && (
                <div className="flex flex-wrap gap-1.5">
                  {mentor.techStack.slice(0, 5).map((skill: string) => (
                    <span key={skill} className="text-[10px] px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-white/50 font-mono">
                      {skill}
                    </span>
                  ))}
                </div>
              )}

              <div className="pt-4 border-t border-white/5 flex gap-3">
                {mentor.username && (
                  <Link href={`/profile/${mentor.username}`} className="text-xs text-primary/70 font-mono hover:text-primary transition-colors flex items-center gap-1">
                    <Code2 size={12} /> Profile
                  </Link>
                )}
                {mentor.githubUsername && (
                  <a href={`https://github.com/${mentor.githubUsername}`} target="_blank" rel="noopener noreferrer" className="text-xs text-white/30 font-mono hover:text-white transition-colors flex items-center gap-1">
                    <Github size={12} /> GitHub
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        ))}

        {mentors.length === 0 && (
          <div className="col-span-full py-20 text-center border border-dashed border-white/5 rounded-3xl bg-white/[0.01]">
            <Terminal className="mx-auto text-white/10 mb-4" size={40} />
            <p className="text-white/40 font-mono">No mentors available yet.</p>
            <p className="text-white/20 font-mono text-xs mt-2">Admins will appear here as mentors.</p>
          </div>
        )}
      </section>
    </div>
  );
}
