import CompanyPageClient from "@/components/company-page/CompanyPageClient";

export const metadata = {
  title: "Company & Founder - Nitish Baleja",
  description: "TMMWORLD is a premium software engineering consultancy operating from New Delhi and New York. Learn about our philosophy, outline, and leadership.",
  alternates: {
    canonical: "https://tmmworld.com/company",
  },
  openGraph: {
    title: "Company & Founder - Nitish Baleja | TMMWORLD",
    description: "TMMWORLD is a premium software engineering consultancy operating from New Delhi and New York. Learn about our philosophy, outline, and leadership.",
    url: "https://tmmworld.com/company",
    type: "website",
  },
  twitter: {
    title: "Company & Founder - Nitish Baleja | TMMWORLD",
    description: "TMMWORLD is a premium software engineering consultancy operating from New Delhi and New York. Learn about our philosophy, outline, and leadership.",
  }
};

export default function CompanyPage() {
  return <CompanyPageClient />;
}
