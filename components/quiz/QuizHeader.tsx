'use client';

import { Brain } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export function QuizHeader() {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <Brain className="h-8 w-8 text-primary" />
        <h1 className="text-2xl font-bold">Quiz Library</h1>
      </div>
      <Link href="/dashboard">
        <Button variant="outline">Dashboard</Button>
      </Link>
    </div>
  );
}