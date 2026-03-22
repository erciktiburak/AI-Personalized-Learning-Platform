"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { Code2, Send, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";

export function ProjectSubmission({ moduleId }: { moduleId: string }) {
  const { data: session } = useSession();
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!code.trim()) return;

    setLoading(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/project/submit`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${(session as any)?.accessToken}`,
        },
        body: JSON.stringify({ moduleId, code }),
      });
      const data = await res.json();
      setResult(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (result) {
    return (
      <div className="bg-white rounded-xl border p-6 space-y-6 shadow-sm">
        <div className="flex items-center space-x-3 text-green-600">
          <CheckCircle2 className="h-6 w-6" />
          <h3 className="text-xl font-bold">Proje İncelendi!</h3>
        </div>
        
        <div className="p-4 bg-gray-50 rounded-lg border">
          <p className="text-sm font-medium text-gray-500 mb-1">AI Skoru</p>
          <p className="text-3xl font-black text-blue-600">%{result.submission.score}</p>
        </div>

        <div>
          <h4 className="font-bold text-gray-900 mb-2">Mentor Geri Bildirimi</h4>
          <p className="text-gray-600 text-sm leading-relaxed whitespace-pre-wrap">{result.submission.feedback}</p>
        </div>

        {result.suggestions && (
          <div>
            <h4 className="font-bold text-gray-900 mb-2">Geliştirme Önerileri</h4>
            <ul className="space-y-2">
              {result.suggestions.map((s: string, i: number) => (
                <li key={i} className="flex items-start text-sm text-blue-700 bg-blue-50 p-3 rounded-lg">
                  <span className="mr-2">•</span>
                  {s}
                </li>
              ))}
            </ul>
          </div>
        )}

        <button 
          onClick={() => setResult(null)}
          className="w-full py-3 border border-gray-300 rounded-xl text-sm font-bold text-gray-600 hover:bg-gray-50 transition-colors"
        >
          Tekrar Gönder
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl border p-6 shadow-sm">
      <div className="flex items-center space-x-2 mb-6">
        <Code2 className="h-5 w-5 text-blue-600" />
        <h3 className="text-lg font-bold text-gray-900">Proje Gönderimi</h3>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Kodunu buraya yapıştır:</label>
          <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="// Javascript, Python veya diğer kodlarını buraya ekle..."
            className="w-full h-64 p-4 font-mono text-sm border rounded-xl bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:outline-none dark:bg-zinc-900 dark:border-zinc-800 dark:text-zinc-100 transition-all"
          />
        </div>

        <button
          type="submit"
          disabled={loading || !code.trim()}
          className="w-full flex items-center justify-center space-x-2 bg-blue-600 text-white font-bold py-3 rounded-xl hover:bg-blue-700 disabled:opacity-50 transition-all shadow-md"
        >
          {loading ? (
            <>
              <Loader2 className="h-5 w-5 animate-spin" />
              <span>AI İnceliyor...</span>
            </>
          ) : (
            <>
              <Send className="h-5 w-5" />
              <span>İncelemeye Gönder</span>
            </>
          )}
        </button>
        <p className="text-[10px] text-gray-400 text-center">
          Projen yapay zeka tarafından saniyeler içinde incelenir ve puanlanır.
        </p>
      </form>
    </div>
  );
}
