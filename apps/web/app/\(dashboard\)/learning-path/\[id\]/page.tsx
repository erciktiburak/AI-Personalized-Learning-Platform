"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useSession } from "next-auth/react";
import { ModuleCard } from "@/components/learning-path/module-card";

export default function LearningPathDetailPage() {
  const { id } = useParams();
  const { data: session } = useSession();
  const [path, setPath] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!session) return;

    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/learning-path/${id}`, {
      headers: {
        Authorization: `Bearer ${(session as any)?.accessToken}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setPath(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id, session]);

  if (loading) return <div>Yükleniyor...</div>;
  if (!path) return <div>Yol bulunamadı.</div>;

  return (
    <div className="space-y-8">
      <div>
        <div className="flex items-center space-x-2 text-sm text-gray-500">
          <span>Öğrenme Yolları</span>
          <span>/</span>
          <span>{path.topic.name}</span>
        </div>
        <h1 className="mt-2 text-3xl font-bold text-gray-900">{path.title}</h1>
        <p className="mt-2 text-gray-600">{path.description}</p>
      </div>

      <div className="space-y-6">
        <h3 className="text-xl font-bold text-gray-900">Müfredat</h3>
        <div className="space-y-4">
          {path.modules.map((module: any) => (
            <ModuleCard key={module.id} id={module.id} {...module} />
          ))}
        </div>
      </div>
    </div>
  );
}
