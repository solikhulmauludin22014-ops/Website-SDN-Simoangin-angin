import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { categorySchema } from "@/lib/validators";
import { toSlug } from "@/lib/utils";
import { requireAdminSession } from "@/lib/require-admin";

type Params = { params: Promise<{ id: string }> };

export async function PATCH(request: Request, { params }: Params) {
  const session = await requireAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const parsed = categorySchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  const { id } = await params;

  const category = await prisma.category.update({
    where: { id },
    data: {
      name: parsed.data.name,
      slug: toSlug(parsed.data.name),
    },
  });

  return NextResponse.json(category);
}

export async function DELETE(_: Request, { params }: Params) {
  const session = await requireAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  await prisma.category.delete({ where: { id } });
  return NextResponse.json({ success: true });
}
