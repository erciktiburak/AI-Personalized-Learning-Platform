"use client";

interface Question {
  id: string;
  question: string;
  options: any; // Json in prisma, array of strings here
  difficulty: number;
}

interface QuestionCardProps {
  question: Question;
  selectedOption: string | null;
  onSelect: (option: string) => void;
}

export function QuestionCard({ question, selectedOption, onSelect }: QuestionCardProps) {
  const options = Array.isArray(question.options) ? question.options : JSON.parse(question.options as string);

  return (
    <div className="space-y-6">
      <div className="text-lg font-semibold text-gray-900">
        {question.question}
      </div>
      <div className="grid grid-cols-1 gap-4">
        {options.map((option: string, index: number) => (
          <button
            key={index}
            onClick={() => onSelect(option)}
            className={`flex w-full items-center rounded-lg border p-4 text-left transition-colors ${
              selectedOption === option
                ? "border-blue-600 bg-blue-50"
                : "border-gray-200 hover:bg-gray-50"
            }`}
          >
            <span className="flex h-6 w-6 items-center justify-center rounded-full border border-gray-300 mr-3 text-sm">
              {String.fromCharCode(65 + index)}
            </span>
            {option}
          </button>
        ))}
      </div>
    </div>
  );
}
