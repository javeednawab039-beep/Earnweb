/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Wallet, 
  Coins, 
  Send, 
  Clock, 
  CheckCircle, 
  XCircle, 
  AlertCircle,
  TrendingUp,
  CreditCard,
  Grid
} from 'lucide-react';

export default function WalletView() {
  const { profile, withdrawals, requestWithdrawal } = useApp();
  
  const [method, setMethod] = useState("EasyPaisa");
  const [address, setAddress] = useState("");
  const [coinsStr, setCoinsStr] = useState("1000");
  const [withdrawError, setWithdrawError] = useState("");
  const [withdrawSuccess, setWithdrawSuccess] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const COIN_RATE = 10; // 10 coins = 1 PKR
  const MIN_WITHDRAW = 1000; // 1000 coins min

  const currentCoins = profile?.coins ?? 0;
  const currentPkr = profile?.pkr ?? 0;

  const handleWithdrawValuesSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setWithdrawError("");
    setWithdrawSuccess("");

    const coinsToDeduct = parseInt(coinsStr);
    if (isNaN(coinsToDeduct) || coinsToDeduct <= 0) {
      setWithdrawError("Please enter a valid amount of coins.");
      return;
    }

    if (coinsToDeduct < MIN_WITHDRAW) {
      setWithdrawError(`Minimum withdrawal threshold requires at least ${MIN_WITHDRAW} Coins (Rs. ${MIN_WITHDRAW / COIN_RATE}).`);
      return;
    }

    if (currentCoins < coinsToDeduct) {
      setWithdrawError(`Insufficient balance! Your wallet possesses ${currentCoins} Coins.`);
      return;
    }

    if (!address.trim()) {
      setWithdrawError("Please submit a valid phone number or account detail for receiving payout.");
      return;
    }

    setSubmitting(true);
    const result = await requestWithdrawal(method, address, coinsToDeduct);
    setSubmitting(false);

    if (result.success) {
      setWithdrawSuccess("Withdrawal proposal filed successfully! Payout pending reviewer audit.");
      setAddress("");
      setCoinsStr("1000");
    } else {
      setWithdrawError(result.message);
    }
  };

  return (
    <div className="space-y-6" id="wallet-view-wrapper">
      
      {/* WALLET BALANCES COLUMN HEADER */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        
        <div className="bg-gradient-to-br from-indigo-600 to-indigo-8o bg-indigo-700 text-white p-6 rounded-2xl flex flex-col justify-between border border-indigo-550/30 relative overflow-hidden shadow-md">
          <div className="absolute top-0 right-0 w-24 h-24 bg-white/5 blur-xl pointer-events-none" />
          <div className="flex justify-between items-center mb-4">
            <span className="text-xs uppercase font-extrabold tracking-wider text-indigo-150">Current Coins Balance</span>
            <Coins className="w-5 h-5 text-yellow-300 animate-pulse" />
          </div>
          <div>
            <span className="text-3xl font-black font-mono leading-none">{currentCoins.toLocaleString()}</span>
            <span className="text-[10px] text-indigo-100 block mt-1">Accumulated points</span>
          </div>
        </div>

        <div className="bg-gradient-to-br from-emerald-600 to-teal-700 text-white p-6 rounded-2xl flex flex-col justify-between border border-emerald-550/30 relative overflow-hidden shadow-md">
          <div className="absolute top-0 right-0 w-24 h-24 bg-white/5 blur-xl pointer-events-none" />
          <div className="flex justify-between items-center mb-4">
            <span className="text-xs uppercase font-extrabold tracking-wider text-emerald-150">Cash Value (PKR)</span>
            <Wallet className="w-5 h-5 text-emerald-300" />
          </div>
          <div>
            <span className="text-3xl font-black font-mono leading-none">Rs. {currentPkr.toLocaleString()}</span>
            <span className="text-[10px] text-emerald-100 block mt-1">Exchange rate: 10 Coins = Rs. 1</span>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 p-6 rounded-2xl flex flex-col justify-between relative shadow-sm hover:shadow-md transition">
          <div className="flex justify-between items-center mb-3">
            <span className="text-xs uppercase font-black text-slate-400">Withdraw Limits</span>
            <TrendingUp className="w-4 h-4 text-slate-350" />
          </div>
          <div className="space-y-1">
            <span className="text-sm font-black text-slate-700 dark:text-slate-200">Min. Withdraw Point</span>
            <p className="text-xs text-slate-400">1,000 Coins (Equivalent Rs. 100.00)</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* WITHDRAW FILE FORM COLUMN */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 p-6 rounded-2xl shadow-sm relative">
            <h3 className="text-md font-black text-slate-800 dark:text-white flex items-center gap-1.5 border-b border-slate-100 dark:border-slate-805 pb-3 mb-6">
              <Send className="w-4.5 h-4.5 text-indigo-500" /> Apply for Withdrawal Payout
            </h3>

            <form onSubmit={handleWithdrawValuesSubmit} className="space-y-4">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                {/* Method selector */}
                <div className="space-y-1.5">
                  <label className="text-xs font-black text-slate-450 dark:text-slate-350 uppercase">Payment Channel</label>
                  <select
                    value={method}
                    onChange={e => setMethod(e.target.value)}
                    className="w-full bg-slate-50 dark:bg-slate-950 p-3 outline-none rounded-xl border border-slate-200 dark:border-slate-800 text-sm font-extrabold text-slate-700 dark:text-slate-250 select-trigger"
                  >
                    <option value="EasyPaisa">EasyPaisa Mobile Wallet</option>
                    <option value="JazzCash">JazzCash Mobile Wallet</option>
                    <option value="UBL Omni">UBL Omni Channel</option>
                    <option value="HBL Transfer">HBL Direct Transfer</option>
                  </select>
                </div>

                {/* Coins points value */}
                <div className="space-y-1.5">
                  <label className="text-xs font-black text-slate-450 dark:text-slate-350 uppercase">Coins points count</label>
                  <div className="relative">
                    <input
                      type="number"
                      required
                      value={coinsStr}
                      onChange={e => setCoinsStr(e.target.value)}
                      className="w-full bg-slate-50 dark:bg-slate-950 p-3 pl-11 outline-none rounded-xl border border-slate-200 dark:border-slate-800 text-sm font-bold text-slate-705 dark:text-slate-200"
                    />
                    <Coins className="absolute left-3.5 top-3.5 w-4.5 h-4.5 text-yellow-500" />
                    
                    {/* Instant conversion estimation preview tag */}
                    <div className="absolute right-3 top-3 px-2 py-1 rounded bg-indigo-50 dark:bg-indigo-950 border border-indigo-100 dark:border-indigo-850 text-[10px] font-black text-indigo-500 dark:text-indigo-400">
                      Rs. {Math.round(parseInt(coinsStr || "0") / COIN_RATE)}
                    </div>
                  </div>
                </div>
              </div>

              {/* Receiving address account details */}
              <div className="space-y-1.5">
                <label className="text-xs font-black text-slate-450 dark:text-slate-350 uppercase">Account detail / Wallet details</label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    placeholder="e.g. EasyPaisa Phone Number and Full Registered Title Name"
                    value={address}
                    onChange={e => setAddress(e.target.value)}
                    className="w-full bg-slate-50 dark:bg-slate-950 p-3 pl-11 outline-none rounded-xl border border-slate-200 dark:border-slate-800 text-sm font-medium text-slate-705 dark:text-slate-200"
                  />
                  <CreditCard className="absolute left-3.5 top-3.5 w-4.5 h-4.5 text-slate-400" />
                </div>
                <span className="text-[10px] text-slate-400 block">Provide double checked details. Incorrect entries cannot be recalled.</span>
              </div>

              {/* Message indicators */}
              {withdrawError && (
                <div className="p-3 bg-rose-500/10 border border-rose-500/20 text-rose-500 rounded-xl text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-rose-500 flex-shrink-0" />
                  <span>{withdrawError}</span>
                </div>
              )}

              {withdrawSuccess && (
                <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 rounded-xl text-xs flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                  <span>{withdrawSuccess}</span>
                </div>
              )}

              <button
                disabled={submitting}
                type="submit"
                className="w-full py-3 bg-indigo-600 hover:bg-indigo-505 text-white font-black text-xs uppercase tracking-wider rounded-xl cursor-pointer shadow transition active:scale-95 duration-200 flex justify-center items-center gap-1.5"
              >
                {submitting ? "Checking databases..." : "Submit Withdrawal Proposal"}
              </button>
            </form>
          </div>
        </div>

        {/* RIGHT COLUMN: PAST WITHDRAWAL TRANSACTIONS HISTORY LIST */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white dark:bg-slate-900 border border-slate-105 p-6 rounded-2xl shadow-sm space-y-4">
            <h3 className="text-sm font-black text-slate-800 dark:text-white flex items-center gap-1.5 border-b border-slate-100 dark:border-slate-805 pb-3">
              <Clock className="w-4 h-4 text-slate-400" /> Withdrawal History
            </h3>

            {withdrawals.length === 0 ? (
              <div className="text-center py-10 space-y-2">
                <Clock className="w-8 h-8 text-slate-350 mx-auto animate-pulse" />
                <p className="text-xs text-slate-400">No payout withdrawals submitted yet.</p>
              </div>
            ) : (
              <div className="space-y-3.5 overflow-y-auto max-h-[350px]">
                {withdrawals.map(request => {
                  return (
                    <div key={request.id} className="p-3 bg-slate-50 dark:bg-slate-950 border border-slate-150 dark:border-slate-850 rounded-xl flex flex-col justify-between text-xs space-y-2">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-extrabold text-slate-850 dark:text-white">{request.paymentMethod}</p>
                          <span className="text-[10px] text-slate-400 font-mono">{request.paymentAddress}</span>
                        </div>
                        <span className="font-bold text-yellow-500 text-right leading-none font-mono">
                          -{request.coins.toLocaleString()}
                          <span className="text-[10px] text-slate-400 block mt-1">Rs. {request.amount}</span>
                        </span>
                      </div>

                      <div className="flex justify-between items-center pt-2 border-t border-slate-150 dark:border-slate-850/50">
                        <span className="text-[10px] text-slate-400 font-mono">
                          {new Date(request.createdAt).toLocaleDateString()}
                        </span>
                        
                        <div className="flex items-center gap-1 font-bold uppercase tracking-wider text-[9px] leading-none">
                          {request.status === 'pending' && (
                            <span className="text-amber-500 flex items-center gap-1">
                              <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-ping" /> Pending
                            </span>
                          )}
                          {request.status === 'approved' && (
                            <span className="text-emerald-500 flex items-center gap-1">
                              ✓ Approved
                            </span>
                          )}
                          {request.status === 'rejected' && (
                            <span className="text-rose-500 flex items-center gap-1">
                              ✗ Rejected
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
