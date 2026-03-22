"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { Clock } from "lucide-react";
import Link from "next/link";

interface FeedItem {
  id: string;
  unlockedAt: string;
  user: { name: string; image?: string; id: string };
  badge: { name: string; icon: string };
}

export function SocialFeed() {
  const { data: session } = useSession();
  const [feed, setFeed] = useState<FeedItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!session) return;

    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/social/feed`, {
      headers: { Authorization: `Bearer ${(session as any)?.accessToken}` },
    })
      .then((res) => res.json())
      .then((data) => {
        setFeed(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [session]);

  if (loading) return <div className="p-4 text-center text-gray-500">Akış yükleniyor...</div>;

  return (
    <div className="rounded-xl border bg-white dark:bg-zinc-900 dark:border-zinc-800 shadow-sm overflow-hidden transition-colors duration-300">
      <div className="p-4 border-b dark:border-zinc-800 bg-gray-50 dark:bg-zinc-900/50 flex items-center justify-between">
        <h3 className="font-bold text-gray-900 dark:text-zinc-100">Topluluk Akışı</h3>
        <span className="text-xs text-blue-600 dark:text-blue-400 font-medium italic">Canlı</span>
      </div>
      <div className="divide-y dark:divide-zinc-800 max-h-[400px] overflow-y-auto">
        {feed.length === 0 && <p className="p-8 text-center text-gray-500 text-sm">Henüz bir aktivite yok.</p>}
        {feed.map((item) => (
          <div key={item.id} className="p-4 flex items-start space-x-3 hover:bg-gray-50 dark:hover:bg-zinc-800/50 transition-colors">
            <div className="h-10 w-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex-shrink-0 flex items-center justify-center text-blue-600 dark:text-blue-400 font-bold overflow-hidden">
              {item.user.image ? <img src={item.user.image} alt={item.user.name} /> : item.user.name?.charAt(0)}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm text-gray-900 dark:text-zinc-200">
                <Link href={`/profile/${(item.user as any).id}`} className="font-bold hover:underline">
                  {item.user.name}
                </Link>{" "}
                bir rozet kazandı!
              </p>
              <div className="mt-2 flex items-center p-2 bg-blue-50 dark:bg-blue-900/10 rounded-lg border border-blue-100 dark:border-blue-900/20">
                <span className="text-xl mr-2">{item.badge.icon}</span>
                <span className="text-xs font-bold text-blue-800 dark:text-blue-300">{item.badge.name}</span>
              </div>
              <p className="mt-1 text-[10px] text-gray-400 dark:text-zinc-500 flex items-center">
                <Clock className="h-3 w-3 mr-1" />
                {new Date(item.unlockedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
