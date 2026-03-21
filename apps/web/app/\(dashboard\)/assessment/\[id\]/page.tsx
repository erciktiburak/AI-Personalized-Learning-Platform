"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { AssessmentLoading } from "@/components/assessment/assessment-loading";
import { AssessmentPlayer } from "@/components/assessment/assessment-player";
import { AssessmentResult } from "@/components/assessment/assessment-result";

export default function AssessmentDetailPage() {
  const { id } = useParams();
  const { data: session } = useSession();
  const [assessment, setAssessment] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!session) return;

    // First fetch initial status
    const fetchInitialStatus = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/assessment/status/${id}`, {
          headers: {
            Authorization: `Bearer ${(session as any)?.accessToken}`,
          },
        });
        const data = await res.json();
        setAssessment(data);

        if (data.status === "COMPLETED") {
          setLoading(false);
        } else if (data.status === "FAILED") {
          setError("Test üretilirken bir hata oluştu.");
          setLoading(false);
        } else {
          // If still generating, start SSE
          startSSE();
        }
      } catch (err) {
        setError("Sunucuya ulaşılamıyor.");
        setLoading(false);
      }
    };

    const startSSE = () => {
      const eventSource = new EventSource(
        `${process.env.NEXT_PUBLIC_API_URL}/api/assessment/status/${id}/stream?token=${(session as any)?.accessToken}`
      );

      eventSource.onmessage = (event) => {
        const data = JSON.parse(event.data);
        if (data.status === "COMPLETED") {
          // Re-fetch assessment to get questions
          fetchInitialStatus();
          eventSource.close();
        } else if (data.status === "FAILED") {
          setError("Test üretimi başarısız oldu.");
          setLoading(false);
          eventSource.close();
        }
      };

      eventSource.onerror = () => {
        eventSource.close();
        // Fallback to polling if SSE fails
        const interval = setInterval(async () => {
          const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/assessment/status/${id}`, {
            headers: { Authorization: `Bearer ${(session as any)?.accessToken}` },
          });
          const data = await res.json();
          if (data.status === "COMPLETED" || data.status === "FAILED") {
            setAssessment(data);
            setLoading(false);
            clearInterval(interval);
          }
        }, 3000);
      };

      return () => eventSource.close();
    };

    fetchInitialStatus();
  }, [id, session]);

  const handleSubmit = async (answers: string[]) => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/assessment/submit/${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${(session as any)?.accessToken}`,
        },
        body: JSON.stringify({ answers }),
      });
      const data = await res.json();
      setAssessment(data);
    } catch (err) {
      alert("Gönderim sırasında hata oluştu.");
    }
  };

  if (error) return <div className="p-10 text-center text-red-600">{error}</div>;
  if (loading || assessment?.status === "GENERATING") return <AssessmentLoading />;

  if (assessment?.score !== null && assessment?.score !== undefined) {
    return <AssessmentResult score={assessment.score} level={assessment.level} />;
  }

  return (
    <AssessmentPlayer
      assessmentId={id as string}
      questions={assessment.questions}
      onSubmit={handleSubmit}
    />
  );
}
