import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { Chatbot } from "../components/Chatbot";
import { BookingFlow } from "./BookingFlow";

export const metadata = {
  title: "Prenota — Dott.ssa Chiara Russo",
  description:
    "Prenota online la prima chiamata conoscitiva gratuita di 20 minuti.",
};

export default function BookingPage() {
  return (
    <main>
      <Navbar />
      <BookingFlow />
      <Footer />
      <Chatbot />
    </main>
  );
}
