/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { User, Clipboard, Check, Image, CreditCard } from 'lucide-react';
import { updateDoc, doc } from 'firebase/firestore';
import { db } from '../../firebase';

export default function SettingsView() {
  const { profile, isSimulated, simulateTester } = useApp();
  
  const [displayName, setDisplayName] = useState(profile?.displayName || "");
  const [photoURL, setPhotoURL] = useState(profile?.photoURL || "");
  const [success, setSuccess] = useState("");

  const presets = [
    'ali_hassan', 'leo', 'sofia', 'marcus', 'lucas', 'chloe', 'zoe', 'hunter'
  ].map(seed => `https://api.dicebear.com/7.x/adventurer/svg?seed=${seed}`);

  const handleProfileSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccess("");

    if (!profile) return;

    if (!isSimulated) {
      try {
        await updateDoc(doc(db, 'users', profile.uid), {
          displayName,
          photoURL
        });
        setSuccess("Profile settings saved successfully inside active cloud database!");
      } catch (err) {
        console.error("Save profile click failed: ", err);
      }
    } else {
      const updated = {
        ...profile,
        displayName,
        photoURL
      };
      localStorage.setItem('earnhub_simulated', JSON.stringify(updated));
      // Re-trigger simulator update
      simulateTester(); 
      setSuccess("Profile settings saved successfully inside active local sandbox!");
    }
  };

  return (
    <div className="space-y-6" id="settings-view-wrapper">
      <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 p-6 rounded-2xl shadow-sm max-w-2xl">
        <h3 className="text-md font-black text-slate-800 dark:text-white flex items-center gap-1.5 border-b border-slate-105 pb-3 mb-6">
          <User className="w-4.5 h-4.5 text-indigo-500" /> Account Settings & Bio
        </h3>

        <form onSubmit={handleProfileSave} className="space-y-5">
          <div className="space-y-1.5">
            <label className="text-xs font-black text-slate-450 dark:text-slate-350 uppercase">Public Display Nickname</label>
            <input
              type="text"
              required
              value={displayName}
              onChange={e => setDisplayName(e.target.value)}
              className="w-full bg-slate-50 dark:bg-slate-950 p-3 outline-none rounded-xl border border-slate-205 dark:border-slate-800 text-sm font-bold text-slate-700 dark:text-slate-200"
            />
          </div>

          {/* PRESENTS AVATARS CHOOSEM */}
          <div className="space-y-2">
            <label className="text-xs font-black text-slate-450 dark:text-slate-350 uppercase flex items-center gap-1">
              <Image className="w-3.5 h-3.5" /> Choose Avatar Preset
            </label>
            
            <div className="flex flex-wrap gap-3 p-3 bg-slate-50 dark:bg-slate-955 rounded-xl border border-slate-150 dark:border-slate-850">
              {presets.map((url, idx) => {
                const isSelected = photoURL === url;
                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setPhotoURL(url)}
                    className={`w-12 h-12 rounded-full overflow-hidden border-2 transition transform active:scale-90 cursor-pointer ${
                      isSelected 
                        ? 'border-indigo-505 bg-indigo-50 dark:bg-indigo-950 scale-105 shadow' 
                        : 'border-slate-200 dark:border-slate-800 bg-white hover:border-slate-400'
                    }`}
                  >
                    <img src={url} alt="Preset avatar option" className="w-full h-full object-cover" />
                  </button>
                );
              })}
            </div>
          </div>

          {success && (
            <p className="text-xs text-emerald-500 font-bold bg-emerald-500/10 border border-emerald-500/20 p-2.5 rounded-xl">
              {success}
            </p>
          )}

          <button
            type="submit"
            className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-550 text-white font-bold text-xs uppercase tracking-wider rounded-xl cursor-pointer shadow transition active:scale-95"
          >
            Save Profile Settings
          </button>
        </form>
      </div>
    </div>
  );
}
