import dynamic from "next/dynamic";
import Hero from "@/components/Hero";

const About = dynamic(() => import("@/components/AboutSection"), { loading: () => null });
const Activities = dynamic(() => import("@/components/ActivitiesSection"), { loading: () => null });
const TeamSection = dynamic(() => import("@/components/TeamSection"), { loading: () => null });
const Partners = dynamic(() => import("@/components/PartnersSection"), { loading: () => null });
const Contact = dynamic(() => import("@/components/ContactSection"), { loading: () => null });

export default function Home() {
  return (
    <div className="flex flex-col">
      <Hero />
      <About />
      <Activities />
      <TeamSection />
      <Partners />
      <Contact />
    </div>
  );
}
