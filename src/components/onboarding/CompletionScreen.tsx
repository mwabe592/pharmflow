"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { CheckCircle } from "lucide-react";
import { motion } from "framer-motion";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import type { UserData, UserType } from "./OnboardingFlow";
interface CompletionScreenProps {
  userType: UserType;
  userData: UserData;
}

export function CompletionScreen({
  userType,
  userData,
}: CompletionScreenProps) {
  const router = useRouter();
  const [progress, setProgress] = useState(0);
  const [isRedirecting, setIsRedirecting] = useState(false);

  const title =
    userType === "admin"
      ? "Pharmacy Setup Complete!"
      : "Profile Setup Complete!";

  const description =
    userType === "admin"
      ? `Your pharmacy ${userData.pharmacyName} has been successfully registered. You can now start managing accreditations.`
      : "Your profile has been successfully created. You can now start tracking your accreditations.";

  useEffect(() => {
    // Animate progress bar
    const timer = setTimeout(() => {
      setProgress(100);
    }, 500);

    // Redirect to dashboard after delay
    const redirectTimer = setTimeout(() => {
      setIsRedirecting(true);
      router.push("/dashboard");
    }, 5000);

    return () => {
      clearTimeout(timer);
      clearTimeout(redirectTimer);
    };
  }, [router]);

  return (
    <Card className="w-full relative overflow-hidden">
      <div className="absolute inset-x-0 top-0 h-1 bg-[#5e8e4b]"></div>
      <CardHeader className="text-center pb-2">
        <div className="flex justify-center mb-4">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{
              type: "spring",
              stiffness: 260,
              damping: 20,
              delay: 0.1,
            }}
          >
            <div className="rounded-full bg-[#5e8e4b]/10 p-6">
              <CheckCircle className="h-16 w-16 text-[#5e8e4b]" />
            </div>
          </motion.div>
        </div>
        <CardTitle className="text-2xl">{title}</CardTitle>
        <CardDescription className="text-base mt-2">
          {description}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="space-y-4"
        >
          <div className="bg-muted/50 rounded-lg p-6">
            <h3 className="font-medium mb-2">Welcome, {userData.firstName}!</h3>
            <p className="text-muted-foreground">
              {userType === "admin"
                ? "Your pharmacy dashboard is being prepared. You'll be able to manage your team's accreditations, track compliance, and receive notifications about upcoming renewals."
                : "Your personal dashboard is being prepared. You'll be able to track your accreditations, receive reminders about upcoming renewals, and maintain your professional credentials in one place."}
            </p>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Redirecting to your dashboard...</span>
              <span>
                {isRedirecting ? "Redirecting..." : "Preparing dashboard"}
              </span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        </motion.div>
      </CardContent>
    </Card>
  );
}
