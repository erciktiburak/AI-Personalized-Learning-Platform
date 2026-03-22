"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { AIMentorChat } from "@/components/chat/ai-mentor-chat";
import { ProjectSubmission } from "@/components/module/project-submission";
import { ArrowLeft, BookOpen, GraduationCap } from "lucide-react";
import Link from "next/link";

export default function ModuleDetailPage() {
  const { id } = useParams();
  const { data: session } = useSession();
  const [module, setModule] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!session) return;

    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/module/${id}`, {
      headers: { Authorization: `Bearer ${(session as any)?.accessToken}` },
    })
      .then((res) => res.json())
      .then((data) => {
        setModule(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id, session]);

  if (loading) return <div className="p-8 text-center">Yükleniyor...</div>;
  if (!module) return <div className="p-8 text-center">Modül bulunamadı.</div>;

  const content = JSON.parse(module.content as string);

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="flex items-center space-x-4">
        <Link href={`/learning-path/${module.learningPathId}`} className="p-2 hover:bg-gray-100 dark:hover:bg-zinc-800 rounded-full transition-colors">
          <ArrowLeft className="h-6 w-6 text-gray-600 dark:text-zinc-400" />
        </Link>
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-zinc-100">{module.title}</h1>
          <p className="text-gray-600 dark:text-zinc-400">{module.description}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <div className="prose dark:prose-invert max-w-none bg-white dark:bg-zinc-900 p-8 rounded-xl border dark:border-zinc-800 shadow-sm">
            <h3 className="flex items-center text-xl font-bold text-gray-900 dark:text-zinc-100 mb-4">
              <BookOpen className="mr-2 h-5 w-5 text-blue-600" />
              Öğrenilecek Kavramlar
            </h3>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 list-none p-0 mb-10">
              {content.keyConcepts.map((concept: string, i: number) => (
                <li key={i} className="bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 px-4 py-3 rounded-lg text-sm font-medium flex items-center">
                  <span className="h-2 w-2 bg-blue-400 rounded-full mr-3"></span>
                  {concept}
                </li>
              ))}
            </ul>

            <h3 className="flex items-center text-xl font-bold text-gray-900 dark:text-zinc-100 mb-4">
              <GraduationCap className="mr-2 h-5 w-5 text-green-600" />
              Pratik Uygulama / Proje Fikri
            </h3>
            <div className="bg-green-50 dark:bg-green-900/10 border-l-4 border-green-500 p-6 rounded-r-lg italic text-gray-700 dark:text-zinc-300">
              {content.projectIdea}
            </div>
          </div>

          <ProjectSubmission moduleId={id as string} />

          <div className="flex justify-center border-t dark:border-zinc-800 pt-8">
            <Link
              href={`/quiz/${module.id}`}
              className="inline-flex items-center px-8 py-4 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-all shadow-lg hover:shadow-xl"
            >
              Modül Quizine Başla
              <ArrowLeft className="ml-2 h-5 w-5 rotate-180" />
            </Link>
          </div>
        </div>

        <div className="lg:col-span-1">
          <AIMentorChat moduleId={id as string} />
        </div>
      </div>
    </div>
  );
}
