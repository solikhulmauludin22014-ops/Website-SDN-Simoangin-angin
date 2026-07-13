/**
 * file-validation.ts
 * Hardened upload validation: MIME allowlist, magic-byte check,
 * file size cap, and filename sanitisation.
 */

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

/** Maximum allowed size for e-book PDF files: 50 MB */
export const MAX_EBOOK_SIZE_BYTES = 50 * 1024 * 1024;

/** Maximum allowed size for cover images: 5 MB */
export const MAX_COVER_SIZE_BYTES = 5 * 1024 * 1024;

/**
 * Allowed MIME types and their corresponding magic bytes (file signatures).
 * Magic bytes are checked independently of the browser-supplied Content-Type
 * header so that a renamed file cannot bypass validation.
 */
const EBOOK_RULES = {
  allowedMime: ["application/pdf"] as const,
  magic: [
    { bytes: [0x25, 0x50, 0x44, 0x46], label: "PDF" }, // %PDF
  ],
};

const COVER_RULES = {
  allowedMime: ["image/jpeg", "image/png", "image/webp"] as const,
  magic: [
    { bytes: [0xff, 0xd8, 0xff], label: "JPEG" },
    { bytes: [0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a], label: "PNG" },
    { bytes: [0x52, 0x49, 0x46, 0x46], label: "WebP (RIFF)" }, // RIFF....WEBP
  ],
};

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/**
 * Return the first `n` bytes of a File without loading the entire buffer.
 */
async function readFileHeader(file: File, bytes: number = 12): Promise<Uint8Array> {
  const slice = file.slice(0, bytes);
  const ab = await slice.arrayBuffer();
  return new Uint8Array(ab);
}

/**
 * Check whether a byte array starts with the given magic sequence.
 */
function startsWith(header: Uint8Array, magic: number[]): boolean {
  if (header.length < magic.length) return false;
  return magic.every((byte, i) => header[i] === byte);
}

/**
 * Sanitise a filename: strip path separators, null bytes, and leading dots/
 * spaces; replace unsafe characters with underscores; truncate to 200 chars.
 */
export function sanitiseFilename(raw: string): string {
  return raw
    .replace(/[/\\]/g, "_")       // path separators
    .replace(/\0/g, "")           // null bytes
    .replace(/^[.\s]+/, "")       // leading dots / spaces
    .replace(/[^\w.\-]/g, "_")    // keep only word chars, dots, dashes
    .slice(0, 200)                 // length cap
    || "upload";                   // fallback if empty after sanitising
}

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

export type ValidationResult =
  | { ok: true; filename: string }
  | { ok: false; error: string };

/**
 * Validate an e-book file (PDF only, ≤ 50 MB).
 * Performs MIME check, magic-byte verification, and size limit.
 */
export async function validateEbook(file: File): Promise<ValidationResult> {
  // Size check first (cheap)
  if (file.size === 0) {
    return { ok: false, error: "File e-book tidak boleh kosong." };
  }
  if (file.size > MAX_EBOOK_SIZE_BYTES) {
    const mb = (MAX_EBOOK_SIZE_BYTES / 1024 / 1024).toFixed(0);
    return { ok: false, error: `Ukuran e-book melebihi batas ${mb} MB.` };
  }

  // MIME type check (browser-reported)
  if (!EBOOK_RULES.allowedMime.includes(file.type as "application/pdf")) {
    return {
      ok: false,
      error: `Tipe file tidak didukung: "${file.type}". Hanya PDF yang diizinkan.`,
    };
  }

  // Magic-byte check (actual file content)
  const header = await readFileHeader(file, 12);
  const validMagic = EBOOK_RULES.magic.some(({ bytes }) => startsWith(header, bytes));
  if (!validMagic) {
    return {
      ok: false,
      error: "Konten file tidak sesuai dengan format PDF. Upload ditolak.",
    };
  }

  return { ok: true, filename: sanitiseFilename(file.name) };
}

/**
 * Validate a cover image (JPEG / PNG / WebP only, ≤ 5 MB).
 * Performs MIME check, magic-byte verification, and size limit.
 */
export async function validateCover(file: File): Promise<ValidationResult> {
  if (file.size === 0) {
    return { ok: false, error: "File cover tidak boleh kosong." };
  }
  if (file.size > MAX_COVER_SIZE_BYTES) {
    const mb = (MAX_COVER_SIZE_BYTES / 1024 / 1024).toFixed(0);
    return { ok: false, error: `Ukuran cover melebihi batas ${mb} MB.` };
  }

  const allowedMimes = COVER_RULES.allowedMime as readonly string[];
  if (!allowedMimes.includes(file.type)) {
    return {
      ok: false,
      error: `Tipe file tidak didukung: "${file.type}". Gunakan JPEG, PNG, atau WebP.`,
    };
  }

  const header = await readFileHeader(file, 12);
  const validMagic = COVER_RULES.magic.some(({ bytes }) => startsWith(header, bytes));
  if (!validMagic) {
    return {
      ok: false,
      error: "Konten file cover tidak valid. Upload ditolak.",
    };
  }

  return { ok: true, filename: sanitiseFilename(file.name) };
}
