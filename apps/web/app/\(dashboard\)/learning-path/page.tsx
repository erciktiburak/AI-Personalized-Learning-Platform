"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { PathCard } from "@/components/learning-path/path-card";
import Link from "next/link";
import { Plus } from "lucide-react";

export default function LearningPathListPage() {
  const { data: session } = useSession();
  const [paths, setPaths] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!session) return;

    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/learning-path`, {
      headers: {
        Authorization: `Bearer ${(session as any)?.accessToken}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setPaths(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [session]);

  if (loading) return <div>Yükleniyor...</div>;

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Öğrenme Yollarım</h1>
          <p className="text-gray-600">Kişiselleştirilmiş eğitim planların.</p>
        </div>
        <Link
          href="/assessment"
          className="inline-flex items-center rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
        >
          <Plus className="mr-2 h-4 w-4" />
          Yeni Yol Oluştur
        </Link>
      </div>

      {paths.length === 0 ? (
        <div className="rounded-xl border border-dashed p-20 text-center">
          <h3 className="text-lg font-medium text-gray-900">Henüz bir öğrenme yolun yok.</h3>
          <p className="mt-2 text-gray-600">Seviye testini çözerek ilk yolunu oluşturabilirsin.</p>
          <Link
            href="/assessment"
            className="mt-6 inline-flex items-center rounded-lg bg-blue-600 px-6 py-2 text-sm font-medium text-white hover:bg-blue-700"
          >
            Seviye Testlerine Git
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {paths.map((path) => (
            <PathCard key={path.id} {...path} />
          ))}
        </div>
      )}
    </div>
  );
}
