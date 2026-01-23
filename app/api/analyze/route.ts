import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";


export async function POST(req: Request) {
  const body = await req.json();
  

  // Call FastAPI
  const aiRes = await fetch("http://127.0.0.1:8001/analyze", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  const aiData = await aiRes.json();

  const session = await getServerSession();
  if (!session?.user?.email) {
      return new Response("Unauthorized", { status: 401 });
  }

  const user = await prisma.user.findUnique({
      where: { email: session.user.email },
  });

  // Save to DB
  const saved = await prisma.analysis.create({
    data: {
      text: body.text,
      summary: aiData.summary,
      riskScore: aiData.risk_score,
      sentiment: aiData.sentiment,
      confidence: aiData.confidence,
      topics: aiData.topics,
      userId: user!.id,
    },
  });

    


  return NextResponse.json(saved);
}
