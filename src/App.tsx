/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import DashboardView from './components/views/DashboardView';
import TasksView from './components/views/TasksView';
import QuizView from './components/views/QuizView';
import GamesView from './components/views/GamesView';
import LuckySpin from './components/LuckySpin';
import ReferralView from './components/views/ReferralView';
import WalletView from './components/views/WalletView';
import SettingsView from './components/views/SettingsView';
import SupportView from './components/views/SupportView';
import AdminPanel from './components/AdminPanel';

import { 
  Menu, 
  X, 
  Coins, 
  Wallet, 
  Bell, 
  Sun, 
  Moon, 
  LogOut, 
  Sparkles,
  Trophy,
  User,
  LayoutDashboard,
  ClipboardList,
  GraduationCap,
  Gamepad2,
  Users,
  Compass,
  CreditCard,
  Settings,
  HelpCircle,
  FolderLock,
  ArrowRight,
  UserCheck
} from 'lucide-react';

function AppContent() {
  const { 
    user, 
    profile, 
    loading, 
    isAdmin, 
    darkMode, 
    setDarkMode, 
    notifications,
    loginWithGoogle, 
    simulateTester, 
    logout 
  } = useApp();

  const [activeView, setActiveView] = useState("Dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [notifDropdownOpen, setNotifDropdownOpen] = useState(false);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col justify-center items-center text-white space-y-4">
        <div className="relative w-16 h-16 border-4 border-t-yellow-405 border-indigo-600/30 rounded-full animate-spin" />
        <span className="text-sm font-black uppercase text-slate-450 tracking-widest animate-pulse">EarnHub AI loading...</span>
      </div>
    );
  }

  // --- 1. LOGIN LANDING SCREEN ---
  if (!user) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4 relative overflow-hidden font-sans">
        {/* Glow ambient illustrations */}
        <div className="absolute top-1/4 left-1/4 w-[350px] h-[350px] bg-indigo-600/20 blur-[130px] rounded-full pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-[350px] h-[350px] bg-emerald-600/10 blur-[130px] rounded-full pointer-events-none" />

        <div className="w-full max-w-[420px] bg-slate-900/65 backdrop-blur-xl border border-slate-800/80 p-8 rounded-3xl shadow-2xl relative z-10 text-center space-y-6">
          
          <div className="space-y-2">
            <span className="inline-flex items-center gap-1 px-3 py-1 bg-gradient-to-r from-indigo-500/10 to-blue-500/10 border border-indigo-500/20 text-[10px] font-black uppercase tracking-widest rounded-full text-indigo-400">
              <Sparkles className="w-3 h-3 text-yellow-400 animate-pulse" /> Daily Payout Arena
            </span>
            <h1 className="text-3xl font-black text-white tracking-tight">
              EarnHub <span className="bg-gradient-to-r from-yellow-300 via-amber-400 to-emerald-400 bg-clip-text text-transparent">AI</span>
            </h1>
            <p className="text-slate-400 text-xs px-2 leading-relaxed">
              Solve interactive quizzes, complete sponsored task offerwalls, play mini HTML5 games, and withdraw easy money instantly.
            </p>
          </div>

          {/* Preset showcases */}
          <div className="bg-slate-950/60 p-4 border border-slate-850 rounded-2xl flex justify-around text-xs text-slate-400 font-medium">
            <div className="flex flex-col items-center">
              <Coins className="w-5 h-5 text-yellow-400 mb-1" />
              <span>100+ Tasks</span>
            </div>
            <div className="h-6 w-px bg-slate-800 self-center" />
            <div className="flex flex-col items-center">
              <Trophy className="w-5 h-5 text-emerald-400 mb-1" />
              <span>500+ Quizzes</span>
            </div>
            <div className="h-6 w-px bg-slate-800 self-center" />
            <div className="flex flex-col items-center">
              <Compass className="w-5 h-5 text-amber-500 mb-1" />
              <span>Mini Games</span>
            </div>
          </div>

          <div className="space-y-3.5">
            {/* Real Login */}
            <button
              onClick={loginWithGoogle}
              className="w-full py-3 px-4 bg-white hover:bg-slate-100 text-slate-950 font-extrabold text-sm rounded-xl flex items-center justify-center gap-2.5 cursor-pointer shadow transition hover:scale-101 active:scale-99"
            >
              {/* Google G logo */}
              <svg className="w-5.5 h-5.5" viewBox="0 0 24 24">
                <path fill="#EA4335" d="M12.24 10.285V14.4h6.887c-.275 1.565-1.88 4.604-6.887 4.604-4.33 0-7.859-3.578-7.859-8s3.53-8 7.859-8c2.46 0 4.105 1.025 5.047 1.926l3.227-3.107C18.29 1.905 15.42.999 12.24.999 6.136.999 1.18 5.922 1.18 12s4.956 11.001 11.06 11.001c6.37 0 10.596-4.444 10.596-10.776 0-.726-.078-1.282-.175-1.94H12.24z"/>
              </svg>
              <span>Sign In with Google</span>
            </button>

            {/* Simulated reviewer instant entrance blocks */}
            <div className="relative flex py-2 items-center">
              <div className="flex-grow border-t border-slate-800"></div>
              <span className="flex-shrink mx-4 text-[10px] text-slate-550 uppercase font-black tracking-widest">or sandbox guest pass</span>
              <div className="flex-grow border-t border-slate-800"></div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => simulateTester('user')}
                className="py-3 px-3 border border-slate-800 hover:bg-slate-850 hover:border-slate-700 text-white font-extrabold text-xs rounded-xl flex items-center justify-center gap-1 cursor-pointer transition active:scale-95"
              >
                <UserCheck className="w-4 h-4 text-emerald-400" /> Enter as User
              </button>

              <button
                onClick={() => simulateTester('admin')}
                className="py-3 px-3 border border-rose-900/50 hover:bg-rose-950/20 hover:border-rose-800 text-rose-355 font-extrabold text-xs rounded-xl flex items-center justify-center gap-1 cursor-pointer transition bg-rose-500/5 text-rose-450 active:scale-95"
              >
                <FolderLock className="w-4 h-4 text-rose-500" /> Enter as Admin
              </button>
            </div>
          </div>

          <div className="text-[10px] text-slate-500 text-center font-medium">
            By connecting, you agree to our anti-fraud cheat standards. Payout withdrawals typical speed is 12 hours.
          </div>
        </div>
      </div>
    );
  }

  // --- 2. AUTHENTICATED INTERNAL DASHBOARD APP ---
  const renderViewContent = () => {
    switch (activeView) {
      case "Dashboard":
        return <DashboardView onNavigate={(view) => setActiveView(view)} />;
      case "Tasks":
        return <TasksView />;
      case "Quiz":
        return <QuizView />;
      case "Games":
        return <GamesView />;
      case "Lucky Spin":
        return <LuckySpin />;
      case "Referral":
        return <ReferralView />;
      case "Wallet":
        return <WalletView />;
      case "Settings":
        return <SettingsView />;
      case "Support":
        return <SupportView />;
      case "Admin":
        return isAdmin ? <AdminPanel /> : <DashboardView onNavigate={(view) => setActiveView(view)} />;
      default:
        return <DashboardView onNavigate={(view) => setActiveView(view)} />;
    }
  };

  const navItems = [
    { name: "Dashboard", icon: <LayoutDashboard className="w-4 h-4" /> },
    { name: "Tasks", icon: <ClipboardList className="w-4 h-4" /> },
    { name: "Quiz", icon: <GraduationCap className="w-4 h-4" /> },
    { name: "Games", icon: <Gamepad2 className="w-4 h-4" /> },
    { name: "Lucky Spin", icon: <Compass className="w-4 h-4" /> },
    { name: "Referral", icon: <Users className="w-4 h-4" /> },
    { name: "Wallet", icon: <CreditCard className="w-4 h-4" /> },
    { name: "Settings", icon: <Settings className="w-4 h-4" /> },
    { name: "Support", icon: <HelpCircle className="w-4 h-4" /> }
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 font-sans text-slate-705 dark:text-slate-350 transition duration-200">
      
      {/* HEADER ROW */}
      <header className="sticky top-0 z-40 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-100 dark:border-slate-850 h-16 px-4 flex items-center justify-between">
        
        {/* Toggle + Logo */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-1.5 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg lg:hidden cursor-pointer active:scale-95 transition"
          >
            {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
          
          <div className="flex items-center gap-2 select-none cursor-pointer" onClick={() => setActiveView('Dashboard')}>
            <div className="w-10 h-10 bg-gradient-to-tr from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center font-bold text-xl text-white shadow-lg shadow-blue-500/20">E</div>
            <span className="text-xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
              EarnHub AI
            </span>
          </div>
        </div>

        {/* Dynamic header indices */}
        <div className="flex items-center gap-4">
          
          {/* Rs. PKR valuation and Coin counts */}
          <div className="hidden sm:flex items-center gap-3">
            <div className="flex items-center gap-1 px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded-full text-xs font-bold text-emerald-600 dark:text-emerald-400">
              <Wallet className="w-3.5 h-3.5" /> Rs. {profile?.pkr ?? 0}
            </div>
            
            <div className="flex items-center gap-1 px-3 py-1 bg-yellow-500/10 border border-yellow-500/20 rounded-full text-xs font-bold text-yellow-600 dark:text-yellow-400">
              <Coins className="w-3.5 h-3.5 animate-bounce" /> {profile?.coins ?? 0}
            </div>
          </div>

          {/* Theme switcher */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl cursor-pointer active:scale-90 transition text-slate-500"
          >
            {darkMode ? <Sun className="w-5 h-5 text-yellow-400" /> : <Moon className="w-5 h-5 text-indigo-600" />}
          </button>

          {/* Notifications bell dropdown */}
          <div className="relative">
            <button
              onClick={() => {
                setNotifDropdownOpen(!notifDropdownOpen);
              }}
              className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl cursor-pointer active:scale-90 transition relative text-slate-500"
            >
              <Bell className="w-5 h-5" />
              {notifications.length > 0 && (
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full animate-pulse" />
              )}
            </button>

            {notifDropdownOpen && (
              <div className="absolute right-0 mt-3 w-72 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-805 rounded-2xl shadow-xl p-4 z-50 space-y-3.5 animate-fadeIn">
                <div className="flex justify-between items-center border-b border-slate-100 dark:border-slate-850 pb-2">
                  <span className="font-extrabold text-slate-800 dark:text-white text-xs">Activity Notifications</span>
                  <button 
                    onClick={() => setNotifDropdownOpen(false)}
                    className="text-[10px] text-slate-400 font-bold hover:underline"
                  >
                    Close
                  </button>
                </div>

                <div className="space-y-2 max-h-56 overflow-y-auto">
                  {notifications.slice(0, 10).map((notif, index) => (
                    <div key={index} className="p-2 bg-slate-50 dark:bg-slate-950 rounded-lg text-[11px] leading-relaxed border border-slate-150 dark:border-slate-850">
                      <p className="text-slate-650 dark:text-slate-300">{notif.message}</p>
                      <span className="text-[9px] text-slate-400 font-mono mt-1 block">Just now</span>
                    </div>
                  ))}
                  {notifications.length === 0 && (
                    <p className="text-center text-[11px] text-slate-400 py-4">No recent messages.</p>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* User Avatar tag */}
          <div className="flex items-center gap-2 border-l border-slate-100 dark:border-slate-805 pl-3">
            <img 
              src={profile?.photoURL || `https://api.dicebear.com/7.x/adventurer/svg?seed=earnhub`} 
              alt="Public Profile Icon" 
              className="w-8 h-8 rounded-full border border-indigo-200 dark:border-slate-800 bg-slate-100" 
              referrerPolicy="no-referrer"
            />
            <div className="hidden md:block text-left text-[11px]">
              <p className="font-extrabold text-slate-850 dark:text-white leading-tight">{profile?.displayName || 'Ali Hassan'}</p>
              <span className="text-[10px] text-slate-400">Level {profile?.level ?? 12}</span>
            </div>
          </div>

          {/* Logout Trigger */}
          <button
            onClick={logout}
            className="p-1.5 hover:bg-red-500/10 text-slate-405 dark:text-slate-500 hover:text-red-500 rounded-xl transition cursor-pointer active:scale-90"
            title="Disconnect account"
          >
            <LogOut className="w-5 h-5" />
          </button>
        </div>
      </header>

      {/* WORKSPACE AREA CONTAINER */}
      <div className="flex">
        
        {/* SIDENAV BAR DRAWER */}
        <aside className={`fixed lg:sticky top-16 h-[calc(100vh-64px)] z-35 w-64 bg-white dark:bg-slate-900 border-r border-slate-100 dark:border-slate-850 p-4 shrink-0 transition-transform duration-300 lg:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}>
          
          <div className="flex flex-col justify-between h-full">
            <nav className="space-y-1.5 overflow-y-auto">
              
              {navItems.map(item => (
                <button
                  key={item.name}
                  onClick={() => {
                    setActiveView(item.name);
                    setSidebarOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 p-3 rounded-lg font-medium text-sm transition tracking-wide cursor-pointer ${
                    activeView === item.name
                      ? 'bg-blue-500/10 text-blue-400 font-semibold'
                      : 'text-slate-400 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  {item.icon}
                  <span>{item.name}</span>
                </button>
              ))}

              {/* ADMIN PANEL IF AUTHORIZED */}
              {isAdmin && (
                <button
                  onClick={() => {
                    setActiveView('Admin');
                    setSidebarOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl font-black text-xs transition uppercase tracking-wider cursor-pointer border border-dashed border-red-500/20 bg-red-500/5 text-rose-500 ${
                    activeView === 'Admin'
                      ? 'bg-rose-500 text-slate-950 font-black border-none'
                      : 'hover:bg-rose-500/10'
                  }`}
                >
                  <FolderLock className="w-4 h-4 animate-pulse" />
                  <span>Admin Panel Console</span>
                </button>
              )}
            </nav>

            {/* Simulated Banner inside sidebar */}
            <div className="bg-slate-50 dark:bg-slate-950 p-3.5 border border-slate-150 dark:border-slate-850 rounded-2xl text-[10px] space-y-1 mt-auto">
              <span className="font-extrabold block text-slate-850 dark:text-white uppercase">CHEATING COUNTER MEASURES</span>
              <p className="text-slate-500 dark:text-slate-400">One profile per connection. Multiple logins auto-blocks withdraw requests instantly.</p>
            </div>
          </div>
        </aside>

        {/* Backgrop overlay for mobile Drawer */}
        {sidebarOpen && (
          <div 
            onClick={() => setSidebarOpen(false)}
            className="fixed inset-0 bg-slate-950/40 backdrop-blur-xs z-30 lg:hidden"
          />
        )}

        {/* MAIN BODY CONTAINER */}
        <main className="flex-1 p-4 md:p-6 lg:p-8 overflow-x-hidden min-h-[calc(100vh-64px)] bg-slate-50 dark:bg-slate-955">
          {renderViewContent()}
        </main>
      </div>

    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
