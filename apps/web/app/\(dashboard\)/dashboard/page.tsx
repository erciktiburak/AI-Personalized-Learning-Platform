import { StatsCard } from "@/components/dashboard/stats-card";
import { StreakTracker } from "@/components/dashboard/streak-tracker";
import { RecentActivity } from "@/components/dashboard/recent-activity";

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Hoş geldin!</h1>
        <p className="text-gray-600">Bugün ne öğrenmek istersin?</p>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <StatsCard title="Tamamlanan Modül" value="12" icon="book" />
        <StatsCard title="Quiz Skoru" value="85%" icon="chart" />
        <StatsCard title="Öğrenme Süresi" value="24s" icon="clock" />
        <StreakTracker streak={5} />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <RecentActivity />
        {/* Placeholder for topics list or other dashboard widgets */}
        <div className="rounded-xl border bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-900">Aktif Öğrenme Yolu</h2>
          <p className="mt-4 text-gray-600 italic">Henüz bir öğrenme yolu oluşturulmadı.</p>
        </div>
      </div>
    </div>
  );
}
