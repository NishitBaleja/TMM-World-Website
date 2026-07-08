import CompanyPageClient from "@/components/company-page/CompanyPageClient";

export const metadata = {
  title: "Brand Building Company & Leadership",
  description: "Meet Nitish Baleja (Founder) and learn about TMMWORLD, a top brand building and IT company in Jamnagar specializing in brand building, web development, and systems engineering.",
  alternates: {
    canonical: "https://tmm-world.com/company",
  },
  openGraph: {
    title: "Brand Building Company & Leadership | TMMWORLD Jamnagar",
    description: "Meet Nitish Baleja (Founder) and learn about TMMWORLD, a top brand building and IT company in Jamnagar specializing in brand building, web development, and systems engineering.",
    url: "https://tmm-world.com/company",
    type: "website",
  },
  twitter: {
    title: "Brand Building Company & Leadership | TMMWORLD Jamnagar",
    description: "Meet Nitish Baleja (Founder) and learn about TMMWORLD, a top brand building and IT company in Jamnagar specializing in brand building, web development, and systems engineering.",
  }
};

export default function CompanyPage() {
  return <CompanyPageClient />;
}
