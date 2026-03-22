"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { Trophy, Medal, Flame } from "lucide-react";
import Link from "next/link";

interface LeaderboardUser {
  id: string;
  name: string;
  totalPoints: number;
  streak: number;
  image?: string;
}

export default function LeaderboardPage() {
  const { data: session } = useSession();
  const [users, setUsers] = useState<LeaderboardUser[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!session) return;

    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/leaderboard/global`, {
      headers: {
        Authorization: `Bearer ${(session as any)?.accessToken}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setUsers(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [session]);

  if (loading) return <div>Yükleniyor...</div>;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Liderlik Tablosu</h1>
        <p className="text-gray-600">En aktif öğrenenler arasında yerini al!</p>
      </div>

      <div className="rounded-xl border bg-white shadow-sm overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="px-6 py-4 text-sm font-semibold text-gray-900 w-20 text-center">Sıra</th>
              <th className="px-6 py-4 text-sm font-semibold text-gray-900">Öğrenci</th>
              <th className="px-6 py-4 text-sm font-semibold text-gray-900">Puan (XP)</th>
              <th className="px-6 py-4 text-sm font-semibold text-gray-900 text-right">Seri</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {users.map((user, index) => (
              <tr key={user.id} className={user.id === (session?.user as any)?.id ? "bg-blue-50" : ""}>
                <td className="px-6 py-4 text-center">
                  {index === 0 ? <Trophy className="h-6 w-6 text-yellow-500 mx-auto" /> : 
                   index === 1 ? <Medal className="h-6 w-6 text-gray-400 mx-auto" /> :
                   index === 2 ? <Medal className="h-6 w-6 text-orange-400 mx-auto" /> :
                   <span className="font-medium text-gray-500">{index + 1}</span>}
                </td>
                <td className="px-6 py-4">
                  <Link href={`/profile/${user.id}`} className="flex items-center hover:opacity-80 transition-opacity">
                    <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold mr-3 overflow-hidden">
                      {user.image ? <img src={user.image} alt={user.name} /> : user.name?.charAt(0)}
                    </div>
                    <span className="font-semibold text-gray-900">{user.name}</span>
                  </Link>
                </td>
                <td className="px-6 py-4 font-bold text-blue-600">
                  {user.totalPoints} XP
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end text-orange-600 font-bold">
                    <Flame className="h-4 w-4 mr-1" />
                    {user.streak}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
