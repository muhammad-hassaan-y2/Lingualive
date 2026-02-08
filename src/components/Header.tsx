"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export function Header() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const handleLogout = async () => {
    await fetch("/api/auth/signout", { method: "POST" });
    router.push("/");
  };

  return (
    <header className="bg-blue-600 text-white shadow-lg">
      <nav className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold">
          LinguaLive
        </Link>

        <div className="flex gap-4 items-center">
          {status === "loading" ? (
            <div>Loading...</div>
          ) : session?.user ? (
            <>
              <Link href="/dashboard" className="hover:underline">
                Dashboard
              </Link>
              <Link href="/camera" className="bg-white text-blue-600 px-4 py-2 rounded font-semibold hover:bg-gray-100">
                Camera
              </Link>
              <span className="text-sm">{session.user.name || session.user.email}</span>
              <button
                onClick={handleLogout}
                className="bg-red-500 px-4 py-2 rounded hover:bg-red-600"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link href="/signin" className="hover:underline">
                Sign In
              </Link>
              <Link href="/signup" className="bg-white text-blue-600 px-4 py-2 rounded font-semibold hover:bg-gray-100">
                Sign Up
              </Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}
