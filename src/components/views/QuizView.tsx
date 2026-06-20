/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { QuizItem, LessonQuestion } from '../../types';
import { 
  HelpCircle, 
  CheckCircle2, 
  AlertTriangle, 
  RotateCcw, 
  Coins, 
  Compass, 
  Play, 
  Award,
  ChevronRight,
  BookOpen
} from 'lucide-react';

export default function QuizView() {
  const { quizzes, completeQuiz } = useApp();
  
  const [selectedQuiz, setSelectedQuiz] = useState<QuizItem | null>(null);
  const [activeQuestionIdx, setActiveQuestionIdx] = useState<number>(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isAnswerChecked, setIsAnswerChecked] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0); // correct count
  const [quizFinished, setQuizFinished] = useState<boolean>(false);
  const [hasClaimed, setHasClaimed] = useState<boolean>(false);

  // Group quizzes by Category
  const categories = Array.from(new Set(quizzes.map(q => q.category)));

  const handleStartQuiz = (quiz: QuizItem) => {
    setSelectedQuiz(quiz);
    setActiveQuestionIdx(0);
    setSelectedAnswer(null);
    setIsAnswerChecked(false);
    setScore(0);
    setQuizFinished(false);
    setHasClaimed(false);
  };

  const handleOptionSelect = (option: string) => {
    if (isAnswerChecked) return;
    setSelectedAnswer(option);
  };

  const currentQuestion: LessonQuestion | null = selectedQuiz 
    ? selectedQuiz.questions[activeQuestionIdx] 
    : null;

  const handleCheckAnswer = () => {
    if (!currentQuestion || !selectedAnswer || isAnswerChecked) return;
    
    setIsAnswerChecked(true);
    if (selectedAnswer === currentQuestion.correctAnswer) {
      setScore(s => s + 1);
    }
  };

  const handleNextQuestion = () => {
    if (!selectedQuiz) return;
    const nextIdx = activeQuestionIdx + 1;
    if (nextIdx < selectedQuiz.questions.length) {
      setActiveQuestionIdx(nextIdx);
      setSelectedAnswer(null);
      setIsAnswerChecked(false);
    } else {
      setQuizFinished(true);
    }
  };

  const handleClaimQuizCoins = async () => {
    if (!selectedQuiz || hasClaimed) return;
    
    // Require at least 60% correct to clear reward
    const requiredToPass = Math.ceil(selectedQuiz.questions.length * 0.6);
    if (score >= requiredToPass) {
      await completeQuiz(selectedQuiz.id, selectedQuiz.reward);
      setHasClaimed(true);
    }
  };

  return (
    <div className="space-y-6" id="quiz-view-wrapper">
      
      {/* HEADER HERO SUMMARY */}
      <div className="bg-gradient-to-r from-emerald-600 to-teal-600 rounded-2xl p-6 text-white border border-teal-500/20 shadow-lg relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 blur-xl rounded-full" />
        <h2 className="text-2xl font-black tracking-tight flex items-center gap-1.5">
          <BookOpen className="w-5 h-5 text-yellow-300" /> Trivia Earning Quiz
        </h2>
        <p className="text-xs text-teal-100 mt-1">
          Answer multiple choice questions on Computer Science, Islam, Math, technology, and General Knowledge. Secure 60% passing scores to credit coins.
        </p>
      </div>

      {/* QUIZ SELECTION DASHBOARD BOARD */}
      {!selectedQuiz ? (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {quizzes.slice(0, 15).map(quiz => (
              <div 
                key={quiz.id} 
                className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 p-5 rounded-2xl flex flex-col justify-between group hover:shadow-md transition relative"
              >
                <div className="flex justify-between items-start mb-3">
                  <span className="px-2.5 py-0.5 bg-indigo-50 dark:bg-slate-950 text-indigo-600 dark:text-indigo-400 text-[10px] font-black uppercase tracking-wider rounded-full border border-indigo-100 dark:border-slate-850">
                    {quiz.category}
                  </span>
                  <span className="text-yellow-500 font-extrabold flex items-center gap-1 font-mono text-sm leading-none">
                    💰 {quiz.reward} Coins
                  </span>
                </div>

                <div className="space-y-1 mb-4">
                  <h4 className="text-sm font-black text-slate-800 dark:text-white leading-tight">
                    {quiz.title}
                  </h4>
                  <p className="text-xs text-slate-400">
                    Test contains {quiz.questions.length} questions. High rewards enabled.
                  </p>
                </div>

                <button
                  onClick={() => handleStartQuiz(quiz)}
                  className="w-full py-2 bg-slate-905 dark:bg-slate-950 hover:bg-slate-100 border border-slate-200 dark:border-slate-800 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold text-xs rounded-xl cursor-pointer flex items-center justify-center gap-1 transition"
                >
                  <Play className="w-3.5 h-3.5 fill-current" /> Start Challenge
                </button>
              </div>
            ))}
          </div>
        </div>
      ) : (
        /* QUIZ ACTIVE SCREEN GAME */
        <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 p-6 rounded-2xl space-y-6 shadow-md relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-indigo-500/5 to-transparent blur-xl" />

          {/* Active status */}
          <div className="flex justify-between items-center text-xs text-slate-400">
            <span className="font-bold uppercase tracking-wider text-indigo-500">
              {selectedQuiz.category} — Challenge mode
            </span>
            <span>
              Question <strong className="text-slate-700 dark:text-slate-200">{activeQuestionIdx + 1}</strong> of <strong className="text-slate-700 dark:text-slate-200">{selectedQuiz.questions.length}</strong>
            </span>
          </div>

          {/* Progress bar */}
          <div className="w-full bg-slate-100 dark:bg-slate-950 h-2.5 rounded-full overflow-hidden">
            <div 
              className="bg-indigo-600 h-full transition-all duration-300"
              style={{ width: `${((activeQuestionIdx + 1) / selectedQuiz.questions.length) * 100}%` }}
            />
          </div>

          {currentQuestion && (
            <div className="space-y-6">
              {/* Question Text */}
              <h3 className="text-lg font-black text-slate-800 dark:text-white leading-tight">
                {currentQuestion.question}
              </h3>

              {/* Options Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                {currentQuestion.options.map((option, oIdx) => {
                  const isSelected = selectedAnswer === option;
                  const isCorrect = option === currentQuestion.correctAnswer;
                  
                  // Color highlights based on selection & check state
                  let styleClass = "border-slate-150 bg-slate-50 dark:bg-slate-950 dark:border-slate-850 text-slate-700 dark:text-slate-300 hover:border-slate-300 hover:bg-slate-100 cursor-pointer";
                  if (isSelected) {
                    styleClass = "bg-indigo-50 dark:bg-indigo-950 border-indigo-500 text-indigo-700 dark:text-indigo-400 ring-2 ring-indigo-500/20";
                  }
                  if (isAnswerChecked) {
                    if (isCorrect) {
                      styleClass = "bg-emerald-500/10 border-emerald-500 text-emerald-600 dark:text-emerald-400 font-extrabold cursor-default";
                    } else if (isSelected) {
                      styleClass = "bg-rose-500/10 border-rose-500 text-rose-600 dark:text-rose-450 cursor-default";
                    } else {
                      styleClass = "bg-slate-100/50 dark:bg-slate-950/50 border-slate-200 dark:border-slate-850/50 text-slate-400 dark:text-slate-600 cursor-default";
                    }
                  }

                  return (
                    <button
                      key={oIdx}
                      disabled={isAnswerChecked}
                      onClick={() => handleOptionSelect(option)}
                      className={`p-4 rounded-xl border-2 text-left font-semibold text-sm transition flex justify-between items-center ${styleClass}`}
                    >
                      <span>{option}</span>
                      {isAnswerChecked && isCorrect && <span className="text-emerald-500 font-black">✓ Correct</span>}
                      {isAnswerChecked && isSelected && !isCorrect && <span className="text-rose-550 font-black">✗ Wrong</span>}
                    </button>
                  );
                })}
              </div>

              {/* Action Buttons */}
              <div className="flex justify-between items-center pt-4 border-t border-slate-100 dark:border-slate-800">
                <button
                  onClick={() => setSelectedQuiz(null)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 dark:bg-slate-950 dark:text-slate-400 text-xs font-bold rounded-lg transition"
                >
                  Quit test
                </button>

                {!isAnswerChecked ? (
                  <button
                    onClick={handleCheckAnswer}
                    disabled={!selectedAnswer}
                    className={`px-6 py-2.5 rounded-xl font-bold text-xs shadow-md transition ${
                      selectedAnswer 
                        ? 'bg-indigo-600 hover:bg-indigo-500 text-white cursor-pointer active:scale-95' 
                        : 'bg-slate-200 dark:bg-slate-800 text-slate-400 dark:text-slate-500 cursor-not-allowed'
                    }`}
                  >
                    Lock Answer
                  </button>
                ) : (
                  <button
                    onClick={handleNextQuestion}
                    className="px-6 py-2.5 bg-gradient-to-r from-emerald-600 to-green-600 hover:zoom text-white font-bold text-xs rounded-xl cursor-pointer shadow flex items-center gap-1 active:scale-95 transition"
                  >
                    {activeQuestionIdx === selectedQuiz.questions.length - 1 ? 'Finish Results' : 'Next Question'} <ChevronRight className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          )}

          {/* COMPLETED FINISH OVERLAY OVERALL */}
          {quizFinished && (
            <div className="absolute inset-0 bg-white dark:bg-slate-950 flex flex-col justify-center items-center p-6 text-center z-20">
              <Award className="w-16 h-16 text-yellow-500 mb-2 animate-bounce" />
              <h3 className="text-2xl font-black text-slate-800 dark:text-white leading-tight">Quiz Complete!</h3>
              <p className="text-sm text-slate-400 mt-1 max-w-sm">
                You correctly answered <span className="text-indigo-500 dark:text-indigo-400 font-extrabold">{score}</span> out of <span className="text-slate-700 dark:text-slate-200 font-bold">{selectedQuiz.questions.length}</span> question prompts.
              </p>

              {/* Rewards threshold check */}
              {score >= Math.ceil(selectedQuiz.questions.length * 0.6) ? (
                <div className="mt-6 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 rounded-2xl flex flex-col items-center w-64 shadow shadow-inner text-center">
                  <span className="text-emerald-500 text-xs font-bold uppercase tracking-wider flex items-center gap-1 mb-1">
                     Passed successfully!
                  </span>
                  <span className="text-yellow-500 text-2xl font-black flex items-center gap-1 justify-center">
                    <Coins className="w-6 h-6" /> +{selectedQuiz.reward} Coins
                  </span>
                  
                  <button
                    disabled={hasClaimed}
                    onClick={handleClaimQuizCoins}
                    className={`mt-4 w-full py-2.5 rounded-xl font-bold text-sm shadow transition duration-300 ${
                      hasClaimed
                        ? 'bg-emerald-500/25 text-emerald-400 cursor-not-allowed'
                        : 'bg-yellow-500 hover:bg-yellow-400 text-slate-950 cursor-pointer active:scale-95'
                    }`}
                  >
                    {hasClaimed ? 'Claimed successfully' : 'Claim Earning Now'}
                  </button>
                </div>
              ) : (
                <div className="mt-6 bg-rose-500/10 border border-rose-500/20 p-5 rounded-2xl w-64 text-center space-y-3">
                  <p className="text-rose-500 text-xs font-semibold leading-relaxed">
                     Score lower than 60%. Please try again to credit coins.
                  </p>
                  <button
                    onClick={() => handleStartQuiz(selectedQuiz)}
                    className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg text-xs font-bold cursor-pointer transition active:scale-95"
                  >
                    Retry Quiz
                  </button>
                </div>
              )}

              <button
                onClick={() => setSelectedQuiz(null)}
                className="mt-6 text-sm text-slate-500 dark:text-slate-400 hover:underline font-semibold cursor-pointer"
              >
                Back to categories
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
