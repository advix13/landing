'use client';

import { useState } from 'react';
import { Upload, FileType } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { useQuizStore } from '@/lib/store';
import { useToast } from '@/hooks/use-toast';

const parseCSV = (text: string) => {
  const rows = text.split('\n').map(row => 
    row.split(',').map(cell => cell.trim())
  );
  
  // Remove header row
  rows.shift();
  
  return rows
    .filter(row => row.length >= 6) // Ensure row has all required fields
    .map((row, index) => ({
      id: `q${index}`,
      title: 'Quiz Question',
      subtitle: row[0], // Question
      image: `https://images.unsplash.com/photo-${index + 1}`, // Placeholder image
      options: [row[1], row[2], row[3], row[4]], // Options
      correctAnswer: row[5].toUpperCase(), // Correct answer (A, B, C, or D)
    }));
};

export function CSVImport() {
  const [isUploading, setIsUploading] = useState(false);
  const addQuestions = useQuizStore(state => state.addQuestions);
  const { toast } = useToast();

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (file.type !== 'text/csv') {
      toast({
        title: 'Invalid file type',
        description: 'Please upload a CSV file',
        variant: 'destructive',
      });
      return;
    }

    setIsUploading(true);
    try {
      const text = await file.text();
      const questions = parseCSV(text);
      
      if (questions.length === 0) {
        throw new Error('No valid questions found in CSV');
      }

      addQuestions(questions);
      
      toast({
        title: 'Success!',
        description: `Imported ${questions.length} questions successfully.`,
      });

      // Reset file input
      event.target.value = '';
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to process CSV file',
        variant: 'destructive',
      });
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <Card className="p-6 bg-[#0A2F1F] border-none">
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Upload className="h-5 w-5 text-green-400" />
          <h2 className="text-lg font-semibold text-white">Import Quiz Questions</h2>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="csv" className="text-white">Upload CSV File</Label>
            <Input
              id="csv"
              type="file"
              accept=".csv"
              onChange={handleFileUpload}
              disabled={isUploading}
              className="bg-[#1A4F3F] border-none text-white file:bg-green-400 file:text-gray-900"
            />
          </div>

          <div className="bg-[#1A4F3F] rounded-lg p-4 text-sm text-white/80">
            <p className="font-medium mb-2">CSV Format:</p>
            <code className="block whitespace-pre">
              Question,Option A,Option B,Option C,Option D,Correct Answer (A/B/C/D)
            </code>
            <p className="mt-2">Example: What is 2+2?,4,3,5,6,A</p>
          </div>
        </div>
      </div>
    </Card>
  );
}