'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Home, Zap, Camera, Trophy, User, Flame, Star, Award } from 'lucide-react'

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('home')

  const quests = [
    {
      id: '1',
      title: 'Café Vocabulary',
      description: 'Learn 10 café-related words',
      reward: 100,
      progress: 7,
      total: 10,
      difficulty: 'Easy',
    },
    {
      id: '2',
      title: 'Pronunciation Drill',
      description: 'Practice 5 difficult phrases',
      reward: 150,
      progress: 3,
      total: 5,
      difficulty: 'Medium',
    },
    {
      id: '3',
      title: 'Market Shopping',
      description: 'Complete a shopping dialogue',
      reward: 200,
      progress: 0,
      total: 1,
      difficulty: 'Hard',
    },
  ]

  const achievements = [
    { id: '1', name: 'First Steps', icon: '🌱', unlocked: true },
    { id: '2', name: '7-Day Streak', icon: '🔥', unlocked: true },
    { id: '3', name: '500 Points', icon: '⭐', unlocked: false },
    { id: '4', name: 'Perfect Week', icon: '✨', unlocked: false },
  ]

  const leaderboard = [
    { rank: 1, name: 'Alex K', points: 5420, streak: 45 },
    { rank: 2, name: 'Maria L', points: 4820, streak: 32 },
    { rank: 3, name: 'You', points: 2340, streak: 7 },
    { rank: 4, name: 'James T', points: 1950, streak: 12 },
    { rank: 5, name: 'Sofia M', points: 1200, streak: 8 },
  ]

  return (
    <main className="min-h-screen bg-background pb-28">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-card border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-4xl font-black">Welcome Back!</h1>
              <p className="text-muted-foreground font-semibold text-white">Your learning adventure continues</p>
            </div>
            <div className="w-16 h-16 rounded-2xl border-2 border-accent overflow-hidden">
              <Image src="/mascot.png" alt="Profile" width={64} height={64} className="object-cover" />
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="p-4 bg-background rounded-xl border-2 border-orange-400/50">
              <Flame className="w-6 h-6 text-orange-400 mb-2" />
              <div className="text-2xl font-black">7</div>
              <p className="text-xs text-muted-foreground font-bold text-white">Day Streak</p>
            </div>
            <div className="p-4 bg-background rounded-xl border-2 border-yellow-400/50">
              <Star className="w-6 h-6 text-yellow-400 mb-2" />
              <div className="text-2xl font-black">2,340</div>
              <p className="text-xs text-muted-foreground font-bold text-white">Total Points</p>
            </div>
            <div className="p-4 bg-background rounded-xl border-2 border-accent/50">
              <Award className="w-6 h-6 text-accent mb-2" />
              <div className="text-2xl font-black">Level 5</div>
              <p className="text-xs text-muted-foreground font-bold text-white">Current Level</p>
            </div>
            <div className="p-4 bg-background rounded-xl border-2 border-secondary/50">
              <Zap className="w-6 h-6 text-secondary mb-2" />
              <div className="text-2xl font-black">12</div>
              <p className="text-xs text-muted-foreground font-bold text-white">Quests Done</p>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Home Tab */}
        {activeTab === 'home' && (
          <div className="space-y-8">
            {/* Active Quests */}
            <section>
              <h2 className="text-3xl font-black mb-6">Active Quests</h2>
              <div className="space-y-4">
                {quests.map((quest) => (
                  <div key={quest.id} className="p-6 bg-card rounded-2xl border-2 border-border hover:border-accent transition-colors">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-xl font-bold mb-2">{quest.title}</h3>
                        <p className="text-muted-foreground text-white">{quest.description}</p>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-black text-accent">{quest.reward} XP</div>
                        <div className="text-xs bg-secondary/20 text-secondary px-3 py-1 rounded-full font-bold">
                          {quest.difficulty}
                        </div>
                      </div>
                    </div>
                    <div className="w-full bg-border rounded-full h-3 overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-accent to-secondary transition-all"
                        style={{ width: `${(quest.progress / quest.total) * 100}%` }}
                      />
                    </div>
                    <p className="text-xs text-muted-foreground mt-2 font-semibold text-white">
                      {quest.progress} / {quest.total} Complete
                    </p>
                  </div>
                ))}
              </div>
            </section>

            {/* Continue Learning */}
            <button className="w-full p-8 bg-gradient-to-r from-accent/20 to-secondary/20 rounded-2xl border-2 border-accent hover:border-secondary transition-colors hover:scale-105 active:scale-95">
              <div className="text-2xl font-black mb-2">Ready to Practice?</div>
              <p className="text-muted-foreground text-white">Take a photo or start an interactive lesson</p>
              <div className="mt-4 text-accent font-bold">Continue Learning →</div>
            </button>
          </div>
        )}

        {/* Quests Tab */}
        {activeTab === 'quests' && (
          <div className="space-y-6">
            <h2 className="text-3xl font-black">Quest Hub</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {quests.map((quest) => (
                <div key={quest.id} className="p-6 bg-card rounded-2xl border-2 border-border hover:border-primary transition-colors hover:scale-105 active:scale-95 cursor-pointer">
                  <div className="text-3xl mb-3">🎯</div>
                  <h3 className="text-xl font-bold mb-2">{quest.title}</h3>
                  <p className="text-muted-foreground mb-4 text-white">{quest.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-primary">{quest.reward} XP</span>
                    <span className="text-xs bg-primary/20 text-primary px-3 py-1 rounded-full font-bold">
                      {quest.difficulty}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Camera Tab */}
        {activeTab === 'camera' && (
          <div className="space-y-6">
            <h2 className="text-3xl font-black">Camera Translator</h2>
            <div className="p-12 bg-card rounded-2xl border-2 border-accent flex flex-col items-center justify-center min-h-96">
              <Camera className="w-24 h-24 text-accent mb-6" />
              <h3 className="text-2xl font-bold mb-2">Point & Translate</h3>
              <p className="text-muted-foreground text-center mb-8 max-w-md text-white">
                Point your camera at any object, sign, or text to get instant translation and pronunciation
              </p>
              <button className="px-10 py-4 bg-accent hover:bg-accent/90 text-primary-foreground font-bold rounded-xl hover:scale-105 active:scale-95 transition-all">
                Start Camera
              </button>
            </div>
          </div>
        )}

        {/* Ranks Tab */}
        {activeTab === 'ranks' && (
          <div className="space-y-6">
            <h2 className="text-3xl font-black">Leaderboard</h2>
            <div className="space-y-3">
              {leaderboard.map((user) => (
                <div
                  key={user.rank}
                  className={`p-5 rounded-2xl border-2 flex items-center justify-between font-bold transition-colors ${
                    user.rank === 3
                      ? 'bg-accent/20 border-accent'
                      : 'bg-card border-border hover:border-accent'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center text-lg font-black ${
                      user.rank === 1 ? 'bg-yellow-400 text-background' : 
                      user.rank === 2 ? 'bg-gray-300 text-background' : 
                      'bg-orange-400 text-background'
                    }`}>
                      {user.rank}
                    </div>
                    <div>
                      <div>{user.name}</div>
                      <div className="text-xs text-muted-foreground">🔥 {user.streak} day streak</div>
                    </div>
                  </div>
                  <div className="text-2xl font-black text-accent">{user.points}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Profile Tab */}
        {activeTab === 'profile' && (
          <div className="space-y-8">
            <div className="flex items-center gap-6">
              <div className="w-24 h-24 rounded-2xl border-2 border-accent overflow-hidden">
                <Image src="/mascot.png" alt="Profile" width={96} height={96} className="object-cover" />
              </div>
              <div>
                <h2 className="text-3xl font-black mb-2">Your Profile</h2>
                <p className="text-muted-foreground font-semibold text-white">Learner • Level 5 • Spanish</p>
              </div>
            </div>

            <section>
              <h3 className="text-2xl font-black mb-4">Achievements</h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {achievements.map((achievement) => (
                  <div
                    key={achievement.id}
                    className={`p-6 rounded-2xl border-2 text-center transition-all ${
                      achievement.unlocked
                        ? 'bg-background border-accent hover:scale-110'
                        : 'bg-background/50 border-border/50 opacity-50'
                    }`}
                  >
                    <div className="text-4xl mb-2">{achievement.icon}</div>
                    <p className="text-sm font-bold text-white">{achievement.name}</p>
                  </div>
                ))}
              </div>
            </section>

            <section className="space-y-3">
              <button className="w-full p-4 bg-card rounded-xl border-2 border-border hover:border-accent font-bold transition-colors">
                Settings
              </button>
              <button className="w-full p-4 bg-card rounded-xl border-2 border-border hover:border-accent font-bold transition-colors">
                About
              </button>
              <button className="w-full p-4 bg-card rounded-xl border-2 border-border hover:border-accent font-bold transition-colors text-destructive">
                Sign Out
              </button>
            </section>
          </div>
        )}
      </div>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-card border-t-2 border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-around">
            {[
              { id: 'home', icon: Home, label: 'Home' },
              { id: 'quests', icon: Zap, label: 'Quests' },
              { id: 'camera', icon: Camera, label: 'Camera' },
              { id: 'ranks', icon: Trophy, label: 'Ranks' },
              { id: 'profile', icon: User, label: 'Profile' },
            ].map((tab) => {
              const Icon = tab.icon
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-1 py-4 flex flex-col items-center gap-1 border-t-4 transition-all font-bold ${
                    activeTab === tab.id
                      ? 'bg-primary/10 border-primary text-primary'
                      : 'border-transparent text-muted-foreground hover:text-foreground'
                  }`}
                >
                  <Icon className="w-6 h-6" />
                  <span className="text-xs hidden sm:inline">{tab.label}</span>
                </button>
              )
            })}
          </div>
        </div>
      </nav>
    </main>
  )
}
