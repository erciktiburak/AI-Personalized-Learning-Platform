"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { QuizPlayer } from "@/components/quiz/quiz-player";
import { QuizResult } from "@/components/quiz/quiz-result";
import { AssessmentLoading } from "@/components/assessment/assessment-loading";

export default function QuizPage() {
  const { id } = useParams(); // moduleId
  const { data: session } = useSession();
  const [quiz, setQuiz] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [result, setResult] = useState<any>(null);
  const [startTime] = useState(Date.now());

  const fetchQuiz = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/quiz/module/${id}`, {
        headers: {
          Authorization: `Bearer ${(session as any)?.accessToken}`,
        },
      });
      const data = await res.json();
      
      if (data.status === 'GENERATING') {
        // Poll for quiz generation
        setTimeout(fetchQuiz, 3000);
      } else {
        setQuiz(data);
        setLoading(false);
      }
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (session) fetchQuiz();
  }, [id, session]);

  const handleSubmit = async (answers: string[]) => {
    const timeTaken = Math.floor((Date.now() - startTime) / 1000);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/quiz/${quiz.id}/submit`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${(session as any)?.accessToken}`,
        },
        body: JSON.stringify({ answers, timeTaken }),
      });
      const data = await res.json();
      setResult(data);
    } catch (err) {
      alert("Hata oluştu.");
    }
  };

  if (loading) return <AssessmentLoading />;
  if (result) return <QuizResult score={result.score} recommendations={result.recommendations} onRetry={() => setResult(null)} />;

  return (
    <QuizPlayer
      quizId={quiz.id}
      questions={quiz.questions}
      onSubmit={handleSubmit}
    />
  );
}
