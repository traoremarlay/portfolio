import type { Metadata } from "next";
import AboutPageClient from "./AboutPageClient";

export const metadata: Metadata = {
  title: "About",
  description:
    "Brand designer with 7+ years of experience crafting modern, creative brands that help businesses stand out.",
  openGraph: {
    title: "About — Marlay",
    description:
      "Brand designer with 7+ years of experience crafting modern, creative brands that help businesses stand out.",
    url: "https://marlay.fr/about",
    type: "profile",
  },
  twitter: {
    card: "summary_large_image",
    title: "About — Marlay",
    description:
      "Brand designer with 7+ years of experience crafting modern, creative brands that help businesses stand out.",
  },
};

export default function AboutPage() {
  return <AboutPageClient />;
}
