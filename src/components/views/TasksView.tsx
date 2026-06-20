/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { TaskItem } from '../../types';
import { Coins, CheckCircle, ExternalLink, Loader, Bookmark, Sparkles, Filter } from 'lucide-react';

export default function TasksView() {
  const { tasks, completedTaskIds, completeTask } = useApp();
  const [activeTab, setActiveTab] = useState<string>("All");
  const [verifyingTaskId, setVerifyingTaskId] = useState<string | null>(null);
  const [successTaskId, setSuccessTaskId] = useState<string | null>(null);

  const tabs = ["All", "Social", "Video", "App", "Special", "Promo"];

  // Filter tasks
  const filteredTasks = tasks.filter(task => {
    if (task.status !== 'active') return false;
    if (activeTab === "All") return true;
    return task.category === activeTab;
  });

  const handleTaskClick = (task: TaskItem) => {
    if (completedTaskIds.includes(task.id)) return;

    // Open target task click link
    window.open(task.link, '_blank', 'referrer');

    // Fire verification timer
    setVerifyingTaskId(task.id);
    
    setTimeout(async () => {
      const claimOk = await completeTask(task.id, task.reward);
      setVerifyingTaskId(null);
      if (claimOk) {
        setSuccessTaskId(task.id);
        // fade success alert
        setTimeout(() => setSuccessTaskId(null), 3000);
      }
    }, 5000); // 5 seconds simulated check-in verification wait
  };

  return (
    <div className="space-y-6" id="tasks-view-wrapper">
      <div className="bg-gradient-to-r from-violet-600 to-indigo-600 rounded-2xl p-6 text-white border border-indigo-550/30 relative overflow-hidden shadow-lg">
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 blur-xl rounded-full" />
        <h2 className="text-2xl font-black tracking-tight flex items-center gap-2">
          📋 Premium Offer Wall
        </h2>
        <p className="text-xs text-indigo-150 mt-1">
          Each completed task is audited and verified. Finish basic social subscriptions, app downloads, and promo views to immediately stack coins inside your profile.
        </p>
      </div>

      {/* FILTER TABS */}
      <div className="flex flex-wrap gap-2 pb-1 border-b border-slate-100 dark:border-slate-800">
        {tabs.map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 text-xs font-bold rounded-xl transition cursor-pointer ${
              activeTab === tab
                ? 'bg-indigo-600 text-white shadow-md'
                : 'bg-slate-50 dark:bg-slate-950 text-slate-500 dark:text-slate-400 border border-slate-100 dark:border-slate-850 hover:bg-slate-100'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* TASKS MATRIX LIST */}
      {filteredTasks.length === 0 ? (
        <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-805 p-12 rounded-2xl text-center space-y-2">
          <Bookmark className="w-10 h-10 text-slate-350 mx-auto animate-pulse" />
          <h3 className="text-md font-bold text-slate-700 dark:text-slate-300">No active tasks in this tab</h3>
          <p className="text-xs text-slate-400">Our sponsor campaigns replenish hourly. Check back in a few minutes!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredTasks.map(task => {
            const isCompleted = completedTaskIds.includes(task.id);
            const isVerifying = verifyingTaskId === task.id;
            const showsSuccess = successTaskId === task.id;

            return (
              <div 
                key={task.id} 
                className={`bg-white dark:bg-slate-900 border p-5 rounded-2xl flex flex-col justify-between relative overflow-hidden transition shadow-sm hover:shadow-md ${
                  isCompleted 
                    ? 'border-emerald-500/20 bg-emerald-550/[0.01]' 
                    : 'border-slate-100 dark:border-slate-800'
                }`}
              >
                {/* Visual Category Label */}
                <div className="flex justify-between items-start mb-3">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-slate-100 dark:bg-slate-950 text-slate-500 dark:text-slate-400 border border-slate-205 dark:border-slate-850">
                    {task.category} Offer
                  </span>
                  <span className="text-yellow-500 font-extrabold flex items-center gap-1 font-mono text-sm">
                    💰 {task.reward.toLocaleString()} Coins
                  </span>
                </div>

                <div className="space-y-1 mb-4">
                  <h4 className="text-sm font-black text-slate-800 dark:text-white leading-tight">
                    {task.title}
                  </h4>
                  <p className="text-xs text-slate-400 line-clamp-2">
                    {task.description}
                  </p>
                </div>

                {/* Claim trigger bottom row */}
                <div>
                  {isCompleted ? (
                    <div className="w-full py-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs font-bold flex items-center justify-center gap-1.5">
                      <CheckCircle className="w-4 h-4 text-emerald-500" /> Done & Claimed
                    </div>
                  ) : isVerifying ? (
                    <button
                      disabled
                      className="w-full py-2.5 rounded-xl bg-slate-100 dark:bg-slate-950 text-slate-500 dark:text-slate-400 text-xs font-bold flex items-center justify-center gap-2 border border-slate-200 dark:border-slate-800"
                    >
                      <Loader className="w-4 h-4 animate-spin text-indigo-500" /> Verifying visit details (5s)...
                    </button>
                  ) : (
                    <button
                      onClick={() => handleTaskClick(task)}
                      className="w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs flex items-center justify-center gap-1 cursor-pointer transition shadow hover-zoom active:scale-95"
                    >
                      Complete Task <ExternalLink className="w-3.5 h-3.5" />
                    </button>
                  )}

                  {showsSuccess && (
                    <p className="text-[10px] text-emerald-500 font-bold mt-1.5 text-center animate-pulse">
                      +{task.reward} Coins credited to wallet balance successfully!
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
