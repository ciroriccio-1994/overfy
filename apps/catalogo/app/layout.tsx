import type { Metadata } from "next";
import { Instrument_Serif, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
  variable: "--font-instrument",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Catalogo Soluzioni — Portiamo il tuo business nel digitale",
  description:
    "Siti web, e-commerce, prenotazioni online e chatbot AI per professionisti e attività. Zero setup, abbonamento mensile tutto incluso.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="it"
      className={`${instrumentSerif.variable} ${inter.variable} ${jetbrains.variable}`}
    >
      <body className="min-h-screen antialiased">{children}</body>
    </html>
  );
}
