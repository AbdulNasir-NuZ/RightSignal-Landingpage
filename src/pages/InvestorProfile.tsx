import { Helmet, HelmetProvider } from "react-helmet-async";
import { Link, useParams } from "react-router-dom";
import investorImg from "@/assets/investor-portrait.jpg";
import mentorImg from "@/assets/mentor.jpg";
import speakerImg from "@/assets/speaker-keynote.jpg";
import founderImg from "@/assets/founder-portrait.jpg";

type InvestorProfile = {
  name: string;
  slug: string;
  title: string;
  bio: string;
  photo: string;
  stats: {
    investments: number;
    exits: number;
    successRate: number;
  };
};

const investorProfiles: InvestorProfile[] = [
  {
    name: "Sarah Chen",
    slug: "sarah-chen",
    title: "Angel investor · Consumer + B2B SaaS",
    bio: "Backed 48 teams across fintech and collaboration tooling with 12 exits. Obsessed with capital-efficient go-to-market.",
    photo: investorImg,
    stats: { investments: 48, exits: 12, successRate: 78 },
  },
  {
    name: "Jonah Reed",
    slug: "jonah-reed",
    title: "Climate tech investor",
    bio: "Invests in carbon analytics and grid orchestration. Active mentor for energy founders spinning out of labs.",
    photo: mentorImg,
    stats: { investments: 36, exits: 9, successRate: 74 },
  },
  {
    name: "Priya Menon",
    slug: "priya-menon",
    title: "Enterprise AI investor",
    bio: "Former product lead in ML platforms. Now writes first checks into AI infrastructure and ops tooling.",
    photo: speakerImg,
    stats: { investments: 29, exits: 7, successRate: 81 },
  },
  {
    name: "Leila Kim",
    slug: "leila-kim",
    title: "Consumer fintech investor",
    bio: "Focus on underserved markets and embedded finance. Builds operator playbooks with portfolio founders.",
    photo: investorImg,
    stats: { investments: 41, exits: 10, successRate: 76 },
  },
  {
    name: "Daniel Ortiz",
    slug: "daniel-ortiz",
    title: "Deeptech investor",
    bio: "Ex-HW engineer turned investor in compute, robotics, and autonomy. Helps technical teams find first revenue.",
    photo: mentorImg,
    stats: { investments: 33, exits: 6, successRate: 72 },
  },
  {
    name: "Arjun Patel",
    slug: "arjun-patel",
    title: "Serial entrepreneur · YC alum",
    bio: "Built 3 startups from zero to exit. Now mentoring founders on go-to-market, fundraising, and team craft.",
    photo: founderImg,
    stats: { investments: 0, exits: 3, successRate: 0 },
  },
];

const InvestorProfilePage = () => {
  const { slug } = useParams<{ slug: string }>();
  const profile = investorProfiles.find((p) => p.slug === slug);

  if (!profile) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-background text-foreground px-6">
        <div className="text-center space-y-3">
          <h1 className="font-display text-3xl font-bold">Profile not found</h1>
          <p className="text-muted-foreground text-sm">This investor profile is unavailable.</p>
          <Link
            to="/"
            className="inline-flex font-display text-xs tracking-widest px-4 py-3 border border-foreground rounded-lg hover:bg-foreground hover:text-background transition-colors"
          >
            BACK HOME
          </Link>
        </div>
      </main>
    );
  }

  return (
    <HelmetProvider>
      <Helmet>
        <title>{profile.name} · Right Signal Investor</title>
        <meta name="description" content={profile.bio} />
        <link rel="canonical" href={`https://rightsignal.social/investors/${profile.slug}`} />
      </Helmet>
      <main className="min-h-screen bg-background text-foreground">
        <section className="px-6 md:px-12 py-16 grid md:grid-cols-2 gap-10 items-center">
          <div className="relative overflow-hidden rounded-2xl border border-border">
            <img
              src={profile.photo}
              alt={profile.name}
              className="w-full h-full object-cover media"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute bottom-4 left-4 text-white space-y-1">
              <p className="font-display text-xs tracking-widest bg-white/15 px-2 py-1 rounded">
                INVESTOR
              </p>
              <h1 className="font-display text-3xl font-bold">{profile.name}</h1>
              <p className="text-sm text-white/80">{profile.title}</p>
            </div>
          </div>

          <div className="space-y-6">
            <div className="space-y-2">
              <h2 className="font-display text-xl font-bold">Profile</h2>
              <p className="text-sm text-muted-foreground font-body">{profile.bio}</p>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="bg-card border border-border rounded-xl p-4 text-center">
                <p className="font-display text-3xl font-black">{profile.stats.investments}</p>
                <p className="text-xs text-muted-foreground tracking-widest">INVESTMENTS</p>
              </div>
              <div className="bg-card border border-border rounded-xl p-4 text-center">
                <p className="font-display text-3xl font-black">{profile.stats.exits}</p>
                <p className="text-xs text-muted-foreground tracking-widest">EXITS</p>
              </div>
              <div className="bg-card border border-border rounded-xl p-4 text-center">
                <p className="font-display text-3xl font-black">{profile.stats.successRate}%</p>
                <p className="text-xs text-muted-foreground tracking-widest">SUCCESS RATE</p>
              </div>
            </div>

            <div className="flex gap-3 flex-wrap">
              <Link
                to="/"
                className="font-display text-xs tracking-widest px-4 py-3 border border-foreground rounded-lg hover:bg-foreground hover:text-background transition-colors"
              >
                BACK HOME
              </Link>
              <Link
                to="/join"
                className="font-display text-xs tracking-widest px-4 py-3 bg-foreground text-background rounded-lg hover:bg-foreground/90 transition-colors"
              >
                REQUEST INTRO
              </Link>
            </div>
          </div>
        </section>
      </main>
    </HelmetProvider>
  );
};

export default InvestorProfilePage;
