import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
  });

  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  // ✅ READ FORM DATA
  const formData = await req.formData();
  const dataType = formData.get("dataType") as string;

  if (!dataType) {
    return NextResponse.json(
      { error: "dataType is required" },
      { status: 400 }
    );
  }

  let payload: any = { dataType };

  // ---------- TEXT ----------
  if (dataType === "text") {
    payload.text = formData.get("text");
  }

  // ---------- CSV / TIME SERIES ----------
  if (dataType === "csv" || dataType === "timeseries") {
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json(
        { error: "CSV file required" },
        { status: 400 }
      );
    }

    const csvText = await file.text();
    payload.csv = csvText;
  }

  // ---------- CALL FASTAPI ----------
  const aiRes = await fetch("http://127.0.0.1:8001/analyze", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!aiRes.ok) {
    const errorText = await aiRes.text();
  
    console.error("FASTAPI ERROR:", errorText);
  
    return NextResponse.json(
      {
        error: "AI service failed",
        details: errorText,
      },
      { status: 500 }
    );
  }

  const aiData = await aiRes.json();

  // ---------- SAVE RESULT ----------
  const saved = await prisma.analysis.create({
    data: {
      text:
        dataType === "text"
          ? payload.text
          : dataType === "csv"
          ? "CSV Data Analysis"
          : "Time Series Data Analysis",

      summary: aiData.summary,
      sentiment: aiData.sentiment,
      riskScore: aiData.risk_score,
      opportunityScore: aiData.opportunity_score,
      confidence: aiData.confidence,
      topics: aiData.topics,
      userId: user.id,
    },
  });

  return NextResponse.json(saved);
}



// import { NextResponse } from "next/server";
// import { prisma } from "@/lib/prisma";
// import { getServerSession } from "next-auth";


// export async function POST(req: Request) {
//   const body = await req.json();
  

//   // Call FastAPI
//   const aiRes = await fetch("http://127.0.0.1:8001/analyze", {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify(body),
//   });

//   const aiData = await aiRes.json();

//   const session = await getServerSession();
//   if (!session?.user?.email) {
//       return new Response("Unauthorized", { status: 401 });
//   }

//   const user = await prisma.user.findUnique({
//       where: { email: session.user.email },
//   });

//   // Save to DB
//   const saved = await prisma.analysis.create({
//     data: {
//       text: body.text,
//       summary: aiData.summary,
//       riskScore: aiData.risk_score,
//       sentiment: aiData.sentiment,
//       confidence: aiData.confidence,
//       opportunityScore: aiData.opportunity_score,
//       topics: aiData.topics,
//       userId: user!.id,
//     },
//   });

    


//   return NextResponse.json(saved);
// }
