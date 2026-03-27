import { Helmet } from "react-helmet-async";

const SEOHead = () => {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Nexus Community",
    description:
      "A thriving community platform connecting students, startup founders, professionals, investors, and business owners through curated events.",
    url: "https://nexus-community.com",
    logo: "https://nexus-community.com/logo.png",
    sameAs: [
      "https://twitter.com/nexuscommunity",
      "https://linkedin.com/company/nexuscommunity",
      "https://instagram.com/nexuscommunity",
    ],
    event: {
      "@type": "Event",
      name: "Founders Summit 2025",
      startDate: "2025-06-15",
      location: {
        "@type": "Place",
        name: "Nexus Hub",
        address: "San Francisco, CA",
      },
      description:
        "An exclusive gathering of 200+ founders, investors, and mentors.",
    },
  };

  return (
    <Helmet>
      <title>Nexus Community — Where Ideas Connect | Events & Networking</title>
      <meta
        name="description"
        content="Join Nexus — the premier community for students, startup founders, professionals, investors, and business owners. Curated events, pitch nights, workshops & networking."
      />
      <meta
        name="keywords"
        content="community, networking, startup events, founders, investors, professionals, pitch night, workshops, business networking"
      />
      <link rel="canonical" href="https://nexus-community.com" />

      {/* Open Graph */}
      <meta property="og:type" content="website" />
      <meta
        property="og:title"
        content="Nexus Community — Where Ideas Connect"
      />
      <meta
        property="og:description"
        content="Join 12,000+ members connecting at curated events, workshops, and pitch nights."
      />
      <meta property="og:url" content="https://nexus-community.com" />
      <meta
        property="og:image"
        content="https://nexus-community.com/og-image.jpg"
      />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta
        name="twitter:title"
        content="Nexus Community — Where Ideas Connect"
      />
      <meta
        name="twitter:description"
        content="Join 12,000+ members connecting at curated events, workshops, and pitch nights."
      />

      {/* Viewport */}
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="theme-color" content="#141414" />

      {/* JSON-LD */}
      <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
    </Helmet>
  );
};

export default SEOHead;
