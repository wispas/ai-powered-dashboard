import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/adminGuard";
import { NextResponse } from "next/server";

export async function DELETE(
  _req: Request,
  context: { params: Promise<{ id: string }> }
) {
  await requireAdmin();

  const { id } = await context.params;
  const userId = Number(id);

  if (isNaN(userId)) {
    return NextResponse.json(
      { error: "Invalid user id" },
      { status: 400 }
    );
  }


  await prisma.$transaction([
    prisma.analysis.deleteMany({
      where: { userId },
    }),
    prisma.property.deleteMany({
      where: { userId },
    }),
    prisma.user.delete({
      where: { id: userId },
    }),
  ]);

  return NextResponse.json({ success: true });
}
