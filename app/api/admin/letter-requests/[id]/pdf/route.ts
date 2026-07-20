import { NextRequest, NextResponse } from "next/server";
import { renderToBuffer } from "@react-pdf/renderer";
import React from "react";
import { prisma } from "@/lib/prisma";
import { requireAdminSession } from "@/lib/require-admin";
import { LetterPdf } from "@/components/pdf/letter-pdf";

type Params = { params: Promise<{ id: string }> };

export async function GET(request: NextRequest, { params }: Params) {
  const session = await requireAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const record = await prisma.letterRequest.findUnique({ where: { id } });

  if (!record) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  if (record.status !== "COMPLETED" || !record.officialNumber) {
    return NextResponse.json(
      { error: "Surat belum bisa digenerate. Status harus COMPLETED dan nomor surat harus terisi." },
      { status: 400 }
    );
  }

  const pdfData = {
    letterType: record.letterType,
    studentName: record.studentName,
    nisn: record.nisn,
    studentClass: record.studentClass,
    birthPlace: record.birthPlace,
    birthDate: record.birthDate,
    parentName: record.parentName,
    address: record.address,
    purpose: record.purpose,
    officialNumber: record.officialNumber,
    officialDate: record.officialDate ?? new Date(),
  };

  const buffer = await renderToBuffer(
    React.createElement(LetterPdf, { data: pdfData })
  );

  const isDownload = request.nextUrl.searchParams.get("download") === "1";
  const filename = `Surat-${record.ticketNumber}.pdf`;

  return new NextResponse(buffer, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": isDownload
        ? `attachment; filename="${filename}"`
        : `inline; filename="${filename}"`,
    },
  });
}
