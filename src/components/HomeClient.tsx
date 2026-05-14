"use client";

import { useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
import { LoadingScreen } from "./LoadingScreen";
import { ScrollProgress } from "./ScrollProgress";
import { MouseGlow } from "./MouseGlow";
import { Header } from "./Header";
import { Hero } from "./Hero";
import { BrandsSection } from "./BrandsSection";
import { TopVideos } from "./TopVideos";
import { ClientWorks } from "./ClientWorks";
import { StatsDashboard } from "./StatsDashboard";
import { CommentsSection } from "./CommentsSection";
import { AboutSection } from "./AboutSection";
import { ContactSection } from "./ContactSection";

export default function HomeClient() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const t = window.setTimeout(() => setLoading(false), 2600);
    return () => window.clearTimeout(t);
  }, []);

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-[#030308] text-white">
      <ScrollProgress />
      <MouseGlow />
      <AnimatePresence>{loading && <LoadingScreen key="loader" />}</AnimatePresence>

      <Header />
      <main>
        <Hero />
        <BrandsSection />
        <TopVideos />
        <ClientWorks />
        <StatsDashboard />
        <CommentsSection />
        <AboutSection />
        <ContactSection />
      </main>
    </div>
  );
}
