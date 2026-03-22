"use client";

import { 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area
} from 'recharts';
import { useTheme } from 'next-themes';

const data = [
  { name: 'Pzt', xp: 120 },
  { name: 'Sal', xp: 250 },
  { name: 'Çar', xp: 180 },
  { name: 'Per', xp: 400 },
  { name: 'Cum', xp: 320 },
  { name: 'Cmt', xp: 550 },
  { name: 'Paz', xp: 480 },
];

export function ProgressChart() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <div className="h-[300px] w-full bg-white dark:bg-zinc-900 rounded-xl border dark:border-zinc-800 p-6 shadow-sm transition-colors duration-300">
      <h3 className="text-lg font-bold text-gray-900 dark:text-zinc-100 mb-6">Haftalık XP Kazanımı</h3>
      <ResponsiveContainer width="100%" height="80%">
        <AreaChart data={data}>
          <defs>
            <linearGradient id="colorXp" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#2563eb" stopOpacity={0.1}/>
              <stop offset="95%" stopColor="#2563eb" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={isDark ? '#27272a' : '#f3f4f6'} />
          <XAxis 
            dataKey="name" 
            axisLine={false} 
            tickLine={false} 
            tick={{ fontSize: 12, fill: isDark ? '#71717a' : '#9ca3af' }}
            dy={10}
          />
          <YAxis hide />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: isDark ? '#18181b' : '#ffffff',
              borderRadius: '8px', 
              border: isDark ? '1px solid #27272a' : 'none', 
              boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' 
            }}
            itemStyle={{ color: isDark ? '#e4e4e7' : '#18181b' }}
          />
          <Area 
            type="monotone" 
            dataKey="xp" 
            stroke="#2563eb" 
            strokeWidth={3}
            fillOpacity={1} 
            fill="url(#colorXp)" 
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
