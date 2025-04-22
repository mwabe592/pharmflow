import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { DialogTitle } from "@radix-ui/react-dialog";
import { Menu } from "lucide-react";
import logo from "../../../public/logo.png";

export default function Header() {
  return (
    <header className="w-full border-b">
      <div className="container mx-auto flex h-16 items-center justify-between py-4 px-4 md:px-6">
        <div className="flex items-center gap-2">
          <Image src={logo} alt="logo" width={200} height={200} />
        </div>

        {/* Mobile Menu */}
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <DialogTitle className="sr-only">Mobile Navigation</DialogTitle>
              <div className="flex flex-col gap-4 pt-10">
                <Button variant="ghost" asChild className="justify-start">
                  <Link href="/login">Sign In</Link>
                </Button>
                <Button
                  asChild
                  className="justify-start bg-brand hover:bg-brand/90 text-white"
                >
                  <Link href="/signup">Sign Up</Link>
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-4">
          <Button variant="outline" asChild>
            <Link href="/login">Sign In</Link>
          </Button>
          <Button asChild className="bg-brand hover:bg-brand/90 text-white">
            <Link href="/signup">Sign Up</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
