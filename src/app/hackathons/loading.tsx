import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

export default function HackathonsLoading() {
  return (
    <div className="md:px-20 px-8 space-y-12 pb-20">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-4">
          <Skeleton className="h-10 w-64 rounded-xl" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-full max-w-2xl rounded" />
            <Skeleton className="h-4 w-5/6 max-w-xl rounded" />
          </div>
        </div>
        <Skeleton className="h-10 w-40 rounded-lg" />
      </header>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="p-8 rounded-3xl border border-white/5 bg-white/[0.02] space-y-6">
            <div className="flex items-start justify-between">
              <Skeleton className="h-6 w-20 rounded-full" />
              <Skeleton className="h-6 w-24 rounded-full" />
            </div>

            <Skeleton className="h-8 w-3/4 rounded" />
            
            <div className="space-y-2">
              <Skeleton className="h-4 w-full rounded" />
              <Skeleton className="h-4 w-2/3 rounded" />
            </div>

            <div className="grid grid-cols-2 gap-4 pt-2">
              {[...Array(4)].map((_, j) => (
                <div key={j} className="space-y-2">
                  <Skeleton className="h-3 w-12 rounded" />
                  <Skeleton className="h-5 w-24 rounded" />
                </div>
              ))}
            </div>

            <div className="border-t border-white/5 pt-4 mt-4">
              <Skeleton className="h-3 w-32 rounded" />
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}
