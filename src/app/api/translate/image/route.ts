import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redis } from "@/lib/redis";
import { cloudinary } from "@/lib/cloudinary";
import {
  analyzeImageWithVision,
  generateLearningContent,
} from "@/lib/gemini";
import { bufferToBase64, safeJsonParse, sha256 } from "@/lib/utils";

const MAX_IMAGE_SIZE = 8 * 1024 * 1024;

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email.toLowerCase() },
  });

  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  const formData = await request.formData();
  const file = formData.get("image");

  if (!(file instanceof File)) {
    return NextResponse.json({ error: "Image is required" }, { status: 400 });
  }

  if (!file.type.startsWith("image/")) {
    return NextResponse.json({ error: "Invalid image type" }, { status: 400 });
  }

  if (file.size > MAX_IMAGE_SIZE) {
    return NextResponse.json({ error: "Image too large" }, { status: 413 });
  }

  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  const imageHash = sha256(buffer);
  const cacheKey = `translation:${user.id}:${imageHash}`;

  if (redis) {
    const cached = await redis.get(cacheKey);
    if (cached) {
      const payload = safeJsonParse(cached, null as unknown as Record<string, unknown>);
      if (payload) {
        return NextResponse.json({ ...payload, source: "cache" });
      }
    }
  }

  const base64 = bufferToBase64(buffer);
  const metadata = {
    locationLat: Number(formData.get("lat") ?? ""),
    locationLng: Number(formData.get("lng") ?? ""),
    takenAt: formData.get("takenAt") ? new Date(String(formData.get("takenAt"))) : null,
  };

  const uploadResult = await cloudinary.uploader.upload(
    `data:${file.type};base64,${base64}`,
    {
      folder: "lingualive",
      resource_type: "image",
    }
  );

  const visionAnalysis = await analyzeImageWithVision(base64, file.type);
  const learning = await generateLearningContent(visionAnalysis);

  const photo = await prisma.photo.create({
    data: {
      userId: user.id,
      imageUrl: uploadResult.secure_url,
      takenAt: metadata.takenAt ?? undefined,
      locationLat: Number.isFinite(metadata.locationLat)
        ? metadata.locationLat
        : undefined,
      locationLng: Number.isFinite(metadata.locationLng)
        ? metadata.locationLng
        : undefined,
      metadata: {
        fileName: file.name,
        size: file.size,
        type: file.type,
      },
      analysis: {
        vision: visionAnalysis,
      },
    },
  });

  if (learning.vocabularyDeck.length) {
    await prisma.vocabularyItem.createMany({
      data: learning.vocabularyDeck.map((item) => ({
        photoId: photo.id,
        term: item.term,
        translation: item.translation,
        pronunciation: item.pronunciation,
        partOfSpeech: item.partOfSpeech,
      })),
    });
  }

  await prisma.conversationScenario.create({
    data: {
      photoId: photo.id,
      title: learning.conversationScenario.title,
      prompt: learning.conversationScenario.prompt,
      phrases: learning.conversationScenario.phrases,
    },
  });

  await prisma.quiz.create({
    data: {
      photoId: photo.id,
      title: learning.quiz.title,
      questions: learning.quiz.questions,
    },
  });

  const xpAwarded = 50;
  const progress = await prisma.userProgress.upsert({
    where: { userId: user.id },
    create: {
      userId: user.id,
      xp: xpAwarded,
      level: 1,
      streak: 1,
      lastActiveAt: new Date(),
    },
    update: {
      xp: { increment: xpAwarded },
      lastActiveAt: new Date(),
    },
  });

  await prisma.xPEvent.create({
    data: {
      userId: user.id,
      amount: xpAwarded,
      reason: "Image translation",
    },
  });

  const badgeKey = "first-translation";
  const badge = await prisma.badge.upsert({
    where: { key: badgeKey },
    create: {
      key: badgeKey,
      name: "First Translation",
      description: "Completed your first visual translation.",
    },
    update: {},
  });

  const badgeEarned = await prisma.userBadge.upsert({
    where: {
      userId_badgeId: {
        userId: user.id,
        badgeId: badge.id,
      },
    },
    create: {
      userId: user.id,
      badgeId: badge.id,
    },
    update: {},
  });

  const responsePayload = {
    photoId: photo.id,
    imageUrl: photo.imageUrl,
    visionAnalysis,
    learning,
    xpAwarded,
    progress,
    badge: badgeEarned ? { key: badge.key, name: badge.name } : null,
  };

  if (redis) {
    await redis.set(cacheKey, JSON.stringify(responsePayload), "EX", 60 * 60);
  }

  return NextResponse.json(responsePayload);
}
