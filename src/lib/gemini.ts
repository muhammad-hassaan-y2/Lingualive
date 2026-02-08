import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = process.env.GOOGLE_GEMINI_API_KEY;

if (!apiKey) {
  // eslint-disable-next-line no-console
  console.warn("GOOGLE_GEMINI_API_KEY is not set");
}

const client = apiKey ? new GoogleGenerativeAI(apiKey) : null;

export type VisionAnalysis = {
  detectedLanguage: string;
  documentType: string;
  items: Array<{ rawText: string; category?: string }>;
  sceneSummary: string;
};

export type LearningPayload = {
  translations: Array<{
    original: string;
    translation: string;
    pronunciation?: string;
    notes?: string;
  }>;
  culturalNotes: string[];
  usefulPhrases: Array<{ phrase: string; meaning: string }>;
  vocabularyDeck: Array<{
    term: string;
    translation: string;
    pronunciation?: string;
    partOfSpeech?: string;
  }>;
  conversationScenario: {
    title: string;
    prompt: string;
    phrases: Array<{ phrase: string; meaning: string }>;
  };
  quiz: {
    title: string;
    questions: Array<{
      type: "match" | "multiple_choice";
      prompt: string;
      options: string[];
      answer: string;
    }>;
  };
};

export async function analyzeImageWithVision(imageBase64: string, mimeType: string) {
  if (!client) {
    throw new Error("Gemini client not configured");
  }

  const model = client.getGenerativeModel({
    model: "gemini-1.5-flash",
    generationConfig: {
      responseMimeType: "application/json",
      temperature: 0.2,
    },
  });

  const prompt =
    "Analyze this image for language learning. Return JSON with detectedLanguage, documentType, items (rawText + optional category), and sceneSummary.";

  const result = await model.generateContent([
    { text: prompt },
    {
      inlineData: {
        data: imageBase64,
        mimeType,
      },
    },
  ]);

  const text = result.response.text();
  return JSON.parse(text) as VisionAnalysis;
}

export async function generateLearningContent(analysis: VisionAnalysis) {
  if (!client) {
    throw new Error("Gemini client not configured");
  }

  const model = client.getGenerativeModel({
    model: "gemini-1.5-pro",
    generationConfig: {
      responseMimeType: "application/json",
      temperature: 0.4,
    },
  });

  const prompt = `You are LinguaLive, an immersive language tutor.
Create translations, pronunciation hints, cultural notes, useful phrases, a vocabulary deck, a conversation scenario, and a short quiz.
Input JSON: ${JSON.stringify(analysis)}.
Return JSON following this schema:
{
  translations: [{ original, translation, pronunciation, notes }],
  culturalNotes: [string],
  usefulPhrases: [{ phrase, meaning }],
  vocabularyDeck: [{ term, translation, pronunciation, partOfSpeech }],
  conversationScenario: { title, prompt, phrases: [{ phrase, meaning }] },
  quiz: { title, questions: [{ type, prompt, options, answer }] }
}`;

  const result = await model.generateContent(prompt);
  const text = result.response.text();
  return JSON.parse(text) as LearningPayload;
}
