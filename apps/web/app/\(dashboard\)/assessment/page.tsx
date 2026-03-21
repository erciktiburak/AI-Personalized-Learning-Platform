import { TopicGrid } from "@/components/assessment/topic-grid";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Seviye Testi | LearnPath AI",
  description: "Öğrenmek istediğin konuyu seç ve seviyeni belirle.",
};

async function getInitialTopics() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/topics`, {
    next: { revalidate: 3600 } // Cache for 1 hour
  });
  if (!res.ok) return [];
  return res.json();
}

export default async function AssessmentPage() {
  const initialTopics = await getInitialTopics();

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Seviye Testi</h1>
        <p className="text-gray-600">Öğrenmek istediğin konuyu seç ve seviyeni belirle.</p>
      </div>
      <TopicGrid initialTopics={initialTopics} />
    </div>
  );
}
