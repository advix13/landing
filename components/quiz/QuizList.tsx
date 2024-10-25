'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { QuizCard } from '@/components/quiz/QuizCard';

// Mock data - in production, fetch from your API
const mockQuizzes = {
  geography: [
    {
      id: 1,
      title: 'European Capitals',
      question: 'What is the capital of Germany?',
      image: 'https://images.unsplash.com/photo-1599946347371-68eb71b16afc',
      options: ['Berlin', 'Paris', 'Madrid', 'Rome'],
      correctAnswer: 'Berlin',
    },
    {
      id: 2,
      title: 'World Landmarks',
      question: 'Which city is home to the Colosseum?',
      image: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5',
      options: ['Rome', 'Athens', 'Cairo', 'Mexico City'],
      correctAnswer: 'Rome',
    },
  ],
  history: [
    {
      id: 3,
      title: 'Ancient Civilizations',
      question: 'Which civilization built the pyramids?',
      image: 'https://images.unsplash.com/photo-1503177119275-0aa32b3a9368',
      options: ['Egyptian', 'Greek', 'Roman', 'Mayan'],
      correctAnswer: 'Egyptian',
    },
  ],
};

export function QuizList() {
  const [activeCategory, setActiveCategory] = useState('geography');

  return (
    <div className="space-y-6">
      <Tabs defaultValue="geography" onValueChange={setActiveCategory}>
        <TabsList>
          <TabsTrigger value="geography">Geography</TabsTrigger>
          <TabsTrigger value="history">History</TabsTrigger>
        </TabsList>

        {Object.entries(mockQuizzes).map(([category, quizzes]) => (
          <TabsContent key={category} value={category}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {quizzes.map((quiz) => (
                <QuizCard key={quiz.id} quiz={quiz} />
              ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}