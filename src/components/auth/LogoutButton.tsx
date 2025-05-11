"use client";

import { signout } from "@/app/utils/auth/signout";
import { Button } from "../ui/button";

const LogoutButton = () => {
  const handleLogout = async () => {
    await signout();
  };

  return (
    <Button onClick={handleLogout} className="cursor-pointer bg-brand">
      Logout
    </Button>
  );
};

export default LogoutButton;
