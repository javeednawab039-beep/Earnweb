/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../../context/AppContext';
import { Trophy, RotateCcw, Play, Coins } from 'lucide-react';

export default function SnakeGame() {
  const { awardGameCoins } = useApp();
  const [isPlaying, setIsPlaying] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [coinsReward, setCoinsReward] = useState(0);
  const [hasClaimed, setHasClaimed] = useState(false);
  
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [snake, setSnake] = useState<{ x: number; y: number }[]>([
    { x: 10, y: 10 },
    { x: 10, y: 11 },
    { x: 10, y: 12 },
  ]);
  const [food, setFood] = useState<{ x: number; y: number }>({ x: 5, y: 5 });
  const [dir, setDir] = useState<{ x: number; y: number }>({ x: 0, y: -1 });

  const GRID_SIZE = 20;
  const CELL_COUNT = 20;

  // Key handlers
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isPlaying) return;
      switch (e.key) {
        case 'ArrowUp':
          if (dir.y !== 1) setDir({ x: 0, y: -1 });
          break;
        case 'ArrowDown':
          if (dir.y !== -1) setDir({ x: 0, y: 1 });
          break;
        case 'ArrowLeft':
          if (dir.x !== 1) setDir({ x: -1, y: 0 });
          break;
        case 'ArrowRight':
          if (dir.x !== -1) setDir({ x: 1, y: 0 });
          break;
        default:
          break;
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [dir, isPlaying]);

  // Game Loop
  useEffect(() => {
    if (!isPlaying || gameOver) return;

    const interval = setInterval(() => {
      // Move snake
      const head = { x: snake[0].x + dir.x, y: snake[0].y + dir.y };

      // Wall collision
      if (head.x < 0 || head.x >= CELL_COUNT || head.y < 0 || head.y >= CELL_COUNT) {
        endGame();
        return;
      }

      // Self collision
      for (const segment of snake) {
        if (segment.x === head.x && segment.y === head.y) {
          endGame();
          return;
        }
      }

      const newSnake = [head, ...snake];

      // Food eating checking
      if (head.x === food.x && head.y === food.y) {
        setScore((prev) => prev + 10);
        generateFood(newSnake);
      } else {
        newSnake.pop();
      }

      setSnake(newSnake);
    }, 150);

    return () => clearInterval(interval);
  }, [snake, dir, food, isPlaying, gameOver]);

  // Draw Game
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear Canvas
    ctx.fillStyle = '#0f172a'; // slate-900
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw Grid details
    ctx.strokeStyle = '#1e293b'; // slate-800
    ctx.lineWidth = 0.5;
    for (let i = 0; i < CELL_COUNT; i++) {
      ctx.beginPath();
      ctx.moveTo(i * GRID_SIZE, 0);
      ctx.lineTo(i * GRID_SIZE, canvas.height);
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(0, i * GRID_SIZE);
      ctx.lineTo(canvas.width, i * GRID_SIZE);
      ctx.stroke();
    }

    // Draw Food
    ctx.fillStyle = '#ef4444'; // red-500 neon glow
    ctx.shadowBlur = 10;
    ctx.shadowColor = '#ef4444';
    ctx.beginPath();
    ctx.arc(
      food.x * GRID_SIZE + GRID_SIZE / 2,
      food.y * GRID_SIZE + GRID_SIZE / 2,
      GRID_SIZE / 2.5,
      0,
      Math.PI * 2
    );
    ctx.fill();

    // Draw Snake
    ctx.shadowColor = '#10b981'; // green glow
    snake.forEach((segment, index) => {
      ctx.fillStyle = index === 0 ? '#10b981' : '#34d399';
      ctx.shadowBlur = index === 0 ? 12 : 4;
      ctx.fillRect(
        segment.x * GRID_SIZE + 1,
        segment.y * GRID_SIZE + 1,
        GRID_SIZE - 2,
        GRID_SIZE - 2
      );
    });

    // Reset shadow
    ctx.shadowBlur = 0;
  }, [snake, food]);

  const generateFood = (currentSnake: { x: number; y: number }[]) => {
    let newFood;
    while (true) {
      newFood = {
        x: Math.floor(Math.random() * CELL_COUNT),
        y: Math.floor(Math.random() * CELL_COUNT),
      };
      // Make sure food is not on snake
      const onSnake = currentSnake.some((seg) => seg.x === newFood!.x && seg.y === newFood!.y);
      if (!onSnake) break;
    }
    setFood(newFood);
  };

  const startGame = () => {
    setSnake([
      { x: 10, y: 10 },
      { x: 10, y: 11 },
      { x: 10, y: 12 },
    ]);
    setDir({ x: 0, y: -1 });
    generateFood([{ x: 10, y: 10 }]);
    setScore(0);
    setCoinsReward(0);
    setHasClaimed(false);
    setGameOver(false);
    setIsPlaying(true);
  };

  const endGame = () => {
    setIsPlaying(false);
    setGameOver(true);
    if (score > highScore) {
      setHighScore(score);
    }
    // Reward is proportional to the score (e.g. 1 coin per point score)
    const earned = Math.floor(score / 5) * 5; // round to multiple of 5
    setCoinsReward(earned);
  };

  const claimCoins = async () => {
    if (coinsReward > 0 && !hasClaimed) {
      await awardGameCoins("Snake Game", coinsReward);
      setHasClaimed(true);
    }
  };

  return (
    <div className="flex flex-col items-center bg-slate-900 border border-slate-800 p-6 rounded-2xl max-w-full shadow-2xl relative overflow-hidden" id="snake-game-container">
      {/* Absolute Glow Background */}
      <div className="absolute top-0 right-0 w-44 h-44 bg-green-500/10 blur-3xl rounded-full" />
      <div className="absolute bottom-0 left-0 w-44 h-44 bg-red-400/10 blur-3xl rounded-full" />

      <h3 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
        <span className="p-1.5 bg-green-500/20 text-green-400 rounded-lg">🐍</span> Snake Master Play
      </h3>
      <p className="text-sm text-slate-400 mb-4 text-center max-w-xs">
        Earn <span className="text-yellow-400 font-bold">5 Coins</span> for every 50 points scored. Survive as long as imaginable!
      </p>

      {/* Score and Stats */}
      <div className="flex justify-between w-full max-w-[400px] bg-slate-950 p-3 rounded-xl mb-4 border border-slate-800/80 text-sm">
        <div className="text-slate-400 flex items-center gap-1.5">
          <Trophy className="w-4 h-4 text-yellow-400" />
          Score: <span className="text-white font-bold">{score}</span>
        </div>
        <div className="text-slate-400 flex items-center gap-1.5">
          <Trophy className="w-4 h-4 text-emerald-400" />
          High: <span className="text-white font-bold">{highScore}</span>
        </div>
      </div>

      {/* Screen Canvas Holder with absolute panels */}
      <div className="relative border-4 border-slate-950 bg-slate-950 rounded-xl overflow-hidden shadow-inner">
        <canvas
          ref={canvasRef}
          width={400}
          height={400}
          className="w-full max-w-[400px] h-auto aspect-square block bg-slate-900"
        />

        {/* Game start panel */}
        {!isPlaying && !gameOver && (
          <div className="absolute inset-0 bg-slate-950/90 flex flex-col justify-center items-center p-4">
            <button
              onClick={startGame}
              className="px-6 py-3 bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-400 hover:to-green-500 text-white font-bold rounded-xl shadow-lg transition-all transform hover:scale-105 active:scale-95 flex items-center gap-2 cursor-pointer"
            >
              <Play className="w-5 h-5 fill-current" /> Start Game
            </button>
            <span className="text-slate-500 text-xs mt-3 text-center">Use keyboard arrow keys or tap directions</span>
          </div>
        )}

        {/* Game over panel */}
        {gameOver && (
          <div className="absolute inset-0 bg-slate-950/95 flex flex-col justify-center items-center p-4">
            <h4 className="text-2xl font-black text-rose-500 mb-1 tracking-wider uppercase">Game Over</h4>
            <span className="text-slate-400 text-sm mb-4">Total points scored: <strong className="text-white text-lg">{score}</strong></span>

            {coinsReward > 0 ? (
              <div className="bg-slate-900/90 border border-slate-800 p-4 rounded-xl flex flex-col items-center mb-5 w-56 text-center shadow-lg">
                <span className="text-slate-400 text-xs mb-1">YOUR SPEED REWARD</span>
                <span className="text-yellow-400 text-2xl font-black flex items-center gap-1">
                  <Coins className="w-6 h-6 animate-pulse" /> +{coinsReward} Coins
                </span>
                <button
                  disabled={hasClaimed}
                  onClick={claimCoins}
                  className={`mt-3 w-full py-2 rounded-lg font-bold text-sm shadow transition-all ${
                    hasClaimed
                      ? 'bg-emerald-500/20 text-emerald-400 cursor-not-allowed'
                      : 'bg-yellow-500 text-slate-950 hover:bg-yellow-400 cursor-pointer active:scale-95'
                  }`}
                >
                  {hasClaimed ? 'Claimed Successful!' : 'Claim Earning Reward'}
                </button>
              </div>
            ) : (
              <p className="text-slate-500 text-xs mb-5">Score at least 10 points to unlock prizes.</p>
            )}

            <button
              onClick={startGame}
              className="px-5 py-2 bg-slate-800 hover:bg-slate-700 text-white text-sm font-semibold rounded-lg shadow-md transition flex items-center gap-1.5 cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" /> Restart
            </button>
          </div>
        )}
      </div>

      {/* In-game Mobile Controls */}
      <div className="block mt-4 w-full max-w-[200px]">
        <div className="grid grid-cols-3 gap-2">
          <div></div>
          <button
            onClick={() => isPlaying && dir.y !== 1 && setDir({ x: 0, y: -1 })}
            className="p-3 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-lg flex justify-center active:scale-90"
          >
            ▲
          </button>
          <div></div>

          <button
            onClick={() => isPlaying && dir.x !== 1 && setDir({ x: -1, y: 0 })}
            className="p-3 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-lg flex justify-center active:scale-90"
          >
            ◀
          </button>
          <div className="bg-slate-950 rounded-lg flex items-center justify-center text-slate-700 text-xs font-black">
            PAD
          </div>
          <button
            onClick={() => isPlaying && dir.x !== -1 && setDir({ x: 1, y: 0 })}
            className="p-3 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-lg flex justify-center active:scale-90"
          >
            ▶
          </button>

          <div></div>
          <button
            onClick={() => isPlaying && dir.y !== -1 && setDir({ x: 0, y: 1 })}
            className="p-3 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-lg flex justify-center active:scale-90"
          >
            ▼
          </button>
          <div></div>
        </div>
      </div>
    </div>
  );
}
