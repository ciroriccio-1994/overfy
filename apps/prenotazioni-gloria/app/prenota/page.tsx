import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { BookingFlow } from "./BookingFlow";

export const metadata = {
  title: "Prenota — Salone Gloria",
  description:
    "Prenota online il tuo appuntamento al Salone Gloria. Scegli servizio, operatore, data e orario in meno di un minuto.",
};

export default function BookingPage() {
  return (
    <main>
      <Navbar />
      <BookingFlow />
      <Footer />
    </main>
  );
}
