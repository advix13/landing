'use client';

import { useState, useEffect } from 'react';
import { Brain, Volume2, VolumeX } from 'lucide-react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { readQuizQuestion, readFeedback, stopSpeech } from '@/lib/speech';
import { playSound } from '@/lib/sounds';
import { Question } from '@/lib/store';

interface QuizGameProps {
  questions: Question[];
}

export function QuizGame({ questions }: QuizGameProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [timeLeft, setTimeLeft] = useState(12);
  const [isAnswerRevealed, setIsAnswerRevealed] = useState(false);
  const [score, setScore] = useState(0);
  const [isRevealing, setIsRevealing] = useState(false);
  const [isSpeechEnabled, setIsSpeechEnabled] = useState(true);

  const currentQuestion = questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex) / questions.length) * 100;
  const isLastQuestion = currentQuestionIndex === questions.length - 1;

  useEffect(() => {
    if (timeLeft > 0 && !selectedAnswer && !isAnswerRevealed) {
      const timer = setTimeout(() => {
        setTimeLeft(prev => prev - 1);
        playSound('tick', 0.3);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && !isAnswerRevealed) {
      revealAnswer();
    }
  }, [timeLeft, selectedAnswer, isAnswerRevealed]);

  useEffect(() => {
    if (isAnswerRevealed && !isLastQuestion) {
      const timer = setTimeout(() => {
        handleNext();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isAnswerRevealed, isLastQuestion]);

  useEffect(() => {
    if (isSpeechEnabled && !isAnswerRevealed && currentQuestion) {
      readQuizQuestion(currentQuestion.subtitle, currentQuestion.options);
    }
  }, [currentQuestionIndex, isSpeechEnabled, currentQuestion]);

  const handleAnswerSelect = (option: string, index: number) => {
    if (!isAnswerRevealed && currentQuestion) {
      const answerLetter = String.fromCharCode(65 + index);
      setSelectedAnswer(answerLetter);
      revealAnswer(answerLetter);
      setIsRevealing(true);
      setTimeout(() => setIsRevealing(false), 500);
    }
  };

  const revealAnswer = (selectedLetter?: string) => {
    if (!currentQuestion) return;
    
    setIsAnswerRevealed(true);
    const isCorrect = selectedLetter === currentQuestion.correctAnswer;
    
    if (isCorrect) {
      setScore(prev => prev + 1);
      playSound('correct', 0.5);
    } else {
      playSound('wrong', 0.5);
    }
    
    if (isSpeechEnabled) {
      readFeedback(
        isCorrect,
        currentQuestion.options[currentQuestion.correctAnswer.charCodeAt(0) - 65]
      );
    }
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      stopSpeech();
      playSound('transition', 0.4);
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedAnswer(null);
      setIsAnswerRevealed(false);
      setTimeLeft(12);
    }
  };

  const toggleSpeech = () => {
    if (isSpeechEnabled) {
      stopSpeech();
    } else if (currentQuestion) {
      readQuizQuestion(currentQuestion.subtitle, currentQuestion.options);
    }
    setIsSpeechEnabled(!isSpeechEnabled);
  };

  const getOptionStyle = (option: string, index: number) => {
    if (!currentQuestion) return '';
    
    const optionLetter = String.fromCharCode(65 + index);
    if (!isAnswerRevealed) {
      return selectedAnswer === optionLetter ? 'bg-purple-600 text-white' : '';
    }
    if (optionLetter === currentQuestion.correctAnswer) {
      return 'bg-green-500 text-white answer-correct';
    }
    if (selectedAnswer === optionLetter && optionLetter !== currentQuestion.correctAnswer) {
      return 'bg-red-500 text-white';
    }
    return 'opacity-50';
  };

  if (!currentQuestion) {
    return (
      <Card className="p-6 bg-[#0A2F1F]/80 border-none">
        <div className="text-center text-white">
          <h2 className="text-xl font-semibold mb-4">No Questions Available</h2>
          <p>Import some questions using the CSV uploader above to start the quiz!</p>
        </div>
      </Card>
    );
  }

  return (
    <div className="max-w-3xl mx-auto">
      <div className="bg-[#0A2F1F]/90 rounded-lg p-6 mb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Brain className="h-8 w-8 text-green-400" />
            <h1 className="text-lg font-bold text-white">{currentQuestion.title}</h1>
          </div>
          <div className="flex items-center gap-6">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleSpeech}
              className="text-white hover:text-green-400"
            >
              {isSpeechEnabled ? (
                <Volume2 className="h-6 w-6" />
              ) : (
                <VolumeX className="h-6 w-6" />
              )}
            </Button>
            <div className="text-lg font-semibold text-white">
              Score: {score}/{questions.length}
            </div>
            <div className="text-lg font-semibold text-white">
              {!isAnswerRevealed ? `Time: ${timeLeft}s` : ''}
            </div>
          </div>
        </div>
        
        <div className="progress-bar mt-4">
          <div 
            className="progress-bar-fill"
            style={{ 
              width: `${!isAnswerRevealed ? (timeLeft / 12) * 100 : 0}%`
            }}
          />
        </div>
      </div>

      <Card className="p-6 bg-[#0A2F1F]/80 border-none">
        <div className="space-y-6">
          <h2 className="text-xl font-semibold text-white text-center">
            {currentQuestion.subtitle}
          </h2>

          <div className="space-y-6">
            {currentQuestion.image && (
              <div className="relative h-80 rounded-lg overflow-hidden">
                <Image
                  src={currentQuestion.image}
                  alt="Question"
                  fill
                  className={cn(
                    "object-cover object-center",
                    isRevealing ? "opacity-0 scale-95" : "opacity-100 scale-100"
                  )}
                  sizes="(max-width: 768px) 100vw, 800px"
                  priority
                />
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {currentQuestion.options.map((option, index) => (
                <div
                  key={option}
                  className="flex"
                  onClick={() => handleAnswerSelect(option, index)}
                >
                  <div className="w-14 h-14 bg-[#4BDE80] flex items-center justify-center flex-shrink-0">
                    <span className="text-lg font-bold text-black">
                      {String.fromCharCode(65 + index)}
                    </span>
                  </div>
                  <div
                    className={cn(
                      "h-14 flex-1 flex items-center px-5 cursor-pointer",
                      "bg-[#1A4F3F] hover:bg-[#266F47] text-white text-lg",
                      "transition-all duration-300",
                      isAnswerRevealed && "pointer-events-none",
                      getOptionStyle(option, index)
                    )}
                  >
                    <span className="text-left">{option}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {isAnswerRevealed && isLastQuestion && (
            <div className="text-center mt-6">
              <h3 className="text-xl font-bold text-white mb-2">Quiz Completed!</h3>
              <p className="text-lg text-white">Final Score: {score}/{questions.length}</p>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
}