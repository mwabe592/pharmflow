import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import {
  CheckCircle,
  Clock,
  FileCheck,
  Award,
  Shield,
  Menu,
} from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { DialogTitle } from "@radix-ui/react-dialog";
import Image from "next/image";
import logo from "../../public/logo.png";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Header with max width and centered content */}
      <header className="w-full border-b">
        <div className="container mx-auto flex h-16 items-center justify-between py-4 px-4 md:px-6">
          <div className="flex items-center gap-2">
            <Image src={logo} alt="logo" width={200} height={200} />
          </div>

          {/* Mobile menu */}
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right">
                {/* ✅ Accessibility fix (visually hidden but required) */}
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

          {/* Desktop menu */}
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

      <main className="flex-1">
        <section className="w-full py-8 sm:py-12 md:py-20 lg:py-28">
          <div className="container mx-auto flex flex-col items-center justify-center gap-4 text-center px-4 md:px-6">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl max-w-[1200px]">
              Streamline Your <span className="text-brand">Accreditations</span>
            </h1>
            <p className="mx-auto max-w-[700px] text-base sm:text-lg text-muted-foreground md:text-xl">
              Simplify compliance management. PharmCert helps pharmacists and
              pharmacy owners track, manage, and maintain their accreditations
              with ease.
            </p>

            <div className="w-full max-w-[1200px] py-8 sm:py-12">
              <div className="grid gap-4 sm:gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mx-auto">
                <Card className="h-full border-brand/20">
                  <CardHeader className="flex flex-row items-center gap-2 pb-2">
                    <Clock className="h-5 w-5 text-brand flex-shrink-0" />
                    <h3 className="font-semibold">Save Time</h3>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      Reduce administrative burden with automated reminders and
                      streamlined documentation processes.
                    </p>
                  </CardContent>
                </Card>

                <Card className="h-full border-brand/20">
                  <CardHeader className="flex flex-row items-center gap-2 pb-2">
                    <CheckCircle className="h-5 w-5 text-brand flex-shrink-0" />
                    <h3 className="font-semibold">Stay Compliant</h3>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      Never miss a deadline with our compliance calendar and
                      real-time status tracking.
                    </p>
                  </CardContent>
                </Card>

                <Card className="h-full border-brand/20">
                  <CardHeader className="flex flex-row items-center gap-2 pb-2">
                    <FileCheck className="h-5 w-5 text-brand flex-shrink-0" />
                    <h3 className="font-semibold">Centralized Records</h3>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      Store all your accreditation documents in one secure,
                      easily accessible location.
                    </p>
                  </CardContent>
                </Card>

                <Card className="h-full border-brand/20">
                  <CardHeader className="flex flex-row items-center gap-2 pb-2">
                    <Shield className="h-5 w-5 text-brand flex-shrink-0" />
                    <h3 className="font-semibold">Risk Management</h3>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      Identify potential compliance issues before they become
                      problems with our risk assessment tools.
                    </p>
                  </CardContent>
                </Card>

                <Card className="h-full border-brand/20">
                  <CardHeader className="flex flex-row items-center gap-2 pb-2">
                    <Award className="h-5 w-5 text-brand flex-shrink-0" />
                    <h3 className="font-semibold">Expert Guidance</h3>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      Access industry best practices and guidance from
                      accreditation specialists.
                    </p>
                  </CardContent>
                </Card>

                <Card className="flex flex-col justify-between h-full border-brand/20">
                  <CardHeader className="pb-2">
                    <h3 className="font-semibold">
                      Ready to simplify your accreditation process?
                    </h3>
                  </CardHeader>
                  <CardContent className="flex-1">
                    <p className="text-sm text-muted-foreground">
                      Join thousands of pharmacy professionals who have
                      streamlined their compliance management.
                    </p>
                  </CardContent>
                  <CardFooter>
                    <Button
                      className="w-full bg-brand hover:bg-brand/90 text-white"
                      size="lg"
                    >
                      Get Started
                    </Button>
                  </CardFooter>
                </Card>
              </div>

              <div className="mt-8 sm:mt-12 text-center">
                <p className="text-muted-foreground">
                  Want to learn more about how PharmCert can help your pharmacy?
                </p>
                <Button
                  variant="outline"
                  className="mt-4 text-brand border-brand/20 hover:bg-brand/10 hover:text-brand"
                >
                  Schedule a Demo
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
