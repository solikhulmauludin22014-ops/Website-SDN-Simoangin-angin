"use server";

import { prisma } from "@/lib/prisma";
import { letterRequestSchema } from "@/lib/validators";

type ActionResult = {
  success: boolean;
  ticketNumber?: string;
  error?: string;
  fieldErrors?: Record<string, string[]>;
};

export async function submitLetterRequest(
  _prev: ActionResult | null,
  formData: FormData
): Promise<ActionResult> {
  // Honeypot check — if filled, it's a bot
  const honeypot = formData.get("website_url");
  if (honeypot && String(honeypot).length > 0) {
    // Silently pretend success to bots
    return { success: true, ticketNumber: "FAKE-TICKET" };
  }

  const rawData = {
    letterType: String(formData.get("letterType") ?? ""),
    applicantName: String(formData.get("applicantName") ?? "").trim(),
    applicantPhone: String(formData.get("applicantPhone") ?? "").trim(),
    applicantEmail: String(formData.get("applicantEmail") ?? "").trim() || undefined,
    studentName: String(formData.get("studentName") ?? "").trim(),
    nisn: String(formData.get("nisn") ?? "").trim(),
    studentClass: String(formData.get("studentClass") ?? "").trim(),
    birthPlace: String(formData.get("birthPlace") ?? "").trim(),
    birthDate: String(formData.get("birthDate") ?? ""),
    
    gender: String(formData.get("gender") ?? "") || undefined,
    parentJob: String(formData.get("parentJob") ?? "").trim() || undefined,
    targetSchool: String(formData.get("targetSchool") ?? "").trim() || undefined,
    previousSchool: String(formData.get("previousSchool") ?? "").trim() || undefined,
    fatherName: String(formData.get("fatherName") ?? "").trim() || undefined,
    motherName: String(formData.get("motherName") ?? "").trim() || undefined,

    parentName: String(formData.get("parentName") ?? "").trim(),
    address: String(formData.get("address") ?? "").trim(),
    purpose: String(formData.get("purpose") ?? "").trim(),
    notes: String(formData.get("notes") ?? "").trim() || undefined,
  };

  const parsed = letterRequestSchema.safeParse(rawData);
  if (!parsed.success) {
    const flat = parsed.error.flatten();
    return {
      success: false,
      error: "Data tidak valid. Silakan periksa kembali.",
      fieldErrors: flat.fieldErrors as Record<string, string[]>,
    };
  }

  try {
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
        
        gender: parsed.data.gender || null,
        parentJob: parsed.data.parentJob || null,
        targetSchool: parsed.data.targetSchool || null,
        previousSchool: parsed.data.previousSchool || null,
        fatherName: parsed.data.fatherName || null,
        motherName: parsed.data.motherName || null,

        parentName: parsed.data.parentName,
        address: parsed.data.address,
        purpose: parsed.data.purpose,
        notes: parsed.data.notes || null,
      },
    });

    return { success: true, ticketNumber: record.ticketNumber };
  } catch {
    return { success: false, error: "Terjadi kesalahan server. Silakan coba lagi." };
  }
}

export async function checkLetterStatus(ticketNumber: string) {
  if (!ticketNumber || ticketNumber.length < 3) {
    return null;
  }

  const record = await prisma.letterRequest.findUnique({
    where: { ticketNumber },
    select: {
      ticketNumber: true,
      letterType: true,
      studentName: true,
      status: true,
      createdAt: true,
      officialNumber: true,
      officialDate: true,
    },
  });

  return record;
}
