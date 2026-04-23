import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { DemoGrid } from "./components/DemoGrid";
import { ComeFunziona } from "./components/ComeFunziona";
import { Pricing } from "./components/Pricing";
import { ReferralStrip } from "./components/ReferralStrip";
import { Faq } from "./components/Faq";
import { FinalCta, Footer } from "./components/Footer";

export default function HomePage() {
  return (
    <main>
      <Navbar />
      <Hero />
      <DemoGrid />
      <ComeFunziona />
      <Pricing />
      <ReferralStrip />
      <Faq />
      <FinalCta />
      <Footer />
    </main>
  );
}
