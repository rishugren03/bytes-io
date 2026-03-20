import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

export default function RootLoading() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[90vh] text-center space-y-8 px-6">
      {/* Hero Section Skeleton */}
      <Skeleton className="h-8 w-40 rounded-full" />
      
      <div className="space-y-4 w-full max-w-4xl flex flex-col items-center">
        <Skeleton className="h-16 sm:h-24 md:h-32 w-3/4 rounded-xl" />
        <Skeleton className="h-16 sm:h-24 md:h-32 w-1/2 rounded-xl" />
      </div>

      <div className="space-y-2 w-full max-w-2xl flex flex-col items-center">
        <Skeleton className="h-4 w-full rounded" />
        <Skeleton className="h-4 w-5/6 rounded" />
      </div>

      <Skeleton className="h-6 w-64 rounded bg-white/[0.02]" />

      <div className="flex flex-col sm:flex-row gap-4 pt-4">
        <Skeleton className="h-14 w-48 rounded-full" />
        <Skeleton className="h-14 w-48 rounded-full" />
      </div>

      {/* Subsequent Sections Hint */}
      <div className="mt-20 w-full max-w-7xl px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="space-y-4">
            <Skeleton className="h-48 w-full rounded-2xl" />
            <Skeleton className="h-6 w-3/4 rounded" />
            <Skeleton className="h-4 w-full rounded" />
          </div>
        ))}
      </div>
    </div>
  );
}
