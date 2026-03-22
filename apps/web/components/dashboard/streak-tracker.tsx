"use client";

import { Flame } from "lucide-react";

export function StreakTracker({ streak }: { streak: number }) {
  return (
    <div className="rounded-xl border bg-white dark:bg-zinc-900 dark:border-zinc-800 p-6 shadow-sm transition-colors duration-300">
      <div className="flex items-center">
        <div className="rounded-lg bg-orange-50 dark:bg-orange-900/20 p-3">
          <Flame className="h-6 w-6 text-orange-600 dark:text-orange-400" />
        </div>
        <div className="ml-4">
          <p className="text-sm font-medium text-gray-600 dark:text-zinc-400">Günlük Seri</p>
          <p className="text-2xl font-bold text-gray-900 dark:text-zinc-100">{streak} Gün</p>
        </div>
      </div>
    </div>
  );
}
