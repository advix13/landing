'use client';

import Link from 'next/link';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PenLine, Sparkles } from 'lucide-react';

export function QuizCreator() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
      <Card className="bg-white text-neutral-800 p-8 rounded-3xl shadow-lg">
        <div className="space-y-4">
          <h2 className="text-2xl font-bold">Create a quiz</h2>
          <p className="text-neutral-600">Play for free with 300 participants</p>
          <Button className="bg-[#98FB98] hover:bg-[#90EE90] text-neutral-800">
            Quiz editor
          </Button>
        </div>
      </Card>

      <Card className="bg-white text-neutral-800 p-8 rounded-3xl shadow-lg">
        <div className="space-y-4">
          <h2 className="text-2xl font-bold">A.I.</h2>
          <p className="text-neutral-600">Generate a quiz from any subject or pdf</p>
          <Button className="bg-[#87CEEB] hover:bg-[#87CEFA] text-neutral-800">
            Quiz generator
          </Button>
        </div>
      </Card>
    </div>
  );
}