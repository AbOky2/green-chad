import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "ONG Green-Chad - Pour un développement durable",
  description: "Mission : Outiller les citoyens tchadiens pour leur permettre de relever efficacement le défi du développement durable.",
  icons: {
    icon: "/logo.jpg",
    apple: "/logo.jpg",
  },
  openGraph: {
    title: "ONG Green-Chad - Pour un développement durable",
    description: "Mission : Outiller les citoyens tchadiens pour leur permettre de relever efficacement le défi du développement durable.",
    images: ["/logo.jpg"],
  },
  twitter: {
    card: "summary",
    title: "ONG Green-Chad - Pour un développement durable",
    description: "Mission : Outiller les citoyens tchadiens pour leur permettre de relever efficacement le défi du développement durable.",
    images: ["/logo.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className="scroll-smooth">
      <body>
        <Header />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
