import type React from "react";

interface VocabularyCardProps {
  term: string;
  translation: string;
  pronunciation?: string;
  partOfSpeech?: string;
  notes?: string;
  onSave?: () => void;
  isSaved?: boolean;
}

export function VocabularyCard({
  term,
  translation,
  pronunciation,
  partOfSpeech,
  notes,
  onSave,
  isSaved,
}: VocabularyCardProps) {
  return (
    <div className="bg-white border-2 border-blue-200 rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow">
      <div className="flex justify-between items-start gap-4">
        <div className="flex-1">
          <h3 className="text-xl font-bold text-blue-700">{term}</h3>
          <p className="text-gray-600 text-lg">{translation}</p>
          {pronunciation && (
            <p className="text-sm text-purple-600 italic">{pronunciation}</p>
          )}
          {partOfSpeech && (
            <span className="inline-block bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded mt-2">
              {partOfSpeech}
            </span>
          )}
          {notes && (
            <p className="text-sm text-gray-500 mt-2 border-l-4 border-blue-300 pl-2">
              {notes}
            </p>
          )}
        </div>
        {onSave && (
          <button
            onClick={onSave}
            className={`px-4 py-2 rounded font-semibold transition-colors ${
              isSaved
                ? "bg-green-600 text-white hover:bg-green-700"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            {isSaved ? "✓ Saved" : "Save"}
          </button>
        )}
      </div>
    </div>
  );
}
