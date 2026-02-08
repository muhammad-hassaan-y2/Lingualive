'use client'

import { Button } from '@/components/ui/button'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, Camera, MessageCircle, Zap, Globe, Users } from 'lucide-react'

export default function LandingPage() {
  return (
    <main className="bg-background text-foreground overflow-hidden">
      {/* Navigation - Only animated mascot icon */}
      <nav className="fixed top-0 left-1/2 -translate-x-1/2 z-50 pt-6">
        <div className="animate-float">
          <Image
            src="/mascot.png"
            alt="LinguaLive"
            width={70}
            height={70}
            loading="eager"
            className="drop-shadow-2xl h-16"
          />
        </div>
      </nav>

      {/* Hero Section - Centered Heading and Image */}
      <section className="min-h-screen pt-28 pb-20 px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center relative overflow-hidden">
        {/* Background elements */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-secondary/5 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-5xl mx-auto w-full text-center">
          {/* Centered Heading */}
          <h1 className="text-6xl sm:text-7xl lg:text-8xl font-black mb-20 text-balance leading-tight">
            Learn Any Language<br />
            <span className="bg-gradient-to-r from-accent via-secondary to-destructive bg-clip-text text-transparent">
              Through Your World
            </span>
          </h1>

          {/* Hero Image Below Heading */}
          <div className="flex justify-center mb-16">
            <div className="relative w-full max-w-2xl h-96">
              <Image
                src="/hero-languages.jpg"
                alt="LinguaLive - Learn languages through vision"
                fill
                priority
                loading="eager"
                className="object-contain drop-shadow-2xl"
              />
            </div>
          </div>

          {/* Description and CTAs */}
          <p className="text-xl text-muted-foreground mb-12 leading-relaxed max-w-2xl mx-auto text-white">
            Point your camera at anything. Get instant translations, cultural context, and real conversation practice in 12+ languages.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-primary hover:bg-primary/85 text-primary-foreground h-16 px-10 text-lg font-bold rounded-xl shadow-lg hover:shadow-xl hover:shadow-primary/50 transition-all" asChild>
              <Link href="/onboarding">
                Start Learning Today
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-2 border-accent text-foreground hover:bg-accent/20 bg-transparent h-16 px-10 text-lg font-bold rounded-xl transition-all"
              asChild
            >
              <Link href="/signin">Continue as Guest</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 px-4 sm:px-6 lg:px-8 bg-card relative">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20 animate-slide-up">
            <h2 className="text-5xl sm:text-6xl font-black mb-6">
              Your World is Your <span className="bg-gradient-to-r from-accent to-secondary bg-clip-text text-transparent">Classroom</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-white">
              Every object becomes a lesson. Every conversation becomes practice.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                icon: Camera,
                title: 'Point & Learn',
                description: 'Scan any object, sign, or menu for instant translation',
              },
              {
                icon: MessageCircle,
                title: 'Speak Naturally',
                description: 'Pronunciation coaching with accent analysis',
              },
              {
                icon: Zap,
                title: 'AI Conversations',
                description: 'Practice real scenarios from your environment',
              },
              {
                icon: Globe,
                title: '12+ Languages',
                description: 'Spanish, French, Japanese, Korean and more',
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="p-8 rounded-2xl bg-background border-2 border-border hover:border-accent hover:bg-background/80 transition-all duration-300 group hover:shadow-lg hover:shadow-accent/20 hover:scale-105 cursor-pointer"
              >
                <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-accent to-secondary flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <feature.icon className="w-8 h-8 text-primary-foreground" />
                </div>
                <h3 className="text-2xl font-bold mb-3">{feature.title}</h3>
                <p className="text-muted-foreground text-lg text-white">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-24 px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-6xl mx-auto text-white">
          <div className="text-center mb-20 animate-slide-up">
            <h2 className="text-5xl sm:text-6xl font-black mb-4">
              How It Works
            </h2>
            <p className="text-xl text-muted-foreground text-white">Simple, effective, and fun</p>
          </div>

          <div className="space-y-5 text-white">
            {[
              { icon: Camera, title: 'Point Your Camera', description: 'Aim at any object, sign, or menu around you', step: '01' },
              { icon: Zap, title: 'Get Instant Info', description: 'Translation, pronunciation, cultural context all at once', step: '02' },
              { icon: MessageCircle, title: 'Practice Speaking', description: 'Interactive conversation with your AI tutor', step: '03' },
              { icon: Users, title: 'Complete Quests', description: 'Level up with gamified challenges and earn badges', step: '04' },
            ].map((item, index) => (
              <div key={index} className="flex gap-6 p-7 rounded-2xl bg-card border-2 border-border hover:border-accent transition-all duration-300 group hover:bg-card/50 hover:shadow-lg hover:shadow-accent/10 hover:translate-x-2">
                <div className="flex-shrink-0">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-accent to-secondary flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <item.icon className="w-7 h-7 text-primary-foreground" />
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-4 mb-2 text-white">
                    <h3 className="font-bold text-2xl text-white">{item.title}</h3>
                    <span className="text-sm font-black text-accent bg-accent/10 px-3 py-1 rounded-full text-white">{item.step}</span>
                  </div>
                  <p className="text-muted-foreground text-lg text-white">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-card py-12 px-4 sm:px-6 lg:px-8 text-white">
        <div className="max-w-5xl mx-auto text-center">
          <p className="text-muted-foreground text-white">© 2024 LinguaLive. All rights reserved.</p>
        </div>
      </footer>
    </main>
  )
}
