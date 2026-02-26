"use client";

import React from "react";
import { motion } from "framer-motion";
import { Github, ExternalLink, Activity } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface MemberCardProps {
  id?: string;
  name: string;
  username: string;
  avatar: string;
  tags: string[];
  status: "Active" | "Away" | "Building";
  level: number;
}

export function MemberCard({ name, username, avatar, tags, status, level }: MemberCardProps) {
  // Use GitHub avatar directly if possible, or fallback to an anime-style DiceBear avatar
  const displayAvatar = avatar && !avatar.includes("pravatar.cc") 
    ? avatar 
    : `https://api.dicebear.com/9.x/adventurer/svg?seed=${username}`;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      whileHover={{ y: -5 }}
      className="group"
    >
      <Card className="relative overflow-hidden border-white/10 bg-black/40 backdrop-blur-xl hover:border-primary/20 transition-all duration-300">
        {/* Animated accent gradient */}
        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-primary/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        
        <CardContent className="p-6 space-y-4">
          <div className="flex items-start justify-between">
            <div className="relative">
              <div className="w-16 h-16 rounded-xl overflow-hidden border border-white/10 group-hover:border-primary/30 transition-colors bg-zinc-900">
                <img src={displayAvatar} alt={name} className="w-full h-full object-cover" />
              </div>
              <div className={cn(
                "absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-black",
                status === "Active" ? "bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]" : 
                status === "Building" ? "bg-primary animate-pulse shadow-[0_0_8px_rgba(0,209,255,0.6)]" : 
                "bg-zinc-500"
              )} />
            </div>
            
            <div className="text-right">
              <div className="text-[10px] uppercase tracking-widest text-white/40 font-mono">Power Lvl</div>
              <div className="text-xl font-bold text-white font-mono">{level}</div>
            </div>
          </div>

          <div className="space-y-1">
            <h3 className="text-lg font-bold text-white truncate">{name}</h3>
            <div className="flex items-center gap-1 text-white/40 text-xs font-mono">
              <Github size={12} />
              @{username}
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            {tags.slice(0, 3).map((tag) => (
              <Badge 
                key={tag} 
                variant="outline" 
                className="bg-white/5 border-white/10 text-white/60 text-[10px] py-0 font-medium hover:bg-white/10"
              >
                {tag}
              </Badge>
            ))}
          </div>

          <div className="pt-2">
            <Button 
              size="sm" 
              variant="outline" 
              className="w-full bg-white/5 border-white/10 hover:bg-white/10 hover:text-white transition-all group/btn"
              asChild
            >
              <a href={`/profile/${username}`}>
                View Operator Profile
              </a>
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
