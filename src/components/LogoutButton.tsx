"use client";

import { signout } from "@/app/actions/login";
import { Button } from "./ui/button";

const LogoutButton = () => {
  const handleLogout = async () => {
    await signout();
  };

  return (
    <Button onClick={handleLogout} className="cursor-pointer">
      Logout
    </Button>
  );
};

export default LogoutButton;