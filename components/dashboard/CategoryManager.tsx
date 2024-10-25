'use client';

import { useState } from 'react';
import { Plus, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { useQuizStore } from '@/lib/store';
import { useToast } from '@/hooks/use-toast';

export function CategoryManager() {
  const [newCategory, setNewCategory] = useState('');
  const { categories, addCategory, removeCategory } = useQuizStore();
  const { toast } = useToast();

  const handleAddCategory = () => {
    if (!newCategory.trim()) {
      toast({
        title: 'Invalid Category',
        description: 'Please enter a category name',
        variant: 'destructive',
      });
      return;
    }

    if (categories.includes(newCategory.trim())) {
      toast({
        title: 'Duplicate Category',
        description: 'This category already exists',
        variant: 'destructive',
      });
      return;
    }

    addCategory(newCategory.trim());
    setNewCategory('');
    toast({
      title: 'Success',
      description: 'Category added successfully',
    });
  };

  const handleRemoveCategory = (category: string) => {
    removeCategory(category);
    toast({
      title: 'Success',
      description: 'Category removed successfully',
    });
  };

  return (
    <Card className="p-6 bg-[#0A2F1F] border-none">
      <div className="space-y-4">
        <h2 className="text-lg font-semibold text-white">Categories</h2>
        
        <div className="flex gap-2">
          <Input
            placeholder="New category name"
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleAddCategory()}
            className="bg-[#1A4F3F] border-none text-white placeholder:text-white/50"
          />
          <Button onClick={handleAddCategory} className="bg-green-500 hover:bg-green-600">
            <Plus className="h-4 w-4 mr-2" />
            Add
          </Button>
        </div>

        <div className="space-y-2">
          {categories.map((category) => (
            <div
              key={category}
              className="flex items-center justify-between p-3 bg-[#1A4F3F] rounded-lg"
            >
              <span className="text-white">{category}</span>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleRemoveCategory(category)}
                className="text-red-400 hover:text-red-300 hover:bg-red-400/10"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}