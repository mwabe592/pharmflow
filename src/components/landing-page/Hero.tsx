import Link from "next/link";
import { Button } from "../ui/button";

export default function Hero() {
  return (
    <section className="w-full py-8 sm:py-12 md:py-20 lg:py-28">
      <div className="container mx-auto flex flex-col items-center justify-center gap-4 text-center px-4 md:px-6">
        <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl max-w-[1200px]">
          Streamline Your <span className="text-brand">Accreditations</span>
        </h1>
        <p className="mx-auto max-w-[700px] text-base sm:text-lg text-muted-foreground md:text-xl">
          Simplify compliance management. Pharmflow helps pharmacists and
          pharmacy owners track, manage, and maintain their accreditations with
          ease.
        </p>
        <Button className="w-full bg-brand hover:bg-brand/90 text-white">
          <Link href="/login">Get Started</Link>
        </Button>
      </div>
    </section>
  );
}
