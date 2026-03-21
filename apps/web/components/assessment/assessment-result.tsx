"use client";

import Link from "next/link";
import { CheckCircle2, Award, ArrowRight } from "lucide-react";

interface AssessmentResultProps {
  score: number;
  level: string;
}

export function AssessmentResult({ score, level }: AssessmentResultProps) {
  return (
    <div className="mx-auto max-w-2xl text-center space-y-8 py-10">
      <div className="flex justify-center">
        <div className="rounded-full bg-green-100 p-6">
          <CheckCircle2 className="h-16 w-16 text-green-600" />
        </div>
      </div>
      
      <div>
        <h2 className="text-3xl font-bold text-gray-900">Test Tamamlandı!</h2>
        <p className="mt-2 text-gray-600">Harika bir iş çıkardın.</p>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div className="rounded-xl border bg-white p-6 shadow-sm">
          <p className="text-sm font-medium text-gray-500">Skor</p>
          <p className="text-4xl font-bold text-blue-600">{score}%</p>
        </div>
        <div className="rounded-xl border bg-white p-6 shadow-sm">
          <p className="text-sm font-medium text-gray-500">Seviye</p>
          <div className="flex items-center justify-center mt-1">
            <Award className="h-5 w-5 text-yellow-500 mr-2" />
            <p className="text-2xl font-bold text-gray-900">{level}</p>
          </div>
        </div>
      </div>

      <div className="pt-6">
        <Link
          href="/dashboard"
          className="inline-flex items-center rounded-lg bg-blue-600 px-8 py-3 text-lg font-medium text-white hover:bg-blue-700"
        >
          Öğrenme Yoluna Git
          <ArrowRight className="ml-2 h-5 w-5" />
        </Link>
      </div>
    </div>
  );
}
