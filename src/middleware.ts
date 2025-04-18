import { type NextRequest, NextResponse } from "next/server";
import { updateSession } from "@/app/utils/supabase/middleware";
import { createClient } from "@/app/utils/supabase/server";

export async function middleware(request: NextRequest) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    const { data } = await supabase
      .from("profiles")
      .select("profile_completed")
      .eq("id", user?.id)
      .single();

    if (data && !data.profile_completed) {
      return NextResponse.redirect(new URL("/onboarding", request.url));
    }

    return await updateSession(request);
  } else {
    // If not logged in, send to login
    NextResponse.redirect(new URL("/login", request.url));
  }
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/((?!_next/static|_next/image|favicon.ico|login|onboarding).*)",
  ],
};
