import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

export default function PendingLoading() {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center px-8 text-center space-y-8">
      <Skeleton className="w-24 h-24 rounded-3xl" />
      
      <div className="space-y-4 w-full flex flex-col items-center">
        <Skeleton className="h-12 w-3/4 max-w-lg rounded-xl" />
        <div className="flex items-center justify-center gap-3">
          <Skeleton className="w-8 h-8 rounded-full" />
          <Skeleton className="h-4 w-32 rounded" />
        </div>
      </div>

      <div className="max-w-md w-full p-6 rounded-2xl border border-white/5 bg-white/[0.02] space-y-4">
        <div className="flex items-center gap-2">
          <Skeleton className="h-4 w-4 rounded-full" />
          <Skeleton className="h-3 w-32 rounded" />
        </div>
        <div className="space-y-2">
          <Skeleton className="h-4 w-full rounded" />
          <Skeleton className="h-4 w-full rounded" />
          <Skeleton className="h-4 w-2/3 rounded" />
        </div>
        <div className="pt-4 border-t border-white/5 flex items-center gap-2">
          <Skeleton className="h-3 w-24 rounded" />
          <div className="flex gap-1">
            <Skeleton className="h-1 w-1 rounded-full" />
            <Skeleton className="h-1 w-1 rounded-full" />
            <Skeleton className="h-1 w-1 rounded-full" />
          </div>
        </div>
      </div>

      <Skeleton className="h-10 w-32 rounded-lg" />
    </div>
  );
}
