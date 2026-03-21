"use client";

import { useState, useEffect } from "react";
import { QuestionCard } from "./question-card";

interface Question {
  id: string;
  question: string;
  options: any;
  correctAnswer: string;
}

interface AssessmentPlayerProps {
  assessmentId: string;
  questions: Question[];
  onSubmit: (answers: string[]) => void;
}

export function AssessmentPlayer({ assessmentId, questions, onSubmit }: AssessmentPlayerProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<string[]>(new Array(questions.length).fill(""));
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleSelectOption = (option: string) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestionIndex] = option;
    setAnswers(newAnswers);
  };

  const nextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const prevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div className="mx-auto max-w-3xl space-y-8">
      <div className="flex items-center justify-between">
        <div className="text-sm font-medium text-gray-500">
          Soru {currentQuestionIndex + 1} / {questions.length}
        </div>
        <div className={`text-lg font-bold ${timeLeft < 60 ? "text-red-600" : "text-gray-900"}`}>
          Kalan Süre: {formatTime(timeLeft)}
        </div>
      </div>

      <div className="w-full bg-gray-200 rounded-full h-2">
        <div 
          className="bg-blue-600 h-2 rounded-full transition-all" 
          style={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}
        ></div>
      </div>

      <QuestionCard
        question={questions[currentQuestionIndex]}
        selectedOption={answers[currentQuestionIndex]}
        onSelect={handleSelectOption}
      />

      <div className="flex justify-between pt-6">
        <button
          onClick={prevQuestion}
          disabled={currentQuestionIndex === 0}
          className="rounded-lg border px-6 py-2 text-sm font-medium text-gray-700 disabled:opacity-50"
        >
          Önceki
        </button>
        {currentQuestionIndex === questions.length - 1 ? (
          <button
            onClick={() => onSubmit(answers)}
            className="rounded-lg bg-blue-600 px-8 py-2 text-sm font-medium text-white hover:bg-blue-700"
          >
            Testi Bitir
          </button>
        ) : (
          <button
            onClick={nextQuestion}
            className="rounded-lg bg-blue-600 px-8 py-2 text-sm font-medium text-white hover:bg-blue-700"
          >
            Sonraki
          </button>
        )}
      </div>
    </div>
  );
}
