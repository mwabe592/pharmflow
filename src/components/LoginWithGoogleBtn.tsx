"use client";
import { loginWithGoogle } from "@/app/actions/loginWithGoogle";
import React from "react";
import { Button } from "./ui/button";
import Image from "next/image";

const LoginWithGoogleBtn = () => {
  return (
    <div>
      <Button
        onClick={loginWithGoogle}
        type="button"
        variant="outline"
        className="w-full cursor-pointer flex items-center space-x-3"
      >
        <Image src="/google.png" alt="Google logo" height={24} width={24} />
        <span>Login with Google</span>
      </Button>
    </div>
  );
};

export default LoginWithGoogleBtn;
