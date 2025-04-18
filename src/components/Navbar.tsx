import { createClient } from "@/app/utils/supabase/server";
import React from "react";
import LogoutButton from "./LogoutButton";
import { ThemeToggle } from "./ThemeToggle";

const Navbar = async () => {
  const supabase = await createClient();

  // Get the current user
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("no user found");
  }

  // Fetch the staff profile associated with the user
  const { data: staffProfile, error: staffError } = await supabase
    .from("staff")
    .select("*")
    .eq("profile_id", user?.id)
    .single();

  if (staffError) {
    console.error("Error fetching staff profile:", staffError.message);
    throw new Error("no staff member found");
  }

  return (
    <div className="flex items-center justify-between w-full py-4 px-10 mb-5">
      {/* Search Bar */}
      <span className=" text-3xl">
        Welcome <strong>{staffProfile?.first_name}</strong>
      </span>{" "}
      {/* User Info */}
      <div className="flex gap-6 justify-center items-center">
        <ThemeToggle />
        <LogoutButton />
      </div>
    </div>
  );
};

export default Navbar;
