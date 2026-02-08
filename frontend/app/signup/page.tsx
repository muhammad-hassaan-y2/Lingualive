'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, Mail, Lock, User } from 'lucide-react'

export default function SignUp() {
  return (
    <main className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-12">
          <div className="inline-block mb-4 animate-float">
            <Image src="/mascot.png" alt="LinguaLive" width={60} height={60} />
          </div>
          <h1 className="text-4xl font-black mb-2">LinguaLive</h1>
          <p className="text-muted-foreground font-semibold text-white">Join the Learning Revolution</p>
        </div>

        {/* Auth Form */}
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-bold mb-3">Full Name</label>
            <div className="relative">
              <User className="absolute left-4 top-4 w-5 h-5 text-accent" />
              <Input
                type="text"
                placeholder="Your Name"
                className="pl-12 h-14 text-lg border-2 border-border focus:border-accent rounded-xl"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold mb-3">Email</label>
            <div className="relative">
              <Mail className="absolute left-4 top-4 w-5 h-5 text-accent" />
              <Input
                type="email"
                placeholder="your@email.com"
                className="pl-12 h-14 text-lg border-2 border-border focus:border-accent rounded-xl"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold mb-3">Password</label>
            <div className="relative">
              <Lock className="absolute left-4 top-4 w-5 h-5 text-accent" />
              <Input
                type="password"
                placeholder="••••••••"
                className="pl-12 h-14 text-lg border-2 border-border focus:border-accent rounded-xl"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold mb-3">Confirm Password</label>
            <div className="relative">
              <Lock className="absolute left-4 top-4 w-5 h-5 text-accent" />
              <Input
                type="password"
                placeholder="••••••••"
                className="pl-12 h-14 text-lg border-2 border-border focus:border-accent rounded-xl"
              />
            </div>
          </div>

          <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground h-14 text-lg font-bold rounded-xl shadow-lg hover:shadow-xl transition-all hover:scale-105 active:scale-95">
            Create Account
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-background text-muted-foreground">Or continue as guest</span>
            </div>
          </div>

          <Button
            variant="outline"
            className="w-full border-2 border-accent text-foreground hover:bg-accent/20 h-14 text-lg font-bold rounded-xl bg-transparent"
            asChild
          >
            <Link href="/dashboard">Continue as Guest</Link>
          </Button>
        </div>

        {/* Footer */}
        <div className="mt-8 space-y-4 text-center">
          <p className="text-muted-foreground text-white">
            Already have an account?{' '}
            <Link href="/signin" className="text-accent font-bold hover:underline">
              Sign In
            </Link>
          </p>
          <Link href="/" className="block text-accent hover:underline font-semibold">
            Back to Home
          </Link>
        </div>
      </div>
    </main>
  )
}
