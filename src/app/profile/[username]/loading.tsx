import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

export default function ProfileLoading() {
  return (
    <main className="md:px-20 px-8 min-h-screen pt-32 pb-20 px-4 md:px-8 max-w-7xl mx-auto space-y-12">
      {/* Profile Header Skeleton */}
      <section className="relative overflow-hidden p-8 md:p-12 rounded-[2.5rem] border border-white/5 bg-white/[0.02]">
        <div className="flex flex-col md:flex-row gap-8 items-center md:items-start text-center md:text-left">
          <Skeleton className="w-32 h-32 md:w-40 md:h-40 rounded-3xl" />

          <div className="flex-1 space-y-6">
            <div className="space-y-4">
              <Skeleton className="h-12 w-64 rounded-xl mx-auto md:mx-0" />
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-4">
                <Skeleton className="h-6 w-32 rounded-full" />
                <Skeleton className="h-6 w-40 rounded-full" />
              </div>
            </div>

            <div className="space-y-2">
              <Skeleton className="h-4 w-full max-w-2xl rounded mx-auto md:mx-0" />
              <Skeleton className="h-4 w-2/3 max-w-xl rounded mx-auto md:mx-0" />
            </div>

            <div className="flex flex-wrap justify-center md:justify-start gap-2">
              <Skeleton className="h-6 w-16 rounded-full" />
              <Skeleton className="h-6 w-20 rounded-full" />
              <Skeleton className="h-6 w-14 rounded-full" />
            </div>
          </div>

          <div className="flex flex-col gap-3 min-w-[160px]">
            <Skeleton className="h-24 w-full rounded-3xl" />
            <Skeleton className="h-10 w-full rounded-lg" />
            <Skeleton className="h-10 w-full rounded-lg" />
          </div>
        </div>
      </section>

      {/* Grid Content Skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Stats Skeleton */}
        <div className="space-y-8">
          <div className="p-6 rounded-3xl border border-white/5 bg-white/[0.02] space-y-6">
            <Skeleton className="h-4 w-20 rounded" />
            <div className="space-y-4">
              {[...Array(3)].map((_, i) => (
                <Skeleton key={i} className="h-12 w-full rounded-2xl" />
              ))}
            </div>
          </div>
        </div>

        {/* Projects Showcase Skeleton */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <Skeleton className="h-8 w-32 rounded" />
            <Skeleton className="h-6 w-20 rounded-full" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="p-6 rounded-3xl border border-white/5 bg-white/[0.02] space-y-4">
                <div className="flex justify-between">
                  <Skeleton className="h-10 w-10 rounded-2xl" />
                  <div className="flex gap-2">
                    <Skeleton className="h-8 w-8 rounded-xl" />
                    <Skeleton className="h-8 w-8 rounded-xl" />
                  </div>
                </div>
                <Skeleton className="h-6 w-3/4 rounded" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-full rounded" />
                  <Skeleton className="h-4 w-2/3 rounded" />
                </div>
                <div className="flex gap-2">
                  <Skeleton className="h-4 w-12 rounded" />
                  <Skeleton className="h-4 w-16 rounded" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
