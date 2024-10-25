'use client';

import { useState } from 'react';
import { Upload } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

export function FileUpload() {
  const { toast } = useToast();
  const [isUploading, setIsUploading] = useState(false);

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
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) throw new Error('Upload failed');

      toast({
        title: 'Success!',
        description: 'Questions have been imported successfully.',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to upload questions',
        variant: 'destructive',
      });
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="flex flex-col items-center gap-4 mb-8">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <div className="flex flex-col items-center gap-4">
          <Upload className="h-12 w-12 text-gray-400" />
          <h2 className="text-xl font-semibold text-gray-700">Upload Questions</h2>
          <p className="text-sm text-gray-500 text-center">
            Upload your CSV file with questions and answers
          </p>
          <input
            type="file"
            accept=".csv"
            onChange={handleFileUpload}
            className="hidden"
            id="file-upload"
          />
          <label htmlFor="file-upload">
            <Button
              variant="outline"
              className="cursor-pointer"
              disabled={isUploading}
            >
              {isUploading ? 'Uploading...' : 'Choose CSV File'}
            </Button>
          </label>
        </div>
      </div>
    </div>
  );
}