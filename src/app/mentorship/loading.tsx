import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

export default function MentorshipLoading() {
  return (
    <div className="md:px-20 px-8 space-y-12 pb-20">
      <header className="space-y-4">
        <Skeleton className="h-10 w-48 rounded-xl" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-full max-w-xl rounded" />
          <Skeleton className="h-4 w-5/6 max-w-lg rounded" />
        </div>
      </header>

      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="p-8 rounded-3xl border border-white/5 bg-white/[0.02] space-y-6">
            <div className="flex items-start gap-4">
              <Skeleton className="h-14 w-14 rounded-2xl" />
              <div className="space-y-2">
                <Skeleton className="h-5 w-32 rounded" />
                <Skeleton className="h-4 w-24 rounded" />
              </div>
            </div>

            <Skeleton className="h-6 w-16 rounded-full" />

            <div className="space-y-2">
              <Skeleton className="h-4 w-full rounded" />
              <Skeleton className="h-4 w-2/3 rounded" />
            </div>

            <div className="flex flex-wrap gap-1.5 pt-2">
              <Skeleton className="h-5 w-12 rounded-full" />
              <Skeleton className="h-5 w-16 rounded-full" />
              <Skeleton className="h-5 w-14 rounded-full" />
            </div>

            <div className="pt-4 border-t border-white/5 flex gap-4">
              <Skeleton className="h-3 w-16 rounded" />
              <Skeleton className="h-3 w-16 rounded" />
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}
