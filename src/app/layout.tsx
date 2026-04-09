import type { Metadata } from "next";
import { Geist } from "next/font/google";
import Navbar from "@/components/Navbar";
import PageTransition from "@/components/PageTransition";
import "./globals.css";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://marlay.fr"),
  title: {
    default: "Marlay — Brand & Web Designer",
    template: "%s — Marlay",
  },
  description:
    "I help brands translate strategy into clear, impactful digital experiences. Branding, Webdesign & Product Design.",
  keywords: [
    "brand designer",
    "web designer",
    "portfolio",
    "branding",
    "webdesign",
    "Marlay",
    "Studio ARCT",
  ],
  authors: [{ name: "Marlay" }],
  creator: "Marlay",
  openGraph: {
    title: "Marlay — Brand & Web Designer",
    description:
      "I help brands translate strategy into clear, impactful digital experiences.",
    url: "https://marlay.fr",
    siteName: "Marlay",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Marlay — Brand & Web Designer",
    description:
      "I help brands translate strategy into clear, impactful digital experiences.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={geist.variable}>
      <body className="bg-white overflow-x-hidden">
        <PageTransition>
          <Navbar />
          {children}
        </PageTransition>
      </body>
    </html>
  );
}
