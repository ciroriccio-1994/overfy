import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { Treatments } from "./components/Treatments";
import { Team } from "./components/Team";
import { Technologies } from "./components/Technologies";
import { Testimonials } from "./components/Testimonials";
import { Contact } from "./components/Contact";
import { Footer } from "./components/Footer";
import { Chatbot } from "./components/Chatbot";

export default function HomePage() {
  return (
    <main>
      <Navbar />
      <Hero />
      <Treatments />
      <Team />
      <Technologies />
      <Testimonials />
      <Contact />
      <Footer />
      <Chatbot />
    </main>
  );
}
