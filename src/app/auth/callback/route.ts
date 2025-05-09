import { NextResponse } from "next/server";
import { createClient } from "@/app/utils/supabase/server";

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  // Use either the 'next' param or default to '/dashboard'
  const next = searchParams.get("next") ?? "/dashboard";

  if (!code) {
    return NextResponse.redirect(`${origin}/auth/auth-code-error`);
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.exchangeCodeForSession(code);

  if (error) {
    return NextResponse.redirect(`${origin}/auth/auth-code-error`);
  }

  // Check user onboarding status
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.redirect(`${origin}/auth/auth-code-error`);
  }

  const { data: onboardingData, error: profileError } = await supabase
    .from("users")
    .select("onboarded")
    .eq("id", user.id)
    .single();

  if (profileError) {
    console.error("Failed to fetch onboarding status:", profileError);
    return NextResponse.redirect(`${origin}/auth/auth-code-error`);
  }

  // Determine final redirect URL based on onboarding status
  const finalRedirect = onboardingData?.onboarded ? next : "/onboarding"; // If not onboarded, always go to onboarding

  // Handle environment-specific redirect
  const forwardedHost = request.headers.get("x-forwarded-host");
  const isLocalEnv = process.env.NODE_ENV === "development";

  if (isLocalEnv) {
    return NextResponse.redirect(`${origin}${finalRedirect}`);
  } else if (forwardedHost) {
    return NextResponse.redirect(`https://${forwardedHost}${finalRedirect}`);
  } else {
    return NextResponse.redirect(`${origin}${finalRedirect}`);
  }
}
