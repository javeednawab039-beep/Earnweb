/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../../context/AppContext';
import { Play, RotateCcw, Coins, Trophy } from 'lucide-react';

export default function FlappyBirdGame() {
  const { awardGameCoins } = useApp();
  const [isPlaying, setIsPlaying] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [coinsReward, setCoinsReward] = useState(0);
  const [hasClaimed, setHasClaimed] = useState(false);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Physics configuration
  const bird = useRef({ y: 150, vy: 0, radius: 10 });
  const pipes = useRef<{ x: number; top: number; bottom: number; passed: boolean }[]>([]);
  const gravity = 0.35;
  const jumpImpulse = -5.8;
  const pipeSpeed = 2.0;
  const pipeSpawnRate = 110; // frames between spawns
  const pipeGap = 90;
  let frameCount = 0;

  // Jump Action
  const handleJump = (e?: React.MouseEvent | React.TouchEvent) => {
    if (e) {
      e.preventDefault();
    }
    if (!isPlaying && !gameOver) {
      startGame();
      return;
    }
    if (isPlaying) {
      bird.current.vy = jumpImpulse;
    }
  };

  // Keyboard jumps
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === ' ' || e.key === 'ArrowUp') {
        e.preventDefault();
        handleJump();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isPlaying, gameOver]);

  // Main Canvas Render and physics loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;

    const gameLoop = () => {
      // 1. CLEAR AND DRAW SKY BACKGROUND
      ctx.fillStyle = '#1e1b4b'; // deep indigo sky
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw starry clouds
      ctx.fillStyle = 'rgba(255, 255, 255, 0.15)';
      ctx.fillRect(50, 40, 80, 20);
      ctx.fillRect(200, 80, 100, 25);

      if (isPlaying && !gameOver) {
        frameCount++;

        // 2. UPDATE BIRD PHYSICS
        bird.current.vy += gravity;
        bird.current.y += bird.current.vy;

        // Peak ceilings floor collision
        if (bird.current.y - bird.current.radius < 0) {
          bird.current.y = bird.current.radius;
          bird.current.vy = 0;
        }
        if (bird.current.y + bird.current.radius >= canvas.height) {
          endGame();
        }

        // 3. SPAWN PIPES
        if (frameCount % pipeSpawnRate === 0) {
          const maxPipeHeight = canvas.height - pipeGap - 40;
          const topHeight = Math.floor(Math.random() * (maxPipeHeight - 40)) + 45;
          const bottomHeight = canvas.height - topHeight - pipeGap;
          pipes.current.push({
            x: canvas.width,
            top: topHeight,
            bottom: bottomHeight,
            passed: false
          });
        }

        // 4. UPDATE AND DRAW PIPES
        for (let i = pipes.current.length - 1; i >= 0; i--) {
          const p = pipes.current[i];
          p.x -= pipeSpeed;

          // Draw Top Pipe
          ctx.fillStyle = '#4ade80'; // emerald green pipe
          ctx.fillRect(p.x, 0, 44, p.top);
          // Pipe Lip
          ctx.fillStyle = '#22c55e';
          ctx.fillRect(p.x - 3, p.top - 12, 50, 12);

          // Draw Bottom Pipe
          ctx.fillStyle = '#4ade80';
          ctx.fillRect(p.x, canvas.height - p.bottom, 44, p.bottom);
          // Pipe Lip
          ctx.fillStyle = '#22c55e';
          ctx.fillRect(p.x - 3, canvas.height - p.bottom, 50, 12);

          // Check score crossing
          if (!p.passed && p.x + 22 < bird.current.y) {
            if (p.x + 22 < bird.current.y) { // just crossed
              p.passed = true;
              setScore((prev) => prev + 1);
            }
          }

          // Check collisions
          const bx = 80; // bird constant x
          const by = bird.current.y;
          const br = bird.current.radius;

          if (
            bx + br > p.x &&
            bx - br < p.x + 44 &&
            (by - br < p.top || by + br > canvas.height - p.bottom)
          ) {
            endGame();
          }

          // Clean up old pipes
          if (p.x < -60) {
            pipes.current.splice(i, 1);
          }
        }
      } else {
        // Draw static instructions or idle pipes
        ctx.fillStyle = '#10b981';
        ctx.fillRect(150, 0, 44, 100);
        ctx.fillRect(150, 200, 44, 200);
      }

      // 5. DRAW BIRD
      ctx.fillStyle = '#f59e0b'; // yellow amber bird
      ctx.shadowBlur = 8;
      ctx.shadowColor = '#f59e0b';
      ctx.beginPath();
      ctx.arc(80, bird.current.y, bird.current.radius, 0, Math.PI * 2);
      ctx.fill();

      // Eye
      ctx.fillStyle = '#fff';
      ctx.shadowBlur = 0;
      ctx.beginPath();
      ctx.arc(84, bird.current.y - 3, 3, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = '#000';
      ctx.beginPath();
      ctx.arc(85, bird.current.y - 3, 1.2, 0, Math.PI * 2);
      ctx.fill();

      // Beak
      ctx.fillStyle = '#ef4444';
      ctx.beginPath();
      ctx.moveTo(88, bird.current.y - 1);
      ctx.lineTo(95, bird.current.y + 2);
      ctx.lineTo(87, bird.current.y + 5);
      ctx.fill();

      animId = requestAnimationFrame(gameLoop);
    };

    animId = requestAnimationFrame(gameLoop);
    return () => cancelAnimationFrame(animId);
  }, [isPlaying, gameOver]);

  const startGame = () => {
    bird.current = { y: 150, vy: 0, radius: 10 };
    pipes.current = [];
    frameCount = 0;
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
    // Reward: 15 coins per crossed pipe
    const earned = score * 15;
    setCoinsReward(earned);
  };

  const claimCoins = async () => {
    if (coinsReward > 0 && !hasClaimed) {
      await awardGameCoins("Flappy Earn", coinsReward);
      setHasClaimed(true);
    }
  };

  return (
    <div
      className="flex flex-col items-center bg-slate-900 border border-slate-800 p-6 rounded-2xl max-w-full shadow-2xl relative overflow-hidden"
      id="flappy-game-container"
    >
      <h3 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
        <span className="p-1.5 bg-yellow-500/20 text-yellow-400 rounded-lg">🚀</span> Flappy Fly Earn
      </h3>
      <p className="text-sm text-slate-400 mb-4 text-center max-w-xs">
        Tap or press spacebar to flap the wings. Earn <span className="text-yellow-400 font-bold">15 Coins</span> per completed pipe barrier!
      </p>

      {/* Stats bar */}
      <div className="flex justify-between w-full max-w-[320px] bg-slate-950 p-2.5 border border-slate-800/80 rounded-xl mb-4 text-xs font-semibold">
        <div className="text-slate-400 flex items-center gap-1">
          <Trophy className="w-3.5 h-3.5 text-yellow-400" />
          Score: <span className="text-white text-sm font-bold">{score}</span>
        </div>
        <div className="text-slate-400 flex items-center gap-1">
          Highscore: <span className="text-white text-sm font-bold">{highScore}</span>
        </div>
      </div>

      {/* Frame Canvas */}
      <div
        className="relative border-4 border-slate-950 bg-slate-950 rounded-xl overflow-hidden cursor-pointer"
        onClick={() => isPlaying && handleJump()}
      >
        <canvas
          ref={canvasRef}
          width={320}
          height={380}
          className="w-full max-w-[320px] block bg-indigo-950"
        />

        {/* Start Game overlay */}
        {!isPlaying && !gameOver && (
          <div className="absolute inset-0 bg-slate-950/85 flex flex-col justify-center items-center p-4">
            <button
              onClick={startGame}
              className="px-6 py-2.5 bg-yellow-500 hover:bg-yellow-400 text-slate-950 font-bold rounded-xl shadow transition absolute"
            >
              Start Earning
            </button>
            <span className="text-slate-400 text-xs mt-20 text-center">Click here or press SPACE to flap</span>
          </div>
        )}

        {/* GameOver overlay */}
        {gameOver && (
          <div className="absolute inset-0 bg-slate-950/90 flex flex-col justify-center items-center p-4 text-center">
            <h4 className="text-xl font-bold text-red-400 animate-pulse">CRASHED!</h4>
            <span className="text-slate-400 text-xs mb-3">Pipes Cleared: {score}</span>

            {coinsReward > 0 ? (
              <div className="bg-slate-900 border border-slate-800/80 p-3 rounded-lg flex flex-col items-center mb-4 w-48 text-center">
                <span className="text-slate-400 text-[10px]">REWARD YIELDED</span>
                <span className="text-yellow-400 text-lg font-black flex items-center gap-1">
                  <Coins className="w-4 h-4" /> +{coinsReward} Coins
                </span>
                <button
                  disabled={hasClaimed}
                  onClick={(e) => {
                    e.stopPropagation();
                    claimCoins();
                  }}
                  className={`mt-2 w-full py-1.5 rounded font-black text-[11px] shadow transition-all ${
                    hasClaimed
                      ? 'bg-emerald-500/20 text-emerald-400'
                      : 'bg-yellow-500 text-slate-950 hover:bg-yellow-400'
                  }`}
                >
                  {hasClaimed ? 'Claimed successful' : 'Claim now'}
                </button>
              </div>
            ) : (
              <p className="text-slate-500 text-xs mb-4">Fly beyond 1 pipe to begin accumulating coins.</p>
            )}

            <button
              onClick={(e) => {
                e.stopPropagation();
                startGame();
              }}
              className="px-4 py-1.5 bg-slate-800 hover:bg-slate-705 text-white font-semibold text-xs rounded-lg flex items-center gap-1"
            >
              <RotateCcw className="w-3.5 h-3.5" /> Fly Again
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
