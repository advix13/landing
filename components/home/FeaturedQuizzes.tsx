'use client';

import { useEffect, useState } from 'react';
import { useQuizStore } from '@/lib/store';
import { QuizCard } from './QuizCard';

interface QuizData {
  id: string;
  title: string;
  category: string;
  questionCount: number;
  image?: string;
  firstQuestion: string;
  plays: number;
}

export function FeaturedQuizzes() {
  const questions = useQuizStore(state => state.questions);
  const [quizzes, setQuizzes] = useState<QuizData[]>([]);

  useEffect(() => {
    // Group questions by quiz title
    const quizMap = questions.reduce((acc, question) => {
      if (!acc[question.title]) {
        acc[question.title] = {
          id: question.id,
          title: question.title,
          category: question.category,
          questionCount: 1,
          image: question.image,
          firstQuestion: question.subtitle,
          plays: 0
        };
      } else {
        acc[question.title].questionCount++;
      }
      return acc;
    }, {} as Record<string, QuizData>);

    setQuizzes(Object.values(quizMap));
  }, [questions]);

  if (quizzes.length === 0) {
    return (
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-neutral-800 mb-6">Recently published</h2>
        <p className="text-neutral-600">No quizzes available. Create your first quiz to get started!</p>
      </div>
    );
  }

  return (
    <div className="mb-12">
      <h2 className="text-2xl font-bold text-neutral-800 mb-6">Recently published</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
        {quizzes.map((quiz) => (
          <QuizCard
            key={quiz.id}
            quiz={quiz}
          />
        ))}
      </div>
    </div>
  );
}