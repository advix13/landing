'use client';

import Image from 'next/image';
import { Card } from '@/components/ui/card';
import Link from 'next/link';
import { Users } from 'lucide-react';

interface QuizCardProps {
  quiz: {
    id: string;
    title: string;
    category: string;
    questionCount: number;
    image?: string;
    firstQuestion: string;
    plays: number;
  };
}

export function QuizCard({ quiz }: QuizCardProps) {
  return (
    <Link href={`/quiz/${quiz.id}`}>
      <Card className="quiz-card overflow-hidden bg-white border-none rounded-2xl shadow-md">
        <div className="relative h-40 w-full">
          {quiz.image ? (
            <Image
              src={quiz.image}
              alt={quiz.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 16.666vw"
            />
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-[#98FB98] to-[#90EE90]" />
          )}
          <div className="absolute bottom-2 left-2 right-2">
            <div className="text-xs px-2 py-1 bg-white/90 rounded-full inline-block">
              {quiz.category}
            </div>
          </div>
        </div>
        
        <div className="p-4">
          <h3 className="text-base font-medium text-neutral-800 mb-1 line-clamp-1">
            {quiz.title}
          </h3>
          <div className="flex items-center justify-between text-xs text-neutral-500 mt-2">
            <div className="flex items-center gap-1">
              <Users className="h-3 w-3" />
              <span>{quiz.plays}</span>
            </div>
            <span>{quiz.questionCount} Questions</span>
          </div>
        </div>
      </Card>
    </Link>
  );
}