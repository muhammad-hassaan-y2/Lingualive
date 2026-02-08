import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { authOptions } from "@/lib/auth";

export default async function Dashboard() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    redirect("/signin");
  }

  return (
    <main className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h1 className="text-4xl font-bold text-blue-700 mb-2">
            Welcome, {session.user.name || session.user.email}! 👋
          </h1>
          <p className="text-gray-600">
            Start your immersive language learning journey by capturing visual content.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Link
            href="/camera"
            className="bg-white rounded-lg shadow-lg p-8 text-center hover:shadow-xl transition cursor-pointer"
          >
            <div className="text-5xl mb-4">📷</div>
            <h2 className="text-2xl font-bold text-blue-700 mb-2">
              Take a Photo
            </h2>
            <p className="text-gray-600">
              Capture real-world scenarios for instant translation and learning
            </p>
          </Link>

          <Link
            href="/photos"
            className="bg-white rounded-lg shadow-lg p-8 text-center hover:shadow-xl transition cursor-pointer"
          >
            <div className="text-5xl mb-4">📚</div>
            <h2 className="text-2xl font-bold text-blue-700 mb-2">
              My Learning
            </h2>
            <p className="text-gray-600">
              Review your translations, vocabulary, and progress history
            </p>
          </Link>

          <Link
            href="/profile"
            className="bg-white rounded-lg shadow-lg p-8 text-center hover:shadow-xl transition cursor-pointer"
          >
            <div className="text-5xl mb-4">🏆</div>
            <h2 className="text-2xl font-bold text-blue-700 mb-2">
              My Progress
            </h2>
            <p className="text-gray-600">
              Check your XP, badges, streaks, and achievements
            </p>
          </Link>
        </div>

        <div className="bg-blue-50 rounded-lg shadow p-6 border-l-4 border-blue-600">
          <h3 className="text-xl font-bold text-blue-700 mb-2">💡 Pro Tip</h3>
          <p className="text-gray-700">
            The more you capture in different environments, the more you learn! Try photographing restaurant menus, street signs, product packaging, or cultural artifacts for the best results.
          </p>
        </div>
      </div>
    </main>
  );
}
