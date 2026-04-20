import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { About } from "./components/About";
import { Areas } from "./components/Areas";
import { Method } from "./components/Method";
import { FirstCall } from "./components/FirstCall";
import { Contact } from "./components/Contact";
import { Footer } from "./components/Footer";
import { Chatbot } from "./components/Chatbot";

export default function HomePage() {
  return (
    <main>
      <Navbar />
      <Hero />
      <About />
      <Areas />
      <Method />
      <FirstCall />
      <Contact />
      <Footer />
      <Chatbot />
    </main>
  );
}
