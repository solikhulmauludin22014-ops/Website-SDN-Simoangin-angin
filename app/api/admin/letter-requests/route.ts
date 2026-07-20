import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdminSession } from "@/lib/require-admin";
import { letterRequestSchema } from "@/lib/validators";

export async function GET(request: NextRequest) {
  const session = await requireAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = request.nextUrl;
  const status = searchParams.get("status");
  const search = searchParams.get("search");

  const where: Record<string, unknown> = {};

  if (status && status !== "ALL") {
    where.status = status;
  }

  if (search) {
    where.OR = [
      { studentName: { contains: search, mode: "insensitive" } },
      { applicantName: { contains: search, mode: "insensitive" } },
      { ticketNumber: { contains: search, mode: "insensitive" } },
    ];
  }

  const letterRequests = await prisma.letterRequest.findMany({
    where,
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(letterRequests);
}

export async function POST(request: Request) {
  const session = await requireAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();

  const parsed = letterRequestSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  const record = await prisma.letterRequest.create({
    data: {
      letterType: parsed.data.letterType,
      applicantName: parsed.data.applicantName,
      applicantPhone: parsed.data.applicantPhone,
      applicantEmail: parsed.data.applicantEmail || null,
      studentName: parsed.data.studentName,
      nisn: parsed.data.nisn,
      studentClass: parsed.data.studentClass,
      birthPlace: parsed.data.birthPlace,
      birthDate: parsed.data.birthDate,
      parentName: parsed.data.parentName,
      address: parsed.data.address,
      purpose: parsed.data.purpose,
      notes: parsed.data.notes || null,
    },
  });

  return NextResponse.json(record, { status: 201 });
}
