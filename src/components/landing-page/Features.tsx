import { Clock, CheckCircle, FileCheck, Shield } from "lucide-react";
import FeatureCard from "./FeatureCard";
import {
  Card,
  CardFooter,
  CardHeader,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Features() {
  return (
    <section className="w-full py-0">
      <div className="container mx-auto max-w-[1200px] px-4 md:px-6 py-8 sm:py-12">
        <div className="grid gap-4 sm:gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mx-auto">
          <FeatureCard
            icon={Clock}
            title="Save Time"
            description="Reduce administrative burden with automated reminders and streamlined documentation processes."
          />
          <FeatureCard
            icon={CheckCircle}
            title="Stay Compliant"
            description="Never miss a deadline with our compliance calendar and real-time status tracking."
          />
          <FeatureCard
            icon={FileCheck}
            title="Centralized Records"
            description="Store all your accreditation documents in one secure, easily accessible location."
          />
          <FeatureCard
            icon={Shield}
            title="Risk Management"
            description="Identify potential compliance issues before they become problems with our risk assessment tools."
          />

          <Card className="flex flex-col justify-between h-full border-brand/20">
            <CardHeader className="pb-2">
              <h3 className="font-semibold">
                Ready to simplify your accreditation process?
              </h3>
            </CardHeader>
            <CardContent className="flex-1">
              <p className="text-sm text-muted-foreground">
                Join thousands of pharmacy professionals who have streamlined
                their compliance management.
              </p>
            </CardContent>
            <CardFooter>
              <Button
                asChild
                className="w-full bg-brand hover:bg-brand/90 text-white"
              >
                <Link href="/login">Get Started</Link>
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </section>
  );
}
