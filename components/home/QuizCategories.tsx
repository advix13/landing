'use client';

import { useEffect, useRef } from 'react';
import { useQuizStore } from '@/lib/store';
import { Card } from '@/components/ui/card';
import { Palette, Film, Globe2, History, Book, Atom } from 'lucide-react';
import Link from 'next/link';

const categories = [
  {
    id: 'art',
    name: 'Art & Literature',
    icon: Palette,
    color: 'bg-pink-100'
  },
  {
    id: 'entertainment',
    name: 'Entertainment',
    icon: Film,
    color: 'bg-purple-100'
  },
  {
    id: 'geography',
    name: 'Geography',
    icon: Globe2,
    color: 'bg-green-100'
  },
  {
    id: 'history',
    name: 'History',
    icon: History,
    color: 'bg-amber-100'
  },
  {
    id: 'languages',
    name: 'Languages',
    icon: Book,
    color: 'bg-blue-100'
  },
  {
    id: 'science',
    name: 'Science & Nature',
    icon: Atom,
    color: 'bg-cyan-100'
  }
];

export function QuizCategories() {
  const questions = useQuizStore(state => state.questions);
  const scrollRef = useRef<HTMLDivElement>(null);

  const getCategoryCount = (categoryId: string) => {
    return questions.filter(q => q.category.toLowerCase() === categoryId).length;
  };

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    let scrollPosition = 0;
    const cardWidth = scrollContainer.offsetWidth / 6; // 6 cards visible on desktop
    const maxScroll = scrollContainer.scrollWidth - scrollContainer.offsetWidth;

    const interval = setInterval(() => {
      scrollPosition += cardWidth;
      
      if (scrollPosition > maxScroll) {
        scrollPosition = 0;
      }

      scrollContainer.scrollTo({
        left: scrollPosition,
        behavior: 'smooth'
      });
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div 
      ref={scrollRef}
      className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide -mx-4 px-4 py-4 mb-8"
      style={{
        scrollSnapType: 'x mandatory',
        WebkitOverflowScrolling: 'touch'
      }}
    >
      <div className="flex gap-4 min-w-full">
        {categories.map((category) => {
          const IconComponent = category.icon;
          const count = getCategoryCount(category.id);
          
          return (
            <Link 
              key={category.id} 
              href={`/category/${category.id}`}
              className="flex-none w-full sm:w-1/2 md:w-1/3 lg:w-1/6 snap-start"
            >
              <Card className={`flex flex-col items-center gap-3 p-4 hover:shadow-md transition-shadow ${category.color} border-none h-full`}>
                <IconComponent className="h-6 w-6 text-neutral-600" />
                <div className="text-center">
                  <span className="text-sm font-medium text-neutral-800 block">{category.name}</span>
                  <span className="text-xs text-neutral-500">{count} quizzes</span>
                </div>
              </Card>
            </Link>
          );
        })}
      </div>
    </div>
  );
}