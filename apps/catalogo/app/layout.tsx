import type { Metadata } from "next";
import { Instrument_Serif, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const instrumentSerif = Instrument_Serif({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-display",
  style: ["normal", "italic"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

const jetBrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: "Overfy — Il tuo business, un livello sopra",
  description:
    "Digitalizzazione su misura per attività italiane. Siti web, e-commerce, prenotazioni, chatbot AI, app native. Zero costi di setup, tutto incluso nell'abbonamento.",
  keywords: [
    "Overfy",
    "digitalizzazione",
    "siti web",
    "e-commerce",
    "chatbot AI",
    "prenotazioni online",
    "app native",
    "web app",
    "Italia",
    "Napoli",
  ],
  authors: [{ name: "Overfy" }],
  creator: "Overfy",
  openGraph: {
    type: "website",
    locale: "it_IT",
    title: "Overfy — Il tuo business, un livello sopra",
    description:
      "Digitalizzazione su misura per attività italiane. Zero costi di setup, tutto incluso nell'abbonamento.",
    siteName: "Overfy",
  },
  twitter: {
    card: "summary_large_image",
    title: "Overfy — Il tuo business, un livello sopra",
    description:
      "Digitalizzazione su misura per attività italiane. Zero costi di setup, tutto incluso.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="it">
      <body
        className={`${instrumentSerif.variable} ${inter.variable} ${jetBrainsMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
