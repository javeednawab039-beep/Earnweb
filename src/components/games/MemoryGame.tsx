/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { RotateCcw, HelpCircle, Coins, Gift } from 'lucide-react';

const EMOJIS = ['💰', '💎', '🎰', '🎖️', '🚀', '🔥', '👑', '⭐'];

interface Card {
  id: number;
  emoji: string;
  isFlipped: boolean;
  isMatched: boolean;
}

export default function MemoryGame() {
  const { awardGameCoins } = useApp();
  const [cards, setCards] = useState<Card[]>([]);
  const [selected, setSelected] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [gameWon, setGameWon] = useState(false);
  const [coinsReward, setCoinsReward] = useState(0);
  const [hasClaimed, setHasClaimed] = useState(false);

  useEffect(() => {
    resetGame();
  }, []);

  const resetGame = () => {
    // Generate matched pairs
    const gridEmojis = [...EMOJIS, ...EMOJIS];
    // Shuffle
    const shuffled = gridEmojis
      .map((emoji, index) => ({ id: index, emoji, isFlipped: false, isMatched: false }))
      .sort(() => Math.random() - 0.5);

    setCards(shuffled);
    setSelected([]);
    setMoves(0);
    setGameWon(false);
    setCoinsReward(0);
    setHasClaimed(false);
  };

  const handleCardClick = (cardId: number) => {
    if (selected.length === 2) return;
    const clickedCard = cards.find(c => c.id === cardId);
    if (!clickedCard || clickedCard.isFlipped || clickedCard.isMatched) return;

    // Flip card
    const updatedCards = cards.map(c => c.id === cardId ? { ...c, isFlipped: true } : c);
    setCards(updatedCards);

    const nextSelected = [...selected, cardId];
    setSelected(nextSelected);

    if (nextSelected.length === 2) {
      setMoves(m => m + 1);
      const card1 = cards.find(c => c.id === nextSelected[0])!;
      const card2 = clickedCard;

      if (card1.emoji === card2.emoji) {
        // Matched pair
        setTimeout(() => {
          const finalCards = updatedCards.map(c => 
            c.id === nextSelected[0] || c.id === cardId ? { ...c, isMatched: true } : c
          );
          setCards(finalCards);
          setSelected([]);

          // Check if all matched
          const allMatched = finalCards.every(c => c.isMatched);
          if (allMatched) {
            endGame();
          }
        }, 500);
      } else {
        // Mismatch - Flip back
        setTimeout(() => {
          setCards(updatedCards.map(c => 
            c.id === nextSelected[0] || c.id === cardId ? { ...c, isFlipped: false } : c
          ));
          setSelected([]);
        }, 1000);
      }
    }
  };

  const endGame = () => {
    setGameWon(true);
    // Dynamic coins calculation: more speed or fewer moves leads to a bigger reward!
    // base 150 coins, minus moves overhead
    let reward = 200 - moves * 5;
    if (reward < 30) reward = 30; // floor minimum reward
    setCoinsReward(reward);
  };

  const claimCoins = async () => {
    if (coinsReward > 0 && !hasClaimed) {
      await awardGameCoins("Memory Card Game", coinsReward);
      setHasClaimed(true);
    }
  };

  return (
    <div className="flex flex-col items-center bg-slate-900 border border-slate-800 p-6 rounded-2xl max-w-full shadow-2xl relative overflow-hidden" id="memory-game-container">
      <div className="absolute top-0 left-0 w-32 h-32 bg-blue-500/10 blur-3xl rounded-full" />
      <div className="absolute bottom-0 right-0 w-32 h-32 bg-purple-500/10 blur-3xl rounded-full" />

      <h3 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
        <span className="p-1.5 bg-blue-500/20 text-blue-400 rounded-lg">🃏</span> Earn Memory Match
      </h3>
      <p className="text-sm text-slate-400 mb-4 text-center max-w-xs">
        Flip cards and match items. Complete with fewer moves to maximize your <span className="text-yellow-400 font-bold">Coins Bonus!</span>
      </p>

      {/* Stats row */}
      <div className="flex gap-4 w-full max-w-[360px] bg-slate-950 p-2.5 rounded-xl border border-slate-800 mb-4 justify-around text-xs">
        <div className="text-slate-400">
          Moves Registered: <span className="text-white font-black">{moves}</span>
        </div>
        <div className="text-slate-400">
          Pairs Matched: <span className="text-white font-black">{cards.filter(c => c.isMatched).length / 2} / 8</span>
        </div>
      </div>

      {/* Cards Matrix */}
      <div className="grid grid-cols-4 gap-2.5 w-full max-w-[360px] aspect-square">
        {cards.map(card => {
          const isOpen = card.isFlipped || card.isMatched;
          return (
            <button
              key={card.id}
              onClick={() => handleCardClick(card.id)}
              className={`aspect-square rounded-xl flex items-center justify-center transition-all duration-300 font-bold border transform hover:scale-105 active:scale-95 ${
                card.isMatched
                  ? 'bg-emerald-500/20 text-4xl border-emerald-500/40 cursor-default'
                  : card.isFlipped
                  ? 'bg-slate-800 text-4xl border-blue-550/50'
                  : 'bg-gradient-to-br from-slate-800 to-slate-900 text-slate-500 border-slate-700 hover:border-slate-500 cursor-pointer'
              }`}
            >
              {isOpen ? (
                card.emoji
              ) : (
                <HelpCircle className="w-5 h-5 text-slate-600 animate-pulse" />
              )}
            </button>
          );
        })}
      </div>

      {/* Manual buttons / Winner Panel */}
      {gameWon && (
        <div className="absolute inset-0 bg-slate-950/95 flex flex-col justify-center items-center p-6 text-center">
          <Gift className="w-12 h-12 text-yellow-500 animate-bounce mb-2" />
          <h4 className="text-2xl font-black text-emerald-400 mb-1">CONGRATULATIONS!</h4>
          <p className="text-slate-400 text-sm mb-4">Completed in <strong className="text-white">{moves} moves</strong></p>

          <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl flex flex-col items-center mb-5 w-56 text-center shadow-lg">
            <span className="text-slate-400 text-xs mb-1">MEMORY COINS BONUS</span>
            <span className="text-yellow-400 text-2.5xl font-black flex items-center gap-1.5 justify-center">
              <Coins className="w-6 h-6" /> +{coinsReward} Coins
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
              {hasClaimed ? 'Claimed successfully' : 'Claim Earn Rewards'}
            </button>
          </div>

          <button
            onClick={resetGame}
            className="px-5 py-2 bg-slate-800 hover:bg-slate-700 text-white font-semibold text-sm rounded-lg flex items-center gap-1.5 transition active:scale-95 cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" /> Reset Match
          </button>
        </div>
      )}

      {!gameWon && (
        <button
          onClick={resetGame}
          className="mt-4 px-4 py-1.5 bg-slate-800 hover:bg-slate-705 text-xs text-white rounded-lg flex items-center gap-1 transition active:scale-90 cursor-pointer"
        >
          <RotateCcw className="w-3.5 h-3.5" /> Force Reset
        </button>
      )}
    </div>
  );
}
