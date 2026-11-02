"use client";

import React, { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "@/components/layout/logo";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { navigationData } from "@/data/navigation";
import {
  X,
  ChevronDown,
  ChevronRight,
  ArrowRight,
  Code2,
  Briefcase,
  Building2,
  BookOpen,
  Users,
} from "lucide-react";

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MobileNav({ isOpen, onClose }: MobileNavProps) {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);
  const [servicesExpanded, setServicesExpanded] = useState(false);
  const prevPathnameRef = useRef(pathname);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  // Close only when pathname actually changes (user navigates to a new route)
  useEffect(() => {
    if (prevPathnameRef.current !== pathname) {
      prevPathnameRef.current = pathname;
      onClose();
    }
  }, [pathname, onClose]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Close on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen || !mounted) return null;

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Mobile Navigation Menu"
      className="fixed inset-0 z-[9999] lg:hidden flex justify-end"
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/70 backdrop-blur-xs transition-opacity duration-300 cursor-pointer"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer Panel: Attached to full viewport height via portal to document.body */}
      <div className="relative z-10 w-full max-w-[340px] sm:max-w-sm h-[100dvh] bg-white dark:bg-[#03071E] text-slate-900 dark:text-white shadow-2xl flex flex-col justify-between overflow-hidden border-l border-slate-200 dark:border-slate-800 animate-in slide-in-from-right duration-250">
        {/* Drawer Header */}
        <div className="flex items-center justify-between p-4 sm:p-5 border-b border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-[#03071E]/95 flex-shrink-0">
          <Logo isCompact={false} priority />
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <button
              type="button"
              onClick={onClose}
              aria-label="Close navigation menu"
              className="p-2 rounded-xl text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Nav Links Area: Shows ALL Navbar Links */}
        <div className="flex-1 overflow-y-auto overscroll-contain px-4 py-5 space-y-1.5 font-sans">
          <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 px-3 pb-1">
            Menu Navigation
          </div>

          {/* 1. Services with Expandable Sub-practices */}
          <div className="rounded-xl overflow-hidden border border-slate-200/80 dark:border-slate-800/80">
            <div
              className={`flex items-center justify-between p-3 transition-colors ${
                pathname.startsWith("/services")
                  ? "bg-blue-50/80 dark:bg-blue-950/40 text-[#1877F2] dark:text-[#00D8F6]"
                  : "bg-slate-50/50 dark:bg-slate-900/30 text-slate-800 dark:text-slate-200 hover:bg-slate-100/60 dark:hover:bg-slate-800/60"
              }`}
            >
              <Link
                href="/services"
                onClick={onClose}
                className="flex items-center gap-2.5 font-semibold text-sm flex-1"
              >
                <Code2 className="w-4 h-4 text-[#1877F2] flex-shrink-0" />
                <span>Services</span>
                <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-md bg-blue-100 dark:bg-blue-900/60 text-[#1877F2] dark:text-[#00D8F6]">
                  8 Practices
                </span>
              </Link>
              <button
                type="button"
                onClick={() => setServicesExpanded(!servicesExpanded)}
                aria-label="Toggle services menu"
                aria-expanded={servicesExpanded}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-800 dark:hover:text-white hover:bg-slate-200/50 dark:hover:bg-slate-800 transition-colors cursor-pointer"
              >
                <ChevronDown
                  className={`w-4 h-4 transition-transform duration-200 ${
                    servicesExpanded ? "rotate-180 text-[#1877F2] dark:text-[#00D8F6]" : ""
                  }`}
                />
              </button>
            </div>

            {servicesExpanded && (
              <div className="p-2 space-y-1 bg-white dark:bg-[#020517] border-t border-slate-200/80 dark:border-slate-800/80 animate-in fade-in duration-150">
                <Link
                  href="/services"
                  onClick={onClose}
                  className="flex items-center justify-between px-3 py-2 rounded-lg text-xs font-bold text-[#1877F2] dark:text-[#0BCB91] hover:bg-blue-50 dark:hover:bg-blue-950/40 transition-colors"
                >
                  <span>All Capabilities Overview</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
                {navigationData.servicesMegaMenu.flatMap((g) => g.items).map((item) => {
                  const isItemActive = pathname === item.href;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={onClose}
                      className={`block px-3 py-2 rounded-lg text-xs transition-colors ${
                        isItemActive
                          ? "bg-blue-50 dark:bg-blue-950/60 text-[#1877F2] dark:text-[#00D8F6] font-bold"
                          : "text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/50"
                      }`}
                    >
                      <div className="font-medium">{item.title}</div>
                      {item.description && (
                        <div className="text-[10px] text-slate-400 dark:text-slate-500 line-clamp-1 mt-0.5 font-sans">
                          {item.description}
                        </div>
                      )}
                    </Link>
                  );
                })}
              </div>
            )}
          </div>

          {/* 2. Projects */}
          <Link
            href="/projects"
            onClick={onClose}
            className={`flex items-center justify-between px-3.5 py-3 rounded-xl text-sm font-semibold transition-colors ${
              pathname.startsWith("/projects")
                ? "bg-blue-50 dark:bg-blue-950/50 text-[#1877F2] dark:text-[#00D8F6] border-l-4 border-[#1877F2]"
                : "text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800/60"
            }`}
          >
            <div className="flex items-center gap-2.5">
              <Briefcase className="w-4 h-4 text-[#0BCB91] flex-shrink-0" />
              <span>Projects</span>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-400" />
          </Link>

          {/* 3. Industries */}
          <Link
            href="/industries"
            onClick={onClose}
            className={`flex items-center justify-between px-3.5 py-3 rounded-xl text-sm font-semibold transition-colors ${
              pathname.startsWith("/industries")
                ? "bg-blue-50 dark:bg-blue-950/50 text-[#1877F2] dark:text-[#00D8F6] border-l-4 border-[#1877F2]"
                : "text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800/60"
            }`}
          >
            <div className="flex items-center gap-2.5">
              <Building2 className="w-4 h-4 text-[#1877F2] flex-shrink-0" />
              <span>Industries</span>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-400" />
          </Link>

          {/* 4. Insights */}
          <Link
            href="/insights"
            onClick={onClose}
            className={`flex items-center justify-between px-3.5 py-3 rounded-xl text-sm font-semibold transition-colors ${
              pathname.startsWith("/insights")
                ? "bg-blue-50 dark:bg-blue-950/50 text-[#1877F2] dark:text-[#00D8F6] border-l-4 border-[#1877F2]"
                : "text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800/60"
            }`}
          >
            <div className="flex items-center gap-2.5">
              <BookOpen className="w-4 h-4 text-[#0BCB91] flex-shrink-0" />
              <span>Insights</span>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-400" />
          </Link>

          {/* 5. About */}
          <Link
            href="/about"
            onClick={onClose}
            className={`flex items-center justify-between px-3.5 py-3 rounded-xl text-sm font-semibold transition-colors ${
              pathname.startsWith("/about")
                ? "bg-blue-50 dark:bg-blue-950/50 text-[#1877F2] dark:text-[#00D8F6] border-l-4 border-[#1877F2]"
                : "text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800/60"
            }`}
          >
            <div className="flex items-center gap-2.5">
              <Users className="w-4 h-4 text-[#1877F2] flex-shrink-0" />
              <span>About Mindrift</span>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-400" />
          </Link>
        </div>

        {/* Drawer Footer CTA */}
        <div className="p-4 sm:p-5 border-t border-slate-200 dark:border-slate-800 bg-slate-50/80 dark:bg-[#020617] flex-shrink-0 space-y-3">
          <Link
            href="/contact"
            onClick={onClose}
            className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl font-bold text-xs uppercase tracking-wider text-white bg-[#000B49] hover:bg-[#1877F2] dark:bg-[#1877F2] dark:hover:bg-blue-600 shadow-md transition-all cursor-pointer"
          >
            <span>Discuss Your Project</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
          <div className="text-center text-[10px] text-slate-400 font-sans">
            Enterprise Technology Partner · Global Systems
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}

