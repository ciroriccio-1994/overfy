import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { About } from "./components/About";
import { Programs } from "./components/Programs";
import { Testimonials } from "./components/Testimonials";
import { Faq } from "./components/Faq";
import { Contact } from "./components/Contact";
import { Footer } from "./components/Footer";
import { WhatsappButton } from "./components/WhatsappButton";

export default function HomePage() {
  return (
    <main>
      <Navbar />
      <Hero />
      <About />
      <Programs />
      <Testimonials />
      <Faq />
      <Contact />
      <Footer />
      <WhatsappButton />
    </main>
  );
}
