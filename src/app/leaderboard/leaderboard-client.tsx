"use client";

import React from "react";
import { motion } from "framer-motion";
import { Trophy, Medal, ArrowUp, ArrowDown, Minus, Info } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface LeaderboardClientProps {
  users: any[];
  currentUser: any | null;
}

export function LeaderboardClient({ users, currentUser }: LeaderboardClientProps) {
  return (
    <div className="space-y-12 pb-20">
      <header className="space-y-4">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-2">
             <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] uppercase font-mono tracking-widest">
                Season 04 • Active Until March 30
             </div>
             <h1 className="text-4xl font-bold tracking-tight text-white font-mono">
                <span className="text-primary mr-2">{">"}</span>
                Global Leaderboard
             </h1>
             <p className="text-white/40 font-mono text-sm max-w-xl">
                Real-time ranking of Codewave engineers based on GitHub contributions, 
                LeetCode solves, and club contest performance.
             </p>
          </div>
          
          <div className="flex items-center gap-4 bg-white/5 border border-white/10 p-4 rounded-2xl backdrop-blur-sm">
             <div className="text-right">
                <div className="text-[10px] uppercase text-white/40 font-mono">Your Rank</div>
                <div className="text-xl font-bold text-white font-mono">
                   #{currentUser ? currentUser.rank.toString().padStart(2, '0') : '--'}
                </div>
             </div>
             <div className="w-[1px] h-8 bg-white/10" />
             <div>
                <div className="text-[10px] uppercase text-white/40 font-mono">Power Score</div>
                <div className="text-xl font-bold text-primary font-mono cursor-pointer hover:underline flex items-center gap-1">
                   {currentUser?.powerScore?.toLocaleString() || '0'} <Info size={12} className="text-white/20" />
                </div>
             </div>
          </div>
        </div>
      </header>

      <section className="rounded-3xl border border-white/5 bg-white/[0.02] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left font-mono">
             <thead>
                <tr className="border-b border-white/5 text-white/40 text-[10px] uppercase tracking-widest">
                   <th className="px-8 py-6 font-medium">Rank</th>
                   <th className="px-8 py-6 font-medium">Engineer</th>
                   <th className="px-8 py-6 font-medium">Power Score</th>
                   <th className="px-8 py-6 font-medium">Platform</th>
                   <th className="px-8 py-6 font-medium text-right">Status</th>
                </tr>
             </thead>
             <tbody className="divide-y divide-white/5">
                {users.map((user, index) => (
                   <motion.tr 
                      key={user.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className={cn(
                        "group hover:bg-white/[0.03] transition-colors",
                        user.id === currentUser?.id && "bg-primary/[0.03] border-l-2 border-l-primary"
                      )}
                   >
                      <td className="px-8 py-6">
                         <div className="flex items-center gap-3">
                            <span className={cn(
                               "text-lg font-bold",
                               user.rank === 1 ? "text-yellow-500" : 
                               user.rank === 2 ? "text-zinc-400" : 
                               user.rank === 3 ? "text-amber-700" : "text-white/40"
                            )}>
                               #{user.rank.toString().padStart(2, '0')}
                            </span>
                            {user.change === "up" && <ArrowUp size={14} className="text-green-500" />}
                            {user.change === "down" && <ArrowDown size={14} className="text-red-500" />}
                            {user.change === "minus" && <Minus size={14} className="text-white/20" />}
                         </div>
                      </td>
                       <td className="px-8 py-6 text-white group-hover:text-primary transition-colors">
                          <div className="flex items-center gap-3">
                             <div className="w-8 h-8 rounded-full border border-white/10 overflow-hidden bg-zinc-900">
                                <img 
                                  src={user.avatarUrl || `https://api.dicebear.com/9.x/adventurer/svg?seed=${user.username}`} 
                                  alt={user.fullName || user.username} 
                                  className="w-full h-full object-cover"
                                />
                             </div>
                             <div>
                               <div className="font-bold text-sm tracking-tight">{user.fullName || user.username}</div>
                               <div className="text-[10px] text-white/40">@{user.username}</div>
                            </div>
                         </div>
                      </td>
                      <td className="px-8 py-6 text-white font-bold">{user.powerScore?.toLocaleString() || 0}</td>
                      <td className="px-8 py-6">
                         <Badge variant="outline" className="bg-white/5 border-white/10 text-white/40 hover:text-white">
                            {user.leetcodeUsername ? 'LeetCode' : 'GitHub'}
                         </Badge>
                      </td>
                      <td className="px-8 py-6 text-right">
                         <div className="inline-flex items-center gap-2 px-2 py-1 rounded-md bg-green-500/10 text-green-500 text-[10px] font-bold">
                            Active
                         </div>
                      </td>
                   </motion.tr>
                ))}
             </tbody>
          </table>
        </div>
      </section>

      <div className="grid md:grid-cols-2 gap-6">
         <div className="p-8 rounded-3xl border border-white/5 bg-white/[0.02] space-y-4 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10">
               <Trophy size={80} />
            </div>
            <h3 className="text-xl font-bold text-white">Season 04 Rewards</h3>
            <p className="text-white/40 text-sm leading-relaxed">
               Top 10 engineers will receive exclusive "Core-Contributor" NFT badges and early access to the 2026 Summer Internship pipeline.
            </p>
            <Button variant="outline" className="border-white/10 text-white">View Reward Tiers</Button>
         </div>
         <div className="p-8 rounded-3xl border border-white/5 bg-white/[0.02] space-y-4 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10">
               <Medal size={80} />
            </div>
            <h3 className="text-xl font-bold text-white">How Score is Calculated?</h3>
            <p className="text-white/40 text-sm leading-relaxed">
               Our algorithm weights GitHub activity (40%), LeetCode/Codeforces solves (40%), and club-specific project contributions (20%).
            </p>
            <Button variant="outline" className="border-white/10 text-white">View Algorithm</Button>
         </div>
      </div>
    </div>
  );
}
