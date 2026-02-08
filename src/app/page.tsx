import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { authOptions } from "@/lib/auth";

export default async function Home() {
  const session = await getServerSession(authOptions);

  if (session) {
    redirect("/dashboard");
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center p-4">
      <div className="text-center text-white max-w-2xl">
        <h1 className="text-5xl font-bold mb-6">LinguaLive</h1>
        <p className="text-2xl mb-4">
          AI Language Learning Through Real-World Visual Immersion
        </p>
        <p className="text-lg mb-8 text-blue-100">
          Point your camera at ANY object, sign, menu, or scene → get instant
          translation, pronunciation, cultural context, AND practice the language
          you see.
        </p>

        <div className="grid md:grid-cols-3 gap-6 mb-12 text-left">
          <div className="bg-blue-700 rounded-lg p-6">
            <div className="text-4xl mb-2">📷</div>
            <h3 className="text-xl font-bold mb-2">Visual Learning</h3>
            <p className="text-blue-100">
              Capture any real-world scenario and learn from context
            </p>
          </div>

          <div className="bg-blue-700 rounded-lg p-6">
            <div className="text-4xl mb-2">🎯</div>
            <h3 className="text-xl font-bold mb-2">Context-Aware</h3>
            <p className="text-blue-100">
              Immersive learning tailored to what you photograph
            </p>
          </div>

          <div className="bg-blue-700 rounded-lg p-6">
            <div className="text-4xl mb-2">🏆</div>
            <h3 className="text-xl font-bold mb-2">Gamified</h3>
            <p className="text-blue-100">
              Earn XP, unlock badges, and track your progress
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <Link
            href="/signup"
            className="inline-block bg-white text-blue-600 px-8 py-3 rounded-lg font-bold text-lg hover:bg-gray-100 transition"
          >
            Get Started Free
          </Link>
          <div>
            <p className="text-blue-100 mb-2">Already have an account?</p>
            <Link
              href="/signin"
              className="inline-block border-2 border-white text-white px-8 py-3 rounded-lg font-bold text-lg hover:bg-blue-500 transition"
            >
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
          <a
            className="flex h-12 w-full items-center justify-center gap-2 rounded-full bg-foreground px-5 text-background transition-colors hover:bg-[#383838] dark:hover:bg-[#ccc] md:w-[158px]"
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              className="dark:invert"
              src="/vercel.svg"
              alt="Vercel logomark"
              width={16}
              height={16}
            />
            Deploy Now
          </a>
          <a
            className="flex h-12 w-full items-center justify-center rounded-full border border-solid border-black/[.08] px-5 transition-colors hover:border-transparent hover:bg-black/[.04] dark:border-white/[.145] dark:hover:bg-[#1a1a1a] md:w-[158px]"
            href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            Documentation
          </a>
        </div>
      </main>
    </div>
  );
}
