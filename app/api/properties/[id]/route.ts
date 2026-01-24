import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function DELETE(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // ✅ unwrap async params
    const { id } = await context.params;
    const propertyId = Number(id);

    if (isNaN(propertyId)) {
      return NextResponse.json(
        { error: "Invalid property ID" },
        { status: 400 }
      );
    }

    const property = await prisma.property.findUnique({
      where: { id: propertyId },
    });

    if (!property) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    if (property.userId !== session.user.id) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    await prisma.property.delete({
      where: { id: propertyId },
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("DELETE PROPERTY ERROR:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function POST(
    req: Request,
    context: { params: Promise<{ id: string }> }
  ) {
    try {
      const session = await getServerSession(authOptions);
      if (!session?.user?.id) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
      }
  
      // ✅ unwrap async params
      const { id } = await context.params;
      const propertyId = Number(id);
  
      if (isNaN(propertyId)) {
        return NextResponse.json(
          { error: "Invalid property ID" },
          { status: 400 }
        );
      }
  
      const form = await req.formData();
      const name = form.get("name") as string;
      const riskScore = Number(form.get("riskScore"));
  
      await prisma.property.update({
        where: { id: propertyId }, // ✅ must be number
        data: {
          name,
          riskScore,
        },
      });
  
      return NextResponse.redirect(
        new URL("/properties", req.url)
      );
    } catch (err) {
      console.error("UPDATE PROPERTY ERROR:", err);
      return NextResponse.json(
        { error: "Internal server error" },
        { status: 500 }
      );
    }
  }
  