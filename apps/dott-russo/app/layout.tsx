import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import "./globals.css";
import { BookingProvider } from "./components/BookingContext";

const fraunces = Fraunces({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-fraunces",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Dott.ssa Chiara Russo — Psicoterapeuta, Napoli",
  description:
    "Psicoterapeuta cognitivo-comportamentale a Chiaia. Ansia, attacchi di panico, relazioni, autostima. Prima chiamata conoscitiva gratuita.",
  openGraph: {
    title: "Dott.ssa Chiara Russo — Psicoterapeuta",
    description:
      "Uno spazio sicuro per ritrovarsi. Terapia cognitivo-comportamentale, in presenza a Napoli o online.",
    type: "website",
    locale: "it_IT",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="it" className={`${fraunces.variable} ${inter.variable}`}>
      <body className="min-h-screen antialiased">
        <BookingProvider>{children}</BookingProvider>
      </body>
    </html>
  );
}
