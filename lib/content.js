// Centralized content file for TMMWORLD

export const siteContent = {
  global: {
    companyName: "TMMWORLD",
    tagline: "digital architecture & software craft",
    logoText: "TMMWORLD",
    contactEmail: "hello@tmmworld.com",
    socials: {
      whatsapp: "https://wa.me/919999999999",
      instagram: "https://instagram.com/tmmworld"
    },
    addresses: {
      newDelhi: {
        title: "new delhi",
        line1: "5th floor, dlf centre",
        line2: "sansad marg, new delhi, ind",
        timezone: 5.5,
        timezoneLabel: "ist, new delhi ind"
      },
      newYork: {
        title: "new york",
        line1: "120 broadway",
        line2: "suite 3600, new york, ny, usa",
        timezone: -4,
        timezoneLabel: "edt, new york usa"
      }
    }
  },
  home: {
    hero: {
      tagline: "architecting digital infinity",
      subTitle: "we design, engineer, and scale high-fidelity software architectures that feel like art and run with absolute precision."
    },
    philosophy: {
      tagline: "engineering",
      headlineLine1: "architecting",
      headlineLine2: "digital symmetry",
      headlineLine3: "with zen precision",
      description: "software is the invisible architecture of modern world. inspired by the Japanese spirit of Wa (harmony) and Ri (logic), we don't build generic software. we craft resilient systems and fluid interfaces that stand the test of scale, speed, and time."
    },
    services: [
      {
        num: "01",
        name: "systems architecture",
        lead: "resilient, high-concurrency cloud engineering.",
        description: "we design custom cloud environments, API meshes, and database architectures optimized for sub-millisecond response times and millions of concurrent requests. where raw performance meets invisible stability.",
        href: "/projects?filter=systems",
        img: "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?auto=format&fit=crop&q=80&w=1000",
        label: "infrastructure"
      },
      {
        num: "02",
        name: "interface craft",
        lead: "tactile interfaces that respond with grace.",
        description: "digital products should be experienced, not just used. we handcraft frontends combining micro-interactions, rich typography, and seamless animations to make software feel alive, responsive, and natural.",
        href: "/projects?filter=interfaces",
        img: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=1000",
        label: "experience"
      },
      {
        num: "03",
        name: "systems intelligence",
        lead: "custom AI pipelines and automated workflows.",
        description: "we integrate machine learning models, telemetry pipelines, and automation directly into your core operations. transforming complex real-time data streams into automated foresight and decision-making logic.",
        href: "/projects?filter=intelligence",
        img: "https://images.unsplash.com/photo-1509023467864-1ecbb3403f50?auto=format&fit=crop&q=80&w=1000",
        label: "automation"
      }
    ],
    company: {
      tagline: "company",
      heading: "who we are",
      paragraphs: [
        "tmmworld is a premium software engineering house operating at the intersection of rigorous systems logic and premium interactive design. we span hubs in new delhi and new york, collaborating with high-growth teams.",
        "we don't write bulk code or offer cookie-cutter solutions. we handcraft high-fidelity systems, designing custom technology stacks that elevate digital operations into resilient works of engineering art."
      ]
    }
  },
  company: {
    basicInfo: {
      title: "A Systems Collective",
      subtitle: "digital architecture & software craft",
      paragraph1: "TMMWORLD was founded on the belief that digital systems should be as resilient as concrete and as fluid as light. We build clean, modular backend architectures and tactile frontend experiences optimized for scale, performance, and longevity.",
      paragraph2: "From local pipelines to global cloud networks, we design custom technology stacks that elevate digital operations. Within this rhythm, we continue our work—engineering reliable software architectures for modern enterprises."
    },
    map: {
      locations: [
        { name: "NEW YORK", top: "35%", left: "25%" },
        { name: "DUBAI", top: "48%", left: "52%" },
        { name: "NEW DELHI", top: "50%", left: "63%" }
      ],
      bgImg: "/images/company/world-map.png"
    },
    founder: {
      name: "Manoj Sharma",
      role: "Founder / CEO",
      translation: "",
      quote: "“Complexity made simple, logic made beautiful.”",
      description: "With over two decades of engineering systems at scale, Manoj founded TMMWORLD on the principle that backend architecture should be as robust as steel, and user experiences as fluid as water. Previously leading infrastructure at global logistics firms, he now guides TMMWORLD's vision of software as an architectural craft.",
      img: "/images/company/founder.jpg"
    },
    outline: [
      {
        label: "Company Name",
        value: "TMMWORLD SERVICES PRIVATE LIMITED,\nTMMWORLD Inc."
      },
      {
        label: "Representative",
        value: "Manoj Sharma"
      },
      {
        label: "Location",
        locations: [
          {
            label: "New Delhi, India",
            details: "5th Floor, DLF Centre, Sansad Marg, New Delhi, India"
          },
          {
            label: "New York, USA",
            details: "120 Broadway, Suite 3600, New York, NY, USA"
          }
        ]
      },
      {
        label: "Business Activities",
        bullets: [
          "Systems Architecture (High-Concurrency Cloud & Microservices)",
          "Interface Craft (Tactile Frontends & Interactive Digital Design)",
          "Systems Intelligence (Telemetry Pipelines & AI Integration)"
        ]
      }
    ]
  },
  projects: [
    {
      id: "zephyr-cloud",
      num: "01",
      name: "zephyr cloud",
      category: "systems",
      lead: "scaling a global supply chain to 50k requests per second.",
      description: "a high-concurrency serverless architecture designed for real-time tracking, database replication, and sub-second inventory sync across 4 continents.",
      href: "/projects/zephyr-cloud",
      img: "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?auto=format&fit=crop&q=80&w=1000",
      label: "systems",
      client: "Zephyr Logistics",
      year: "2026",
      challenge: "the client needed to sync live GPS telemetry and inventory data across thousands of international distribution hubs with zero database locks or data loss.",
      solution: "we designed a decoupled microservices mesh on AWS utilizing ElastiCache, DynamoDB streams, and a custom Go-based routing layer to process incoming telemetry concurrently.",
      outcome: "reduced sync latency from 12 seconds to 80ms globally, maintaining 99.999% uptime during peak holiday distribution spikes."
    },
    {
      id: "satori-interface",
      num: "02",
      name: "satori interface",
      category: "interfaces",
      lead: "financial asset management re-imagined with absolute tactility.",
      description: "a minimal, high-performance web dashboard combining WebGL data visualizations, custom canvas charts, and real-time WebSockets tickers.",
      href: "/projects/satori-interface",
      img: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=1000",
      label: "interfaces",
      client: "Satori Capital",
      year: "2025",
      challenge: "institutional investors were overwhelmed by cluttered charts and laggy data feeds during high-volatility market events.",
      solution: "we created a bespoke WebGL-accelerated chart engine capable of rendering 100k data points at a solid 60fps, wrapped in a dark, high-fidelity dark interface.",
      outcome: "active user engagement increased by 65%, and trade execution lag was completely eliminated on the frontend."
    },
    {
      id: "aether-engine",
      num: "03",
      name: "aether engine",
      category: "intelligence",
      lead: "predictive scheduling via machine learning workflows.",
      description: "a custom neural pipeline that ingest power grid sensor data to predict and prevent hardware faults days before they happen.",
      href: "/projects/aether-engine",
      img: "https://images.unsplash.com/photo-1509023467864-1ecbb3403f50?auto=format&fit=crop&q=80&w=1000",
      label: "intelligence",
      client: "Aether Grid",
      year: "2025",
      challenge: "physical power grid transformers were failing unpredictably, causing multi-million dollar outages and maintenance delays.",
      solution: "we built an automated data pipeline using Apache Kafka and Python that feeds live transformer metrics into a customized anomaly detection transformer model.",
      outcome: "predicted fault anomalies with 94.2% accuracy, giving grid operators 72 hours of notice to safely route around equipment."
    },
    {
      id: "helios-commerce",
      num: "04",
      name: "helios commerce",
      category: "systems",
      lead: "headless storefront mesh for ultra-premium digital retail.",
      description: "a decoupled frontend architecture querying a high-availability graphql content layer, loading in under 0.4 seconds worldwide.",
      href: "/projects/helios-commerce",
      img: "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&q=80&w=1000",
      label: "systems",
      client: "Helios Atelier",
      year: "2026",
      challenge: "traditional monolithic e-commerce software was slow and inflexible, failing to represent the client's ultra-premium brand aesthetic.",
      solution: "we designed a static-first Next.js headless storefront integrated with Shopify Plus, structured on a highly customized edge network CDN.",
      outcome: "achieved a perfect 100/100 Lighthouse Performance score, increasing global conversion rates by 28%."
    }
  ]
};
