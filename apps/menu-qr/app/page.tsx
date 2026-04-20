import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { Signature } from "./components/Signature";
import { StoryTeaser } from "./components/StoryTeaser";
import { QRSection } from "./components/QRSection";
import { Contact } from "./components/Contact";
import { Footer } from "./components/Footer";

export default function HomePage() {
  return (
    <main>
      <Navbar />
      <Hero />
      <Signature />
      <StoryTeaser />
      <QRSection />
      <Contact />
      <Footer />
    </main>
  );
}
