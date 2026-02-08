import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
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

  const { searchParams } = new URL(request.url);
  const limit = parseInt(searchParams.get("limit") ?? "10");
  const skip = parseInt(searchParams.get("skip") ?? "0");

  const photos = await prisma.photo.findMany({
    where: { userId: user.id },
    include: {
      vocabulary: true,
      scenario: true,
      quiz: true,
    },
    orderBy: { createdAt: "desc" },
    take: limit,
    skip,
  });

  const total = await prisma.photo.count({ where: { userId: user.id } });

  return NextResponse.json({
    photos,
    total,
    limit,
    skip,
  });
}
