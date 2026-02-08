"use client";

interface TranslationResultProps {
  visionAnalysis: {
    detectedLanguage: string;
    documentType: string;
    sceneSummary: string;
  };
  translations: Array<{
    original: string;
    translation: string;
    pronunciation?: string;
    notes?: string;
  }>;
  culturalNotes: string[];
  xpAwarded?: number;
  imageUrl: string;
}

export function TranslationResult({
  visionAnalysis,
  translations,
  culturalNotes,
  xpAwarded,
  imageUrl,
}: TranslationResultProps) {
  return (
    <div className="bg-gradient-to-b from-blue-50 to-white rounded-xl shadow-lg p-6 space-y-6">
      <div className="flex gap-6">
        <img
          src={imageUrl}
          alt="Translated"
          className="w-32 h-32 rounded-lg object-cover border-2 border-blue-300"
        />

        <div className="flex-1">
          <h2 className="text-2xl font-bold text-blue-700 mb-2">
            {visionAnalysis.documentType}
          </h2>
          <p className="text-gray-600 mb-2">
            <strong>Language:</strong> {visionAnalysis.detectedLanguage}
          </p>
          <p className="text-gray-700">{visionAnalysis.sceneSummary}</p>

          {xpAwarded && (
            <div className="mt-4 bg-yellow-100 border-l-4 border-yellow-500 p-3 rounded">
              <p className="text-lg font-semibold text-yellow-800">
                ⭐ +{xpAwarded} XP
              </p>
            </div>
          )}
        </div>
      </div>

      {translations.length > 0 && (
        <div>
          <h3 className="text-xl font-bold text-gray-800 mb-4">Translations</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {translations.map((t, idx) => (
              <div
                key={idx}
                className="bg-blue-50 border border-blue-200 rounded p-3"
              >
                <p className="font-semibold text-blue-700">{t.original}</p>
                <p className="text-gray-600">{t.translation}</p>
                {t.pronunciation && (
                  <p className="text-sm text-purple-600">{t.pronunciation}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {culturalNotes.length > 0 && (
        <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded">
          <h3 className="text-lg font-bold text-green-700 mb-2">
            🌍 Cultural Insights
          </h3>
          <ul className="space-y-2">
            {culturalNotes.map((note, idx) => (
              <li key={idx} className="text-gray-700">
                • {note}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
