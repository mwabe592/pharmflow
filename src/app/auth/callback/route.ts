import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { createClient } from "@/app/utils/supabase/server";

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  // if "next" is in param, use it as the redirect URL
  const next = searchParams.get("next") ?? "/dashboard";
  const cookieStore = await cookies();

  if (code) {
    const supabase = await createClient();
    const { data, error } = await supabase.auth.exchangeCodeForSession(code);

    const googleAccessToken = data.session?.provider_token;
    const googleRefreshToken = data.session?.provider_refresh_token;

    if (!error && googleAccessToken) {
      const forwardedHost = request.headers.get("x-forwarded-host"); // original origin before load balancer
      const isLocalEnv = process.env.NODE_ENV === "development";
      const response = isLocalEnv
        ? NextResponse.redirect(`${origin}${next}`)
        : NextResponse.redirect(`https://${forwardedHost}${next}`);

      // Set secure HTTP-only cookies
      cookieStore.set({
        name: "google_access_token",
        value: googleAccessToken,
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        // Set expiry to 1 hour from now
        maxAge: 3600,
      });

      if (!error && googleRefreshToken) {
        cookieStore.set({
          name: "google_refresh_token",
          value: googleRefreshToken,
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "lax",
          path: "/",
          // Refresh token has a longer lifetime
          maxAge: 30 * 24 * 60 * 60, // 30 days
        });
      }

      return response;
    }
  }

  // return the user to an error page with instructions
  return NextResponse.redirect(`${origin}/auth/auth-code-error`);
}
