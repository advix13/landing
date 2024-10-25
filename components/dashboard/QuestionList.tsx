'use client';

import { useState, useMemo } from 'react';
import { Pencil, Trash2, ChevronLeft, ChevronRight } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Input } from '@/components/ui/input';
import { useQuizStore } from '@/lib/store';
import { useToast } from '@/hooks/use-toast';
import Image from 'next/image';

const ITEMS_PER_PAGE = 20;

export function QuestionList() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedQuizTitle, setSelectedQuizTitle] = useState('all');
  const [categorySearch, setCategorySearch] = useState('');
  const [titleSearch, setTitleSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const { questions, categories } = useQuizStore();
  const { toast } = useToast();

  // Get unique quiz titles
  const quizTitles = useMemo(() => {
    return [...new Set(questions.map(q => q.title))];
  }, [questions]);

  // Filter categories based on search
  const filteredCategories = useMemo(() => {
    return categories.filter(category => 
      category.toLowerCase().includes(categorySearch.toLowerCase())
    );
  }, [categories, categorySearch]);

  // Filter titles based on search
  const filteredTitles = useMemo(() => {
    return quizTitles.filter(title => 
      title.toLowerCase().includes(titleSearch.toLowerCase())
    );
  }, [quizTitles, titleSearch]);

  // Filter questions based on selected filters
  const filteredQuestions = useMemo(() => {
    return questions.filter(question => {
      const matchesCategory = selectedCategory === 'all' || question.category === selectedCategory;
      const matchesTitle = selectedQuizTitle === 'all' || question.title === selectedQuizTitle;
      return matchesCategory && matchesTitle;
    });
  }, [questions, selectedCategory, selectedQuizTitle]);

  // Pagination
  const totalPages = Math.ceil(filteredQuestions.length / ITEMS_PER_PAGE);
  const paginatedQuestions = filteredQuestions.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handlePageChange = (newPage: number) => {
    setCurrentPage(Math.max(1, Math.min(newPage, totalPages)));
  };

  return (
    <Card className="p-6 bg-[#0A2F1F]/90 border-none">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-white">Quiz Questions</h2>
          
          {/* Pagination Controls */}
          <div className="flex items-center gap-2">
            <span className="text-sm text-white/70">
              {filteredQuestions.length} questions | Page {currentPage} of {totalPages || 1}
            </span>
            <div className="flex gap-1">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="h-8 w-8 text-white hover:bg-[#1A4F3F]"
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages || totalPages === 0}
                className="h-8 w-8 text-white hover:bg-[#1A4F3F]"
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label className="text-white">Filter by Category</Label>
            <Select
              value={selectedCategory}
              onValueChange={setSelectedCategory}
            >
              <SelectTrigger className="bg-[#1A4F3F]/50 border-none text-white">
                <SelectValue placeholder="All Categories" />
              </SelectTrigger>
              <SelectContent className="bg-[#0A2F1F] border-[#1A4F3F]">
                <div className="p-2">
                  <Input
                    placeholder="Search categories..."
                    value={categorySearch}
                    onChange={(e) => setCategorySearch(e.target.value)}
                    className="bg-[#1A4F3F]/50 border-none text-white placeholder:text-white/50 mb-2"
                  />
                </div>
                <SelectItem value="all" className="text-white hover:bg-green-500 hover:text-black focus:bg-green-500 focus:text-black">
                  All Categories
                </SelectItem>
                <ScrollArea className="h-[200px]">
                  {filteredCategories.map((category) => (
                    <SelectItem 
                      key={category} 
                      value={category}
                      className="text-white hover:bg-green-500 hover:text-black focus:bg-green-500 focus:text-black"
                    >
                      {category}
                    </SelectItem>
                  ))}
                </ScrollArea>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label className="text-white">Filter by Quiz Title</Label>
            <Select
              value={selectedQuizTitle}
              onValueChange={setSelectedQuizTitle}
            >
              <SelectTrigger className="bg-[#1A4F3F]/50 border-none text-white">
                <SelectValue placeholder="All Quizzes" />
              </SelectTrigger>
              <SelectContent className="bg-[#0A2F1F] border-[#1A4F3F]">
                <div className="p-2">
                  <Input
                    placeholder="Search quiz titles..."
                    value={titleSearch}
                    onChange={(e) => setTitleSearch(e.target.value)}
                    className="bg-[#1A4F3F]/50 border-none text-white placeholder:text-white/50 mb-2"
                  />
                </div>
                <SelectItem value="all" className="text-white hover:bg-green-500 hover:text-black focus:bg-green-500 focus:text-black">
                  All Quizzes
                </SelectItem>
                <ScrollArea className="h-[200px]">
                  {filteredTitles.map((title) => (
                    <SelectItem 
                      key={title} 
                      value={title}
                      className="text-white hover:bg-green-500 hover:text-black focus:bg-green-500 focus:text-black"
                    >
                      {title}
                    </SelectItem>
                  ))}
                </ScrollArea>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Questions List */}
        <div className="space-y-4">
          {paginatedQuestions.length === 0 ? (
            <div className="text-center text-white/70 py-8">
              No questions available. Import some questions using the CSV uploader above.
            </div>
          ) : (
            paginatedQuestions.map((question) => (
              <Card key={question.id} className="p-4 bg-[#1A4F3F]/50 border-none">
                <div className="grid grid-cols-[240px,1fr] gap-6">
                  {/* Image Section */}
                  <div className="relative h-[160px] rounded-lg overflow-hidden bg-black/20">
                    {question.image && (
                      <Image
                        src={question.image}
                        alt={question.subtitle}
                        fill
                        className="object-cover object-center"
                        sizes="(max-width: 768px) 100vw, 240px"
                        priority
                      />
                    )}
                  </div>

                  {/* Question Details */}
                  <div className="space-y-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="text-lg font-medium text-white">{question.subtitle}</h3>
                        <p className="text-sm text-white/70">
                          Category: {question.category} | Quiz: {question.title}
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-white hover:text-green-400 hover:bg-green-400/10"
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-white hover:text-red-400 hover:bg-red-400/10"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      {question.options.map((option, index) => (
                        <div
                          key={index}
                          className={`p-2 rounded ${
                            String.fromCharCode(65 + index) === question.correctAnswer
                              ? 'bg-green-500/20 text-green-400'
                              : 'bg-[#0A2F1F]/50 text-white/70'
                          }`}
                        >
                          {String.fromCharCode(65 + index)}. {option}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </Card>
            ))
          )}
        </div>
      </div>
    </Card>
  );
}