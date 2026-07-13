import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

type Params = { params: Promise<{ id: string }> };

export async function POST(_: Request, { params }: Params) {
  const { id } = await params;
  await prisma.book.update({
    where: { id },
    data: { downloadCount: { increment: 1 } },
  });

  return NextResponse.json({ success: true });
}
