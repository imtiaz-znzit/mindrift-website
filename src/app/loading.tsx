import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div
      aria-label="Loading page content"
      className="fixed inset-0 z-[100] overflow-y-auto bg-[var(--background)] flex flex-col"
    >
      {/* ================= SKELETON NAVBAR (COVERS REAL NAVBAR) ================= */}
      <div className="w-full border-b border-slate-200/70 dark:border-slate-800/70 bg-[var(--background)] sticky top-0 z-20 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          {/* Logo Skeleton */}
          <div className="flex items-center gap-3">
            <Skeleton className="h-9 w-36 rounded-xl" />
          </div>

          {/* Navigation Links Skeleton */}
          <div className="hidden lg:flex items-center gap-6 xl:gap-8">
            <Skeleton className="h-4 w-16 rounded-md" />
            <Skeleton className="h-4 w-20 rounded-md" />
            <Skeleton className="h-4 w-16 rounded-md" />
            <Skeleton className="h-4 w-24 rounded-md" />
            <Skeleton className="h-4 w-14 rounded-md" />
          </div>

          {/* Right Controls Skeleton (Theme Toggle & CTA) */}
          <div className="flex items-center gap-3">
            <Skeleton className="h-9 w-9 rounded-xl" />
            <Skeleton className="h-10 w-32 rounded-xl hidden sm:block" />
            {/* Mobile Hamburger Skeleton */}
            <Skeleton className="h-9 w-9 rounded-xl lg:hidden" />
          </div>
        </div>
      </div>

      {/* ================= MAIN SKELETON BODY ================= */}
      <div className="flex-1 relative overflow-hidden py-10 sm:py-16">
        {/* Ambient Cyber Light Glows */}
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[300px] bg-blue-600/10 dark:bg-blue-600/12 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[300px] bg-emerald-500/10 dark:bg-emerald-500/10 rounded-full blur-[140px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 sm:space-y-20 relative z-10">
          {/* ================= HERO SKELETON ================= */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center pt-2 sm:pt-6">
            {/* Left Column: Heading, Subtitle & Buttons */}
            <div className="lg:col-span-7 space-y-6">
              {/* Pill Tag */}
              <Skeleton className="h-7 w-44 rounded-full" />

              {/* Main Headline */}
              <div className="space-y-3">
                <Skeleton className="h-10 sm:h-14 md:h-16 w-11/12 rounded-2xl" />
                <Skeleton className="h-10 sm:h-14 md:h-16 w-3/4 rounded-2xl" />
              </div>

              {/* Paragraph / Description */}
              <div className="space-y-2.5 pt-2 max-w-xl">
                <Skeleton className="h-4 w-full rounded-md" />
                <Skeleton className="h-4 w-5/6 rounded-md" />
                <Skeleton className="h-4 w-4/6 rounded-md" />
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-4 pt-4">
                <Skeleton className="h-12 w-44 rounded-xl" />
                <Skeleton className="h-12 w-36 rounded-xl" />
              </div>

              {/* Micro Specs Bar */}
              <div className="pt-6 flex items-center gap-6 border-t border-slate-200/60 dark:border-slate-800/60">
                <Skeleton className="h-4 w-28 rounded-md" />
                <Skeleton className="h-4 w-24 rounded-md" />
                <Skeleton className="h-4 w-32 rounded-md" />
              </div>
            </div>

            {/* Right Column: Visual Stage / Mockup Card */}
            <div className="lg:col-span-5">
              <div className="rounded-3xl p-6 sm:p-8 bg-white/40 dark:bg-[#070F28]/40 border border-slate-200/80 dark:border-slate-800/80 space-y-4 shadow-sm">
                <div className="flex items-center justify-between pb-4 border-b border-slate-200/60 dark:border-slate-800/60">
                  <Skeleton className="h-5 w-32 rounded-md" />
                  <Skeleton className="h-4 w-16 rounded-full" />
                </div>
                <Skeleton className="h-56 sm:h-64 w-full rounded-2xl" />
                <div className="grid grid-cols-3 gap-3 pt-2">
                  <Skeleton className="h-10 rounded-xl" />
                  <Skeleton className="h-10 rounded-xl" />
                  <Skeleton className="h-10 rounded-xl" />
                </div>
              </div>
            </div>
          </div>

          {/* ================= IMPACT STATS STRIP SKELETON ================= */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="rounded-2xl p-5 sm:p-6 bg-white/50 dark:bg-[#070F28]/50 border border-slate-200/70 dark:border-slate-800/70 space-y-3"
              >
                <div className="flex items-center justify-between">
                  <Skeleton className="h-8 sm:h-10 w-24 rounded-lg" />
                  <Skeleton className="h-7 w-7 rounded-lg" />
                </div>
                <Skeleton className="h-4 w-32 rounded-md" />
                <Skeleton className="h-3 w-20 rounded-md" />
              </div>
            ))}
          </div>

          {/* ================= SERVICES / CAPABILITY CARDS SKELETON ================= */}
          <div className="space-y-6 pt-4">
            <div className="space-y-3 max-w-lg">
              <Skeleton className="h-6 w-36 rounded-full" />
              <Skeleton className="h-9 w-64 rounded-xl" />
              <Skeleton className="h-4 w-full rounded-md" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className="rounded-3xl p-6 sm:p-8 bg-white/50 dark:bg-[#070F28]/50 border border-slate-200/80 dark:border-slate-800/80 space-y-4"
                >
                  <div className="flex items-center justify-between">
                    <Skeleton className="h-12 w-12 rounded-2xl" />
                    <Skeleton className="h-4 w-12 rounded-full" />
                  </div>
                  <Skeleton className="h-6 w-48 rounded-lg" />
                  <div className="space-y-2">
                    <Skeleton className="h-3.5 w-full rounded-md" />
                    <Skeleton className="h-3.5 w-5/6 rounded-md" />
                    <Skeleton className="h-3.5 w-4/6 rounded-md" />
                  </div>
                  <div className="pt-4 flex flex-wrap gap-2">
                    <Skeleton className="h-6 w-16 rounded-lg" />
                    <Skeleton className="h-6 w-20 rounded-lg" />
                    <Skeleton className="h-6 w-24 rounded-lg" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
