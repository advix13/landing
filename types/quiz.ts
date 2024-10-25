export interface Quiz {
  id: string;
  title: string;
  description?: string;
  category: string;
  questions: Question[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Question {
  id: string;
  title: string;
  subtitle: string;
  image?: string;
  options: string[];
  correctAnswer: string;
}

export type QuizWithStats = Quiz & {
  totalPlays: number;
  averageScore: number;
}