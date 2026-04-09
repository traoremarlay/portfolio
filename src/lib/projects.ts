export type GalleryRow =
  | { type: "two-columns"; images: [string, string] }
  | { type: "full-width"; src: string; media: "image" | "video" };

export interface Project {
  id: number;
  title: string;
  slug: string;
  description: string;
  /** Image used in /work grid cards and Recent Work sections */
  coverImage: string;
  /** Image used in the hero of /work/[slug] pages */
  heroImage: string;
  /** Media used in the 3D carousel on the home page */
  carousel?: {
    type: "image" | "video";
    src: string;
  };
  projectDescription: string;
  client: string;
  date: string;
  service: string;
  gallery: GalleryRow[];
}

/* Back-compat alias (existing imports) */
export type GalleryItem = GalleryRow;

/* Build a standard 3-row gallery for a given slug.
   Row 1: 2/3  |  Row 2: large (image or video)  |  Row 3: 4/5
   `arct` is an exception — it uses 5/6 in the last row (no 4.png exists). */
function buildGallery(
  slug: string,
  opts: { largeMedia?: "image" | "video"; lastRow?: [string, string] } = {}
): GalleryRow[] {
  const media = opts.largeMedia ?? "image";
  const largeExt = media === "video" ? "mp4" : "png";
  const last = opts.lastRow ?? ["4.png", "5.png"];

  return [
    {
      type: "two-columns",
      images: [`/projects/${slug}/2.png`, `/projects/${slug}/3.png`],
    },
    {
      type: "full-width",
      src: `/projects/${slug}/large.${largeExt}`,
      media,
    },
    {
      type: "two-columns",
      images: [`/projects/${slug}/${last[0]}`, `/projects/${slug}/${last[1]}`],
    },
  ];
}

