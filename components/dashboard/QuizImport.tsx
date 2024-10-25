'use client';

import { useState } from 'react';
import { Upload, FileType, Image as ImageIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export function QuizImport() {
  const { toast } = useToast();
  const [isUploading, setIsUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState('');

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

    if (!selectedCategory) {
      toast({
        title: 'Category required',
        description: 'Please select a category for the quiz',
        variant: 'destructive',
      });
      return;
    }

    setIsUploading(true);
    setProgress(0);

    const formData = new FormData();
    formData.append('file', file);
    formData.append('category', selectedCategory);

    try {
      // Simulate progress
      const progressInterval = setInterval(() => {
        setProgress(prev => Math.min(prev + 10, 90));
      }, 500);

      const response = await fetch('/api/quiz/import', {
        method: 'POST',
        body: formData,
      });

      clearInterval(progressInterval);
      setProgress(100);

      if (!response.ok) throw new Error('Upload failed');

      const data = await response.json();

      toast({
        title: 'Success!',
        description: `Imported ${data.count} questions with images.`,
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to import questions',
        variant: 'destructive',
      });
    } finally {
      setTimeout(() => {
        setIsUploading(false);
        setProgress(0);
      }, 1000);
    }
  };

  return (
    <Card className="p-6">
      <h2 className="text-xl font-semibold mb-4">Import Quiz</h2>
      
      <div className="space-y-4">
        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
          <SelectTrigger>
            <SelectValue placeholder="Select category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="geography">Geography</SelectItem>
            <SelectItem value="history">History</SelectItem>
          </SelectContent>
        </Select>

        <div className="border-2 border-dashed border-gray-200 rounded-lg p-6">
          <div className="flex flex-col items-center gap-4">
            <div className="p-4 bg-primary/10 rounded-full">
              <Upload className="h-8 w-8 text-primary" />
            </div>
            
            <div className="text-center">
              <h3 className="font-semibold">Upload CSV File</h3>
              <p className="text-sm text-muted-foreground mt-1">
                CSV format: question, image_description, option1, option2, option3, option4
              </p>
            </div>

            <input
              type="file"
              accept=".csv"
              onChange={handleFileUpload}
              className="hidden"
              id="csv-upload"
              disabled={isUploading}
            />
            
            <label htmlFor="csv-upload">
              <Button variant="outline" className="cursor-pointer" disabled={isUploading}>
                <FileType className="h-4 w-4 mr-2" />
                {isUploading ? 'Uploading...' : 'Choose CSV File'}
              </Button>
            </label>
          </div>
        </div>

        {isUploading && (
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Importing questions & fetching images...</span>
              <span className="font-medium">{progress}%</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        )}

        <div className="bg-secondary/50 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <ImageIcon className="h-5 w-5 text-primary mt-0.5" />
            <div className="text-sm">
              <p className="font-medium">Image Description Format</p>
              <p className="text-muted-foreground mt-1">
                Add clear, specific image descriptions in your CSV. Example: &quot;aerial view of berlin brandenburg gate germany&quot;
              </p>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}