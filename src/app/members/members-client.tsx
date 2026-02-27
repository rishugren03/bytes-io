"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Search, Filter, Terminal } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { MemberCard } from "@/components/member-card";

interface MembersClientProps {
  initialMembers: any[];
}

export function MembersClient({ initialMembers }: MembersClientProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredMembers = initialMembers.filter(member => 
    (member.fullName?.toLowerCase().includes(searchQuery.toLowerCase()) || "") ||
    (member.username?.toLowerCase().includes(searchQuery.toLowerCase()) || "") ||
    (member.techStack?.some((tag: string) => tag.toLowerCase().includes(searchQuery.toLowerCase())) || false)
  );

  return (
    <div className="md:px-20 px-8 space-y-12">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-2">
          <h1 className="text-4xl font-bold tracking-tight text-white font-mono">
             <span className="text-primary mr-2">{">"}</span>
             Member Registry
          </h1>
          <p className="text-white/40 font-mono text-sm max-w-xl">
             The directory of all Bytes.io engineers. Powered by GitHub 
              contributions and power scores.
          </p>
        </div>
        
        <div className="flex items-center gap-2">
           <div className="relative group flex-1 md:w-80">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-primary transition-colors" size={18} />
              <Input 
                placeholder="Search by name, handle, or stack..." 
                className="pl-10 bg-white/5 border-white/10 focus-visible:ring-primary/50 text-white"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
           </div>
           <Button variant="outline" size="icon" className="border-white/10 bg-white/5 text-white/60">
              <Filter size={18} />
           </Button>
        </div>
      </header>

      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pb-20">
        {filteredMembers.map((member, index) => (
          <motion.div
            key={member.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
          >
            <MemberCard 
              id={member.id}
              name={member.fullName || member.username || "Unknown Engineer"}
              username={member.username || "unnamed"}
              avatar={member.avatarUrl || `https://i.pravatar.cc/150?u=${member.id}`}
              status="Active"
              tags={member.techStack || []}
              level={Math.floor((member.powerScore || 0) / 100)}
            />
          </motion.div>
        ))}
        
        {filteredMembers.length === 0 && (
          <div className="col-span-full py-20 text-center border border-dashed border-white/5 rounded-3xl bg-white/[0.01]">
            <Terminal className="mx-auto text-white/10 mb-4" size={40} />
            <p className="text-white/40 font-mono">No matching engineers found in current sector.</p>
          </div>
        )}
      </section>
    </div>
  );
}
