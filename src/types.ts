/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface UserProfile {
  uid: string;
  displayName: string;
  photoURL: string;
  level: number;
  coins: number;
  pkr: number;
  referralCode: string;
  referredBy: string;
  referralsCount: number;
  tasksCount: number;
  dailyBonusLastClaimed?: string; // ISO date
  createdAt: string;
}

export interface UserPrivate {
  email: string;
  paymentMethod: string;
  paymentAddress: string;
  updatedAt: string;
}

export interface TaskItem {
  id: string;
  title: string;
  description: string;
  reward: number; // in coins
  category: "Social" | "Video" | "App" | "Special" | "Promo";
  link: string;
  status: "active" | "inactive";
  createdAt: string;
}

export interface LessonQuestion {
  question: string;
  options: string[];
  correctAnswer: string; // text or index matching options
}

export interface QuizItem {
  id: string;
  title: string;
  category: "General Knowledge" | "Computer" | "Science" | "Islam" | "Math" | "English" | "Technology";
  questions: LessonQuestion[];
  reward: number; // in coins
}

export interface WithdrawalRequest {
  id: string;
  userId: string;
  userName: string;
  coins: number;
  amount: number; // PKR
  paymentMethod: string;
  paymentAddress: string;
  status: "pending" | "approved" | "rejected";
  createdAt: string;
}

export interface AppNotification {
  id: string;
  message: string;
  type: "system" | "reward" | "withdraw";
  userId: string; // 'all' or specific uid
  createdAt: string;
}

export interface LeaderboardRank {
  uid: string;
  displayName: string;
  photoURL: string;
  coins: number;
  level: number;
}
