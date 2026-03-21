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
    <div className="rounded-xl border bg-white p-6 shadow-sm">
      <div className="flex items-center">
        <div className="rounded-lg bg-blue-50 p-3">
          <Icon className="h-6 w-6 text-blue-600" />
        </div>
        <div className="ml-4">
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-bold text-gray-900">{value}</p>
        </div>
      </div>
    </div>
  );
}
