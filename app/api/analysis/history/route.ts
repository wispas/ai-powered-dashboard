import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const history = await prisma.analysis.findMany({
    orderBy: { createdAt: "asc" },
    select: {
      createdAt: true,
      riskScore: true,
      sentiment: true,
      confidence: true,
    },
  });

  return NextResponse.json(history);
}
