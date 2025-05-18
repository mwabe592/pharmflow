import { google } from "googleapis";
import { cookies } from "next/headers";
import oauth2Client from "./googleOAuthClient";

export async function getGoogleDriveClient() {
  const cookieStore = await cookies();

  const accessToken = cookieStore.get("google_access_token")?.value;
  const refreshToken = cookieStore.get("google_refresh_token")?.value;

  if (!accessToken) {
    throw new Error("No Google access token available");
  }

  oauth2Client.setCredentials({
    access_token: accessToken,
    refresh_token: refreshToken,
  });

  const drive = google.drive({ version: "v3", auth: oauth2Client });

  return drive;
}
