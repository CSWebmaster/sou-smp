import HeroSection from "@/components/HeroSection";
import WhyJoinSection from "@/components/WhyJoinSection";
import FAQButtonSection from "@/components/FAQButtonSection";
import CountUpSection from "@/components/CountUpSection";
import FounderMessage from "@/components/FounderMessage";
import EventsSection from "@/components/EventsSection";
import PageLayout from "@/components/PageLayout";
import { useEffect } from "react";

export default function Index() {
  useEffect(() => {
    // Smooth scroll to element when hash is in URL
    const hash = window.location.hash;
    if (hash) {
      const element = document.querySelector(hash);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, []);

  return (
    <PageLayout showFooter>
      <HeroSection />
      <WhyJoinSection />
      <FAQButtonSection />
      <CountUpSection />
      <FounderMessage />
      <EventsSection />
    </PageLayout>
  );
}