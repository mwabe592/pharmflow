import { Button } from "@/components/ui/button";

export default function CTA() {
  return (
    <section className="w-full text-center">
      <div className="container mx-auto max-w-[700px] px-4 md:px-6 mt-8 sm:mt-12">
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
    </section>
  );
}