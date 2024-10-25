import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Question {
  id: string;
  title: string;
  category: string;
  subtitle: string;
  image?: string;
  options: string[];
  correctAnswer: string;
}

interface QuizStore {
  questions: Question[];
  categories: string[];
  addQuestions: (newQuestions: Question[]) => void;
  updateQuestion: (id: string, updates: Partial<Omit<Question, 'id'>>) => void;
  deleteQuestion: (id: string) => void;
  addCategory: (category: string) => void;
  removeCategory: (category: string) => void;
}

// Sample questions
const sampleQuestions: Question[] = [
  {
    id: '1',
    title: 'Country Names Geo Quiz',
    category: 'Geography',
    subtitle: 'What is the capital city of the USA?',
    image: 'https://images.unsplash.com/photo-1501466044931-62695578c499',
    options: ['Washington D.C.', 'New York', 'Los Angeles', 'Chicago'],
    correctAnswer: 'A'
  },
  {
    id: '2',
    title: 'European Capitals',
    category: 'Geography',
    subtitle: 'What is the capital of France?',
    image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34',
    options: ['Paris', 'London', 'Berlin', 'Madrid'],
    correctAnswer: 'A'
  },
  {
    id: '3',
    title: 'World History',
    category: 'History',
    subtitle: 'Who was the first President of the United States?',
    image: 'https://images.unsplash.com/photo-1551523713-c1473aa01d9f',
    options: ['George Washington', 'Thomas Jefferson', 'John Adams', 'Benjamin Franklin'],
    correctAnswer: 'A'
  },
  {
    id: '4',
    title: 'Science Quiz',
    category: 'Science',
    subtitle: 'What is the chemical symbol for Gold?',
    image: 'https://images.unsplash.com/photo-1576086213369-97a306d36557',
    options: ['Au', 'Ag', 'Fe', 'Cu'],
    correctAnswer: 'A'
  },
  {
    id: '5',
    title: 'Art History',
    category: 'Art',
    subtitle: 'Who painted the Mona Lisa?',
    image: 'https://images.unsplash.com/photo-1544333323-ce9b8c9be165',
    options: ['Leonardo da Vinci', 'Michelangelo', 'Raphael', 'Donatello'],
    correctAnswer: 'A'
  },
  {
    id: '6',
    title: 'Music Legends',
    category: 'Music',
    subtitle: 'Which band performed "Hey Jude"?',
    image: 'https://images.unsplash.com/photo-1511735111819-9a3f7709049c',
    options: ['The Beatles', 'The Rolling Stones', 'Led Zeppelin', 'Pink Floyd'],
    correctAnswer: 'A'
  }
];

export const useQuizStore = create<QuizStore>()(
  persist(
    (set) => ({
      questions: sampleQuestions,
      categories: ['Geography', 'History', 'Science', 'Art', 'Music', 'Entertainment', 'Literature', 'Sports'],
      addQuestions: (newQuestions) => set((state) => ({
        questions: [
          ...state.questions,
          ...newQuestions.map(q => ({
            ...q,
            id: crypto.randomUUID()
          }))
        ]
      })),
      updateQuestion: (id, updates) => set((state) => ({
        questions: state.questions.map(question =>
          question.id === id ? { ...question, ...updates } : question
        )
      })),
      deleteQuestion: (id) => set((state) => ({
        questions: state.questions.filter(question => question.id !== id)
      })),
      addCategory: (category) => set((state) => ({
        categories: [...new Set([...state.categories, category])]
      })),
      removeCategory: (category) => set((state) => ({
        categories: state.categories.filter(c => c !== category)
      }))
    }),
    {
      name: 'quiz-storage',
      version: 1,
    }
  )
);