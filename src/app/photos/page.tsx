"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

interface Photo {
  id: string;
  imageUrl: string;
  createdAt: string;
  vocabulary: Array<{ term: string; translation: string }>;
}

export default function PhotosPage() {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        const response = await fetch("/api/photos");
        const data = await response.json();
        setPhotos(data.photos || []);
      } catch (error) {
        console.error("Failed to load photos:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPhotos();
  }, []);

  if (isLoading) {
    return (
      <main className="min-h-screen bg-gray-100 p-4">
        <div className="text-center">Loading...</div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-blue-700">📚 My Learning</h1>
          <Link
            href="/dashboard"
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            Back to Dashboard
          </Link>
        </div>

        {photos.length === 0 ? (
          <div className="bg-white rounded-lg shadow-lg p-12 text-center">
            <p className="text-gray-600 text-lg mb-4">
              No translations yet. Start by taking a photo!
            </p>
            <Link
              href="/camera"
              className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
            >
              📷 Take Your First Photo
            </Link>
          </div>
        ) : (
          <div className="grid md:grid-cols-3 gap-6">
            {photos.map((photo) => (
              <Link
                key={photo.id}
                href={`/photos/${photo.id}`}
                className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition cursor-pointer"
              >
                <img
                  src={photo.imageUrl}
                  alt="Translation"
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <p className="text-gray-500 text-sm">
                    {new Date(photo.createdAt).toLocaleDateString()}
                  </p>
                  <p className="text-sm text-gray-700 mt-2">
                    {photo.vocabulary.length} vocabulary items
                  </p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
