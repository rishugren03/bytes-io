"use client";

import React from "react";
import { motion } from "framer-motion";
import { Github, ExternalLink, GitBranch, AlertCircle, MessageSquare } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface ProjectCardProps {
  title: string;
  description: string;
  repoUrl: string;
  demoUrl?: string;
  tags: string[];
  stars: number;
  lastUpdated: string;
  openIssues: number;
}

export function ProjectCard({ title, description, repoUrl, demoUrl, tags, stars, lastUpdated, openIssues }: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      whileHover={{ y: -4 }}
      className="group"
    >
      <Card className="relative overflow-hidden border-white/5 bg-white/[0.02] backdrop-blur-md hover:bg-white/[0.04] hover:border-primary/20 transition-all duration-300">
        <CardContent className="p-6 space-y-4">
          <div className="flex items-start justify-between">
            <div className="space-y-1">
              <h3 className="text-xl font-bold text-white group-hover:text-primary transition-colors flex items-center gap-2">
                <GitBranch size={18} className="text-primary/60" />
                {title}
              </h3>
              <p className="text-white/40 text-sm line-clamp-2 leading-relaxed">
                {description}
              </p>
            </div>
            {demoUrl && (
              <Button size="icon" variant="ghost" className="rounded-full hover:bg-primary/20 hover:text-primary h-8 w-8" asChild>
                <a href={demoUrl} target="_blank" rel="noopener noreferrer">
                  <ExternalLink size={16} />
                </a>
              </Button>
            )}
          </div>

          <div className="flex flex-wrap gap-2">
            {tags.map(tag => (
              <Badge key={tag} variant="secondary" className="bg-white/5 border-white/5 text-white/50 text-[10px] font-mono px-2">
                {tag}
              </Badge>
            ))}
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-white/5">
            <div className="flex items-center gap-4 text-xs font-mono text-white/30">
              <div className="flex items-center gap-1.5 hover:text-white/60 transition-colors">
                <Github size={14} />
                {stars}
              </div>
              <div className="flex items-center gap-1.5 hover:text-white/60 transition-colors">
                <AlertCircle size={14} />
                {openIssues} Issues
              </div>
              <div>{lastUpdated}</div>
            </div>
            
            <div className="flex gap-2">
              <Button size="sm" variant="outline" className="h-8 text-xs bg-white/5 border-white/10 hover:bg-primary/10 hover:text-primary transition-colors" asChild>
                <a href={`${repoUrl}/issues`} target="_blank" rel="noopener noreferrer">
                  Contribute
                </a>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
