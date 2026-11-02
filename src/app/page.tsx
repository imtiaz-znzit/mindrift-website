import { Hero } from "@/components/sections/hero";
import { CapabilityStrip } from "@/components/sections/capability-strip";
import { ImpactStats } from "@/components/sections/impact-stats";
import { AboutMindrift } from "@/components/sections/about-mindrift";
import { IntroPillars } from "@/components/sections/intro-pillars";
import { ServicesOverview } from "@/components/sections/services-overview";
import { FeaturedProjects } from "@/components/sections/featured-projects";
import { HowWeWork } from "@/components/sections/how-we-work";
import { TechStack } from "@/components/sections/tech-stack";
import { IndustriesGrid } from "@/components/sections/industries-grid";
import { ClientReviews } from "@/components/sections/client-reviews";
import { InsightsPreview } from "@/components/sections/insights-preview";
import { CtaBanner } from "@/components/sections/cta-banner";

export default function HomePage() {
  return (
    <div className="flex flex-col">
      <Hero />
      <ImpactStats />
      <CapabilityStrip />
      <AboutMindrift />
      <IntroPillars />
      <ServicesOverview />
      <FeaturedProjects />
      <HowWeWork />
      <TechStack />
      <IndustriesGrid />
      <ClientReviews />
      <InsightsPreview />
      <CtaBanner />
    </div>
  );
}
