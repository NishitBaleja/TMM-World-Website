import ProjectsPageClient from "@/components/projects-page/ProjectsPageClient";

export const metadata = {
  title: "Case Studies & Systems Portfolio",
  description: "Browse high-concurrency serverless cloud meshes, custom financial dashboards, and machine learning anomaly detection pipelines crafted by TMMWORLD.",
  alternates: {
    canonical: "https://tmmworld.com/projects",
  },
  openGraph: {
    title: "Case Studies & Systems Portfolio | TMMWORLD",
    description: "Browse high-concurrency serverless cloud meshes, custom financial dashboards, and machine learning anomaly detection pipelines crafted by TMMWORLD.",
    url: "https://tmmworld.com/projects",
    type: "website",
  },
  twitter: {
    title: "Case Studies & Systems Portfolio | TMMWORLD",
    description: "Browse high-concurrency serverless cloud meshes, custom financial dashboards, and machine learning anomaly detection pipelines crafted by TMMWORLD.",
  }
};

export default function ProjectsPage() {
  return <ProjectsPageClient />;
}
