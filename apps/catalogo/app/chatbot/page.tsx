import { Navbar } from "../components/Navbar";
import { ChatbotFeature } from "../components/ChatbotFeature";
import { FinalCta, Footer } from "../components/Footer";
import { PageBackLink } from "../components/PageBackLink";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Il chatbot AI | Overfy",
  description:
    "Un assistente AI che lavora 24/7 per te. Addestrato sul tuo business, risponde a orari, prezzi, prenotazioni. Powered by Claude.",
};

export default function ChatbotPage() {
  return (
    <main>
      <Navbar />
      <PageBackLink />
      <ChatbotFeature />
      <FinalCta />
      <Footer />
    </main>
  );
}
