"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

interface UserProgress {
  xp: number;
  level: number;
  streak: number;
  user?: {
    name: string;
    email: string;
    image?: string;
  };
}

interface Badge {
  badge: {
    key: string;
    name: string;
    description: string;
  };
  earnedAt: string;
}

export default function ProfilePage() {
  const [progress, setProgress] = useState<UserProgress | null>(null);
  const [badges, setBadges] = useState<Badge[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [progressRes, badgesRes] = await Promise.all([
          fetch("/api/user/progress"),
          fetch("/api/user/badges"),
        ]);

        const progressData = await progressRes.json();
        const badgesData = await badgesRes.json();

        setProgress(progressData);
        setBadges(badgesData.badges || []);
      } catch (error) {
        console.error("Failed to load profile:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) {
    return (
      <main className="min-h-screen bg-gray-100 p-4">
        <div className="text-center">Loading...</div>
      </main>
    );
  }

  const xpToNextLevel = (progress?.level || 1) * 1000;
  const progressPercent =
    ((progress?.xp || 0) / xpToNextLevel) * 100;

  return (
    <main className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-blue-700">🏆 My Progress</h1>
          <Link
            href="/dashboard"
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            Back to Dashboard
          </Link>
        </div>

        {/* Progress Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="text-4xl mb-2">⭐</div>
            <p className="text-gray-600 mb-1">Total XP</p>
            <p className="text-4xl font-bold text-blue-700">
              {progress?.xp || 0}
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="text-4xl mb-2">📈</div>
            <p className="text-gray-600 mb-1">Current Level</p>
            <p className="text-4xl font-bold text-purple-700">
              {progress?.level || 1}
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="text-4xl mb-2">🔥</div>
            <p className="text-gray-600 mb-1">Daily Streak</p>
            <p className="text-4xl font-bold text-orange-700">
              {progress?.streak || 0}
            </p>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h2 className="text-xl font-bold text-gray-800 mb-4">
            Level {progress?.level} Progress
          </h2>
          <div className="w-full bg-gray-200 rounded-full h-6">
            <div
              className="bg-blue-600 h-6 rounded-full transition-all"
              style={{ width: `${Math.min(progressPercent, 100)}%` }}
            ></div>
          </div>
          <p className="text-gray-600 text-sm mt-2">
            {progress?.xp || 0} / {xpToNextLevel} XP
          </p>
        </div>

        {/* Badges */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            🎖️ Badges Earned ({badges.length})
          </h2>
          {badges.length === 0 ? (
            <p className="text-gray-600">
              No badges yet. Keep learning to unlock achievements!
            </p>
          ) : (
            <div className="grid md:grid-cols-2 gap-4">
              {badges.map((item, idx) => (
                <div
                  key={idx}
                  className="bg-gradient-to-r from-yellow-50 to-yellow-100 border border-yellow-300 rounded-lg p-4"
                >
                  <p className="font-bold text-yellow-900">{item.badge.name}</p>
                  <p className="text-sm text-yellow-800 mt-1">
                    {item.badge.description}
                  </p>
                  <p className="text-xs text-yellow-700 mt-2">
                    Earned:{" "}
                    {new Date(item.earnedAt).toLocaleDateString()}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
