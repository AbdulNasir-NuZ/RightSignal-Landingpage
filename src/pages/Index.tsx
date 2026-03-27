import { HelmetProvider } from "react-helmet-async";
import SEOHead from "@/components/SEOHead";
import HeroSection from "@/components/HeroSection";
import LeaguesSection from "@/components/LeaguesSection";
import CatalogueSection from "@/components/CatalogueSection";
import FootballArea from "@/components/FootballArea";
import TransferNews from "@/components/TransferNews";
import FooterSection from "@/components/FooterSection";

const Index = () => {
  return (
    <HelmetProvider>
      <SEOHead />
      <main className="min-h-screen bg-background">
        <HeroSection />
        <LeaguesSection />
        <CatalogueSection />
        <FootballArea />
        <TransferNews />
        <FooterSection />
      </main>
    </HelmetProvider>
  );
};

export default Index;
