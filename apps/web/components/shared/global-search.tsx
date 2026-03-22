"use client";

import { useState, useEffect, useRef } from "react";
import { Search, Loader2, Book } from "lucide-react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

export function GlobalSearch() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const { data: session } = useSession();
  const router = useRouter();
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (query.length < 2) {
      setResults([]);
      return;
    }

    const delayDebounce = setTimeout(async () => {
      setLoading(true);
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/topics?q=${query}`, {
          headers: { Authorization: `Bearer ${(session as any)?.accessToken}` }
        });
        const data = await res.json();
        setResults(data);
        setIsOpen(true);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }, 300);

    return () => clearTimeout(delayDebounce);
  }, [query, session]);

  const handleSelect = (topic: any) => {
    setQuery("");
    setIsOpen(false);
    router.push(`/assessment`); // Or topic detail if implemented
  };

  return (
    <div ref={searchRef} className="relative w-full max-w-md hidden md:block">
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          {loading ? <Loader2 className="h-4 w-4 text-gray-400 animate-spin" /> : <Search className="h-4 w-4 text-gray-400" />}
        </div>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => query.length >= 2 && setIsOpen(true)}
          placeholder="Eğitim veya konu ara..."
          className="block w-full pl-10 pr-3 py-2 border dark:border-zinc-800 rounded-lg bg-gray-50 dark:bg-zinc-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
        />
      </div>

      {isOpen && results.length > 0 && (
        <div className="absolute mt-2 w-full bg-white dark:bg-zinc-900 border dark:border-zinc-800 rounded-xl shadow-xl z-50 overflow-hidden">
          <div className="p-2 space-y-1">
            {results.map((topic) => (
              <button
                key={topic.id}
                onClick={() => handleSelect(topic)}
                className="w-full text-left p-3 hover:bg-gray-100 dark:hover:bg-zinc-800 rounded-lg flex items-center space-x-3 transition-colors"
              >
                <div className="bg-blue-100 dark:bg-blue-900/30 p-2 rounded-lg">
                  <Book className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <p className="text-sm font-bold text-gray-900 dark:text-zinc-100">{topic.name}</p>
                  <p className="text-xs text-gray-500 dark:text-zinc-500 line-clamp-1">{topic.description}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
