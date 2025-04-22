import Header from "@/components/landing-page/Header";
import Hero from "@/components/landing-page/Hero";
import Features from "@/components/landing-page/Features";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <Hero />
        <Features />
      </main>
    </div>
  );
}
