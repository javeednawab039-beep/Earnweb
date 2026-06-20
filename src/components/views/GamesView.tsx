/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import SnakeGame from '../games/SnakeGame';
import MemoryGame from '../games/MemoryGame';
import TicTacToeGame from '../games/TicTacToeGame';
import FlappyBirdGame from '../games/FlappyBirdGame';
import { Gamepad2, Coins, Milestone, Flame } from 'lucide-react';

export default function GamesView() {
  const [activeGame, setActiveGame] = useState<string | null>(null);

  const gamesList = [
    {
      id: "snake",
      title: "Classic Retro Snake",
      emoji: "🐍",
      reward: "5 Coins per 50 pts",
      desc: "Drive the snake, absorb fruits, and stay clear of wall collision loops.",
      component: <SnakeGame />
    },
    {
      id: "memory",
      title: "Memory Card Pairs Match",
      emoji: "🃏",
      reward: "Up to 200 Coins based on Moves",
      desc: "Slam matching tiles and clear the full matrix layout to cash out premium.",
      component: <MemoryGame />
    },
    {
      id: "ttt",
      title: "Tic Tac Toe AI Colosseum",
      emoji: "⚔️",
      reward: "50 Coins per Victory",
      desc: "Fight against our predictive minimax-powered machine processor.",
      component: <TicTacToeGame />
    },
    {
      id: "flappy",
      title: "Flappy Bird Fly Arena",
      emoji: "🚀",
      reward: "15 Coins per Pipe cleared",
      desc: "Bypass narrow green pillars. Defy gravity and claim extreme rewards.",
      component: <FlappyBirdGame />
    }
  ];

  return (
    <div className="space-y-6" id="games-view-wrapper">
      
      {/* GAMES BANNER INFO */}
      <div className="bg-gradient-to-r from-amber-500 to-orange-600 rounded-2xl p-6 text-white border border-orange-500/20 shadow-lg relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 blur-xl rounded-full" />
        <h2 className="text-2xl font-black tracking-tight flex items-center gap-2">
          <Gamepad2 className="w-5 h-5 text-yellow-300 animate-pulse" /> HTML5 Mini Games Arcade
        </h2>
        <p className="text-xs text-orange-100 mt-1">
          No external installs required! Run premium fast-loading games inside any sandbox browser. Coins rewards are calculated dynamically and synchronized to your account instantly.
        </p>
      </div>

      {/* GAME CABINET CONSOLE ROW */}
      {!activeGame ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {gamesList.map(game => (
            <div 
              key={game.id} 
              className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 p-5 rounded-2xl flex flex-col justify-between hover:shadow-md transition relative group overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-amber-500/5 to-transparent blur-lg rounded-full" />

              <div className="flex justify-between items-start mb-3">
                <span className="text-3xl select-none">{game.emoji}</span>
                <span className="px-2.5 py-0.5 bg-yellow-50 dark:bg-slate-950 text-amber-600 dark:text-amber-400 text-[10px] font-black rounded-full border border-yellow-100 dark:border-slate-850 flex items-center gap-1.5 shadow-sm font-mono uppercase">
                  <Coins className="w-3 h-3" /> {game.reward}
                </span>
              </div>

              <div className="space-y-1 mb-4">
                <h3 className="text-md font-black text-rose dark:text-white leading-tight group-hover:text-amber-505 transition">
                  {game.title}
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  {game.desc}
                </p>
              </div>

              <button
                onClick={() => setActiveGame(game.id)}
                className="w-full py-2.5 bg-slate-950 hover:bg-slate-900 dark:bg-slate-950 border border-slate-800 dark:hover:bg-slate-800 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-1 cursor-pointer transition shadow"
              >
                Launch Game Cabinet <Flame className="w-4.5 h-4.5 text-orange-500 animate-pulse" />
              </button>
            </div>
          ))}
        </div>
      ) : (
        /* ACTIVE CONTAINER AREA */
        <div className="space-y-4">
          <button
            onClick={() => setActiveGame(null)}
            className="px-4 py-1.5 bg-slate-105 border border-slate-205 dark:bg-slate-900 dark:border-slate-800 text-slate-600 dark:text-slate-350 hover:bg-slate-200 dark:hover:bg-slate-850 text-xs font-bold rounded-lg transition-all flex items-center gap-1 active:scale-95 cursor-pointer"
          >
            ← Exit active game
          </button>

          <div className="w-full flex justify-center">
            {gamesList.find(g => g.id === activeGame)?.component}
          </div>
        </div>
      )}
    </div>
  );
}
