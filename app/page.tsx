'use client';

import { Header } from '@/components/home/Header';
import { QuizCreator } from '@/components/home/QuizCreator';
import { QuizCategories } from '@/components/home/QuizCategories';
import { FeaturedQuizzes } from '@/components/home/FeaturedQuizzes';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#FFFDF4]">
      <Header />
      <main className="container mx-auto max-w-[1500px] px-4 py-8">
        <QuizCreator />
        <h2 className="text-xl font-semibold mb-4">Categories</h2>
        <QuizCategories />
        <h2 className="text-xl font-semibold mb-4">Recently published</h2>
        <FeaturedQuizzes />
      </main>
    </div>
  );
}