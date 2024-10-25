'use client';

import { Brain } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export function DashboardHeader() {
  return (
    <div className="flex items-center justify-between pb-6">
      <div className="flex items-center gap-2">
        <Brain className="h-8 w-8 text-green-400" />
        <h1 className="text-2xl font-bold text-white">Quiz Dashboard</h1>
      </div>
      <Link href="/">
        <Button variant="outline" className="text-white border-white/20 hover:bg-white/10">
          Back to Quiz
        </Button>
      </Link>
    </div>
  );
}