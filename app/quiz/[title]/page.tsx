'use client';

import { useParams } from 'next/navigation';
import { QuizGame } from '@/components/QuizGame';
import { Background } from '@/components/Background';
import { useQuizStore } from '@/lib/store';

export default function QuizPage() {
  const params = useParams();
  const title = decodeURIComponent(params.title as string);
  const questions = useQuizStore(state => 
    state.questions.filter(q => q.title === title)
  );

  return (
    <>
      <main className="container mx-auto p-4">
        <QuizGame questions={questions} />
      </main>
      <Background />
    </>
  );
}