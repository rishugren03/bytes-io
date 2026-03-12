"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { AlertCircle, RefreshCcw } from "lucide-react";

export default function LeaderboardError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-8 text-center space-y-6">
      <div className="bg-red-500/10 p-4 rounded-full border border-red-500/20 text-red-500">
        <AlertCircle size={40} />
      </div>
      <div className="space-y-2">
        <h2 className="text-2xl font-bold text-white font-mono tracking-tight">System Interrupt</h2>
        <p className="text-white/40 font-mono text-sm max-w-md">
          The database connection timed out while fetching the leaderboard. 
          This usually happens during peak high-concurrency periods.
        </p>
      </div>
      <Button 
        onClick={() => reset()}
        className="bg-primary text-black font-bold h-12 px-8 rounded-xl flex items-center gap-2"
      >
        <RefreshCcw size={18} /> Reconnect System
      </Button>
    </div>
  );
}
