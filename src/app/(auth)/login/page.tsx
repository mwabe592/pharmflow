import { LoginForm } from "@/components/LoginForm";
import Image from "next/image";
import logo from "../../../../public/logo.png";

export default function LoginPage() {
  return (
    <div className="flex flex-col min-h-svh w-full items-center justify-center">
      <div className="mb-2">
        <Image src={logo} alt="logo" width={400} height={400} />
      </div>

      <div className="w-full max-w-sm">
        <LoginForm />
      </div>
    </div>
  );
}
