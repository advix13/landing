'use client';

import { QuizTable } from '@/components/dashboard/QuizTable';
import { CSVUploader } from '@/components/dashboard/CSVUploader';
import { DashboardHeader } from '@/components/dashboard/DashboardHeader';
import { Background } from '@/components/Background';
import { QuestionList } from '@/components/dashboard/QuestionList';

export default function DashboardPage() {
  return (
    <>
      <Background />
      <div className="container mx-auto p-6 space-y-8 relative z-10">
        <DashboardHeader />
        <div className="grid gap-6">
          <CSVUploader />
          <QuestionList />
        </div>
      </div>
    </>
  );
}