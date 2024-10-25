import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    
    if (!file) {
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      );
    }

    const text = await file.text();
    const rows = text.split('\n').map(row => row.split(','));
    
    // Process CSV data
    const questions = rows.slice(1).map((row, index) => ({
      id: index + 1,
      question: row[0],
      image: row[1] || undefined,
      options: [row[2], row[3], row[4], row[5]],
      correctAnswer: row[2], // Assuming first option is correct
    }));

    // In a real app, you would save this to a database
    // For now, we'll just return success
    return NextResponse.json({ success: true, count: questions.length });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to process file' },
      { status: 500 }
    );
  }
}