import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { DemoGrid } from "./components/DemoGrid";
import { ChatbotFeature } from "./components/ChatbotFeature";
import { Process } from "./components/Process";
import { FinalCta, Footer } from "./components/Footer";

export default function HomePage() {
  return (
    <main>
      <Navbar />
      <Hero />
      <DemoGrid />
      <ChatbotFeature />
      <Process />
      <FinalCta />
      <Footer />
    </main>
  );
}
