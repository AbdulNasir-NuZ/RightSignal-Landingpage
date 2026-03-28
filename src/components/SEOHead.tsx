import { Helmet } from "react-helmet-async";

const SEOHead = () => {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Right Signal",
    description:
      "Right Signal brings together founders, operators, investors, and students through curated events and a monochrome, mobile-first product experience.",
    url: "https://rightsignal.social",
    logo: "https://rightsignal.social/right-signal-logo.jpeg",
    sameAs: [
      "https://twitter.com/rightsignal",
      "https://linkedin.com/company/rightsignal",
      "https://instagram.com/rightsignal",
    ],
    event: {
      "@type": "Event",
      name: "Right Signal Founders Summit 2026",
      startDate: "2026-06-15",
      location: {
        "@type": "Place",
        name: "Right Signal Hub",
        address: "San Francisco, CA",
      },
      description:
        "An exclusive gathering of 200+ founders, investors, and mentors to amplify new signals.",
    },
  };

  const logoUrl = "https://rightsignal.social/right-signal-logo.jpeg";

  return (
    <Helmet>
      <title>Right Signal — Where Signals Align | Events & Apps</title>
      <meta
        name="description"
        content="Join Right Signal — the community for students, founders, operators, and investors. Curated events, clean mobile apps, workshops, and networking in a black-and-white aesthetic."
      />
      <meta name="author" content="Nasar ul zain Azran" />
      <meta
        name="keywords"
        content="Right Signal, community, networking, startup events, founders, investors, professionals, pitch night, workshops, mobile app, iOS, Android"
      />
      <link rel="canonical" href="https://rightsignal.social" />

      {/* Open Graph */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content="Right Signal — Where Signals Align" />
      <meta
        property="og:description"
        content="Join 12,000+ members connecting at curated events, workshops, pitch nights, and our monochrome mobile experience."
      />
      <meta property="og:url" content="https://rightsignal.social" />
      <meta property="og:image" content={logoUrl} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="Right Signal — Where Signals Align" />
      <meta
        name="twitter:description"
        content="Join 12,000+ members connecting at curated events, workshops, pitch nights, and our monochrome mobile experience."
      />
      <meta name="twitter:image" content={logoUrl} />

      {/* Viewport */}
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="theme-color" content="#0f0f0f" />

      {/* JSON-LD */}
      <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
    </Helmet>
  );
};

export default SEOHead;
