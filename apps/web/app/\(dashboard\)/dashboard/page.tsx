import { StatsCard } from "@/components/dashboard/stats-card";
import { StreakTracker } from "@/components/dashboard/streak-tracker";
import { RecentActivity } from "@/components/dashboard/recent-activity";
import { SocialFeed } from "@/components/shared/social-feed";
import { ProgressChart } from "@/components/dashboard/progress-chart";
import { Award, Zap } from "lucide-react";

export default function DashboardPage() {
  return (
    <div className="space-y-8 transition-colors duration-300">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-zinc-100">Hoş geldin!</h1>
          <p className="text-gray-600 dark:text-zinc-400">Bugün ne öğrenmek istersin?</p>
        </div>
        <div className="flex items-center space-x-4 bg-white dark:bg-zinc-900 p-2 rounded-xl border dark:border-zinc-800 shadow-sm transition-colors duration-300">
          <div className="flex items-center px-3 py-1 bg-orange-50 dark:bg-orange-900/20 text-orange-700 dark:text-orange-400 rounded-lg font-bold text-sm border border-orange-100 dark:border-orange-900/30">
            <Zap className="h-4 w-4 mr-1.5" />
            5 Gün
          </div>
          <div className="flex items-center px-3 py-1 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 rounded-lg font-bold text-sm border border-blue-100 dark:border-blue-900/30">
            <Award className="h-4 w-4 mr-1.5" />
            1,250 XP
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <StatsCard title="Tamamlanan Modül" value="12" icon="book" />
        <StatsCard title="Quiz Skoru" value="85%" icon="chart" />
        <StatsCard title="Öğrenme Süresi" value="24s" icon="clock" />
        <StreakTracker streak={5} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <ProgressChart />
          <RecentActivity />
        </div>
        <div className="lg:col-span-1 space-y-6">
          <SocialFeed />
          <div className="rounded-xl border border-blue-200 dark:border-blue-900 bg-gradient-to-br from-blue-600 to-blue-700 dark:from-blue-700 dark:to-blue-900 p-6 text-white shadow-lg">
            <h3 className="font-bold text-lg mb-2">Günün Meydan Okuması</h3>
            <p className="text-blue-100 text-sm mb-4">React Hooks quiziyle 100 XP kazanma şansını yakala!</p>
            <button className="w-full bg-white text-blue-600 dark:text-blue-700 font-bold py-2 rounded-lg hover:bg-blue-50 transition-colors text-sm">
              Hemen Katıl
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
