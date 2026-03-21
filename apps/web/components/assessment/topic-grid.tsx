"use client";

import { useState } from "react";
import { TopicCard } from "./topic-card";
import { Search } from "lucide-react";

interface Topic {
  id: string;
  name: string;
  description: string;
  category: string;
}

interface TopicGridProps {
  initialTopics: Topic[];
}

export function TopicGrid({ initialTopics }: TopicGridProps) {
  const [topics] = useState<Topic[]>(initialTopics);
  const [search, setSearch] = useState("");

  const filteredTopics = topics.filter((topic) =>
    topic.name.toLowerCase().includes(search.toLowerCase()) ||
    topic.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="relative max-w-md">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
          <Search className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type="text"
          className="block w-full rounded-md border border-gray-300 bg-white py-2 pl-10 pr-3 text-sm placeholder-gray-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          placeholder="Konu veya kategori ara..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filteredTopics.map((topic) => (
          <TopicCard key={topic.id} {...topic} />
        ))}
      </div>
      
      {filteredTopics.length === 0 && (
        <div className="text-center py-10 text-gray-500">
          Arama kriterine uygun konu bulunamadı.
        </div>
      )}
    </div>
  );
}
