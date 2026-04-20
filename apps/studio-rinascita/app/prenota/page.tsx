import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { Chatbot } from "../components/Chatbot";
import { BookingFlow } from "./BookingFlow";

export const metadata = {
  title: "Prenota — Studio Dentistico Rinascita",
  description:
    "Prenota online la prima visita gratuita presso lo Studio Rinascita a Posillipo.",
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
