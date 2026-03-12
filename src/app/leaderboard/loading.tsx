import React from "react";

export default function LeaderboardLoading() {
  return (
    <div className="md:px-20 px-8 py-12 space-y-12 animate-pulse">
      <div className="space-y-4">
        <div className="h-4 w-32 bg-white/5 rounded-full" />
        <div className="h-10 w-64 bg-white/5 rounded-xl" />
        <div className="h-4 w-96 bg-white/5 rounded-lg" />
      </div>
      
      <div className="rounded-3xl border border-white/5 bg-white/[0.02] overflow-hidden">
        <div className="p-8 space-y-6">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="flex items-center justify-between py-4 border-b border-white/5 last:border-0">
              <div className="flex items-center gap-4">
                <div className="h-6 w-8 bg-white/5 rounded" />
                <div className="h-10 w-10 bg-white/5 rounded-full" />
                <div className="space-y-2">
                  <div className="h-4 w-32 bg-white/5 rounded" />
                  <div className="h-3 w-20 bg-white/5 rounded" />
                </div>
              </div>
              <div className="h-6 w-20 bg-white/5 rounded" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
