"use client";

import { Book, BarChart3, Clock } from "lucide-react";

interface StatsCardProps {
  title: string;
  value: string;
  icon: 'book' | 'chart' | 'clock';
}

export function StatsCard({ title, value, icon }: StatsCardProps) {
  const Icon = icon === 'book' ? Book : icon === 'chart' ? BarChart3 : Clock;

  return (
    <div className="rounded-xl border bg-white dark:bg-zinc-900 dark:border-zinc-800 p-6 shadow-sm transition-colors duration-300">
      <div className="flex items-center">
        <div className="rounded-lg bg-blue-50 dark:bg-blue-900/20 p-3">
          <Icon className="h-6 w-6 text-blue-600 dark:text-blue-400" />
        </div>
        <div className="ml-4">
          <p className="text-sm font-medium text-gray-600 dark:text-zinc-400">{title}</p>
          <p className="text-2xl font-bold text-gray-900 dark:text-zinc-100">{value}</p>
        </div>
      </div>
    </div>
  );
}
