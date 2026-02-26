"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Calendar, Users, Trophy, Rocket, Timer, MapPin, Zap, ArrowRight, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const ACTIVE_HACKATHON = {
  title: "WaveHack v2.0",
  date: "March 15-17, 2026",
  location: "Innovation Lab @ Building 4",
  status: "Registrations Open",
  prizePool: "$5,000 + Internship Track",
  participants: 120,
  teams: 32,
};

const TEAMS = [
  { id: 1, name: "Null Pointers", members: 3, capacity: 4, stack: ["Rust", "Wasm"], lookingFor: "Frontend Developer" },
  { id: 2, name: "Binary Bards", members: 4, capacity: 4, stack: ["React", "Python"], lookingFor: null },
  { id: 3, name: "Edge Runners", members: 2, capacity: 4, stack: ["Next.js", "Solana"], lookingFor: "Solidity Engineer" },
  { id: 4, name: "SysAdmins", members: 1, capacity: 4, stack: ["Go", "Linux"], lookingFor: "DevOps Enthusiast" },
];

export default function HackathonsPage() {
  return (
    <div className="space-y-12 pb-20">
      <header className="space-y-2">
        <h1 className="text-4xl font-bold tracking-tight text-white font-mono">
           <span className="text-primary mr-2">{">"}</span>
           Hackathon Portal
        </h1>
        <p className="text-white/40 font-mono text-sm max-w-2xl">
           The engine for club events. Form teams, submit artifacts, and 
           climb the ranks in our official club-organized contests.
        </p>
      </header>

      {/* Hero Event Card */}
      <section className="relative rounded-3xl border border-primary/20 bg-primary/[0.02] p-8 md:p-12 overflow-hidden">
         <div className="absolute top-0 right-0 p-12 opacity-5 scale-150 rotate-12">
            <Rocket size={200} />
         </div>
         
         <div className="relative z-10 flex flex-col md:flex-row gap-12 justify-between">
            <div className="space-y-6 max-w-lg">
               <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/20 text-primary text-[10px] uppercase font-mono tracking-widest animate-pulse">
                  {ACTIVE_HACKATHON.status}
               </div>
               <h2 className="text-5xl font-bold text-white tracking-tighter">{ACTIVE_HACKATHON.title}</h2>
               
               <div className="grid grid-cols-2 gap-6 text-sm font-mono">
                  <div className="space-y-1">
                     <span className="text-white/40 uppercase text-[10px] tracking-widest">Date</span>
                     <div className="text-white flex items-center gap-2"><Calendar size={14} className="text-primary" />{ACTIVE_HACKATHON.date}</div>
                  </div>
                  <div className="space-y-1">
                     <span className="text-white/40 uppercase text-[10px] tracking-widest">Location</span>
                     <div className="text-white flex items-center gap-2"><MapPin size={14} className="text-primary" />{ACTIVE_HACKATHON.location}</div>
                  </div>
                  <div className="space-y-1">
                     <span className="text-white/40 uppercase text-[10px] tracking-widest">Prize Pool</span>
                     <div className="text-primary font-bold">{ACTIVE_HACKATHON.prizePool}</div>
                  </div>
                  <div className="space-y-1">
                     <span className="text-white/40 uppercase text-[10px] tracking-widest">Stats</span>
                     <div className="text-white">{ACTIVE_HACKATHON.participants} Participants • {ACTIVE_HACKATHON.teams} Teams</div>
                  </div>
               </div>
               
               <div className="flex gap-4 pt-4">
                  <Button className="bg-primary text-black font-bold h-12 px-8">Register Now</Button>
                  <Button variant="outline" className="border-white/10 text-white h-12">Event Details</Button>
               </div>
            </div>
            
            <div className="flex-1 max-w-sm space-y-4">
               <div className="p-6 rounded-2xl border border-white/5 bg-white/[0.02] space-y-4">
                  <div className="flex items-center justify-between">
                     <span className="text-xs font-mono text-white/40 uppercase tracking-widest">Time Remaining</span>
                     <Timer size={14} className="text-primary" />
                  </div>
                  <div className="flex justify-between items-center text-center">
                     <div><div className="text-2xl font-bold text-white">21</div><div className="text-[10px] text-white/20 uppercase">Days</div></div>
                     <div className="text-white/10 text-xl">:</div>
                     <div><div className="text-2xl font-bold text-white">12</div><div className="text-[10px] text-white/20 uppercase">Hrs</div></div>
                     <div className="text-white/10 text-xl">:</div>
                     <div><div className="text-2xl font-bold text-white">45</div><div className="text-[10px] text-white/20 uppercase">Mins</div></div>
                  </div>
               </div>
               <div className="p-6 rounded-2xl border border-white/5 bg-primary/5 space-y-2">
                  <h4 className="text-sm font-bold text-white">Hackathon Masterclass</h4>
                  <p className="text-[10px] text-white/40 leading-relaxed font-mono">Join the prep session tomorrow at 6PM to learn about the WebGPU track.</p>
                  <Button variant="link" className="text-primary p-0 h-auto text-[10px] flex items-center gap-1">Add to Calendar <ArrowRight size={10}/></Button>
               </div>
            </div>
         </div>
      </section>

      {/* Team Formation Section */}
      <section className="space-y-6">
         <div className="flex items-center justify-between">
            <h3 className="text-2xl font-bold text-white flex items-center gap-2">
               <Users className="text-primary" size={24} />
               Team Formation
            </h3>
            <Button variant="outline" size="sm" className="border-white/10 text-white flex items-center gap-2">
               <Plus size={14} /> Create Team
            </Button>
         </div>
         
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {TEAMS.map((team) => (
               <div key={team.id} className="p-6 rounded-2xl border border-white/5 bg-white/[0.02] hover:border-primary/20 transition-all space-y-4 group">
                  <div className="space-y-1">
                     <h4 className="text-white font-bold group-hover:text-primary transition-colors">{team.name}</h4>
                     <div className="text-[10px] text-white/40 font-mono">{team.members}/{team.capacity} Members</div>
                  </div>
                  
                  <div className="flex flex-wrap gap-1.5">
                     {team.stack.map(s => (
                        <Badge key={s} variant="outline" className="text-[9px] border-white/5 bg-white/5 text-white/40">{s}</Badge>
                     ))}
                  </div>
                  
                  {team.lookingFor ? (
                     <div className="space-y-2">
                        <div className="text-[10px] text-primary/40 uppercase tracking-widest font-mono">Recruiting</div>
                        <div className="text-xs text-primary font-medium flex items-center gap-1">
                           <Zap size={10} /> {team.lookingFor}
                        </div>
                        <Button size="sm" className="w-full text-[10px] h-8 bg-primary/10 text-primary hover:bg-primary hover:text-black">Request Join</Button>
                     </div>
                  ) : (
                     <div className="space-y-2 pt-2">
                        <div className="text-[10px] text-white/20 uppercase tracking-widest font-mono">Status</div>
                        <div className="text-xs text-white/40">Team Full</div>
                     </div>
                  )}
               </div>
            ))}
         </div>
      </section>
    </div>
  );
}
