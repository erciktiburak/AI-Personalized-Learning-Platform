export function RecentActivity() {
  const activities = [
    { id: 1, type: 'quiz', title: 'React.js Giriş Quizi', date: '2 saat önce', score: '90/100' },
    { id: 2, type: 'module', title: 'Node.js Middleware Yapısı', date: 'Dün', status: 'Tamamlandı' },
  ];

  return (
    <div className="rounded-xl border bg-white p-6 shadow-sm">
      <h2 className="text-lg font-semibold text-gray-900">Son Aktiviteler</h2>
      <div className="mt-4 space-y-4">
        {activities.map((activity) => (
          <div key={activity.id} className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0">
            <div>
              <p className="font-medium text-gray-900">{activity.title}</p>
              <p className="text-xs text-gray-500">{activity.date}</p>
            </div>
            <div className="text-sm font-semibold text-blue-600">
              {activity.score || activity.status}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
