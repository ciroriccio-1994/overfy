import type { Metadata } from "next";
import { Libre_Caslon_Display, Inter } from "next/font/google";
import "./globals.css";
import { BookingProvider } from "./components/BookingContext";

const caslon = Libre_Caslon_Display({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-caslon",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Studio Dentistico Rinascita — Posillipo, Napoli",
  description:
    "Studio dentistico a Posillipo. Implantologia digitale, ortodonzia invisibile, estetica dentale. Prima visita gratuita.",
  openGraph: {
    title: "Studio Dentistico Rinascita",
    description: "Implantologia digitale e estetica dentale. Posillipo, Napoli.",
    type: "website",
    locale: "it_IT",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="it" className={`${caslon.variable} ${inter.variable}`}>
      <body className="min-h-screen antialiased">
        <BookingProvider>{children}</BookingProvider>
      </body>
    </html>
  );
}
