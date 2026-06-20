/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';

interface AdSenseProps {
  type: 'leaderboard' | 'rectangle' | 'footer';
}

export default function GoogleAdSense({ type }: AdSenseProps) {
  let sizeText = '728 × 90';
  let layoutText = 'Leaderboard';
  let classes = 'w-full h-[90px]';

  if (type === 'rectangle') {
    sizeText = '300 × 250';
    layoutText = 'Rectangle';
    classes = 'w-full max-w-[300px] h-[250px] mx-auto';
  } else if (type === 'footer') {
    sizeText = '970 × 90';
    layoutText = 'Large Leaderboard';
    classes = 'w-full h-[90px]';
  }

  return (
    <div className={`bg-white dark:bg-slate-950 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-xl flex flex-col sm:flex-row items-center justify-between p-4 gap-4 overflow-hidden relative group transition duration-300 ${classes}`} id={`adsense-${type}`}>
      {/* Background visual detail */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-emerald-500/5 opacity-0 group-hover:opacity-100 transition duration-300 pointer-events-none" />

      <div className="flex items-center gap-3 relative z-10">
        <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-center font-black text-blue-600 dark:text-blue-400 text-lg shadow-inner">
          G
        </div>
        <div>
          <span className="text-[10px] font-black uppercase text-blue-500 tracking-wider">Ads by Google</span>
          <p className="text-xs text-slate-500 dark:text-slate-400">This is a dynamic responsive Google AdSense advert.</p>
        </div>
      </div>

      <div className="hidden sm:flex bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-850 px-4 py-2 rounded-lg text-sm text-slate-500 font-mono font-bold tracking-tight">
        {sizeText} - {layoutText}
      </div>
    </div>
  );
}
