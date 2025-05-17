import { getGoogleDriveClient } from "@/app/utils/google-drive/googleDriveClient";
import { Readable } from "stream";

/**
 * Find a folder by name in Google Drive
 * @param folderName The name of the folder to find
 * @param parentId Optional parent folder ID to search within
 * @returns The folder ID if found, null otherwise
 */
export async function findFolder(
  folderName: string,
  parentId?: string
): Promise<string | null> {
  try {
    const drive = await getGoogleDriveClient();

    // Build the query to find folders with the given name
    let query = `mimeType='application/vnd.google-apps.folder' and name='${folderName}'`;
    if (parentId) {
      query += ` and '${parentId}' in parents`;
    }

    const response = await drive.files.list({
      q: query,
      fields: "files(id, name)",
      spaces: "drive",
    });

    const files = response.data.files;
    if (files && files.length > 0) {
      return files[0].id || null;
    }

    return null;
  } catch (error) {
    console.error("Error finding folder:", error);
    return null;
  }
}

/**
 * Create a folder in Google Drive
 * @param folderName The name of the folder to create
 * @param parentId Optional parent folder ID
 * @returns The ID of the created folder, or null if creation failed
 */
export async function createFolder(
  folderName: string,
  parentId?: string
): Promise<string | null> {
  try {
    const drive = await getGoogleDriveClient();

    const fileMetadata = {
      name: folderName,
      mimeType: "application/vnd.google-apps.folder",
      ...(parentId ? { parents: [parentId] } : {}),
    };

    const response = await drive.files.create({
      requestBody: fileMetadata,
      fields: "id",
    });

    return response.data.id || null;
  } catch (error) {
    console.error("Error creating folder:", error);
    return null;
  }
}

/**
 * Find or create a folder in Google Drive
 * @param folderName The name of the folder to find or create
 * @param parentId Optional parent folder ID
 * @returns The ID of the found or created folder, or null if operation failed
 */
export async function findOrCreateFolder(
  folderName: string,
  parentId?: string
): Promise<string | null> {
  // First try to find the folder
  const folderId = await findFolder(folderName, parentId);

  if (folderId) {
    return folderId;
  }

  // If not found, create it
  return createFolder(folderName, parentId);
}

/**
 * Upload a file to Google Drive
 * @param file The file to upload
 * @param fileName The name to give the file in Google Drive
 * @param mimeType The MIME type of the file
 * @param parentId The ID of the parent folder
 * @returns The ID of the uploaded file, or null if upload failed
 */
export async function uploadFileToDrive(
  file: File | Buffer | ArrayBuffer | Uint8Array,
  fileName: string,
  mimeType: string,
  parentId: string
): Promise<string | null> {
  try {
    const drive = await getGoogleDriveClient();

    const fileMetadata = {
      name: fileName,
      parents: [parentId],
    };

    let body;

    if (file instanceof File) {
      // For browser File objects, get the array buffer and create a readable stream
      const arrayBuffer = await file.arrayBuffer();
      body = Readable.from(Buffer.from(new Uint8Array(arrayBuffer)));
    } else if (file instanceof Uint8Array || file instanceof ArrayBuffer) {
      // For Uint8Array or ArrayBuffer, convert to Buffer and create a readable stream
      const buffer =
        file instanceof ArrayBuffer
          ? Buffer.from(new Uint8Array(file))
          : Buffer.from(file);
      body = Readable.from(buffer);
    } else {
      // For Buffer or other stream-like objects
      body = Readable.from(file);
    }

    const response = await drive.files.create({
      requestBody: fileMetadata,
      media: {
        mimeType,
        body,
      },
      fields: "id",
    });

    console.log("File upload response is:::::::::::::", response);
    return response.data.id || null;
  } catch (error) {
    console.error("Error uploading file:", error);
    return null;
  }
}

/**
 * Get the public URL for a file in Google Drive
 * @param fileId The ID of the file
 * @returns The public URL of the file, or null if operation failed
 */
export async function getFilePublicUrl(fileId: string): Promise<string | null> {
  try {
    const drive = await getGoogleDriveClient();

    // Make the file publicly accessible
    await drive.permissions.create({
      fileId: fileId,
      requestBody: {
        role: "reader",
        type: "anyone",
      },
    });

    // Get the web view link
    const response = await drive.files.get({
      fileId: fileId,
      fields: "webViewLink",
    });

    return response.data.webViewLink || null;
  } catch (error) {
    console.error("Error getting file public URL:", error);
    return null;
  }
}
