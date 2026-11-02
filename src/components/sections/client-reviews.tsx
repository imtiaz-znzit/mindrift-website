"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import {
  Star,
  Quote,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  ThumbsUp,
  Sparkles,
  Building2,
  Award,
} from "lucide-react";
import { clientReviewsData } from "@/data/reviews";

export function ClientReviews() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  const reviews = clientReviewsData;
  const currentReview = reviews[currentIndex];
  const minSwipeDistance = 50;

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % reviews.length);
  }, [reviews.length]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + reviews.length) % reviews.length);
  }, [reviews.length]);

  // Autoplay rotation every 3.5 seconds (pauses on hover)
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      nextSlide();
    }, 3500);
    return () => clearInterval(interval);
  }, [isPaused, nextSlide]);

  // Keyboard navigation support
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        prevSlide();
      } else if (e.key === "ArrowRight") {
        nextSlide();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [nextSlide, prevSlide]);

  // Touch handlers for mobile swipe
  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;
    if (isLeftSwipe) {
      nextSlide();
    } else if (isRightSwipe) {
      prevSlide();
    }
  };

  return (
    <section
      id="client-reviews"
      aria-label="Client Reviews and Testimonials"
      className="py-20 md:py-28 border-b border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-[#02071B] relative overflow-hidden transition-colors"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Ambient Cyber Light Glows */}
      <div className="absolute top-1/3 left-10 w-[550px] h-[280px] bg-blue-600/10 dark:bg-blue-600/15 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/3 right-10 w-[600px] h-[300px] bg-emerald-500/10 dark:bg-[#0BCB91]/12 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* ================= SECTION HEADER ================= */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-16">
          <div
            data-aos="fade-right"
            data-aos-duration="750"
            suppressHydrationWarning
            className="space-y-4 max-w-2xl"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-[#0BCB91] border border-emerald-200/70 dark:border-emerald-800/50 shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-emerald-600 dark:text-[#0BCB91]" />
              <span className="uppercase tracking-wider">Client Reviews & Testimonials</span>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#000B49] dark:text-white tracking-tight leading-tight">
              Endorsed by Industry Leaders.
            </h2>

            <p className="text-base text-slate-600 dark:text-slate-300 leading-relaxed font-sans">
              Discover how our deterministic software engineering, mission-critical systems, and scalable cloud architectures drive measurable impact for global enterprises.
            </p>
          </div>

          {/* Navigation Controls: Arrows and Counter */}
          <div
            data-aos="fade-left"
            data-aos-duration="750"
            suppressHydrationWarning
            className="flex items-center gap-4 self-start md:self-end"
          >
            {/* Step Counter */}
            <div className="text-sm font-mono font-semibold text-slate-500 dark:text-slate-400">
              <span className="text-[#1877F2] dark:text-[#0BCB91] text-base font-bold">
                0{currentIndex + 1}
              </span>
              <span className="mx-1 text-slate-400 dark:text-slate-600">/</span>
              <span>0{reviews.length}</span>
            </div>

            {/* Left / Prev Arrow Button */}
            <button
              onClick={prevSlide}
              aria-label="Previous client review"
              className="p-3 rounded-full bg-white dark:bg-[#070F28] border border-slate-200 dark:border-slate-800 text-[#000B49] dark:text-white hover:text-[#1877F2] dark:hover:text-[#0BCB91] hover:border-[#1877F2]/40 dark:hover:border-[#0BCB91]/40 shadow-xs hover:shadow-md transition-all active:scale-95 cursor-pointer"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            {/* Right / Next Arrow Button */}
            <button
              onClick={nextSlide}
              aria-label="Next client review"
              className="p-3 rounded-full bg-white dark:bg-[#070F28] border border-slate-200 dark:border-slate-800 text-[#000B49] dark:text-white hover:text-[#1877F2] dark:hover:text-[#0BCB91] hover:border-[#1877F2]/40 dark:hover:border-[#0BCB91]/40 shadow-xs hover:shadow-md transition-all active:scale-95 cursor-pointer"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* ================= MAIN ACTIVE REVIEW SHOWCASE CARD ================= */}
        <div
          data-aos="fade-up"
          data-aos-duration="850"
          suppressHydrationWarning
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
          className="relative rounded-3xl bg-white dark:bg-[#070F28] border border-slate-200/90 dark:border-slate-800/90 p-6 sm:p-10 md:p-12 shadow-xl overflow-hidden transition-all duration-500"
        >
          {/* Subtle Accent Glows inside card */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-br from-[#1877F2]/10 to-transparent rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-tr from-[#0BCB91]/10 to-transparent rounded-full blur-3xl pointer-events-none" />

          {/* Decorative Giant Quote Mark */}
          <div className="absolute top-6 right-8 sm:top-10 sm:right-12 text-slate-100 dark:text-slate-800/40 pointer-events-none select-none">
            <Quote className="w-24 h-24 sm:w-32 sm:h-32 opacity-40 rotate-180" />
          </div>

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Column: Client Avatar & Identity Info */}
            <div className="lg:col-span-4 flex flex-col items-center sm:items-start text-center sm:text-left">
              <div className="relative mb-5 group">
                <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden border-2 border-emerald-500/30 dark:border-emerald-400/30 shadow-lg relative bg-slate-100 dark:bg-slate-800">
                  <Image
                    src={currentReview.image}
                    alt={currentReview.name}
                    width={112}
                    height={112}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    priority
                    unoptimized
                  />
                </div>
                {currentReview.verified && (
                  <div
                    title="Verified Client"
                    className="absolute -bottom-2 -right-2 bg-emerald-500 text-white p-1.5 rounded-full shadow-md border-2 border-white dark:border-[#070F28]"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                )}
              </div>

              {/* Name & Role */}
              <h3 className="text-xl sm:text-2xl font-black text-[#000B49] dark:text-white tracking-tight">
                {currentReview.name}
              </h3>
              <p className="text-sm font-medium text-[#1877F2] dark:text-[#0BCB91] mt-1">
                {currentReview.role}
              </p>
              <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 mt-1">
                <Building2 className="w-3.5 h-3.5" />
                <span>{currentReview.company}</span>
              </div>

              {/* Project Badge */}
              {currentReview.project && (
                <div className="mt-4 inline-flex items-center gap-2 px-3 py-1 rounded-lg text-xs font-medium bg-slate-100 dark:bg-slate-800/70 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700/60">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#1877F2] dark:bg-[#0BCB91]" />
                  <span>{currentReview.project}</span>
                </div>
              )}

              {/* Metric Highlight Badge */}
              {currentReview.badge && (
                <div className="mt-2 inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold bg-emerald-500/10 text-emerald-700 dark:text-[#0BCB91] border border-emerald-500/20">
                  <Award className="w-3.5 h-3.5 text-emerald-600 dark:text-[#0BCB91]" />
                  <span>{currentReview.badge}</span>
                </div>
              )}
            </div>

            {/* Right Column: Rating, Comment, & Recommendation */}
            <div className="lg:col-span-8 flex flex-col justify-between space-y-6">
              {/* Star Rating Bar */}
              <div className="flex flex-wrap items-center gap-3">
                <div className="flex items-center gap-1" aria-label={`Rating: ${currentReview.rating} out of 5 stars`}>
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${
                        i < currentReview.rating
                          ? "text-amber-400 fill-amber-400 filter drop-shadow-[0_0_6px_rgba(251,191,36,0.5)]"
                          : "text-slate-300 dark:text-slate-700"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm font-bold text-[#000B49] dark:text-white">
                  {currentReview.rating}.0 <span className="text-xs font-normal text-slate-500 dark:text-slate-400">/ 5.0 Rating</span>
                </span>
                <span className="hidden sm:inline-block text-slate-300 dark:text-slate-700">•</span>
                <span className="text-xs font-medium text-emerald-600 dark:text-[#0BCB91] bg-emerald-50 dark:bg-emerald-950/50 px-2.5 py-0.5 rounded-full border border-emerald-200/50 dark:border-emerald-800/40">
                  Verified Enterprise Review
                </span>
              </div>

              {/* Client Comment / Feedback */}
              <div className="relative">
                <p className="text-base sm:text-lg md:text-xl text-slate-700 dark:text-slate-200 leading-relaxed font-sans italic">
                  &ldquo;{currentReview.comment}&rdquo;
                </p>
              </div>

              {/* Recommendation Banner */}
              <div className="pt-4 border-t border-slate-200/80 dark:border-slate-800/80 flex flex-col sm:flex-row items-start sm:items-center gap-3 bg-slate-50/60 dark:bg-[#030922]/60 p-4 rounded-2xl border border-slate-200/60 dark:border-slate-800/60">
                <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-[#0BCB91] shrink-0">
                  <ThumbsUp className="w-5 h-5" />
                </div>
                <div className="space-y-0.5">
                  <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 dark:text-[#0BCB91]">
                    Recommendation Status
                  </span>
                  <p className="text-sm font-semibold text-[#000B49] dark:text-slate-100">
                    {currentReview.recommendation}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Slide Indicators (Dots) */}
        <div className="flex items-center justify-center gap-2 mt-8">
          {reviews.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              aria-label={`Go to slide ${index + 1}`}
              className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                index === currentIndex
                  ? "w-8 bg-[#1877F2] dark:bg-[#0BCB91]"
                  : "w-2 bg-slate-300 dark:bg-slate-700 hover:bg-slate-400 dark:hover:bg-slate-600"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

