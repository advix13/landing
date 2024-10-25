'use client';

import { useState } from 'react';
import { Plus, Folder } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';

interface Category {
  id: string;
  name: string;
  quizCount: number;
}

export function QuizCategories() {
  const [categories, setCategories] = useState<Category[]>([
    { id: '1', name: 'Geography', quizCount: 2 },
    { id: '2', name: 'History', quizCount: 0 },
  ]);
  const [newCategory, setNewCategory] = useState('');

  const handleAddCategory = () => {
    if (newCategory.trim()) {
      setCategories([
        ...categories,
        {
          id: Date.now().toString(),
          name: newCategory.trim(),
          quizCount: 0,
        },
      ]);
      setNewCategory('');
    }
  };

  return (
    <Card className="p-6">
      <h2 className="text-xl font-semibold mb-4">Quiz Categories</h2>
      
      <div className="flex gap-2 mb-4">
        <Input
          placeholder="New category name"
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleAddCategory()}
        />
        <Button onClick={handleAddCategory}>
          <Plus className="h-4 w-4 mr-2" />
          Add
        </Button>
      </div>

      <ScrollArea className="h-[400px] pr-4">
        <div className="space-y-2">
          {categories.map((category) => (
            <div
              key={category.id}
              className="flex items-center justify-between p-3 bg-secondary rounded-lg hover:bg-secondary/80 transition-colors"
            >
              <div className="flex items-center gap-2">
                <Folder className="h-4 w-4 text-primary" />
                <span>{category.name}</span>
              </div>
              <span className="text-sm text-muted-foreground">
                {category.quizCount} {category.quizCount === 1 ? 'quiz' : 'quizzes'}
              </span>
            </div>
          ))}
        </div>
      </ScrollArea>
    </Card>
  );
}