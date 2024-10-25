'use client';

import { QuizCard } from './QuizCard';
import { useQuizStore } from '@/lib/store';

export function QuizGrid() {
  const questions = useQuizStore(state => state.questions);
  
  // Group questions by quiz title
  const quizzes = questions.reduce((acc, question) => {
    if (!acc[question.title]) {
      acc[question.title] = {
        id: crypto.randomUUID(),
        title: question.title,
        category: question.category,
        questionCount: 0,
        image: question.image,
        firstQuestion: question.subtitle,
        plays: 0
      };
    }
    acc[question.title].questionCount++;
    return acc;
  }, {} as Record<string, any>);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 p-4">
      {Object.values(quizzes).map((quiz) => (
        <QuizCard key={quiz.id} quiz={quiz} />
      ))}
    </div>
  );
}