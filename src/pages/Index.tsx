import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import StackMarquee from "@/components/StackMarquee";
import WhatIBuildSection from "@/components/WhatIBuildSection";
import ProjectsSection from "@/components/ProjectsSection";
import SynapexSection from "@/components/SynapexSection";
import JourneySection from "@/components/JourneySection";
import CurrentlyBuildingSection from "@/components/CurrentlyBuildingSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

const Index = () => (
  <div className="min-h-screen bg-background">
    <Navbar />
    <HeroSection />
    <StackMarquee />
    <WhatIBuildSection />
    <ProjectsSection />
    <SynapexSection />
    <JourneySection />
    <CurrentlyBuildingSection />
    <ContactSection />
    <Footer />
  </div>
);

export default Index;
