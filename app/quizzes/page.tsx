import { QuizList } from '@/components/quiz/QuizList';
import { QuizHeader } from '@/components/quiz/QuizHeader';

export default function QuizzesPage() {
  return (
    <div className="container mx-auto p-6 space-y-8">
      <QuizHeader />
      <QuizList />
    </div>
  );
}