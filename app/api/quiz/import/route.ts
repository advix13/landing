import { NextResponse } from 'next/server';

async function getImageForQuestion(question: string, correctAnswerText: string): Promise<string> {
  try {
    // Create a comprehensive mapping of keywords to high-quality images
    const imageMapping: Record<string, string> = {
      // Capital Cities
      'berlin': 'https://images.unsplash.com/photo-1599946347371-68eb71b16afc',
      'paris': 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34',
      'rome': 'https://images.unsplash.com/photo-1552832230-c0197dd311b5',
      'london': 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad',
      'madrid': 'https://images.unsplash.com/photo-1539037116277-4db20889f2d4',
      'moscow': 'https://images.unsplash.com/photo-1513326738677-b964603b136d',
      'tokyo': 'https://images.unsplash.com/photo-1536098561742-ca998e48cbcc',
      'beijing': 'https://images.unsplash.com/photo-1508804052814-cd3ba865a116',
      'washington': 'https://images.unsplash.com/photo-1501466044931-62695578c499',
      'ottawa': 'https://images.unsplash.com/photo-1503883704091-524d71994521',
      'canberra': 'https://images.unsplash.com/photo-1528072164453-f4e8ef0d475a',
      
      // Famous Landmarks
      'eiffel tower': 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34',
      'big ben': 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad',
      'colosseum': 'https://images.unsplash.com/photo-1552832230-c0197dd311b5',
      'taj mahal': 'https://images.unsplash.com/photo-1564507592333-c60657eea523',
      'great wall': 'https://images.unsplash.com/photo-1508804052814-cd3ba865a116',
      'statue of liberty': 'https://images.unsplash.com/photo-1492666673288-3c4b4576ad9a',
      'pyramids': 'https://images.unsplash.com/photo-1503177119275-0aa32b3a9368',
      
      // Countries
      'germany': 'https://images.unsplash.com/photo-1554072675-d8dc9c7c7ca2',
      'france': 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34',
      'italy': 'https://images.unsplash.com/photo-1552832230-c0197dd311b5',
      'spain': 'https://images.unsplash.com/photo-1539037116277-4db20889f2d4',
      'russia': 'https://images.unsplash.com/photo-1513326738677-b964603b136d',
      'china': 'https://images.unsplash.com/photo-1508804052814-cd3ba865a116',
      'japan': 'https://images.unsplash.com/photo-1536098561742-ca998e48cbcc',
      'india': 'https://images.unsplash.com/photo-1564507592333-c60657eea523',
      
      // Geography Categories
      'capital': 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df',
      'landmark': 'https://images.unsplash.com/photo-1552832230-c0197dd311b5',
      'river': 'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4',
      'mountain': 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b',
      'ocean': 'https://images.unsplash.com/photo-1439405326854-014607f694d7',
      'desert': 'https://images.unsplash.com/photo-1509316785289-025f5b846b35',
      'forest': 'https://images.unsplash.com/photo-1511497584788-876760111969',
      'continent': 'https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1',
      'map': 'https://images.unsplash.com/photo-1524661135-423995f22d0b',
    };

    // Combine question and correct answer for better context
    const searchText = `${question} ${correctAnswerText}`.toLowerCase();
    
    // First, try to find an exact match from the combined text
    for (const [key, url] of Object.entries(imageMapping)) {
      if (searchText.includes(key)) {
        return url;
      }
    }

    // If no exact match, try matching just the correct answer
    const correctAnswerLower = correctAnswerText.toLowerCase();
    for (const [key, url] of Object.entries(imageMapping)) {
      if (correctAnswerLower.includes(key)) {
        return url;
      }
    }

    // If still no match, try to determine the type of question
    if (searchText.includes('capital') || searchText.includes('city')) {
      return imageMapping['capital'];
    } else if (searchText.includes('landmark') || searchText.includes('monument')) {
      return imageMapping['landmark'];
    } else if (searchText.includes('river') || searchText.includes('water')) {
      return imageMapping['river'];
    } else if (searchText.includes('mountain') || searchText.includes('peak')) {
      return imageMapping['mountain'];
    }

    // Default to a generic geography image
    return imageMapping['map'];

  } catch (error) {
    console.error('Image fetch error:', error);
    return 'https://images.unsplash.com/photo-1524661135-423995f22d0b';
  }
}

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    const category = formData.get('category') as string;
    const quizTitle = formData.get('quizTitle') as string;
    
    if (!file || !category || !quizTitle) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const text = await file.text();
    const rows = text.split('\n')
      .map(row => row.split(',').map(cell => cell.trim()))
      .filter(row => row.length >= 6); // Ensure we have all required fields
    
    // Remove header row if present
    if (rows[0][0].toLowerCase().includes('question')) {
      rows.shift();
    }
    
    // Process questions
    const questions = await Promise.all(rows.map(async ([question, optionA, optionB, optionC, optionD, correctAnswer]) => {
      const options = [optionA, optionB, optionC, optionD];
      const correctAnswerIndex = correctAnswer.toUpperCase().charCodeAt(0) - 65;
      const correctAnswerText = options[correctAnswerIndex];
      
      const imageUrl = await getImageForQuestion(question, correctAnswerText);

      return {
        title: quizTitle,
        category: category,
        subtitle: question,
        image: imageUrl,
        options: options,
        correctAnswer: correctAnswer.toUpperCase()
      };
    }));

    return NextResponse.json({ 
      success: true, 
      count: questions.length,
      questions
    });
  } catch (error) {
    console.error('Import error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to process import' },
      { status: 500 }
    );
  }
}