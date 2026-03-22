export function RecentActivity() {
  const activities = [
    { id: 1, type: 'quiz', title: 'React.js Giriş Quizi', date: '2 saat önce', score: '90/100' },
    { id: 2, type: 'module', title: 'Node.js Middleware Yapısı', date: 'Dün', status: 'Tamamlandı' },
  ];

  return (
    <div className="rounded-xl border bg-white dark:bg-zinc-900 dark:border-zinc-800 p-6 shadow-sm transition-colors duration-300">
      <h2 className="text-lg font-semibold text-gray-900 dark:text-zinc-100">Son Aktiviteler</h2>
      <div className="mt-4 space-y-4">
        {activities.map((activity) => (
          <div key={activity.id} className="flex items-center justify-between border-b dark:border-zinc-800 pb-4 last:border-0 last:pb-0">
            <div>
              <p className="font-medium text-gray-900 dark:text-zinc-200">{activity.title}</p>
              <p className="text-xs text-gray-500 dark:text-zinc-500">{activity.date}</p>
            </div>
            <div className="text-sm font-semibold text-blue-600 dark:text-blue-400">
              {activity.score || activity.status}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
