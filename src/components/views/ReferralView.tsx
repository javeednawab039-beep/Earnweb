/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Users, 
  Copy, 
  Check, 
  Share2, 
  Gift, 
  Coins, 
  FileText, 
  ShieldAlert,
  Award,
  Flame
} from 'lucide-react';

export default function ReferralView() {
  const { profile } = useApp();
  const [copied, setCopied] = useState(false);

  // Generate unique link
  const refCode = profile?.referralCode || 'YOURCODE';
  const referralLink = `${window.location.origin}/?ref=${refCode}`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const shareText = `Join EarnHub AI, complete basic tasks, play amazing games to earn easy coins, and withdraw real money directly to EasyPaisa/JazzCash! Sign up with my link to instantly claim 100 free Coins welcome bonus: ${referralLink}`;

  const handleShareWhatsApp = () => {
    window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(shareText)}`, '_blank');
  };

  const handleShareFacebook = () => {
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(referralLink)}`, '_blank');
  };

  const handleShareTwitter = () => {
    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}`, '_blank');
  };

  return (
    <div className="space-y-6" id="referral-view-wrapper">
      
      {/* REFERRAL HERO BANNER */}
      <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 rounded-2xl p-6 text-white border border-blue-500/20 shadow-lg relative overflow-hidden">
        <div className="absolute top-0 right-0 w-36 h-36 bg-gradient-to-br from-white/10 to-transparent blur-2xl pointer-events-none" />
        <h2 className="text-2xl font-black tracking-tight flex items-center gap-2">
          <Users className="w-5 h-5 text-yellow-300" /> Share & Earn Wealth Boost
        </h2>
        <p className="text-xs text-indigo-100 mt-1 max-w-xl">
          Invite your friends, colleagues, or family. When they register through your unique link, you receive <span className="text-yellow-300 font-bold">250 Coins</span> premium reward, and they secure <span className="text-yellow-300 font-bold">100 Coins</span> starter balance!
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* LEFT COLUMN: REGISTRATIONS LINK AND SOCIAL BLOCKS */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* USER REFERRAL CARD HOLDER */}
          <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 p-6 rounded-2xl space-y-4 shadow-sm relative">
            <h3 className="text-md font-black text-slate-800 dark:text-white flex items-center gap-1.5 border-b border-slate-100 dark:border-slate-805 pb-3">
              <Gift className="w-4.5 h-4.5 text-amber-500" /> Your Invitation Link
            </h3>

            {/* Code showcase */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-slate-50 dark:bg-slate-950 p-4 rounded-xl border border-slate-150 dark:border-slate-850">
              <div className="sm:col-span-1 text-center sm:text-left self-center">
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">YOUR INVITE CODE</span>
                <span className="text-2xl font-black tracking-wider text-indigo-600 dark:text-indigo-400 font-mono mt-0.5 block">{refCode}</span>
              </div>

              <div className="sm:col-span-2">
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block mb-1">Click to copy your unique referral link:</span>
                <div className="flex gap-2.5">
                  <input
                    type="text"
                    readOnly
                    value={referralLink}
                    className="flex-1 bg-white dark:bg-slate-900 p-2.5 hover:shadow-inner rounded-xl border border-slate-200 dark:border-slate-800 text-xs font-mono font-bold text-slate-600 dark:text-slate-300 outline-none overflow-hidden text-ellipsis shadow-inner"
                  />
                  <button
                    onClick={copyToClipboard}
                    className="px-4 bg-indigo-600 hover:bg-indigo-505 hover-zoom rounded-xl text-white font-bold text-xs flex items-center gap-1 cursor-pointer transition shadow active:scale-95"
                  >
                    {copied ? (
                      <Check className="w-4 h-4 text-emerald-350" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                    {copied ? 'Copied' : 'Copy'}
                  </button>
                </div>
              </div>
            </div>

            {/* Quick social sharing nodes */}
            <div className="space-y-2 pt-2">
              <span className="text-[10px] font-black uppercase text-slate-450 tracking-wider">Tap to instantly broadcast links:</span>
              <div className="flex gap-2.5">
                <button
                  onClick={handleShareWhatsApp}
                  className="flex-1 py-2.5 px-3 rounded-xl border bg-emerald-50 dark:bg-emerald-500/10 border-emerald-400/20 hover:bg-emerald-100 text-emerald-600 dark:text-emerald-400 font-bold text-xs text-center transition cursor-pointer active:scale-95 flex items-center justify-center gap-1.5"
                >
                  🟢 WhatsApp
                </button>
                <button
                  onClick={handleShareFacebook}
                  className="flex-1 py-2.5 px-3 rounded-xl border bg-blue-50 dark:bg-blue-550/10 border-blue-400/20 hover:bg-blue-100 text-blue-600 dark:text-blue-400 font-bold text-xs text-center transition cursor-pointer active:scale-95 flex items-center justify-center gap-1.5"
                >
                  🔵 Facebook
                </button>
                <button
                  onClick={handleShareTwitter}
                  className="flex-1 py-2.5 px-3 rounded-xl border bg-slate-50 dark:bg-slate-850 border-slate-400/20 hover:bg-slate-100 text-slate-700 dark:text-slate-300 font-bold text-xs text-center transition cursor-pointer active:scale-95 flex items-center justify-center gap-1.5"
                >
                  ⚫ X / Twitter
                </button>
              </div>
            </div>
          </div>

          {/* REFERRAL LAWS & GUIDELINES */}
          <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-850 p-6 rounded-2xl shadow-sm text-sm text-slate-650 dark:text-slate-350 space-y-4">
            <h3 className="text-md font-black text-slate-800 dark:text-white flex items-center gap-1.5 border-b border-slate-105 pb-3">
              <ShieldAlert className="w-4.5 h-4.5 text-rose-500 animate-pulse" /> Earning Rules & Fraud Prevention
            </h3>
            <ul className="list-disc list-inside space-y-2 text-xs">
              <li>Self-referring or creating duplicate profiles inside same device will cause an instant automatic payout ban.</li>
              <li>Fake account registrations are monitored and deleted by our server anti-cheat firewall system twice daily.</li>
              <li>Points are credited immediately once your referred friend verifies their email and successfully claims their first 2 tasks/games options.</li>
              <li>There is absolutely no ceiling limit on total referrals! Invite unlimited contacts and establish permanent commissions.</li>
            </ul>
          </div>

        </div>

        {/* RIGHT COLUMN: REFERRALS STATS BOARD */}
        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-900 border border-slate-105 p-6 rounded-2xl flex flex-col justify-center items-center shadow-sm text-center relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-indigo-500/10 to-transparent blur-xl pointer-events-none" />
            <div className="w-12 h-12 bg-indigo-100 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 flex items-center justify-center rounded-2xl mb-3 shadow">
              <Users className="w-6 h-6" />
            </div>
            <span className="text-[11px] font-black text-slate-400 uppercase tracking-widest leading-none">Your Referred Signups</span>
            <span className="text-4xl font-black text-slate-800 dark:text-white font-mono mt-2 mb-0.5">
              {profile?.referralsCount ?? 0}
            </span>
            <p className="text-xs text-slate-400">Total verified members invited</p>

            <div className="w-full mt-5 p-3.5 bg-slate-50 dark:bg-slate-950 border border-slate-150 dark:border-slate-850 rounded-xl flex items-center gap-2 justify-center text-xs font-semibold">
              <Award className="w-4 h-4 text-yellow-500 animate-bounce" />
              <span className="text-slate-500 dark:text-slate-400">Yielded commissions: <strong className="text-emerald-500 font-bold">+ {((profile?.referralsCount ?? 0) * 250).toLocaleString()} Coins</strong></span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
