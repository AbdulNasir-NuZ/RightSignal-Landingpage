import { HelmetProvider } from "react-helmet-async";
import SEOHead from "@/components/SEOHead";
import { useEffect } from "react";
import HeroSection from "@/components/HeroSection";
import LeaguesSection from "@/components/LeaguesSection";
import CatalogueSection from "@/components/CatalogueSection";
import Community from "@/components/Community";
import TransferNews from "@/components/TransferNews";
import DownloadCTA from "@/components/DownloadCTA";
import FooterSection from "@/components/FooterSection";

const Index = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, []);

  return (
    <HelmetProvider>
      <SEOHead />
      <main className="min-h-screen bg-background overflow-x-hidden">
        <HeroSection />
        <LeaguesSection />
        <CatalogueSection />
        <Community />
        <TransferNews />
        <DownloadCTA />
        <FooterSection />
      </main>
    </HelmetProvider>
  );
};

export default Index;
