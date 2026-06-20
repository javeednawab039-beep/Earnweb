/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Coins, HelpCircle, Loader, Sparkles } from 'lucide-react';

const SPIN_SECTORS = [
  { coins: 10, label: "10 Coins", color: "bg-red-500/80 text-white" },
  { coins: 50, label: "50 Coins", color: "bg-blue-500/80 text-white" },
  { coins: 5, label: "5 Coins", color: "bg-pink-500/80 text-white" },
  { coins: 150, label: "150 Coins", color: "bg-amber-500/90 text-slate-950 font-black" },
  { coins: 20, label: "20 Coins", color: "bg-indigo-500/80 text-white" },
  { coins: 100, label: "100 Coins", color: "bg-emerald-500/80 text-white" },
  { coins: 0, label: "0 Try Again", color: "bg-slate-755/90 text-slate-400" },
  { coins: 250, label: "🔥 Jackpot 250", color: "bg-yellow-500/90 text-slate-950 font-black" }
];

export default function LuckySpin() {
  const { awardSpinCoins, profile } = useApp();
  const [isSpinning, setIsSpinning] = useState(false);
  const [spinResult, setSpinResult] = useState<typeof SPIN_SECTORS[0] | null>(null);
  const [rotation, setRotation] = useState(0);
  const [spinError, setSpinError] = useState("");

  const handleSpin = () => {
    if (!profile) {
      setSpinError("Please sign in or use simulator to experience Lucky Spin.");
      return;
    }
    if (isSpinning) return;
    
    // Check cost (e.g., 20 coins to spin, or free if we want to be friendly!)
    const SPIN_COST = 20;
    if (profile.coins < SPIN_COST) {
      setSpinError(`Spin cost requires ${SPIN_COST} Coins inside wallet.`);
      return;
    }

    setSpinError("");
    setIsSpinning(true);
    setSpinResult(null);

    // Pick a random sector index
    const sectorCount = SPIN_SECTORS.length;
    const pickedIndex = Math.floor(Math.random() * sectorCount);
    const sectorAngle = 360 / sectorCount;
    
    // calculate degrees to spin: at least 5 full circles (360 * 5) + degree to land on the chosen index of sector 
    // Sector indices go clockwise, so landing index maps to target degree offset
    const addition = 360 - (pickedIndex * sectorAngle);
    const targetRotation = rotation + (360 * 6) + addition - (rotation % 360);

    setRotation(targetRotation);

    // After animation completed (3.5 seconds)
    setTimeout(async () => {
      const landed = SPIN_SECTORS[pickedIndex];
      setSpinResult(landed);
      setIsSpinning(false);
      
      // Deduct spin cost and add reward
      const finalYield = landed.coins - SPIN_COST;
      await awardSpinCoins(finalYield);
    }, 3500);
  };

  return (
    <div className="flex flex-col items-center p-6 bg-slate-900 border border-slate-800 rounded-2xl max-w-full relative shadow-xl overflow-hidden" id="lucky-spin-container">
      <div className="absolute top-0 right-0 w-44 h-44 bg-yellow-500/10 blur-3xl rounded-full" />
      <div className="absolute bottom-0 left-0 w-44 h-44 bg-indigo-500/10 blur-3xl rounded-full" />

      <h3 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
        <Sparkles className="w-5 h-5 text-yellow-400 animate-pulse" /> Daily Lucky Spin
      </h3>
      <p className="text-sm text-slate-400 mb-6 text-center max-w-xs">
        Spend <span className="text-red-400 font-bold">20 Coins</span> to spin. Win up to <span className="text-yellow-400 font-black">250 Coins Jackpot!</span>
      </p>

      {/* Spinner Board Wheel */}
      <div className="relative w-[280px] h-[280px] mb-6 flex items-center justify-center">
        {/* Pointer Triangle */}
        <div className="absolute -top-3 w-0 h-0 border-l-[12px] border-l-transparent border-r-[12px] border-r-transparent border-t-[20px] border-t-yellow-400 z-30 filter drop-shadow-lg" />

        {/* Outer Rim Ring */}
        <div className="absolute inset-0 border-8 border-slate-950 rounded-full shadow-inner z-10 pointers-none flex items-center justify-center">
          {/* Light bulbs along the border */}
          {Array(12).fill(0).map((_, i) => (
            <div 
              key={i} 
              className={`absolute w-1.5 h-1.5 rounded-full z-20 ${isSpinning ? 'bg-yellow-400 animate-ping' : 'bg-yellow-400'}`}
              style={{
                transform: `rotate(${i * 30}deg) translateY(-131px)`
              }}
            />
          ))}
        </div>

        {/* Inner Graphic Circle */}
        <div 
          className="w-[264px] h-[264px] rounded-full border border-slate-800 relative overflow-hidden transition-transform duration-[3500ms] cubic-bezier(0.1, 0.8, 0.1, 1)"
          style={{
            transform: `rotate(${rotation}deg)`,
            backgroundImage: "conic-gradient(from 0deg, #ef4444 0deg 45deg, #3b82f6 45deg 90deg, #ec4899 90deg 135deg, #f59e0b 135deg 180deg, #6366f1 180deg 225deg, #10b981 225deg 270deg, #64748b 270deg 315deg, #eab308 315deg 360deg)"
          }}
        >
          {SPIN_SECTORS.map((sector, i) => (
            <div
              key={i}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full"
              style={{
                transform: `rotate(${i * 45}deg)`
              }}
            >
              {/* text node positioner */}
              <span 
                className="absolute text-[11px] font-bold text-white tracking-tight uppercase"
                style={{
                  top: '18%',
                  left: '50%',
                  transform: 'translateX(-50%) rotate(0deg)',
                  writingMode: 'vertical-rl'
                }}
              >
                {sector.coins > 0 ? `${sector.coins} Coins` : "0 Claim"}
              </span>
            </div>
          ))}
        </div>

        {/* SPIN TRIGGER BUTTON */}
        <button
          onClick={handleSpin}
          disabled={isSpinning}
          className="absolute w-16 h-16 bg-gradient-to-br from-yellow-400 to-amber-500 hover:zoom rounded-full border-4 border-slate-950 z-20 shadow-2xl flex flex-col items-center justify-center font-bold text-slate-950 cursor-pointer text-xs active:scale-90 transition-all handles-disabled"
        >
          {isSpinning ? (
            <Loader className="w-5 h-5 animate-spin text-slate-950" />
          ) : (
            <>
              <span className="text-[10px] font-black uppercase">SPIN</span>
              <Coins className="w-4 h-4 text-slate-950" />
            </>
          )}
        </button>
      </div>

      {/* Result presentation and messages */}
      <div className="w-full text-center max-w-[280px]">
        {spinError && (
          <p className="text-xs text-rose-450 bg-rose-500/10 border border-rose-500/20 p-2 rounded-lg font-medium">
            {spinError}
          </p>
        )}

        {spinResult && (
          <div className="bg-slate-950 border border-slate-800 p-4 rounded-xl shadow-lg animate-bounce duration-500">
            <span className="text-[11px] text-slate-400 tracking-wider">SPIN OUTCOME</span>
            <h4 className="text-xl font-bold mt-1 text-white flex items-center justify-center gap-1.5 matches-green">
              {spinResult.coins > 0 ? (
                <>
                  <Coins className="w-5 h-5 text-yellow-400" />
                  Won <span className="text-yellow-400">+{spinResult.coins} Coins</span>
                </>
              ) : (
                "Try Again!"
              )}
            </h4>
            <p className="text-[10px] text-slate-500 mt-1">Spin fee of 20 Coins deducted</p>
          </div>
        )}
      </div>
    </div>
  );
}
