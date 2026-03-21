"use client";

import { useState, useEffect } from "react";
import { QuestionCard } from "../assessment/question-card";

interface Question {
  id: string;
  question: string;
  options: any;
  points: number;
}

interface QuizPlayerProps {
  quizId: string;
  questions: Question[];
  onSubmit: (answers: string[]) => void;
}

export function QuizPlayer({ quizId, questions, onSubmit }: QuizPlayerProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<string[]>(new Array(questions.length).fill(""));
  const [startTime] = useState(Date.now());

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

  const handleFinish = () => {
    onSubmit(answers);
  };

  return (
    <div className="mx-auto max-w-3xl space-y-8">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-gray-900">Modül Quizi</h2>
        <div className="text-sm font-medium text-gray-500">
          Soru {currentQuestionIndex + 1} / {questions.length}
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
            onClick={handleFinish}
            className="rounded-lg bg-blue-600 px-8 py-2 text-sm font-medium text-white hover:bg-blue-700"
          >
            Quizi Bitir
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
