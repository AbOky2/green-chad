import Hero from "@/components/Hero";
import About from "@/components/AboutSection";
import Activities from "@/components/ActivitiesSection";
import Partners from "@/components/PartnersSection";
import Contact from "@/components/ContactSection";

export default function Home() {
  return (
    <div className="flex flex-col">
      <Hero />
      <About />
      <Activities />
      <Partners />
      <Contact />
    </div>
  );
}
