/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Coins, 
  Wallet, 
  CheckSquare, 
  Users, 
  Gift, 
  ArrowRight, 
  Sparkles, 
  Trophy, 
  Gamepad2, 
  HelpCircle, 
  Share2, 
  Play, 
  CheckCircle,
  HelpCircle as QuestionIcon
} from 'lucide-react';
import GoogleAdSense from '../GoogleAdSense';

interface DashboardViewProps {
  onNavigate: (view: string) => void;
}

export default function DashboardView({ onNavigate }: DashboardViewProps) {
  const { 
    profile, 
    leaderboard, 
    claimDailyBonus, 
    notifications,
    isSimulated,
    simulateTester
  } = useApp();

  const [loadingClaim, setLoadingClaim] = useState(false);
  const [claimSuccess, setClaimSuccess] = useState<boolean | null>(null);

  const handleClaimBonus = async () => {
    setLoadingClaim(true);
    setClaimSuccess(null);
    const success = await claimDailyBonus();
    setClaimSuccess(success);
    setLoadingClaim(false);
  };

  const todayStr = new Date().toISOString().slice(0, 10);
  const hasClaimedToday = profile?.dailyBonusLastClaimed?.slice(0, 10) === todayStr;

  return (
    <div className="space-y-6" id="dashboard-view-wrapper">
      {/* 1. TOP BANNER AD */}
      <div className="w-full">
        <GoogleAdSense type="leaderboard" />
      </div>

      {/* 2. DUAL-COLUMN GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* LEFT TWO COLUMNS: HERO & STATS & TILES */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* HERO BANNER SECTION */}
          <div className="relative bg-gradient-to-r from-blue-600 via-indigo-600 to-indigo-700 text-white p-8 rounded-3xl flex flex-col md:flex-row items-center justify-between border border-white/5 shadow-2xl overflow-hidden group">
            {/* Ambient Background decoration */}
            <div className="absolute -right-10 -top-10 w-48 h-48 bg-white/10 rounded-full blur-3xl pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/5 blur-xl rounded-full pointer-events-none" />

            <div className="space-y-4 max-w-md relative z-10 text-center md:text-left mb-6 md:mb-0">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 text-[10px] font-bold uppercase tracking-widest backdrop-blur">
                <Sparkles className="w-3 h-3 text-yellow-350" /> Earning Space Ready
              </span>
              <h2 className="text-3xl font-black leading-tight tracking-tight">
                Complete Tasks, Play Games, <br />
                <span className="text-yellow-300">Win Coins & Earn Rewards</span>
              </h2>
              <p className="text-blue-100 text-sm mt-1 opacity-90 leading-relaxed">
                Join daily, complete quick offerwalls, answer trivial science quizzes, and withdraw easy money instantly.
              </p>
              <button
                onClick={() => onNavigate('Tasks')}
                className="inline-flex items-center gap-1.5 px-5 py-2.5 bg-yellow-400 text-slate-950 font-bold text-sm rounded-xl hover:bg-yellow-300 transition-all transform hover:scale-105 active:scale-95 cursor-pointer shadow-lg hover:shadow-yellow-400/20"
              >
                Start Earning Now <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Gift box & trophy illustrations */}
            <div className="flex gap-4 items-center relative z-10 select-none">
              <div className="relative animate-bounce duration-[2.5s]">
                <div className="text-6xl text-amber-300 drop-shadow-lg">🏆</div>
              </div>
              <div className="relative animate-pulse">
                <div className="text-6xl text-yellow-400 drop-shadow-2xl">🎁</div>
              </div>
            </div>
          </div>

          {/* FOUR METRICS STATS CARDS GRID */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            
            {/* STATS 1: TOTAL COINS */}
            <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 p-4 rounded-2xl flex items-center gap-4 relative overflow-hidden shadow-sm group hover:shadow-md transition">
              <div className="p-3 rounded-xl bg-blue-100 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400">
                <Coins className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400">Total Coins</span>
                <p className="text-xl font-extrabold text-slate-800 dark:text-white mt-0.5">{profile?.coins ?? 0}</p>
                <span className="text-[10px] text-green-500 font-bold block mt-0.5">+120 today</span>
              </div>
            </div>

            {/* STATS 2: TOTAL EARNINGS (PKR) */}
            <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 p-4 rounded-2xl flex items-center gap-4 relative overflow-hidden shadow-sm group hover:shadow-md transition">
              <div className="p-3 rounded-xl bg-emerald-100 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                <Wallet className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400">PKR Cash</span>
                <p className="text-xl font-extrabold text-slate-800 dark:text-white mt-0.5">Rs. {profile?.pkr ?? 0}</p>
                <span className="text-[10px] text-green-500 font-bold block mt-0.5">+Rs. 35 today</span>
              </div>
            </div>

            {/* STATS 3: TASKS COMPLETED */}
            <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 p-4 rounded-2xl flex items-center gap-4 relative overflow-hidden shadow-sm group hover:shadow-md transition">
              <div className="p-3 rounded-xl bg-amber-100 dark:bg-amber-500/10 text-amber-600 dark:text-amber-400">
                <CheckSquare className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400">Tasks Clear</span>
                <p className="text-xl font-extrabold text-slate-800 dark:text-white mt-0.5">{profile?.tasksCount ?? 0}</p>
                <span className="text-[10px] text-green-500 font-bold block mt-0.5">+3 today</span>
              </div>
            </div>

            {/* STATS 4: REFERRAL COUNT */}
            <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 p-4 rounded-2xl flex items-center gap-4 relative overflow-hidden shadow-sm group hover:shadow-md transition">
              <div className="p-3 rounded-xl bg-indigo-100 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400">
                <Users className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400">Referrals</span>
                <p className="text-xl font-extrabold text-slate-800 dark:text-white mt-0.5">{profile?.referralsCount ?? 0}</p>
                <span className="text-[10px] text-green-500 font-bold block mt-0.5">+2 today</span>
              </div>
            </div>
          </div>

          {/* TOP EARNING ACTIVITIES NAV GRID (TASKS, QUIZ, GAMES, REFERRAL, SPIN WHEEL) */}
          <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 p-6 rounded-2xl space-y-4">
            <h3 className="text-lg font-black text-slate-800 dark:text-white tracking-tight">Top Earning Activities</h3>
            
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              
              {/* CARD 1: TASKS */}
              <button 
                onClick={() => onNavigate('Tasks')}
                className="bg-slate-50 dark:bg-slate-950 hover:bg-indigo-500/5 hover-zoom p-4 rounded-xl text-center border border-slate-100 dark:border-slate-850 flex flex-col items-center justify-between group transition duration-300 cursor-pointer"
              >
                <div className="w-10 h-10 rounded-xl bg-indigo-100 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-bold text-lg mb-2">
                  📋
                </div>
                <h4 className="text-sm font-bold text-slate-700 dark:text-slate-300">Tasks</h4>
                <p className="text-[10px] text-slate-400 mt-1 max-w-[120px]">Solve daily quick sponsor offers</p>
                <span className="mt-3 text-xs text-indigo-500 group-hover:text-indigo-400 font-bold flex items-center gap-1">
                  Go Now <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition" />
                </span>
              </button>

              {/* CARD 2: QUIZ */}
              <button 
                onClick={() => onNavigate('Quiz')}
                className="bg-slate-50 dark:bg-slate-950 hover:bg-emerald-500/5 hover-zoom p-4 rounded-xl text-center border border-slate-100 dark:border-slate-850 flex flex-col items-center justify-between group transition duration-300 cursor-pointer"
              >
                <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold text-lg mb-2">
                  ❓
                </div>
                <h4 className="text-sm font-bold text-slate-700 dark:text-slate-300">Quiz</h4>
                <p className="text-[10px] text-slate-400 mt-1 max-w-[120px]">Answer trivia general queries</p>
                <span className="mt-3 text-xs text-emerald-500 group-hover:text-emerald-400 font-bold flex items-center gap-1">
                  Go Now <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition" />
                </span>
              </button>

              {/* CARD 3: GAMES */}
              <button 
                onClick={() => onNavigate('Games')}
                className="bg-slate-50 dark:bg-slate-950 hover:bg-amber-500/5 hover-zoom p-4 rounded-xl text-center border border-slate-100 dark:border-slate-850 flex flex-col items-center justify-between group transition duration-300 cursor-pointer"
              >
                <div className="w-10 h-10 rounded-xl bg-amber-100 dark:bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center font-bold text-lg mb-2">
                  🎮
                </div>
                <h4 className="text-sm font-bold text-slate-700 dark:text-slate-300">Games</h4>
                <p className="text-[10px] text-slate-400 mt-1 max-w-[120px]">Compete in 10+ mini game arenas</p>
                <span className="mt-3 text-xs text-amber-500 group-hover:text-amber-400 font-bold flex items-center gap-1">
                  Go Now <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition" />
                </span>
              </button>

              {/* CARD 4: REFERRAL */}
              <button 
                onClick={() => onNavigate('Referral')}
                className="bg-slate-50 dark:bg-slate-950 hover:bg-blue-500/5 hover-zoom p-4 rounded-xl text-center border border-slate-100 dark:border-slate-850 flex flex-col items-center justify-between group transition duration-300 cursor-pointer"
              >
                <div className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold text-lg mb-2">
                  👥
                </div>
                <h4 className="text-sm font-bold text-slate-700 dark:text-slate-300">Referral</h4>
                <p className="text-[10px] text-slate-400 mt-1 max-w-[120px]">Invite new friends to sign-up</p>
                <span className="mt-3 text-xs text-blue-500 group-hover:text-blue-400 font-bold flex items-center gap-1">
                  Go Now <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition" />
                </span>
              </button>

              {/* CARD 5: SPIN WHEEL */}
              <button 
                onClick={() => onNavigate('Lucky Spin')}
                className="bg-slate-50 dark:bg-slate-950 hover:bg-pink-500/5 hover-zoom p-4 rounded-xl text-center border border-slate-100 dark:border-slate-850 flex flex-col items-center justify-between group transition duration-300 col-span-2 md:col-span-1 cursor-pointer"
              >
                <div className="w-10 h-10 rounded-xl bg-pink-100 dark:bg-pink-500/10 text-pink-600 dark:text-pink-400 flex items-center justify-center font-bold text-lg mb-2">
                  🎡
                </div>
                <h4 className="text-sm font-bold text-slate-700 dark:text-slate-300">Spin Wheel</h4>
                <p className="text-[10px] text-slate-400 mt-1 max-w-[120px]">Grab lucky daily spin tokens</p>
                <span className="mt-3 text-xs text-pink-500 group-hover:text-pink-400 font-bold flex items-center gap-1">
                  Spin Now <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition" />
                </span>
              </button>

            </div>
          </div>

          {/* SECOND CONTAINER GRAPH AD */}
          <div>
            <GoogleAdSense type="leaderboard" />
          </div>

        </div>

        {/* RIGHT ONE COLUMN: DAILY CHECK-IN & RECTANGLE AD & LEADERBOARD WIDGET */}
        <div className="space-y-6">
          
          {/* DAILY CHECK-IN CARD */}
          <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 p-6 rounded-2xl relative overflow-hidden group shadow-sm hover:shadow-md transition">
            <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-amber-500/10 to-transparent blur-xl pointer-events-none" />
            
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-lg font-black text-slate-800 dark:text-white flex items-center gap-1.5 leading-tight">
                  <Gift className="w-5 h-5 text-amber-500 animate-bounce" /> Daily Login Bonus
                </h3>
                <p className="text-xs text-slate-400 mt-1">Claim your bonus and get free coins daily!</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-amber-500/20 text-yellow-500 flex items-center justify-center font-black text-lg outline-2 outline-yellow-405/20 animate-pulse">
                5
              </div>
            </div>

            {hasClaimedToday ? (
              <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-xl flex items-center gap-2.5 text-emerald-600 dark:text-emerald-400 text-xs font-semibold">
                <CheckCircle className="w-4 h-4 text-emerald-500" />
                <span>You have successfully checked-in today! Return in 24 hours.</span>
              </div>
            ) : (
              <button
                disabled={loadingClaim}
                onClick={handleClaimBonus}
                className="w-full py-3 px-4 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-sm rounded-xl cursor-pointer shadow transition-all transform active:scale-95 flex items-center justify-center gap-1"
              >
                {loadingClaim ? "Filing claims..." : "Claim Bonus (+50 Coins)"}
              </button>
            )}

            {claimSuccess && (
              <p className="text-[10px] text-emerald-500 font-bold mt-2 text-center">
                Check-in successful! +50 coins credited beautifully.
              </p>
            )}
          </div>

          {/* DYNAMIC SIDEBAR RECTANGLE AD */}
          <div>
            <GoogleAdSense type="rectangle" />
          </div>

          {/* LEADERBOARD BOARD SUMMARY LIST */}
          <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 p-5 rounded-2xl space-y-4 shadow-sm">
            <div className="flex justify-between items-center">
              <h3 className="text-md font-black text-slate-800 dark:text-white flex items-center gap-1.5">
                <Trophy className="w-4 h-4 text-yellow-500" /> Top Earners
              </h3>
              <button
                onClick={() => onNavigate('Leaderboard')}
                className="text-xs text-indigo-500 hover:text-indigo-400 font-semibold cursor-pointer"
              >
                View All
              </button>
            </div>

            <div className="space-y-3">
              {leaderboard.slice(0, 5).map((rank, index) => {
                return (
                  <div key={rank.uid} className="flex justify-between items-center bg-slate-50 dark:bg-slate-950 p-2 text-xs rounded-xl border border-slate-100/50 dark:border-slate-850">
                    <div className="flex items-center gap-2.5">
                      <span className="w-5 text-center font-mono font-bold text-slate-400">
                        {index + 1}
                      </span>
                      <img
                        src={rank.photoURL || `https://api.dicebear.com/7.x/adventurer/svg?seed=${rank.displayName}`}
                        alt={rank.displayName}
                        className="w-8 h-8 rounded-full bg-slate-200 border border-slate-350 dark:border-slate-800"
                        referrerPolicy="no-referrer"
                      />
                      <div>
                        <p className="font-extrabold text-slate-800 dark:text-slate-100">{rank.displayName}</p>
                        <span className="text-[10px] text-slate-400">Level {rank.level}</span>
                      </div>
                    </div>
                    <span className="font-bold text-yellow-500 flex items-center gap-1 font-mono">
                      💰 {rank.coins.toLocaleString()}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      </div>

      {/* 3. FOOTER LARGE BANNER AD */}
      <div className="w-full">
        <GoogleAdSense type="footer" />
      </div>
    </div>
  );
}
