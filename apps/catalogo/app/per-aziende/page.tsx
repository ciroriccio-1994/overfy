import { Navbar } from "../components/Navbar";
import { AiBusiness } from "../components/AiBusiness";
import { FinalCta, Footer } from "../components/Footer";
import { PageBackLink } from "../components/PageBackLink";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Soluzioni AI per aziende | Overfy",
  description:
    "Strumenti AI su misura per immobiliare, commercialisti, studi legali e aziende strutturate. Automatizza ciò che ti fa perdere tempo.",
};

export default function PerAziendePage() {
  return (
    <main>
      <Navbar />
      <PageBackLink />
      <AiBusiness />
      <FinalCta />
      <Footer />
    </main>
  );
}
