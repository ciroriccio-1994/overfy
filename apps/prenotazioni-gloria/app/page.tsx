import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { ServicesPreview } from "./components/ServicesPreview";
import { Team } from "./components/Team";
import { Contact } from "./components/Contact";
import { Footer } from "./components/Footer";

export default function HomePage() {
  return (
    <main>
      <Navbar />
      <Hero />
      <ServicesPreview />
      <Team />
      <Contact />
      <Footer />
    </main>
  );
}