export const projects: Project[] = [
  {
    id: 1,
    title: "MARLAY",
    slug: "marlay",
    description:
      "Redesigned and modernized my own personal brand identity and portfolio website — refining every detail to reflect a sharper creative direction.",
    coverImage: "/images/projects/Projects_-_M.png",
    heroImage: "/projects/marlay/1.png",
    carousel: { type: "video", src: "/images/carousel/Carrousel_-_M.mp4" },
    gallery: buildGallery("marlay", { largeMedia: "video" }),
    projectDescription:
      "Redesigned and modernized my own personal brand identity and portfolio website — refining every detail to reflect a sharper creative direction.",
    client: "Marlay",
    date: "2026",
    service: "Branding, Webdesign",
  },
  {
    id: 2,
    title: "GARDEN",
    slug: "garden",
    description:
      "Designed the branding, website and product interface for Garden — a personal space where ideas find their roots, a calm place to collect, revisit, and nurture what inspires you.",
    coverImage: "/images/projects/Projects_-_Garden.png",
    heroImage: "/projects/garden/1.png",
    carousel: { type: "image", src: "/images/carousel/Projects_-_Garden.png" },
    gallery: buildGallery("garden"),
    projectDescription:
      "Designed the branding, website and product interface for Garden — a personal space where ideas find their roots, a calm place to collect, revisit, and nurture what inspires you.",
    client: "Garden",
    date: "2025",
    service: "Branding, Web & Product Design",
  },
  {
    id: 3,
    title: "STUDIO ARCT",
    slug: "arct",
    description:
      "Crafted the full brand identity and website for Studio ARCT — my own design studio dedicated to building refined digital experiences for ambitious brands.",
    coverImage: "/images/projects/Projects_-_ARCT.png",
    heroImage: "/projects/arct/1.png",
    carousel: { type: "image", src: "/images/carousel/Projects_-_ARCT.png" },
    // arct has no 4.png — use 5.png + 6.png for the last row
    gallery: buildGallery("arct", { lastRow: ["5.png", "6.png"] }),
    projectDescription:
      "Crafted the full brand identity and website for Studio ARCT — my own design studio dedicated to building refined digital experiences for ambitious brands.",
    client: "Studio ARCT",
    date: "2025",
    service: "Branding, Webdesign",
  },
  {
    id: 4,
    title: "KORA",
    slug: "kora",
    description:
      "Built the brand identity for Kora — a modern risk and governance intelligence platform helping growing companies operate with confidence.",
    coverImage: "/images/projects/Projects_-_Kora.png",
    heroImage: "/projects/kora/1.png",
    carousel: { type: "image", src: "/images/carousel/Projects_-_Kora.png" },
    gallery: buildGallery("kora"),
    projectDescription:
      "Built the brand identity for Kora — a modern risk and governance intelligence platform helping growing companies operate with confidence.",
    client: "Kora",
    date: "2026",
    service: "Branding",
  },
  {
    id: 5,
    title: "STUDIO 17",
    slug: "studio-17",
    description:
      "Crafted the brand identity for Studio 17 — an audiovisual studio that blends narrative, design and technology, balancing minimalism with bold cinematic expression.",
    coverImage: "/images/projects/Projects_-_Studio_17.png",
    heroImage: "/projects/studio-17/1.png",
    carousel: {
      type: "video",
      src: "/images/carousel/Carrousel_-_Studio_17.mp4",
    },
    gallery: buildGallery("studio-17"),
    projectDescription:
      "Crafted the brand identity for Studio 17 — an audiovisual studio that blends narrative, design and technology, balancing minimalism with bold cinematic expression.",
    client: "Studio 17",
    date: "2025",
    service: "Branding",
  },
  {
    id: 6,
    title: "SHIP STUDIO",
    slug: "ship-studio",
    description:
      "Redesigned the website for Ship Studio to elevate perceived value and modernity — a studio that designs and develops mobile apps where functionality, design and UX converge.",
    coverImage: "/images/projects/Projects_-_Ship_Studio.png",
    heroImage: "/projects/ship-studio/1.png",
    carousel: {
      type: "video",
      src: "/images/carousel/Carroussel_-_Ship_Studio.mp4",
    },
    gallery: buildGallery("ship-studio"),
    projectDescription:
      "Redesigned the website for Ship Studio to elevate perceived value and modernity — a studio that designs and develops mobile apps where functionality, design and UX converge.",
    client: "Ship Studio",
    date: "2025",
    service: "Webdesign",
  },
  {
    id: 7,
    title: "CIRRO",
    slug: "cirro",
    description:
      "Created the brand identity for Cirro — the quiet infrastructure behind modern apps. Deploy, scale and manage applications without the complexity of traditional cloud systems.",
    coverImage: "/images/projects/Projects_-_Cirro.png",
    heroImage: "/projects/cirro/1.png",
    gallery: buildGallery("cirro"),
    projectDescription:
      "Created the brand identity for Cirro — the quiet infrastructure behind modern apps. Deploy, scale and manage applications without the complexity of traditional cloud systems.",
    client: "Cirro",
    date: "2026",
    service: "Branding",
  },
  {
    id: 8,
    title: "VOLUMAKER",
    slug: "volumaker",
    description:
      "Designed the branding and website for Volumaker — a Web3 platform that deploys intelligent agents to reach trading KPIs requested by exchanges.",
    coverImage: "/images/projects/Projects_-_Volumaker.png",
    heroImage: "/projects/volumaker/1.png",
    gallery: buildGallery("volumaker"),
    projectDescription:
      "Designed the branding and website for Volumaker — a Web3 platform that deploys intelligent agents to reach trading KPIs requested by exchanges.",
    client: "Volumaker",
    date: "2024",
    service: "Branding, Webdesign",
  },
  {
    id: 9,
    title: "PARA BELLUM",
    slug: "para-bellum",
    description:
      "Built the brand identity for Para Bellum — a 360° creative agency that pushes beyond traditional brand and content boundaries.",
    coverImage: "/images/projects/Projects_-_Para_Bellum.png",
    heroImage: "/projects/para-bellum/1.png",
    gallery: buildGallery("para-bellum"),
    projectDescription:
      "Built the brand identity for Para Bellum — a 360° creative agency that pushes beyond traditional brand and content boundaries.",
    client: "Para Bellum",
    date: "2021",
    service: "Branding",
  },
];
