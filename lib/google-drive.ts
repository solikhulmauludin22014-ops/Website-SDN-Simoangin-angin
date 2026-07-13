import { google } from "googleapis";
import { Readable } from "stream";

function getGoogleAuth() {
  const clientEmail = process.env.GOOGLE_CLIENT_EMAIL;
  const privateKey = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n");

  if (!clientEmail || !privateKey) {
    throw new Error("Google Drive credentials are not configured");
  }

  return new google.auth.JWT({
    email: clientEmail,
    key: privateKey,
    scopes: ["https://www.googleapis.com/auth/drive"],
  });
}

export async function uploadFileToDrive(
  fileBuffer: Buffer,
  filename: string,
  mimeType: string
) {
  const folderId = process.env.GOOGLE_DRIVE_FOLDER_ID;
  if (!folderId) {
    throw new Error("GOOGLE_DRIVE_FOLDER_ID is not configured");
  }

  const auth = getGoogleAuth();
  const drive = google.drive({ version: "v3", auth });

  const created = await drive.files.create({
    requestBody: {
      name: filename,
      parents: [folderId],
    },
    media: {
      mimeType,
      body: Readable.from(fileBuffer),
    },
    fields: "id, webViewLink",
  });

  const fileId = created.data.id;
  if (!fileId) {
    throw new Error("Google Drive did not return a fileId");
  }

  await drive.permissions.create({
    fileId,
    requestBody: {
      role: "reader",
      type: "anyone",
    },
  });

  return {
    driveFileId: fileId,
    driveViewLink:
      created.data.webViewLink ?? `https://drive.google.com/file/d/${fileId}/view`,
  };
}
