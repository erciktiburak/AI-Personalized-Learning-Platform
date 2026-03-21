"use client";

import Link from "next/link";
import { BookOpen, Clock, ChevronRight } from "lucide-react";

interface PathCardProps {
  id: string;
  title: string;
  description: string;
  topic: { name: string };
  totalModules: number;
}

export function PathCard({ id, title, description, topic, totalModules }: PathCardProps) {
  return (
    <div className="rounded-xl border bg-white p-6 shadow-sm">
      <div className="flex items-center justify-between">
        <span className="rounded-full bg-blue-50 px-2.5 py-0.5 text-xs font-medium text-blue-700">
          {topic.name}
        </span>
      </div>
      <h3 className="mt-4 text-xl font-bold text-gray-900">{title}</h3>
      <p className="mt-2 text-sm text-gray-600 line-clamp-2">{description}</p>
      
      <div className="mt-6 flex items-center space-x-4 text-sm text-gray-500">
        <div className="flex items-center">
          <BookOpen className="mr-1.5 h-4 w-4" />
          {totalModules} Modül
        </div>
        <div className="flex items-center">
          <Clock className="mr-1.5 h-4 w-4" />
          ~20 Saat
        </div>
      </div>

      <div className="mt-6 border-t pt-4">
        <Link
          href={`/learning-path/${id}`}
          className="flex items-center justify-between text-sm font-semibold text-blue-600 hover:text-blue-500"
        >
          Devam Et
          <ChevronRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  );
}
