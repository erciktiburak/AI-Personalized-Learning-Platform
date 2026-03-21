"use client";

export function AssessmentLoading() {
  return (
    <div className="flex flex-col items-center justify-center space-y-6 py-20">
      <div className="h-16 w-16 animate-spin rounded-full border-4 border-blue-600 border-t-transparent"></div>
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900">AI Sorularını Hazırlıyor...</h2>
        <p className="mt-2 text-gray-600">Bu işlem yaklaşık 10-20 saniye sürebilir.</p>
      </div>
      <div className="w-full max-w-md bg-gray-200 rounded-full h-2.5">
        <div className="bg-blue-600 h-2.5 rounded-full animate-pulse w-3/4"></div>
      </div>
    </div>
  );
}
