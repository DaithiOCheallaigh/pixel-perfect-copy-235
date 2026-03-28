import { useEffect } from "react";
import ServicesNavigation from "@/components/ServicesNavigation";
import ServicesFooter from "@/components/ServicesFooter";
import { OnboardingChatPage } from "@/components/OnboardingChat";

const GetStarted = () => {
  useEffect(() => {
    document.title = "Get Started — Lacuna Digital";
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute("content", "Tell us about your business and get a personalised recommendation in minutes.");
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <ServicesNavigation visible={true} />
      <OnboardingChatPage />
      <ServicesFooter />
    </div>
  );
};

export default GetStarted;
