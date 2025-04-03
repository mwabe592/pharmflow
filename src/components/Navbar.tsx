import { createClient } from "@/app/utils/supabase/server";
import { Button } from "./ui/button";
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
    console.error("User not found!");
    return null; // or return some fallback UI if no user is found
  }

  // Fetch the staff profile associated with the user
  const { data: staffProfile, error: staffError } = await supabase
    .from("staff")
    .select("*")
    .eq("profile_id", user.id)
    .single();

  if (staffError) {
    console.error("Error fetching staff profile:", staffError.message);
    return null; // or return fallback UI if the staff profile can't be fetched
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
