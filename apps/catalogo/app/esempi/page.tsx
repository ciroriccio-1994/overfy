import { Navbar } from "../components/Navbar";
import { DemoGrid } from "../components/DemoGrid";
import { FinalCta, Footer } from "../components/Footer";
import { PageBackLink } from "../components/PageBackLink";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tutti gli esempi | Overfy",
  description:
    "Tutti i nostri esempi reali: PT, pasticceria, pizzeria, salone, studio dentistico, studio medico. Apri e esplora.",
};

export default function EsempiPage() {
  return (
    <main>
      <Navbar />
      <PageBackLink />
      <DemoGrid showAll />
      <FinalCta />
      <Footer />
    </main>
  );
}
