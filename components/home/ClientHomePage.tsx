'use client';

import { Header } from '@/components/home/Header';
import { QuizCreator } from '@/components/home/QuizCreator';
import { QuizCategories } from '@/components/home/QuizCategories';
import { FeaturedQuizzes } from '@/components/home/FeaturedQuizzes';
import { Background } from '@/components/Background';

export function ClientHomePage() {
  return (
    <>
      <Background />
      <Header />
      <main className="container mx-auto max-w-[1500px] px-4 py-8">
        <QuizCreator />
        <QuizCategories />
        <FeaturedQuizzes />
      </main>
    </>
  );
}