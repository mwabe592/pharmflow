import { NextResponse } from "next/server";
import { createClient } from "@/app/utils/supabase/server";

// Define the GET API handler
export async function GET(request: Request) {
  const supabase = await createClient();

  // Fetch the current user using Supabase auth
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  // If no user or authentication error, redirect to login page
  if (authError || !user) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Query data from Supabase
  if (user) {
    const { data, error: queryError } = await supabase
      .from("staff_accreditations")
      .select("*");

    // Handle if no data is found
    if (!data) {
      return NextResponse.json(
        { message: "No staff accreditations found" },
        { status: 404 }
      );
    }

    // Handle query errors
    if (queryError) {
      return NextResponse.json({ error: queryError }, { status: 500 });
    }

    // Return the data
    return NextResponse.json(data, { status: 200 });
  }
}
