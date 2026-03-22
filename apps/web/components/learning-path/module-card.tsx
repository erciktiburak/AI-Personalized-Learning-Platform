"use client";

import { Lock, CheckCircle2, PlayCircle } from "lucide-react";
import Link from "next/link";

interface ModuleCardProps {
  id: string;
  title: string;
  description: string;
  order: number;
  status: string;
}

export function ModuleCard({ id, title, description, order, status }: ModuleCardProps) {
  const isLocked = status === "LOCKED";
  const isCompleted = status === "COMPLETED";
  const isAvailable = status === "AVAILABLE" || status === "IN_PROGRESS";

  return (
    <div className={`relative flex items-start space-x-4 rounded-xl border p-6 ${
      isLocked ? "bg-gray-50 opacity-75" : "bg-white"
    }`}>
      <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 ${
        isCompleted ? "border-green-500 bg-green-50" : 
        isAvailable ? "border-blue-500 bg-blue-50" : "border-gray-200"
      }`}>
        {isCompleted ? (
          <CheckCircle2 className="h-6 w-6 text-green-500" />
        ) : isLocked ? (
          <Lock className="h-5 w-5 text-gray-400" />
        ) : (
          <span className="text-sm font-bold text-blue-600">{order}</span>
        )}
      </div>

      <div className="flex-1">
        <div className="flex items-center justify-between">
          <h4 className={`font-bold ${isLocked ? "text-gray-500" : "text-gray-900"}`}>
            {title}
          </h4>
          {isAvailable && !isCompleted && (
            <Link href={`/module/${id}`} className="flex items-center text-xs font-semibold text-blue-600">
              <PlayCircle className="mr-1 h-4 w-4" />
              BAŞLA
            </Link>
          ) }
          {isCompleted && (
            <Link href={`/module/${id}`} className="flex items-center text-xs font-semibold text-green-600">
              İNCELE
            </Link>
          )}
        </div>
        <p className={`mt-1 text-sm ${isLocked ? "text-gray-400" : "text-gray-600"}`}>
          {description}
        </p>
      </div>
    </div>
  );
}
