import { NextResponse } from 'next/server';

// Mock data for development
const mockQuizzes = [
  {
    id: '1',
    title: 'World Capitals',
    category: 'Geography',
    questions: [
      {
        id: '1',
        title: 'Capitals',
        subtitle: 'What is the capital of Germany?',
        options: ['Berlin', 'Paris', 'Madrid', 'Rome'],
        correctAnswer: 'A'
      }
    ],
    totalPlays: 150,
    averageScore: 85.5,
    createdAt: new Date().toISOString()
  }
];

export async function GET() {
  try {
    return NextResponse.json({ 
      success: true,
      quizzes: mockQuizzes 
    });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json(
      { 
        success: false,
        error: 'Failed to fetch quizzes' 
      },
      { status: 500 }
    );
  }
}