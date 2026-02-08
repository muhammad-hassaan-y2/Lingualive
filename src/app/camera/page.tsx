"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { getServerSession } from "next-auth";
import { Camera } from "@/components/Camera";
import { TranslationResult } from "@/components/TranslationResult";
import Link from "next/link";

export default function CameraPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const router = useRouter();

  const handleCapture = async (
    file: File,
    lat?: number,
    lng?: number
  ) => {
    setIsLoading(true);

    try {
      const formData = new FormData();
      formData.append("image", file);
      if (lat !== undefined && lng !== undefined) {
        formData.append("lat", lat.toString());
        formData.append("lng", lng.toString());
      }
      formData.append("takenAt", new Date().toISOString());

      const response = await fetch("/api/translate/image", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Translation failed");
      }

      const data = await response.json();
      setResult(data);
    } catch (error) {
      alert("Failed to translate image. Please try again.");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  if (!result) {
    return (
      <main className="min-h-screen bg-gray-100 p-4">
        <div className="max-w-2xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-blue-700">
              📷 Visual Translation
            </h1>
            <Link
              href="/dashboard"
              className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700"
            >
              Back
            </Link>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-8">
            <p className="text-gray-700 mb-6 text-center">
              Point your camera at any text, menu, sign, or scene to get instant
              translation and cultural context.
            </p>
            <Camera onCapture={handleCapture} isLoading={isLoading} />
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-blue-700">
            ✨ Translation Results
          </h1>
          <button
            onClick={() => setResult(null)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            Take Another Photo
          </button>
        </div>

        <TranslationResult
          visionAnalysis={result.visionAnalysis}
          translations={result.learning.translations}
          culturalNotes={result.learning.culturalNotes}
          xpAwarded={result.xpAwarded}
          imageUrl={result.imageUrl}
        />

        <div className="mt-8 bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            📚 Vocabulary
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            {result.learning.vocabularyDeck.map(
              (item: any, idx: number) => (
                <div
                  key={idx}
                  className="bg-blue-50 border border-blue-200 rounded p-4"
                >
                  <h3 className="font-bold text-blue-700 text-lg">{item.term}</h3>
                  <p className="text-gray-600">{item.translation}</p>
                  {item.pronunciation && (
                    <p className="text-purple-600 text-sm italic mt-1">
                      {item.pronunciation}
                    </p>
                  )}
                </div>
              )
            )}
          </div>
        </div>

        <div className="mt-8 bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            💬 Conversation Practice
          </h2>
          <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4">
            <h3 className="font-bold text-yellow-800 mb-2">
              {result.learning.conversationScenario.title}
            </h3>
            <p className="text-gray-700 mb-4">
              {result.learning.conversationScenario.prompt}
            </p>
            <button
              onClick={() => router.push(`/practice/${result.photoId}`)}
              className="bg-yellow-600 text-white px-6 py-2 rounded-lg hover:bg-yellow-700"
            >
              Start Practice →
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
