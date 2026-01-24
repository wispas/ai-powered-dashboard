import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { NextResponse } from "next/server";

function calculateRisk(value: number, city: string) {
  // 1️⃣ Value-based risk
  let valueRisk = 0.3;
  if (value > 10_000_000) valueRisk = 0.7;
  else if (value > 5_000_000) valueRisk = 0.5;

  // 2️⃣ City-based risk (assumption-based)
  const cityRiskMap: Record<string, number> = {
    delhi: 0.6,
    mumbai: 0.5,
    bangalore: 0.4,
    chennai: 0.45,
    hyderabad: 0.4,
  };

  const locationRisk =
    cityRiskMap[city.toLowerCase()] ?? 0.5;

  // 3️⃣ Final weighted risk score
  const riskScore =
    valueRisk * 0.6 + locationRisk * 0.4;

  return Number(riskScore.toFixed(2));
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }

  const body = await req.json();

  const value = parseFloat(body.value);
  const riskScore = calculateRisk(value, body.city);

  const property = await prisma.property.create({
    data: {
      name: body.name,
      city: body.city,
      latitude: parseFloat(body.latitude),
      longitude: parseFloat(body.longitude),
      value,
      riskScore,
      userId: session.user.id,
    },
  });

  return NextResponse.json(property);
}
