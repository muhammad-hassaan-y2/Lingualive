'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import { ArrowRight, Check } from 'lucide-react'
import Link from 'next/link'

export default function OnboardingPage() {
  const [currentStep, setCurrentStep] = useState(0)
  const [selectedLanguage, setSelectedLanguage] = useState<string | null>(null)
  const [selectedLevel, setSelectedLevel] = useState<string | null>(null)
  const [selectedGoal, setSelectedGoal] = useState<string | null>(null)

  const languages = [
    { id: 'spanish', name: 'Spanish', code: 'ES' },
    { id: 'french', name: 'French', code: 'FR' },
    { id: 'german', name: 'German', code: 'DE' },
    { id: 'japanese', name: 'Japanese', code: 'JP' },
    { id: 'mandarin', name: 'Mandarin', code: 'CN' },
    { id: 'korean', name: 'Korean', code: 'KR' },
  ]

  const levels = [
    { id: 'beginner', name: 'Beginner', description: 'Starting from scratch' },
    { id: 'intermediate', name: 'Intermediate', description: 'Some experience' },
    { id: 'advanced', name: 'Advanced', description: 'Near fluent' },
  ]

  const goals = [
    { id: 'travel', name: 'Travel', description: 'Get by on vacation' },
    { id: 'career', name: 'Career', description: 'Professional development' },
    { id: 'culture', name: 'Culture', description: 'Connect with culture' },
    { id: 'hobby', name: 'Hobby', description: 'Learning for fun' },
  ]

  const canContinue =
    (currentStep === 0 && selectedLanguage) ||
    (currentStep === 1 && selectedLevel) ||
    (currentStep === 2 && selectedGoal)

  return (
    <main className="min-h-screen bg-background px-4 sm:px-6 lg:px-8 py-12">
      <div className="max-w-2xl mx-auto">
        {/* Progress Bar */}
        <div className="mb-12">
          <div className="flex gap-2 mb-6">
            {[0, 1, 2].map((step) => (
              <div
                key={step}
                className={`h-2 flex-1 rounded-full transition-colors ${
                  step <= currentStep ? 'bg-accent' : 'bg-border'
                }`}
              />
            ))}
          </div>
          <p className="text-sm font-bold text-muted-foreground text-white">
            Step {currentStep + 1} of 3
          </p>
        </div>

        {/* Mascot */}
        <div className="flex justify-center mb-12">
          <div className="relative w-32 h-32">
            <Image src="/mascot.png" alt="LinguaLive" fill className="object-contain" />
          </div>
        </div>

        {/* Content */}
        <div className="mb-12">
          {/* Step 0: Language Selection */}
          {currentStep === 0 && (
            <div>
              <h1 className="text-5xl font-black mb-3 text-center">Choose Your Language</h1>
              <p className="text-center text-muted-foreground text-lg mb-12 text-white">What language should the app be in?</p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {languages.map((lang) => (
                  <button
                    key={lang.id}
                    onClick={() => setSelectedLanguage(lang.id)}
                    className={`p-6 rounded-2xl border-2 font-bold text-lg transition-all hover:scale-105 active:scale-95 ${
                      selectedLanguage === lang.id
                        ? 'bg-accent/20 border-accent text-foreground'
                        : 'bg-card border-border hover:border-accent text-foreground'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span>{lang.name}</span>
                      {selectedLanguage === lang.id && <Check className="w-6 h-6 text-accent" />}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 1: Level Selection */}
          {currentStep === 1 && (
            <div>
              <h1 className="text-5xl font-black mb-3 text-center">Your Level</h1>
              <p className="text-center text-muted-foreground text-lg mb-12 text-white">What&apos;s your current proficiency?</p>

              <div className="space-y-4">
                {levels.map((level) => (
                  <button
                    key={level.id}
                    onClick={() => setSelectedLevel(level.id)}
                    className={`w-full p-6 rounded-2xl border-2 font-bold text-lg transition-all hover:scale-105 active:scale-95 text-left ${
                      selectedLevel === level.id
                        ? 'bg-secondary/20 border-secondary text-foreground'
                        : 'bg-card border-border hover:border-secondary text-foreground'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-black text-xl">{level.name}</div>
                        <div className="text-sm text-muted-foreground">{level.description}</div>
                      </div>
                      {selectedLevel === level.id && <Check className="w-6 h-6 text-secondary" />}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 2: Goal Selection */}
          {currentStep === 2 && (
            <div>
              <h1 className="text-5xl font-black mb-3 text-center">Your Goal</h1>
              <p className="text-center text-muted-foreground text-lg mb-12 text-white">Why are you learning?</p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {goals.map((goal) => (
                  <button
                    key={goal.id}
                    onClick={() => setSelectedGoal(goal.id)}
                    className={`p-6 rounded-2xl border-2 font-bold text-lg transition-all hover:scale-105 active:scale-95 text-center ${
                      selectedGoal === goal.id
                        ? 'bg-primary/20 border-primary text-foreground'
                        : 'bg-card border-border hover:border-primary text-foreground'
                    }`}
                  >
                    <div className="font-black text-xl mb-2">{goal.name}</div>
                    <div className="text-sm text-muted-foreground">{goal.description}</div>
                    {selectedGoal === goal.id && <Check className="w-6 h-6 text-primary mx-auto mt-4" />}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 justify-center">
          {currentStep > 0 && (
            <Button
              variant="outline"
              className="border-2 border-muted text-foreground hover:bg-muted/10 h-14 px-10 text-lg font-bold rounded-xl bg-transparent"
              onClick={() => setCurrentStep(currentStep - 1)}
            >
              Back
            </Button>
          )}

          {currentStep < 2 && (
            <Button
              className={`bg-primary hover:bg-primary/90 text-primary-foreground h-14 px-10 text-lg font-bold rounded-xl shadow-lg transition-all hover:scale-105 active:scale-95 ${
                !canContinue ? 'opacity-50 cursor-not-allowed' : ''
              }`}
              onClick={() => setCurrentStep(currentStep + 1)}
              disabled={!canContinue}
            >
              Next
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          )}

          {currentStep === 2 && (
            <Button
              className="bg-accent hover:bg-accent/90 text-primary-foreground h-14 px-10 text-lg font-bold rounded-xl shadow-lg transition-all hover:scale-105 active:scale-95"
              onClick={() => window.location.href = '/dashboard'}
              disabled={!canContinue}
            >
              Start Learning!
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          )}
        </div>
      </div>
    </main>
  )
}
