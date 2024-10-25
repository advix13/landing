'use client';

import { useState } from 'react';
import { Upload, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { useQuizStore } from '@/lib/store';

export function CSVUploader() {
  const [isUploading, setIsUploading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [quizTitle, setQuizTitle] = useState('');
  const [category, setCategory] = useState('');
  const { toast } = useToast();
  const addQuestions = useQuizStore(state => state.addQuestions);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.type !== 'text/csv') {
        toast({
          title: 'Invalid file type',
          description: 'Please select a CSV file',
          variant: 'destructive',
        });
        return;
      }
      setSelectedFile(file);
    }
  };

  const handleImport = async () => {
    if (!selectedFile) {
      toast({
        title: 'No file selected',
        description: 'Please select a CSV file to import',
        variant: 'destructive',
      });
      return;
    }

    if (!category || !quizTitle) {
      toast({
        title: 'Required Fields Missing',
        description: 'Please enter both category and quiz title',
        variant: 'destructive',
      });
      return;
    }

    try {
      setIsUploading(true);
      const formData = new FormData();
      formData.append('file', selectedFile);
      formData.append('category', category);
      formData.append('quizTitle', quizTitle);

      const response = await fetch('/api/quiz/import', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) throw new Error('Upload failed');

      const data = await response.json();
      
      if (data.success) {
        addQuestions(data.questions);
        toast({
          title: 'Success!',
          description: `Imported ${data.count} questions into "${quizTitle}"`,
        });
        
        // Reset form
        setCategory('');
        setQuizTitle('');
        setSelectedFile(null);
        const fileInput = document.getElementById('csv-file') as HTMLInputElement;
        if (fileInput) fileInput.value = '';
      } else {
        throw new Error(data.error || 'Failed to import questions');
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: error instanceof Error ? error.message : 'Failed to import quiz data',
        variant: 'destructive',
      });
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <Card className="p-6 bg-[#0A2F1F]/90 border-none">
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Upload className="h-5 w-5 text-green-400" />
          <h2 className="text-lg font-semibold text-white">Import Quiz Questions</h2>
        </div>

        <div className="grid gap-4">
          {/* Title and Category side by side */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="quizTitle" className="text-white">Quiz Title</Label>
              <Input
                id="quizTitle"
                placeholder="Enter quiz title"
                value={quizTitle}
                onChange={(e) => setQuizTitle(e.target.value)}
                className="bg-[#1A4F3F]/50 border-none text-white placeholder:text-white/50"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="category" className="text-white">Quiz Category</Label>
              <Input
                id="category"
                placeholder="Enter category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="bg-[#1A4F3F]/50 border-none text-white placeholder:text-white/50"
              />
            </div>
          </div>

          <div className="flex gap-4">
            <div className="flex-1">
              <Input
                id="csv-file"
                type="file"
                accept=".csv"
                onChange={handleFileSelect}
                disabled={isUploading}
                className="bg-[#1A4F3F]/50 border-none text-white file:bg-green-400 file:text-gray-900"
              />
            </div>
            <Button
              onClick={handleImport}
              disabled={isUploading || !selectedFile}
              className="bg-green-500 hover:bg-green-600 text-white min-w-[100px]"
            >
              {isUploading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                'Import'
              )}
            </Button>
          </div>

          <div className="bg-[#1A4F3F]/50 rounded-lg p-4 text-sm text-white/80">
            <p className="font-medium mb-2">CSV Format:</p>
            <code className="block whitespace-pre">
              Question,Option A,Option B,Option C,Option D,Correct Answer
            </code>
            <p className="mt-2">Note: Correct Answer must be A, B, C, or D</p>
          </div>
        </div>
      </div>
    </Card>
  );
}