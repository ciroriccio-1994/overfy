import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";
import { BookingProvider } from "./components/BookingContext";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-cormorant",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Salone Gloria — Parrucchiere ed Estetica a Chiaia, Napoli",
  description:
    "Salone di bellezza a Chiaia. Taglio, colore, piega, manicure, trattamenti viso. Prenota online 24/7 il tuo appuntamento.",
  openGraph: {
    title: "Salone Gloria — Chiaia, Napoli",
    description:
      "Prenota online il tuo appuntamento. Parrucchiere ed estetica nel cuore di Chiaia.",
    type: "website",
    locale: "it_IT",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="it" className={`${cormorant.variable} ${inter.variable}`}>
      <body className="min-h-screen antialiased">
        <BookingProvider>{children}</BookingProvider>
      </body>
    </html>
  );
}
