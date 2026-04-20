import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { AboutPreview } from "./components/AboutPreview";
import { Bestsellers } from "./components/Bestsellers";
import { StorySnippet } from "./components/StorySnippet";
import { HowItWorks } from "./components/HowItWorks";
import { Reviews } from "./components/Reviews";
import { FinalCta } from "./components/FinalCta";
import { Footer } from "./components/Footer";
import { CartDrawer } from "./components/CartDrawer";

export default function HomePage() {
  return (
    <main>
      <Navbar />
      <Hero />
      <AboutPreview />
      <Bestsellers />
      <HowItWorks />
      <StorySnippet />
      <Reviews />
      <FinalCta />
      <Footer />
      <CartDrawer />
    </main>
  );
}
