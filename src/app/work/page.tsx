import type { Metadata } from "next";
import WorkPageClient from "./WorkPageClient";

export const metadata: Metadata = {
  title: "Works",
  description:
    "A selection of branding, web and product design projects by Marlay.",
  openGraph: {
    title: "Works — Marlay",
    description:
      "A selection of branding, web and product design projects by Marlay.",
    url: "https://marlay.fr/work",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Works — Marlay",
    description:
      "A selection of branding, web and product design projects by Marlay.",
  },
};

export default function WorkPage() {
  return <WorkPageClient />;
}
