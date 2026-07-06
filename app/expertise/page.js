import ExpertisePageClient from "@/components/expertise-page/ExpertisePageClient";

export const metadata = {
  title: "Brand Building & Web Development",
  description: "Explore TMMWORLD's premium disciplines: brand building, custom web development, and social media management in Jamnagar. We build digital prominence for businesses.",
  alternates: {
    canonical: "https://tmmworld.com/expertise",
  },
  openGraph: {
    title: "Brand Building & Web Development | TMMWORLD Jamnagar",
    description: "Explore TMMWORLD's premium disciplines: brand building, custom web development, and social media management in Jamnagar. We build digital prominence for businesses.",
    url: "https://tmmworld.com/expertise",
    type: "website",
  },
  twitter: {
    title: "Brand Building & Web Development | TMMWORLD Jamnagar",
    description: "Explore TMMWORLD's premium disciplines: brand building, custom web development, and social media management in Jamnagar. We build digital prominence for businesses.",
  }
};

export default function ExpertisePage() {
  return <ExpertisePageClient />;
}
