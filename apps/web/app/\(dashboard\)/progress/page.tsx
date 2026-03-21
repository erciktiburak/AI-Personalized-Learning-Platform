"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { 
  Trophy, 
  Target, 
  Zap, 
  Calendar 
} from "lucide-react";

export default function ProgressPage() {
  const { data: session } = useSession();
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!session) return;

    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/progress/stats`, {
      headers: {
        Authorization: `Bearer ${(session as any)?.accessToken}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setStats(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [session]);

  if (loading) return <div>Yükleniyor...</div>;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">İlerlemem</h1>
        <p className="text-gray-600">Başarılarını ve istatistiklerini takip et.</p>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-xl border bg-white p-6 shadow-sm">
          <div className="flex items-center space-x-4">
            <div className="rounded-lg bg-yellow-50 p-3">
              <Trophy className="h-6 w-6 text-yellow-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Tamamlanan Modüller</p>
              <p className="text-2xl font-bold text-gray-900">{stats?.completedModules}</p>
            </div>
          </div>
        </div>

        <div className="rounded-xl border bg-white p-6 shadow-sm">
          <div className="flex items-center space-x-4">
            <div className="rounded-lg bg-blue-50 p-3">
              <Target className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Ortalama Skor</p>
              <p className="text-2xl font-bold text-gray-900">%{stats?.averageScore}</p>
            </div>
          </div>
        </div>

        <div className="rounded-xl border bg-white p-6 shadow-sm">
          <div className="flex items-center space-x-4">
            <div className="rounded-lg bg-orange-50 p-3">
              <Zap className="h-6 w-6 text-orange-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Mevcut Seri</p>
              <p className="text-2xl font-bold text-gray-900">{stats?.streak} Gün</p>
            </div>
          </div>
        </div>

        <div className="rounded-xl border bg-white p-6 shadow-sm">
          <div className="flex items-center space-x-4">
            <div className="rounded-lg bg-green-50 p-3">
              <Calendar className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Öğrenme Günü</p>
              <p className="text-2xl font-bold text-gray-900">12</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="rounded-xl border bg-white p-6 shadow-sm">
          <h3 className="text-lg font-bold text-gray-900">Haftalık Aktivite</h3>
          <div className="mt-6 flex h-40 items-end justify-between space-x-2">
            {[40, 70, 20, 90, 50, 30, 60].map((height, i) => (
              <div key={i} className="flex-1 space-y-2">
                <div 
                  className="w-full bg-blue-100 rounded-t-sm hover:bg-blue-600 transition-colors" 
                  style={{ height: `${height}%` }}
                ></div>
                <p className="text-center text-xs text-gray-400">
                  {['Pzt', 'Sal', 'Çar', 'Per', 'Cum', 'Cmt', 'Paz'][i]}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-xl border bg-white p-6 shadow-sm">
          <h3 className="text-lg font-bold text-gray-900">Rozetler</h3>
          <div className="mt-6 flex flex-wrap gap-4">
            <div className="h-16 w-16 rounded-full bg-gray-100 flex items-center justify-center border-2 border-dashed border-gray-300" title="İlk Adım">
              🏁
            </div>
            <div className="h-16 w-16 rounded-full bg-blue-50 flex items-center justify-center border-2 border-blue-200" title="Bilgi Avcısı">
              🔍
            </div>
            <div className="h-16 w-16 rounded-full bg-yellow-50 flex items-center justify-center border-2 border-yellow-200" title="Hızlı Öğrenen">
              ⚡
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
