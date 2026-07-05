import "./globals.css";
import SmoothScroll from "@/components/global/SmoothScroll";
import PageTransition from "@/components/global/PageTransition";


export const metadata = {
  title: {
    default: "TMMWORLD | Premium Software Engineering & Digital Architecture",
    template: "%s | TMMWORLD"
  },
  description: "TMMWORLD is an elite software engineering collective crafting resilient cloud architectures, high-fidelity WebGL frontends, and custom machine learning pipelines.",
  metadataBase: new URL("https://tmmworld.com"),
  alternates: {
    canonical: "/"
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
    title: "TMMWORLD | Premium Software Engineering & Digital Architecture",
    description: "TMMWORLD is an elite software engineering collective crafting resilient cloud architectures, high-fidelity WebGL frontends, and custom machine learning pipelines.",
    url: "https://tmmworld.com",
    siteName: "TMMWORLD",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "TMMWORLD | Premium Software Engineering & Digital Architecture",
    description: "TMMWORLD is an elite software engineering collective crafting resilient cloud architectures, high-fidelity WebGL frontends, and custom machine learning pipelines.",
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
              "url": "https://tmmworld.com",
              "logo": "https://tmmworld.com/favicon.ico",
              "description": "TMMWORLD is an elite software engineering collective crafting resilient cloud architectures, high-fidelity WebGL frontends, and custom machine learning pipelines.",
              "address": [
                {
                  "@type": "PostalAddress",
                  "addressLocality": "New Delhi",
                  "addressCountry": "IN"
                },
                {
                  "@type": "PostalAddress",
                  "addressLocality": "New York",
                  "addressRegion": "NY",
                  "addressCountry": "US"
                }
              ],
              "founder": {
                "@type": "Person",
                "name": "Nitish Baleja"
              },
              "sameAs": [
                "https://instagram.com/tmmworld"
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
              "url": "https://tmmworld.com",
              "potentialAction": {
                "@type": "SearchAction",
                "target": "https://tmmworld.com/projects?search={search_term_string}",
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
        <SmoothScroll>
          <PageTransition>
            {children}
          </PageTransition>
        </SmoothScroll>
      </body>
    </html>
  );
}
