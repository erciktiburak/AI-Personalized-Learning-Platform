"use client";

import Link from "next/link";
import { CheckCircle2, XCircle, ArrowRight, RotateCcw, ExternalLink } from "lucide-react";

interface QuizResultProps {
  score: number;
  recommendations?: any[];
  onRetry: () => void;
}

export function QuizResult({ score, recommendations, onRetry }: QuizResultProps) {
  const isPassed = score >= 80;

  return (
    <div className="mx-auto max-w-2xl text-center space-y-8 py-10">
      <div className="flex justify-center">
        {isPassed ? (
          <div className="rounded-full bg-green-100 p-6">
            <CheckCircle2 className="h-16 w-16 text-green-600" />
          </div>
        ) : (
          <div className="rounded-full bg-red-100 p-6">
            <XCircle className="h-16 w-16 text-red-600" />
          </div>
        )}
      </div>
      
      <div>
        <h2 className="text-3xl font-bold text-gray-900">
          {isPassed ? "Tebrikler, Geçtin!" : "Tekrar Denemelisin"}
        </h2>
        <p className="mt-2 text-gray-600">
          {isPassed 
            ? "Bu modülü başarıyla tamamladın. Bir sonraki modülün kilidi açıldı." 
            : "Bir sonraki modüle geçmek için en az %80 skor almalısın."}
        </p>
      </div>

      <div className="rounded-xl border bg-white p-8 shadow-sm">
        <p className="text-sm font-medium text-gray-500">Skorun</p>
        <p className={`text-5xl font-bold ${isPassed ? "text-green-600" : "text-red-600"}`}>
          %{Math.round(score)}
        </p>
      </div>

      {!isPassed && recommendations && recommendations.length > 0 && (
        <div className="text-left space-y-4">
          <h3 className="text-lg font-bold text-gray-900">AI Önerileri: Eksiklerini Kapat</h3>
          <div className="grid gap-4">
            {recommendations.map((rec, i) => (
              <a 
                key={i} 
                href={rec.url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center justify-between p-4 bg-blue-50 border border-blue-100 rounded-lg hover:bg-blue-100 transition-colors"
              >
                <div>
                  <p className="font-bold text-blue-900 text-sm">{rec.title}</p>
                  <p className="text-xs text-blue-700 mt-1">{rec.reason}</p>
                </div>
                <ExternalLink className="h-4 w-4 text-blue-600" />
              </a>
            ))}
          </div>
        </div>
      )}

      <div className="flex justify-center space-x-4 pt-6">
        <button
          onClick={onRetry}
          className="inline-flex items-center rounded-lg border border-gray-300 px-6 py-3 font-medium text-gray-700 hover:bg-gray-50"
        >
          <RotateCcw className="mr-2 h-5 w-5" />
          Tekrar Dene
        </button>
        {isPassed && (
          <Link
            href="/learning-path"
            className="inline-flex items-center rounded-lg bg-blue-600 px-8 py-3 font-medium text-white hover:bg-blue-700"
          >
            Müfredata Dön
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        )}
      </div>
    </div>
  );
}
