type Sponsor = {
  name: string;
  logo: string;
  href: string;
};

const sponsors: Sponsor[] = [
  { name: "AUSP", logo: "/partners/AfricanUnionStudentsPlatformLogo.jpeg", href: "https://ausp.africa" },
  { name: "Pan African Youth Conference", logo: "/partners/InternationalPanAfricanYouthConferenceLogo.jpeg", href: "https://ausp.africa" },
  {
    name: "Open Source Collective",
    logo: "/partners/open-source-collective.png",
    href: "https://www.opensourcecollective.org/",
  },
  {
    name: "GitHub Community",
    logo: "/partners/github-community.png",
    href: "https://github.com/community",
  },
  { name: "GrowthLab", logo: "/partners/growthlab.png", href: "https://example.com/growthlab" },
  { name: "SignalPath", logo: "/partners/signalpath.png", href: "https://example.com/signalpath" },
  { name: "Nexus One", logo: "/partners/nexus-one.png", href: "https://example.com/nexus-one" },
  { name: "PulseWorks", logo: "/partners/pulseworks.png", href: "https://example.com/pulseworks" },
];

const SponsorsSection = () => {
  return (
    <section className="bg-white px-6 md:px-12 py-16 md:py-20" aria-label="Sponsors and partnerships">
      <div className="mx-auto w-full max-w-6xl">
        <p className="text-center font-display text-lg md:text-2xl font-bold tracking-[0.08em] text-black/70 uppercase">
          Trusted by Partners & Sponsors
        </p>

        <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 md:gap-6 lg:grid-cols-4">
          {sponsors.map((sponsor) => {
            const content = (
              <div className="group flex h-44 md:h-52 flex-col items-center justify-center rounded-xl border border-black/10 bg-white px-4 transition-all duration-300 ease-in-out hover:border-black/20 hover:shadow-[0_12px_28px_-20px_rgba(0,0,0,0.45)] focus-within:border-black/20">
                <img
                  src={sponsor.logo}
                  alt={`${sponsor.name} logo`}
                  loading="lazy"
                  className="h-20 md:h-24 w-full object-contain grayscale opacity-70 transition-all duration-300 ease-in-out group-hover:scale-[1.04] group-hover:grayscale-0 group-hover:opacity-100 group-focus-within:scale-[1.04] group-focus-within:grayscale-0 group-focus-within:opacity-100"
                />
                <p className="mt-3 text-center font-display text-xs tracking-[0.16em] text-black/70 uppercase">
                  {sponsor.name}
                </p>
              </div>
            );

            return (
              <a
                key={sponsor.name}
                href={sponsor.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Visit ${sponsor.name}`}
                className="block rounded-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-black/30"
              >
                {content}
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default SponsorsSection;
