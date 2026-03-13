import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

export default function MembersLoading() {
  return (
    <div className="md:px-20 px-8 space-y-12">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-4">
          <Skeleton className="h-10 w-64 rounded-xl" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-96 rounded" />
            <Skeleton className="h-4 w-80 rounded" />
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Skeleton className="h-10 w-full md:w-80 rounded-lg" />
          <Skeleton className="h-10 w-10 rounded-lg" />
        </div>
      </header>

      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pb-20">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="p-6 rounded-3xl border border-white/5 bg-white/[0.02] space-y-6">
            <div className="flex items-center gap-4">
              <Skeleton className="h-16 w-16 rounded-2xl" />
              <div className="space-y-2">
                <Skeleton className="h-5 w-32 rounded" />
                <Skeleton className="h-4 w-20 rounded" />
              </div>
            </div>
            <div className="space-y-3">
              <Skeleton className="h-4 w-full rounded" />
              <Skeleton className="h-4 w-2/3 rounded" />
            </div>
            <div className="flex flex-wrap gap-2">
              <Skeleton className="h-6 w-16 rounded-full" />
              <Skeleton className="h-6 w-20 rounded-full" />
              <Skeleton className="h-6 w-14 rounded-full" />
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}
