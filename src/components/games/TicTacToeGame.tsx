/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { RotateCcw, X, Circle, Coins, Swords } from 'lucide-react';

export default function TicTacToeGame() {
  const { awardGameCoins } = useApp();
  const [board, setBoard] = useState<(string | null)[]>(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true); // User is 'X', AI is 'O'
  const [winner, setWinner] = useState<string | null>(null);
  const [isDraw, setIsDraw] = useState(false);
  const [coinsReward, setCoinsReward] = useState(0);
  const [hasClaimed, setHasClaimed] = useState(false);

  const winningLines = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6]             // Diagonals
  ];

  // User Turn
  const handleClick = (index: number) => {
    if (board[index] || winner || isDraw || !isXNext) return;

    const newBoard = [...board];
    newBoard[index] = 'X';
    setBoard(newBoard);
    setIsXNext(false);
  };

  // Check Game State and make AI move
  useEffect(() => {
    const gameWinner = calculateWinner(board);
    const movesLeft = board.filter(b => b === null).length;

    if (gameWinner) {
      setWinner(gameWinner);
      if (gameWinner === 'X') {
        const earned = 50;
        setCoinsReward(earned);
      }
      return;
    }

    if (movesLeft === 0) {
      setIsDraw(true);
      return;
    }

    // AI Move
    if (!isXNext) {
      const timer = setTimeout(() => {
        const aiMoveIdx = findBestMove(board);
        if (aiMoveIdx !== -1) {
          const aiBoard = [...board];
          aiBoard[aiMoveIdx] = 'O';
          setBoard(aiBoard);
          setIsXNext(true);
        }
      }, 600);
      return () => clearTimeout(timer);
    }
  }, [board, isXNext]);

  const calculateWinner = (squares: (string | null)[]) => {
    for (const [a, b, c] of winningLines) {
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  };

  // Mini AI logic (Blocks user wins & takes direct wins, otherwise picks center or random)
  const findBestMove = (squares: (string | null)[]) => {
    // 1. Check if AI can win in this move
    for (const [a, b, c] of winningLines) {
      if (squares[a] === 'O' && squares[b] === 'O' && !squares[c]) return c;
      if (squares[a] === 'O' && squares[c] === 'O' && !squares[b]) return b;
      if (squares[b] === 'O' && squares[c] === 'O' && !squares[a]) return a;
    }

    // 2. Check if user is about to win and block them
    for (const [a, b, c] of winningLines) {
      if (squares[a] === 'X' && squares[b] === 'X' && !squares[c]) return c;
      if (squares[a] === 'X' && squares[c] === 'X' && !squares[b]) return b;
      if (squares[b] === 'X' && squares[c] === 'X' && !squares[a]) return a;
    }

    // 3. Take center if available
    if (!squares[4]) return 4;

    // 4. Take random corner or side
    const available = squares.map((val, idx) => val === null ? idx : null).filter(val => val !== null) as number[];
    if (available.length > 0) {
      const idx = Math.floor(Math.random() * available.length);
      return available[idx];
    }

    return -1;
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
    setWinner(null);
    setIsDraw(false);
    setCoinsReward(0);
    setHasClaimed(false);
  };

  const claimCoins = async () => {
    if (coinsReward > 0 && !hasClaimed) {
      await awardGameCoins("Tic Tac Toe AI", coinsReward);
      setHasClaimed(true);
    }
  };

  return (
    <div className="flex flex-col items-center bg-slate-900 border border-slate-800 p-6 rounded-2xl max-w-full shadow-2xl relative overflow-hidden" id="ttt-game-container">
      <div className="absolute top-0 right-0 w-32 h-32 bg-rose-500/10 blur-3xl rounded-full" />
      <div className="absolute bottom-0 left-0 w-32 h-32 bg-amber-500/10 blur-3xl rounded-full" />

      <h3 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
        <span className="p-1.5 bg-rose-500/20 text-rose-400 rounded-lg">⚔️</span> Tic Tac Toe Arena
      </h3>
      <p className="text-sm text-slate-400 mb-4 text-center max-w-xs">
        Compete against our intelligent AI. Defeat the machine to claim <span className="text-yellow-400 font-bold">50 Coins!</span>
      </p>

      {/* Status Indicators */}
      <div className="flex items-center justify-center gap-2 mb-4 bg-slate-950 px-4 py-2 rounded-xl text-xs border border-slate-800 font-medium">
        {winner ? (
          <span className={winner === 'X' ? 'text-emerald-400' : 'text-rose-400'}>
            {winner === 'X' ? '🎉 You Won the Clash!' : '🤖 AI Defeated You'}
          </span>
        ) : isDraw ? (
          <span className="text-slate-400">Board Draw! Try again.</span>
        ) : (
          <span className="text-slate-300 flex items-center gap-1.5 justify-center">
            <Swords className="w-3.5 h-3.5 animate-pulse text-indigo-400" />
            {isXNext ? 'Your turn (X)' : 'Thinking computer (O)...'}
          </span>
        )}
      </div>

      {/* Grid container */}
      <div className="grid grid-cols-3 gap-3 w-full max-w-[280px] bg-slate-950 p-3 rounded-2xl border border-slate-850/50 shadow-inner">
        {board.map((cell, index) => {
          return (
            <button
              key={index}
              onClick={() => handleClick(index)}
              disabled={!!cell || !!winner || isDraw || !isXNext}
              className={`aspect-square rounded-xl flex items-center justify-center text-3xl font-bold border transition duration-300 transform active:scale-95 ${
                cell === 'X'
                  ? 'bg-blue-500/15 border-blue-500/30 text-blue-400 font-black'
                  : cell === 'O'
                  ? 'bg-rose-500/15 border-rose-500/30 text-rose-400 font-black'
                  : 'bg-slate-900 hover:bg-slate-800 border-slate-850 cursor-pointer'
              }`}
            >
              {cell === 'X' && <X className="w-8 h-8 stroke-[3]" />}
              {cell === 'O' && <Circle className="w-7 h-7 stroke-[3]" />}
            </button>
          );
        })}
      </div>

      {/* Dynamic Earning claims */}
      {(winner || isDraw) && (
        <div className="mt-5 bg-slate-950 border border-slate-800 p-4 rounded-xl flex flex-col items-center w-64 shadow-lg text-center">
          {winner === 'X' && (
            <>
              <span className="text-slate-400 text-xs mb-1 uppercase tracking-wider font-bold">BATTLE REWARD</span>
              <span className="text-yellow-400 text-xl font-black flex items-center gap-1">
                <Coins className="w-5 h-5" /> +50 Coins
              </span>
              <button
                disabled={hasClaimed}
                onClick={claimCoins}
                className={`mt-2.5 w-full py-1.5 rounded-lg font-bold text-xs shadow transition-all ${
                  hasClaimed
                    ? 'bg-emerald-500/20 text-emerald-400 cursor-not-allowed'
                    : 'bg-yellow-500 text-slate-950 hover:bg-yellow-400 cursor-pointer'
                }`}
              >
                {hasClaimed ? 'Claimed successfully' : 'Claim Reward'}
              </button>
            </>
          )}

          <button
            onClick={resetGame}
            className="w-full mt-2 px-4 py-1.5 bg-slate-850 hover:bg-slate-750 text-white text-xs font-semibold rounded-lg flex items-center justify-center gap-1 cursor-pointer transition-all active:scale-95"
          >
            <RotateCcw className="w-3.5 h-3.5" /> Replay Arena
          </button>
        </div>
      )}
    </div>
  );
}
