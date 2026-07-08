import ExpertisePageClient from "@/components/expertise-page/ExpertisePageClient";

export const metadata = {
  title: "Brand Building & Web Development",
  description: "Explore TMMWORLD's brand building, custom web development, and social media management services in Jamnagar. We build brand prominence for businesses and people.",
  alternates: {
    canonical: "https://tmm-world.com/expertise",
  },
  openGraph: {
    title: "Brand Building & Web Development | TMMWORLD Jamnagar",
    description: "Explore TMMWORLD's brand building, custom web development, and social media management services in Jamnagar. We build brand prominence for businesses and people.",
    url: "https://tmm-world.com/expertise",
    type: "website",
  },
  twitter: {
    title: "Brand Building & Web Development | TMMWORLD Jamnagar",
    description: "Explore TMMWORLD's brand building, custom web development, and social media management services in Jamnagar. We build brand prominence for businesses and people.",
  }
};

export default function ExpertisePage() {
  return <ExpertisePageClient />;
}
