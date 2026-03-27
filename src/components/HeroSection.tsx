"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";

export default function HeroSection() {
  const heroRef = useScrollReveal<HTMLElement>(0.05);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToNext = () => {
    document.getElementById("why-join-section")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 pb-24 w-full"
    >
      {/* Background Image with parallax */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:
            "url(https://ieee.socet.edu.in/wp-content/uploads/2021/01/cropped-SOU-IEEE-SB-Header.png)",
          transform: `scale(1.05) translateY(${scrollY * 0.25}px)`,
          transition: "transform 0.05s linear",
        }}
      />

      {/* Overlay — lighter to show background better */}
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-black/60 via-black/50 to-black/70" />

      {/* Animated grid lines overlay */}
      <div
        className="absolute inset-0 z-0 opacity-10"
        style={{
          backgroundImage:
            "linear-gradient(0deg, transparent 24%, rgba(255,255,255,0.05) 25%, rgba(255,255,255,0.05) 26%, transparent 27%, transparent 74%, rgba(255,255,255,0.05) 75%, rgba(255,255,255,0.05) 76%, transparent 77%), linear-gradient(90deg, transparent 24%, rgba(255,255,255,0.05) 25%, rgba(255,255,255,0.05) 26%, transparent 27%, transparent 74%, rgba(255,255,255,0.05) 75%, rgba(255,255,255,0.05) 76%, transparent 77%)",
          backgroundSize: "55px 55px",
        }}
      />

      {/* Content */}
      <div className="container relative z-10 px-6 sm:px-8 lg:px-12 mx-auto text-center">
        {/* Each word clips up independently for a dramatic entrance */}
        <div
          className="mb-8 flex flex-col items-center justify-center"
          style={{ transform: `translateY(${scrollY * -0.15}px)` }}
        >
          <span className="block text-white text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight drop-shadow-[0_4px_20px_rgba(0,0,0,1)] text-center">
            <span className="reveal fade-up inline-block">Welcome&nbsp;to</span>
          </span>
          <span className="block text-white text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight drop-shadow-[0_4px_20px_rgba(0,0,0,1)] mt-2 text-center">
            <span className="reveal fade-up delay-2 inline-block">Silver&nbsp;Oak&nbsp;University</span>
          </span>
          <span className="block text-white text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight drop-shadow-[0_4px_20px_rgba(0,0,0,1)] mt-2 text-center">
            <span className="reveal fade-up delay-3 inline-block">IEEE&nbsp;Student&nbsp;Branch</span>
          </span>
        </div>

        {/* Subtitle */}
        <p className="reveal fade-up delay-4 text-white text-lg md:text-xl lg:text-2xl max-w-4xl mx-auto mb-16 opacity-95 drop-shadow-[0_2px_12px_rgba(0,0,0,1)] font-light leading-relaxed text-center">
          Empowering innovation, fostering collaboration, and shaping the future of technology
        </p>
      </div>

      {/* Scroll Down Indicator */}
      <div className="absolute bottom-10 left-0 right-0 flex justify-center animate-bounce">
        <Button variant="ghost" size="icon" onClick={scrollToNext} className="rounded-full text-white hover:bg-white/10 transition-all">
          <ChevronDown className="h-7 w-7" />
        </Button>
      </div>
    </section>
  );
}
