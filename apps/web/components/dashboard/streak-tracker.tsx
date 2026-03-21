"use client";

import { Flame } from "lucide-react";

export function StreakTracker({ streak }: { streak: number }) {
  return (
    <div className="rounded-xl border bg-white p-6 shadow-sm">
      <div className="flex items-center">
        <div className="rounded-lg bg-orange-50 p-3">
          <Flame className="h-6 w-6 text-orange-600" />
        </div>
        <div className="ml-4">
          <p className="text-sm font-medium text-gray-600">Günlük Seri</p>
          <p className="text-2xl font-bold text-gray-900">{streak} Gün</p>
        </div>
      </div>
    </div>
  );
}
