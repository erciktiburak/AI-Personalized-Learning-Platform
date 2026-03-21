"use client";

import Link from "next/link";
import { ChevronRight } from "lucide-react";

interface TopicCardProps {
  id: string;
  name: string;
  description: string;
  category: string;
}

export function TopicCard({ id, name, description, category }: TopicCardProps) {
  return (
    <div className="flex flex-col rounded-xl border bg-white p-6 shadow-sm transition-hover hover:shadow-md">
      <div className="flex-1">
        <span className="inline-flex items-center rounded-full bg-blue-50 px-2.5 py-0.5 text-xs font-medium text-blue-700">
          {category}
        </span>
        <h3 className="mt-4 text-xl font-bold text-gray-900">{name}</h3>
        <p className="mt-2 text-sm text-gray-600 line-clamp-2">{description}</p>
      </div>
      <div className="mt-6 border-t pt-4">
        <Link
          href={`/assessment/${id}`}
          className="flex items-center justify-between text-sm font-semibold text-blue-600 hover:text-blue-500"
        >
          Teste Başla
          <ChevronRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  );
}
