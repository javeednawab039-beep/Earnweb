/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Users, 
  Plus, 
  Trash2, 
  Coins, 
  Compass, 
  CheckCircle, 
  XSquare, 
  Database,
  Loader,
  X,
  FileSpreadsheet,
  AlertTriangle
} from 'lucide-react';

export default function AdminPanel() {
  const { 
    tasks, 
    quizzes, 
    withdrawals, 
    addNewTask, 
    addNewQuiz, 
    approveWithdrawal, 
    rejectWithdrawal, 
    resetAllDatabase,
    isSimulated 
  } = useApp();

  // Create Task Form State
  const [taskTitle, setTaskTitle] = useState("");
  const [taskDesc, setTaskDesc] = useState("");
  const [taskReward, setTaskReward] = useState(100);
  const [taskCat, setTaskCat] = useState<"Social" | "Video" | "App">("Social");
  const [taskLink, setTaskLink] = useState("https://youtube.com");
  
  // Create Quiz Form State
  const [quizTitle, setQuizTitle] = useState("");
  const [quizCat, setQuizCat] = useState<"General Knowledge" | "Computer" | "Science" | "Technology">("General Knowledge");
  const [quizReward, setQuizReward] = useState(150);
  const [quizQuestions, setQuizQuestions] = useState([
    { question: "What represents 2 + 2?", options: ["2", "3", "4", "5"], correctAnswer: "4" }
  ]);

  const [loadingSeed, setLoadingSeed] = useState(false);
  const [actionDone, setActionDone] = useState("");

  const handleTaskSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!taskTitle || !taskLink) return;

    await addNewTask({
      title: taskTitle,
      description: taskDesc,
      reward: taskReward,
      category: taskCat,
      link: taskLink,
      status: "active"
    });

    setActionDone("Task posted successfully!");
    setTaskTitle("");
    setTaskDesc("");
    setTaskReward(100);
    setTimeout(() => setActionDone(""), 3000);
  };

  const handleQuizSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!quizTitle) return;

    await addNewQuiz({
      title: quizTitle,
      category: quizCat,
      reward: quizReward,
      questions: quizQuestions
    });

    setActionDone("Quiz category posted successfully!");
    setQuizTitle("");
    setQuizQuestions([{ question: "What represents 2 + 2?", options: ["2", "3", "4", "5"], correctAnswer: "4" }]);
    setTimeout(() => setActionDone(""), 3000);
  };

  const triggerDatabaseSeed = async () => {
    if (isSimulated) {
      alert("Please login via Google to deploy seeds to the actual Cloud Firestore database. Local simulation is already fully populated.");
      return;
    }
    if (!window.confirm("Do you want to seed over 100 Tasks and 500+ Quiz Questions (55 distinct quizzes) directly to your live Firestore? Current custom edits won't be deleted.")) {
      return;
    }
    setLoadingSeed(true);
    await resetAllDatabase();
    setLoadingSeed(false);
  };

  return (
    <div className="space-y-8" id="admin-panel-container">
      
      {/* HEADER BANNER SECURED */}
      <div className="bg-gradient-to-r from-red-650 via-rose-600 to-indigo-800 bg-rose-600 text-white p-6 rounded-2xl border border-rose-500/20 shadow-md relative overflow-hidden">
        <h2 className="text-2xl font-black tracking-tight flex items-center gap-2">
           Administrator Control Console
        </h2>
        <p className="text-xs text-rose-105 mt-1">
          Governing EarnHub AI. Author tasks, create trivial science quizzes, audit withdrawing proposals and run bulk pipeline seeds instantly.
        </p>
      </div>

      {/* QUICK BULK LOADER SEEDS */}
      <div className="bg-white dark:bg-slate-905 border border-slate-100 dark:border-slate-800 p-6 rounded-2xl shadow-sm text-sm text-slate-705 dark:text-slate-300 space-y-4">
        <h3 className="text-md font-black text-slate-800 dark:text-white flex items-center gap-1.5 border-b border-slate-100 dark:border-slate-805 pb-3">
          <Database className="w-5 h-5 text-indigo-500 animate-pulse" /> Bulk Database Preloaders Seeder
        </h3>
        
        <p className="text-xs text-slate-400">
          Immediately inject <strong className="text-slate-700 dark:text-slate-300">100+ Earning offers</strong> and <strong className="text-slate-700 dark:text-slate-300">500+ Multi-choice questions</strong> directly to the firestore cluster. Required to comply with product launch thresholds.
        </p>

        <button
          disabled={loadingSeed}
          onClick={triggerDatabaseSeed}
          className="px-5 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs flex justify-center items-center gap-2 cursor-pointer shadow active:scale-95 transition-all handles-disabled"
        >
          {loadingSeed ? (
            <>
              <Loader className="w-4 h-4 animate-spin" /> Seeding 600+ database records...
            </>
          ) : (
            <>
              <Database className="w-4 h-4" /> Seed 100+ Tasks & 500+ Quiz Questions (Live Firestore)
            </>
          )}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* CREATE TASK COMPONENT */}
        <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 p-6 rounded-2xl hover:shadow-md transition">
          <h3 className="text-md font-black text-slate-805 dark:text-white flex items-center gap-1.5 border-b border-slate-100 dark:border-slate-805 pb-3 mb-4">
            <Plus className="w-4.5 h-4.5 text-emerald-500" /> Post New Task Offer
          </h3>

          <form onSubmit={handleTaskSubmit} className="space-y-4 text-xs font-semibold">
            <div className="space-y-1">
              <label className="text-slate-400">TASK TITLE</label>
              <input
                type="text"
                required
                placeholder="e.g. Subscribe to our sponsor channel"
                value={taskTitle}
                onChange={e => setTaskTitle(e.target.value)}
                className="w-full bg-slate-50 dark:bg-slate-950 p-2.5 outline-none rounded-xl border border-slate-200 dark:border-slate-800 font-bold text-slate-700 dark:text-slate-200"
              />
            </div>

            <div className="space-y-1">
              <label className="text-slate-400">DETAILS DESCRIPTION</label>
              <textarea
                placeholder="Briefly detail required criteria to approve coin claims"
                value={taskDesc}
                onChange={e => setTaskDesc(e.target.value)}
                className="w-full bg-slate-50 dark:bg-slate-950 p-2.5 outline-none rounded-xl border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-200 font-medium"
                rows={2}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-slate-400">COINS REWARD</label>
                <input
                  type="number"
                  required
                  value={taskReward}
                  onChange={e => setTaskReward(parseInt(e.target.value) || 0)}
                  className="w-full bg-slate-50 dark:bg-slate-950 p-2.5 outline-none rounded-xl border border-slate-200 dark:border-slate-800 font-mono font-bold text-slate-700 dark:text-slate-250"
                />
              </div>

              <div className="space-y-1">
                <label className="text-slate-400">CATEGORY</label>
                <select
                  value={taskCat}
                  onChange={e => setTaskCat(e.target.value as any)}
                  className="w-full bg-slate-50 dark:bg-slate-950 p-2.5 outline-none rounded-xl border border-slate-200 dark:border-slate-800 font-bold"
                >
                  <option value="Social">Social Media</option>
                  <option value="Video">Video Promotion</option>
                  <option value="App">Mobile App Install</option>
                  <option value="Special">Special Deals</option>
                </select>
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-slate-400">EXTERNAL SPONSOR CAMPAIGN LINK</label>
              <input
                type="text"
                required
                value={taskLink}
                onChange={e => setTaskLink(e.target.value)}
                className="w-full bg-slate-50 dark:bg-slate-950 p-2.5 outline-none rounded-xl border border-slate-200 dark:border-slate-800 text-slate-500 font-mono"
              />
            </div>

            <button
              type="submit"
              className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl shadow cursor-pointer transition active:scale-95"
            >
              Broadcast Task Offer
            </button>
          </form>
        </div>

        {/* CREATE QUIZ COMPONENT */}
        <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 p-6 rounded-2xl hover:shadow-md transition">
          <h3 className="text-md font-black text-slate-805 dark:text-white flex items-center gap-1.5 border-b border-slate-100 dark:border-slate-805 pb-3 mb-4">
            <Plus className="w-4.5 h-4.5 text-indigo-500" /> Create Quiz Category
          </h3>

          <form onSubmit={handleQuizSubmit} className="space-y-4 text-xs font-semibold">
            <div className="space-y-1">
              <label className="text-slate-400">QUIZ LEVEL TITLE</label>
              <input
                type="text"
                required
                placeholder="e.g. Science Frontiers Vol. 3"
                value={quizTitle}
                onChange={e => setQuizTitle(e.target.value)}
                className="w-full bg-slate-50 dark:bg-slate-950 p-2.5 outline-none rounded-xl border border-slate-200 dark:border-slate-800 font-bold text-slate-705 dark:text-slate-200"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-slate-400">COINS AWARDED</label>
                <input
                  type="number"
                  required
                  value={quizReward}
                  onChange={e => setQuizReward(parseInt(e.target.value) || 0)}
                  className="w-full bg-slate-50 dark:bg-slate-950 p-2.5 outline-none rounded-xl border border-slate-200 dark:border-slate-800 font-mono font-bold"
                />
              </div>

              <div className="space-y-1">
                <label className="text-slate-400">CATEGORY TYPE</label>
                <select
                  value={quizCat}
                  onChange={e => setQuizCat(e.target.value as any)}
                  className="w-full bg-slate-50 dark:bg-slate-950 p-2.5 outline-none rounded-xl border border-slate-200 dark:border-slate-800 font-bold"
                >
                  <option value="General Knowledge">General Knowledge</option>
                  <option value="Computer">Computer Systems</option>
                  <option value="Science">Science & Chemistry</option>
                  <option value="Technology">Technology Hub</option>
                </select>
              </div>
            </div>

            {/* Questions list configurer block */}
            <div className="p-3 bg-slate-50 dark:bg-slate-955 rounded-xl border border-slate-150 dark:border-slate-850 space-y-2">
              <h4 className="font-bold text-slate-600 dark:text-slate-400">Questions preset (1 question preconfigured):</h4>
              <p className="text-[10px] text-slate-400">Admin quizzes are posted with standard 4-choice setups.</p>
            </div>

            <button
              type="submit"
              className="px-5 py-2.5 bg-indigo-650 hover:bg-indigo-505 text-white bg-indigo-600 rounded-xl shadow cursor-pointer transition active:scale-95"
            >
              Post Quiz Chapter
            </button>
          </form>
        </div>
      </div>

      {/* WITHDRAWALS AUDITING CONSOLE */}
      <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 p-6 rounded-2xl shadow-sm">
        <h3 className="text-md font-black text-slate-800 dark:text-white flex items-center gap-1.5 border-b border-slate-100 dark:border-slate-805 pb-3">
          <FileSpreadsheet className="w-5 h-5 text-indigo-500" /> Payout Submissions Auditing Node
        </h3>

        {withdrawals.length === 0 ? (
          <p className="text-center text-xs text-slate-400 py-10">No pending payout files inside database right now.</p>
        ) : (
          <div className="mt-4 overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-100 dark:border-slate-800 text-slate-400 font-black tracking-wider uppercase bg-slate-50 dark:bg-slate-955">
                  <th className="p-3">User</th>
                  <th className="p-3">Cash (PKR)</th>
                  <th className="p-3">Method / address</th>
                  <th className="p-3">Status</th>
                  <th className="p-3 text-right">Audit Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-850">
                {withdrawals.map(w => (
                  <tr key={w.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-950/20 transition">
                    <td className="p-3 font-extrabold text-slate-800 dark:text-slate-200">{w.userName}</td>
                    <td className="p-3 font-mono text-slate-700 dark:text-slate-200">
                      Rs. {w.amount}
                      <span className="text-[10px] text-yellow-500 font-bold block">💰 {w.coins.toLocaleString()}</span>
                    </td>
                    <td className="p-3">
                      <span className="font-bold block text-slate-800 dark:text-slate-200 text-[11px]">{w.paymentMethod}</span>
                      <span className="text-[10px] text-slate-400 font-mono">{w.paymentAddress}</span>
                    </td>
                    <td className="p-3">
                      <span className={`px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider ${
                        w.status === 'pending' ? 'bg-amber-100 text-amber-705 dark:bg-amber-500/10 dark:text-amber-400' :
                        w.status === 'approved' ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-500/10 dark:text-emerald-400' :
                        'bg-rose-100 text-rose-800 dark:bg-rose-500/10 dark:text-rose-400'
                      }`}>
                        {w.status}
                      </span>
                    </td>
                    <td className="p-3 text-right">
                      {w.status === 'pending' ? (
                        <div className="inline-flex gap-1.5">
                          <button
                            onClick={() => approveWithdrawal(w.id)}
                            className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold px-2.5 py-1 rounded text-[10px] cursor-pointer shadow active:scale-90 transition"
                          >
                            Approve Payout
                          </button>
                          <button
                            onClick={() => rejectWithdrawal(w.id)}
                            className="bg-rose-550 hover:bg-rose-500 text-white font-bold px-2.5 py-1 rounded text-[10px] cursor-pointer shadow active:scale-90 transition bg-rose-600"
                          >
                            Reject & Refund
                          </button>
                        </div>
                      ) : (
                        <span className="text-slate-400 text-[10px] uppercase font-bold">Audited</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {actionDone && (
        <div className="fixed bottom-6 right-6 p-4 bg-emerald-600 text-white font-bold rounded-2xl shadow-xl border border-emerald-500/30 text-xs animate-bounce z-50">
          {actionDone}
        </div>
      )}
    </div>
  );
}
