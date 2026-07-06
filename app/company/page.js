import CompanyPageClient from "@/components/company-page/CompanyPageClient";

export const metadata = {
  title: "IT Company & Leadership",
  description: "Meet Nitish Baleja (Founder) and learn about TMMWORLD, a top IT company in Jamnagar specializing in premium web development, brand building, and systems engineering.",
  alternates: {
    canonical: "https://tmmworld.com/company",
  },
  openGraph: {
    title: "IT Company & Leadership | TMMWORLD Jamnagar",
    description: "Meet Nitish Baleja (Founder) and learn about TMMWORLD, a top IT company in Jamnagar specializing in premium web development, brand building, and systems engineering.",
    url: "https://tmmworld.com/company",
    type: "website",
  },
  twitter: {
    title: "IT Company & Leadership | TMMWORLD Jamnagar",
    description: "Meet Nitish Baleja (Founder) and learn about TMMWORLD, a top IT company in Jamnagar specializing in premium web development, brand building, and systems engineering.",
  }
};

export default function CompanyPage() {
  return <CompanyPageClient />;
}
