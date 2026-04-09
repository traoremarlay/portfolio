import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { projects } from "@/lib/projects";
import ProjectPageClient from "./ProjectPageClient";

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) return {};

  const url = `https://marlay.fr/work/${project.slug}`;

  return {
    title: project.title,
    description: project.projectDescription,
    openGraph: {
      title: `${project.title} — Marlay`,
      description: project.projectDescription,
      url,
      type: "article",
      images: [{ url: project.coverImage }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${project.title} — Marlay`,
      description: project.projectDescription,
      images: [project.coverImage],
    },
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) notFound();

  return <ProjectPageClient project={project} />;
}
