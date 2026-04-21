import { Navbar } from "../components/Navbar";
import { Model } from "../components/Model";
import { FinalCta, Footer } from "../components/Footer";
import { PageBackLink } from "../components/PageBackLink";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Il nostro modello | Overfy",
  description:
    "Come funziona il modello Overfy: un abbonamento mensile, tutto incluso. Nessun costo di setup, nessuna sorpresa.",
};

export default function ModelloPage() {
  return (
    <main>
      <Navbar />
      <PageBackLink />
      <Model />
      <FinalCta />
      <Footer />
    </main>
  );
}
