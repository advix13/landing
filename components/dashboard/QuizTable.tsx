'use client';

import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { formatDistanceToNow } from 'date-fns';
import type { QuizWithStats } from '@/types/quiz';
import { Loader2 } from 'lucide-react';

export function QuizTable() {
  const [quizzes, setQuizzes] = useState<QuizWithStats[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/quiz');
        if (!response.ok) throw new Error('Failed to fetch quizzes');
        const data = await response.json();
        setQuizzes(data.quizzes || []);
      } catch (error) {
        console.error('Error fetching quizzes:', error);
        setError(error instanceof Error ? error.message : 'Failed to load quizzes');
      } finally {
        setLoading(false);
      }
    };

    fetchQuizzes();
  }, []);

  if (error) {
    return (
      <Card className="bg-[#0A2F1F] border-none p-6">
        <div className="text-center text-red-400">
          <p>Error: {error}</p>
        </div>
      </Card>
    );
  }

  return (
    <Card className="bg-[#0A2F1F] border-none overflow-hidden">
      <div className="p-6 border-b border-[#1A4F3F]">
        <h2 className="text-lg font-semibold text-white">Quiz Library</h2>
      </div>

      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="border-[#1A4F3F] hover:bg-[#1A4F3F]/50">
              <TableHead className="text-white">Title</TableHead>
              <TableHead className="text-white">Category</TableHead>
              <TableHead className="text-white text-right">Questions</TableHead>
              <TableHead className="text-white text-right">Plays</TableHead>
              <TableHead className="text-white text-right">Avg Score</TableHead>
              <TableHead className="text-white">Created</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={6} className="h-24">
                  <div className="flex items-center justify-center">
                    <Loader2 className="h-6 w-6 animate-spin text-white/70" />
                  </div>
                </TableCell>
              </TableRow>
            ) : quizzes.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center text-white/70 h-24">
                  No quizzes found. Import some data to get started.
                </TableCell>
              </TableRow>
            ) : (
              quizzes.map((quiz) => (
                <TableRow 
                  key={quiz.id} 
                  className="border-[#1A4F3F] hover:bg-[#1A4F3F]/50"
                >
                  <TableCell className="font-medium text-white">
                    {quiz.title}
                  </TableCell>
                  <TableCell className="text-white">{quiz.category}</TableCell>
                  <TableCell className="text-right text-white">
                    {quiz.questions?.length || 0}
                  </TableCell>
                  <TableCell className="text-right text-white">
                    {quiz.totalPlays || 0}
                  </TableCell>
                  <TableCell className="text-right text-white">
                    {(quiz.averageScore || 0).toFixed(1)}%
                  </TableCell>
                  <TableCell className="text-white">
                    {formatDistanceToNow(new Date(quiz.createdAt), { addSuffix: true })}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </Card>
  );
}