import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import StackMarquee from "@/components/StackMarquee";
import WhatIBuildSection from "@/components/WhatIBuildSection";
import SkillsSection from "@/components/SkillsSection";
import ProjectsSection from "@/components/ProjectsSection";
import GithubActivity from "@/components/GithubActivity";
import SynapexSection from "@/components/SynapexSection";
import JourneySection from "@/components/JourneySection";
import CurrentlyBuildingSection from "@/components/CurrentlyBuildingSection";
import BlogSection from "@/components/BlogSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

const Index = () => (
  <div className="min-h-screen bg-background">
    <Navbar />
    <HeroSection />
    <StackMarquee />
    <WhatIBuildSection />
    <SkillsSection />
    <ProjectsSection />
    <GithubActivity />
    <SynapexSection />
    <JourneySection />
    <CurrentlyBuildingSection />
    <BlogSection />
    <ContactSection />
    <Footer />
  </div>
);

export default Index;
