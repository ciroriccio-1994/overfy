import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { DemoGrid } from "./components/DemoGrid";
import { ChatbotFeature } from "./components/ChatbotFeature";
import { Process } from "./components/Process";
import { Model } from "./components/Model";
import { FinalCta, Footer } from "./components/Footer";

export default function HomePage() {
  return (
    <main>
      <Navbar />
      <Hero />
      <DemoGrid />
      <ChatbotFeature />
      <Process />
      <Model />
      <FinalCta />
      <Footer />
    </main>
  );
}
