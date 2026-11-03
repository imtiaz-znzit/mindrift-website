import React from "react";

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
}

export function Skeleton({ className = "", ...props }: SkeletonProps) {
  return (
    <div
      className={`animate-pulse rounded-xl bg-slate-200/80 dark:bg-slate-800/60 border border-slate-300/30 dark:border-slate-700/30 ${className}`}
      {...props}
    />
  );
}

