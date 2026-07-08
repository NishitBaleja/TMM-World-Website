import "./globals.css";
import SmoothScroll from "@/components/global/SmoothScroll";
import PageTransition from "@/components/global/PageTransition";
import { LanguageProvider } from "@/lib/LanguageContext";


export const metadata = {
  title: {
    default: "TMMWORLD",
    template: "%s | TMMWORLD Brand Building & Web Development"
  },
  description: "TMMWORLD is a brand building and web development agency in Jamnagar. We help businesses and people build brands, custom software architectures, and scalable digital systems.",
  metadataBase: new URL("https://tmm-world.com"),
  alternates: {
    canonical: "/"
  },
  icons: {
    icon: "/images/tmm-world-logo.webp",
    shortcut: "/images/tmm-world-logo.webp",
    apple: "/images/tmm-world-logo.webp",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    title: "TMMWORLD",
    description: "TMMWORLD is a brand building and web development agency in Jamnagar. We help businesses and people build brands, custom software architectures, and scalable digital systems.",
    url: "https://tmm-world.com",
    siteName: "TMMWORLD",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "TMMWORLD | Brand Building & Web Development Agency in Jamnagar",
    description: "TMMWORLD is a brand building and web development agency in Jamnagar. We help businesses and people build brands, custom software architectures, and scalable digital systems.",
  }
};

export const viewport = {
  themeColor: "#080808",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className="h-full antialiased"
      suppressHydrationWarning
    >
      <head>
        {/* Schema.org Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "TMMWORLD",
              "url": "https://tmm-world.com",
              "logo": "https://tmm-world.com/images/tmm-world-logo.webp",
              "description": "TMMWORLD is an elite brand building and software engineering collective crafting resilient cloud architectures, high-fidelity WebGL frontends, and custom machine learning pipelines.",
              "address": [
                {
                  "@type": "PostalAddress",
                  "addressLocality": "Jamnagar",
                  "addressRegion": "Gujarat",
                  "addressCountry": "IN",
                  "postalCode": "361006"
                }
              ],
              "founder": {
                "@type": "Person",
                "name": "Nitish Baleja"
              },
              "sameAs": [
                "https://instagram.com/itstmmworld"
              ]
            })
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": "TMMWORLD",
              "url": "https://tmm-world.com",
              "potentialAction": {
                "@type": "SearchAction",
                "target": "https://tmm-world.com/expertise?search={search_term_string}",
                "query-input": "required name=search_term_string"
              }
            })
          }}
        />
      </head>
      <body
        className="min-h-full flex flex-col bg-[#080808] text-[#e6e4e2] selection:bg-[#d4c3b3] selection:text-black"
        suppressHydrationWarning
      >

        <div className="grain-overlay" />
        <LanguageProvider>
          <SmoothScroll>
            <PageTransition>
              {children}
            </PageTransition>
          </SmoothScroll>
        </LanguageProvider>
      </body>
    </html>
  );
}
