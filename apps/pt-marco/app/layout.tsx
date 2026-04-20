import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Marco Esposito — Personal Trainer Napoli Vomero",
  description:
    "Trasforma il tuo corpo in 12 settimane. Personal trainer certificato a Napoli. Allenamenti su misura, nutrizione integrata, risultati misurabili.",
  openGraph: {
    title: "Marco Esposito — Personal Trainer Napoli",
    description: "Risultati reali, metodo sostenibile. Consulenza gratuita.",
    type: "website",
    locale: "it_IT",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="it">
      <body className="min-h-screen antialiased">{children}</body>
    </html>
  );
}
