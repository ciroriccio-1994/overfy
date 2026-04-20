import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";
import { CartProvider } from "./components/CartContext";

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
  title: "Pasticceria De Martino — Sfogliatelle e Babà spediti in tutta Italia",
  description:
    "Dolci napoletani artigianali dal 1952. Sfogliatelle, babà, pastiere spedite in tutta Italia in 24h con imballaggio refrigerato.",
  openGraph: {
    title: "Pasticceria De Martino — Dal 1952 a Materdei",
    description:
      "Tre generazioni di pasticceria napoletana. Spedizione refrigerata in tutta Italia.",
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
        <CartProvider>{children}</CartProvider>
      </body>
    </html>
  );
}
