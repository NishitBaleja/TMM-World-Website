import ProjectDetailPageClient from "@/components/projects-page/ProjectDetailPageClient";
import { siteContent } from "@/lib/content";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  return siteContent.projects.map((p) => ({
    id: p.id,
  }));
}

export async function generateMetadata({ params }) {
  const { id } = await params;
  const project = siteContent.projects.find((p) => p.id === id);
  if (!project) return {};

  const pageTitle = `${project.name} - Systems Case Study`;
  const pageDesc = `${project.lead} Learn how TMMWORLD engineered this solution to resolve complex technical challenges and optimize scalability.`;

  return {
    title: pageTitle,
    description: pageDesc,
    alternates: {
      canonical: `https://tmmworld.com/projects/${id}`,
    },
    openGraph: {
      title: `${pageTitle} | TMMWORLD`,
      description: pageDesc,
      url: `https://tmmworld.com/projects/${id}`,
      type: "article",
      publishedTime: project.year,
      authors: ["TMMWORLD"],
    },
    twitter: {
      title: `${pageTitle} | TMMWORLD`,
      description: pageDesc,
    }
  };
}

export default async function Page({ params }) {
  const { id } = await params;
  const projectExists = siteContent.projects.some((p) => p.id === id);
  if (!projectExists) {
    notFound();
  }

  return <ProjectDetailPageClient params={params} />;
}
