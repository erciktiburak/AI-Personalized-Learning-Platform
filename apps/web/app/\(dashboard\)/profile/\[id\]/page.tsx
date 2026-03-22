"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useSession } from "next-auth/react";
import { Award, Zap, Trophy, Book } from "lucide-react";

export default function PublicProfilePage() {
  const { id } = useParams();
  const { data: session } = useSession();
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!session) return;

    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/social/profile/${id}`, {
      headers: { Authorization: `Bearer ${(session as any)?.accessToken}` },
    })
      .then((res) => res.json())
      .then((data) => {
        setProfile(data);
        setLoading(false);
      });
  }, [id, session]);

  if (loading) return <div className="p-8 text-center">Yükleniyor...</div>;
  if (!profile) return <div className="p-8 text-center">Kullanıcı bulunamadı.</div>;

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="bg-white rounded-2xl border p-8 shadow-sm flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-8">
        <div className="h-32 w-32 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 text-4xl font-bold border-4 border-white shadow-lg">
          {profile.image ? <img src={profile.image} alt={profile.name} className="rounded-full" /> : profile.name?.charAt(0)}
        </div>
        <div className="flex-1 text-center md:text-left">
          <h1 className="text-3xl font-bold text-gray-900">{profile.name}</h1>
          <p className="text-gray-500">LearnPath AI Öğrencisi</p>
          
          <div className="mt-6 flex flex-wrap justify-center md:justify-start gap-4">
            <div className="flex items-center bg-orange-50 text-orange-700 px-4 py-2 rounded-full font-bold text-sm">
              <Zap className="h-4 w-4 mr-2" />
              {profile.streak} Gün Seri
            </div>
            <div className="flex items-center bg-blue-50 text-blue-700 px-4 py-2 rounded-full font-bold text-sm">
              <Trophy className="h-4 w-4 mr-2" />
              {profile.totalPoints} XP
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <h3 className="text-xl font-bold text-gray-900 flex items-center">
            <Award className="mr-2 h-5 w-5 text-yellow-500" />
            Rozetler ({profile.achievements.length})
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {profile.achievements.map((achievement: any) => (
              <div key={achievement.id} className="bg-white p-4 rounded-xl border text-center space-y-2 hover:shadow-md transition-all cursor-default">
                <span className="text-3xl">{achievement.badge.icon}</span>
                <p className="text-xs font-bold text-gray-900 line-clamp-1">{achievement.badge.name}</p>
              </div>
            ))}
            {profile.achievements.length === 0 && <p className="text-gray-500 text-sm italic">Henüz rozet kazanılmadı.</p>}
          </div>
        </div>

        <div className="space-y-6">
          <h3 className="text-xl font-bold text-gray-900 flex items-center">
            <Book className="mr-2 h-5 w-5 text-blue-600" />
            Tamamlanan Eğitimler
          </h3>
          <div className="space-y-4">
            {profile.learningPaths.map((path: any) => (
              <div key={path.id} className="bg-white p-4 rounded-xl border flex items-center justify-between">
                <div>
                  <p className="font-bold text-gray-900">{path.title}</p>
                  <p className="text-xs text-gray-500">{path.topic.name}</p>
                </div>
                <div className="text-green-600">
                  <Award className="h-5 w-5" />
                </div>
              </div>
            ))}
            {profile.learningPaths.length === 0 && <p className="text-gray-500 text-sm italic">Henüz eğitim tamamlanmadı.</p>}
          </div>
        </div>
      </div>
    </div>
  );
}
