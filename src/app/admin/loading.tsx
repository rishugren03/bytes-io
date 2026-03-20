import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

export default function AdminLoading() {
  return (
    <div className="max-w-4xl mx-auto px-4 md:px-8 py-20">
      {/* Header Skeleton */}
      <div className="mb-12">
        <div className="flex items-center gap-3 mb-4">
          <Skeleton className="w-10 h-10 rounded-2xl" />
          <Skeleton className="h-3 w-24 rounded" />
        </div>
        <div className="space-y-4">
          <Skeleton className="h-12 w-3/4 rounded-xl" />
          <Skeleton className="h-4 w-1/2 rounded" />
        </div>
      </div>

      {/* Stats Skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="p-5 rounded-2xl border border-white/5 bg-white/[0.02] space-y-3">
            <div className="flex items-center gap-2">
              <Skeleton className="h-3 w-3 rounded-full" />
              <Skeleton className="h-3 w-16 rounded" />
            </div>
            <Skeleton className="h-8 w-12 rounded" />
          </div>
        ))}
      </div>

      {/* List Skeleton */}
      <div className="space-y-4">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="p-6 rounded-2xl border border-white/5 bg-white/[0.02] flex items-center gap-4 flex-wrap">
            <Skeleton className="w-12 h-12 rounded-2xl flex-shrink-0" />
            <div className="flex-1 space-y-3 min-w-0">
              <div className="flex items-center gap-2">
                <Skeleton className="h-5 w-32 rounded" />
                <Skeleton className="h-4 w-16 rounded-full" />
              </div>
              <div className="flex gap-3">
                <Skeleton className="h-3 w-20 rounded" />
                <Skeleton className="h-3 w-24 rounded" />
              </div>
              <div className="flex gap-1">
                <Skeleton className="h-4 w-12 rounded" />
                <Skeleton className="h-4 w-16 rounded" />
              </div>
            </div>
            <div className="flex gap-2">
              <Skeleton className="h-9 w-24 rounded-xl" />
              <Skeleton className="h-9 w-24 rounded-xl" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
