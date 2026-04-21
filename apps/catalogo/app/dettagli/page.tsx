import { Navbar } from "../components/Navbar";
import { FairUse } from "../components/FairUse";
import { FinalCta, Footer } from "../components/Footer";
import { PageBackLink } from "../components/PageBackLink";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dettagli e regole | Overfy",
  description:
    "Tutto nero su bianco: traffico, chatbot AI, modifiche, SLA, proprietà dei dati. Nessuna clausola nascosta.",
};

export default function DettagliPage() {
  return (
    <main>
      <Navbar />
      <PageBackLink />
      <FairUse />
      <FinalCta />
      <Footer />
    </main>
  );
}
