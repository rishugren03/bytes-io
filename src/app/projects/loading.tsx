import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

export default function ProjectsLoading() {
  return (
    <div className="md:px-20 px-8 space-y-12 pb-20">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-4">
          <Skeleton className="h-10 w-64 rounded-xl" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-96 rounded" />
            <Skeleton className="h-4 w-80 rounded" />
          </div>
        </div>
        <Skeleton className="h-10 w-40 rounded-lg" />
      </header>

      {/* Hall of Fame Skeleton */}
      <section className="space-y-6">
        <div className="flex items-center gap-3">
          <Skeleton className="h-6 w-6 rounded-full" />
          <Skeleton className="h-8 w-40 rounded" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="p-6 rounded-3xl border border-white/5 bg-white/[0.02] space-y-4">
              <Skeleton className="h-6 w-3/4 rounded" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-full rounded" />
                <Skeleton className="h-4 w-2/3 rounded" />
              </div>
              <Skeleton className="h-4 w-20 rounded" />
              <div className="pt-2 border-t border-white/5">
                <Skeleton className="h-3 w-24 rounded" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* All Projects Skeleton */}
      <section className="space-y-6">
        <Skeleton className="h-8 w-32 rounded" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="p-6 rounded-3xl border border-white/5 bg-white/[0.02] space-y-4">
              <div className="space-y-2">
                <Skeleton className="h-6 w-3/4 rounded" />
                <div className="space-y-1">
                  <Skeleton className="h-4 w-full rounded" />
                  <Skeleton className="h-4 w-5/6 rounded" />
                </div>
              </div>
              <div className="flex gap-2">
                <Skeleton className="h-5 w-12 rounded-full" />
                <Skeleton className="h-5 w-16 rounded-full" />
              </div>
              <Skeleton className="h-4 w-24 rounded" />
              <div className="flex items-center justify-between pt-2 border-t border-white/5">
                <Skeleton className="h-3 w-16 rounded" />
                <div className="flex gap-2">
                  <Skeleton className="h-4 w-4 rounded" />
                  <Skeleton className="h-4 w-4 rounded" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
