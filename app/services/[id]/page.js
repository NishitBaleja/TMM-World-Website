import ServicePageClient from "@/components/services-page/ServicePageClient";
import { siteContent } from "@/lib/content";

export async function generateStaticParams() {
  return [
    { id: "brand-building" },
    { id: "web-development" },
    { id: "social-media-management" },
  ];
}

export async function generateMetadata({ params }) {
  const { id } = await params;
  const service = siteContent.serviceDetails[id];
  const title = service ? `${service.title} | TMMWORLD` : "Service Detail | TMMWORLD";
  const desc = service ? service.extendedDesc : "Premium IT and Web agency service in Jamnagar.";

  return {
    title: title,
    description: desc,
    alternates: {
      canonical: `https://tmmworld.com/services/${id}`,
    },
    openGraph: {
      title: `${title} | TMMWORLD Jamnagar`,
      description: desc,
      url: `https://tmmworld.com/services/${id}`,
      type: "website",
    },
    twitter: {
      title: `${title} | TMMWORLD Jamnagar`,
      description: desc,
    }
  };
}

export default async function ServiceDetailPage({ params }) {
  const { id } = await params;
  return <ServicePageClient serviceId={id} />;
}
