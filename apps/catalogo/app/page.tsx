import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { DemoGrid } from "./components/DemoGrid";
import { AiBusiness } from "./components/AiBusiness";
import { ChatbotFeature } from "./components/ChatbotFeature";
import { Process } from "./components/Process";
import { Model } from "./components/Model";
import { Pricing } from "./components/Pricing";
import { FinalCta, Footer } from "./components/Footer";

export default function HomePage() {
  return (
    <main>
      <Navbar />
      <Hero />
      <DemoGrid />
      <AiBusiness />
      <ChatbotFeature />
      <Process />
      <Model />
      <Pricing />
      <FinalCta />
      <Footer />
    </main>
  );
}
