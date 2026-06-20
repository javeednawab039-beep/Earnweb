/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { HelpCircle, MessageSquare, ChevronDown, ChevronUp, AlertCircle } from 'lucide-react';

interface FaqItem {
  q: string;
  a: string;
}

export default function SupportView() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const faqs: FaqItem[] = [
    {
      q: "What is the coin valuation exchange rate?",
      a: "The standard platform exchange rate is: 10 Coins = Rs. 1.00 PKR (or equivalent in USD/local currency). For example, a balance of 2,450 Coins equates to Rs. 245.00 PKR cash."
    },
    {
      q: "How long does payout withdrawal processing take?",
      a: "All withdrawals are checked and audited by our moderation admins to prevent offer exploits and fraud. Typical processing speed is completed in 6 to 24 hours directly to your provided EasyPaisa/JazzCash account."
    },
    {
      q: "Can I use VPNs or multiple profiles to gain coins?",
      a: "Absolutely, positively NOT. Our automated anti-cheat script monitors connection coordinates and hardware identifiers. Profiles attempting access via VPN or logging redundant proxy referrals are instantly permanently blocked."
    },
    {
      q: "How many quizzes and tasks can I complete daily?",
      a: "You can solve unlimited quizzes. However, reward credits for each specific quiz are granted once. Active daily tasks from our partner networks replenish periodically every hour!"
    }
  ];

  return (
    <div className="space-y-6 max-w-3xl" id="support-view-wrapper">
      
      {/* BANNER GREETING HELP */}
      <div className="bg-gradient-to-r from-teal-600 to-indigo-600 rounded-2xl p-6 text-white border border-teal-555/20 shadow flex items-center gap-4">
        <div className="p-3 rounded-full bg-white/10 animate-pulse">
          <MessageSquare className="w-6 h-6 text-yellow-300" />
        </div>
        <div>
          <h2 className="text-xl font-black">EarnHub AI Customer Support</h2>
          <p className="text-xs text-teal-150 mt-1">
            Need guides or custom technical help? Browse our frequently answered database prompts below, or contact javeednawab039@gmail.com.
          </p>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 p-6 rounded-2xl shadow-sm space-y-4">
        <h3 className="text-md font-black text-slate-800 dark:text-white flex items-center gap-1.5 border-b border-slate-100 dark:border-slate-805 pb-3">
          <HelpCircle className="w-4.5 h-4.5 text-indigo-500" /> Frequently Asked Questions
        </h3>

        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div 
                key={idx} 
                className="border border-slate-150 dark:border-slate-850 rounded-xl overflow-hidden transition"
              >
                <button
                  onClick={() => setOpenIdx(isOpen ? null : idx)}
                  className="w-full p-4 text-left font-extrabold text-sm text-slate-705 dark:text-white flex justify-between items-center hover:bg-slate-50 dark:hover:bg-slate-955 transition cursor-pointer"
                >
                  <span>{faq.q}</span>
                  {isOpen ? <ChevronUp className="w-4 h-4 text-indigo-500" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
                </button>
                
                {isOpen && (
                  <div className="p-4 bg-slate-50/50 dark:bg-slate-950/40 text-xs text-slate-500 dark:text-slate-400 border-t border-slate-150 dark:border-slate-850 leading-relaxed">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
