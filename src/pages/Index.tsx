import HeroSection from "@/components/HeroSection";
import LeaguesSection from "@/components/LeaguesSection";
import CatalogueSection from "@/components/CatalogueSection";
import FootballArea from "@/components/FootballArea";
import TransferNews from "@/components/TransferNews";
import FooterSection from "@/components/FooterSection";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <HeroSection />
      <LeaguesSection />
      <CatalogueSection />
      <FootballArea />
      <TransferNews />
      <FooterSection />
    </div>
  );
};

export default Index;
