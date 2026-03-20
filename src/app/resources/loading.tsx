import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

export default function ResourcesLoading() {
  return (
    <div className="md:px-20 px-8 space-y-12 pb-20">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-4">
          <Skeleton className="h-10 w-64 rounded-xl" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-full max-w-xl rounded" />
            <Skeleton className="h-4 w-5/6 max-w-lg rounded" />
          </div>
        </div>
        <Skeleton className="h-10 w-40 rounded-lg" />
      </header>

      {/* Filters Skeleton */}
      <div className="flex flex-col sm:flex-row gap-4">
        <Skeleton className="h-10 flex-1 rounded-lg" />
        <div className="flex gap-2 overflow-x-hidden">
          {[...Array(6)].map((_, i) => (
            <Skeleton key={i} className="h-8 w-16 rounded-full flex-shrink-0" />
          ))}
        </div>
      </div>

      {/* Resource List Skeleton */}
      <section className="space-y-4">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="flex items-start gap-4 p-6 rounded-2xl border border-white/5 bg-white/[0.02]">
            <Skeleton className="h-10 w-10 rounded-xl mt-0.5" />
            <div className="flex-1 space-y-2">
              <div className="flex items-start justify-between">
                <Skeleton className="h-5 w-1/3 rounded" />
                <Skeleton className="h-4 w-4 rounded" />
              </div>
              <div className="space-y-1">
                <Skeleton className="h-4 w-full rounded" />
                <Skeleton className="h-4 w-2/3 rounded" />
              </div>
              <div className="flex items-center gap-3 pt-1">
                <Skeleton className="h-4 w-16 rounded-full" />
                <Skeleton className="h-4 w-24 rounded" />
                <Skeleton className="h-4 w-20 rounded" />
              </div>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}
