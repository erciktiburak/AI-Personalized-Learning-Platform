"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  BookOpen, 
  GraduationCap, 
  LineChart, 
  User, 
  LogOut,
  Trophy
} from "lucide-react";
import { signOut } from "next-auth/react";

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Öğrenme Yolu", href: "/learning-path", icon: BookOpen },
  { name: "Quizler", href: "/quiz", icon: GraduationCap },
  { name: "Liderlik Tablosu", href: "/leaderboard", icon: Trophy },
  { name: "İlerleme", href: "/progress", icon: LineChart },
  { name: "Profil", href: "/profile", icon: User },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="flex h-full w-64 flex-col border-r bg-white dark:bg-zinc-900 dark:border-zinc-800 transition-colors duration-300">
      <div className="flex h-16 items-center px-6">
        <Link href="/dashboard" className="text-2xl font-bold text-blue-600">
          LearnPath AI
        </Link>
      </div>
      <nav className="flex-1 space-y-1 px-3 py-4">
        {navigation.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`group flex items-center rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                isActive
                  ? "bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400"
                  : "text-gray-700 dark:text-zinc-400 hover:bg-gray-50 dark:hover:bg-zinc-800 hover:text-gray-900 dark:hover:text-zinc-100"
              }`}
            >
              <item.icon
                className={`mr-3 h-5 w-5 flex-shrink-0 ${
                  isActive ? "text-blue-600 dark:text-blue-400" : "text-gray-400 dark:text-zinc-500 group-hover:text-gray-500 dark:group-hover:text-zinc-300"
                }`}
              />
              {item.name}
            </Link>
          );
        })}
      </nav>
      <div className="border-t dark:border-zinc-800 p-4">
        <button
          onClick={() => signOut()}
          className="flex w-full items-center rounded-lg px-3 py-2 text-sm font-medium text-gray-700 dark:text-zinc-400 hover:bg-red-50 dark:hover:bg-red-900/10 hover:text-red-600 dark:hover:text-red-400 transition-colors"
        >
          <LogOut className="mr-3 h-5 w-5 text-gray-400 dark:text-zinc-500" />
          Çıkış Yap
        </button>
      </div>
    </div>
  );
}
