'use client';

import Image from 'next/image';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Play, Users } from 'lucide-react';

interface QuizCardProps {
  quiz: {
    id: number;
    title: string;
    question: string;
    image: string;
    options: string[];
  };
}

export function QuizCard({ quiz }: QuizCardProps) {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <div className="relative h-48 w-full">
        <Image
          src={quiz.image}
          alt={quiz.title}
          fill
          className="object-cover"
        />
      </div>
      
      <CardHeader>
        <h3 className="text-lg font-semibold">{quiz.title}</h3>
        <p className="text-sm text-muted-foreground">Sample: {quiz.question}</p>
      </CardHeader>

      <CardContent>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Users className="h-4 w-4" />
          <span>12 players</span>
        </div>
      </CardContent>

      <CardFooter>
        <Button className="w-full">
          <Play className="h-4 w-4 mr-2" />
          Start Quiz
        </Button>
      </CardFooter>
    </Card>
  );
}