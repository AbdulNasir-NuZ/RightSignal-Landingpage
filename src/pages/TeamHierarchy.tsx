import { useMemo, useState } from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { ChevronDown, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import founderImg from "@/assets/founder-portrait.jpg";
import mentorImg from "@/assets/mentor.jpg";
import investorImg from "@/assets/investor-portrait.jpg";

type RoleNode = {
  title: string;
  subtitle?: string;
  badges?: string[];
  children?: RoleNode[];
};

const continents = ["Asia", "Africa", "Europe", "North America", "Australia"] as const;

const buildHierarchy = (): RoleNode[] => {
  const continentNodes: RoleNode[] = continents.map((continent) => ({
    title: `${continent} Signal Head`,
    subtitle: "Regional lead (~9k–11k members)",
    badges: ["~9 countries", "Balanced load"],
    children: [
      {
        title: "Country Signal Directors",
        subtitle: "≈9 per continent (~45 total)",
        badges: ["Each leads 4–6 states/provinces"],
        children: [
          {
            title: "State / Province Heads",
            subtitle: "4–6 per country",
            badges: ["Each handles 4 cities/campuses"],
            children: [
              {
                title: "Community Managers",
                subtitle: "≈4 per state",
                badges: ["Each owns ~3 pods"],
                children: [
                  {
                    title: "Local Pods",
                    subtitle: "3 per manager",
                    badges: ["15–20 members per pod"],
                    children: [
                      {
                        title: "Members",
                        subtitle: "Builders 40% · Operators 25% · Students 25% · New Joinees 10%",
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  }));

  return [
    {
      title: "Global Signal",
      subtitle: "Board & Core Ops",
      badges: ["Exec Board", "Governance", "Funding"],
      children: [
        {
          title: "Core Team",
          subtitle: "Product · Community · Safety",
          badges: ["Platform", "Programs", "Trust & Safety"],
          children: [
            {
              title: "Continent Heads",
              subtitle: "5 regions",
              badges: ["Asia", "Africa", "Europe", "North America", "Australia"],
              children: continentNodes,
            },
          ],
        },
      ],
    },
  ];
};

const hierarchy: RoleNode[] = buildHierarchy();

const Node = ({ node, depth = 0 }: { node: RoleNode; depth?: number }) => {
  const [open, setOpen] = useState(depth < 2); // open top levels
  const hasChildren = !!node.children?.length;
  const showLine = depth > 0;

  return (
    <div className="relative pl-5">
      {showLine && <div className="absolute left-2 top-0 bottom-0 border-l border-border/70" aria-hidden />}

      <div className="flex items-start gap-3 py-3">
        <button
          className={`mt-1 w-7 h-7 rounded-md flex items-center justify-center border transition-colors ${
            hasChildren
              ? open
                ? "bg-foreground text-background border-foreground"
                : "bg-secondary/70 text-foreground border-border"
              : "bg-secondary/40 text-muted-foreground border-border"
          }`}
          onClick={() => hasChildren && setOpen((o) => !o)}
          aria-label={hasChildren ? (open ? "Collapse node" : "Expand node") : "Leaf node"}
        >
          {hasChildren ? (
            open ? <ChevronDown className="w-3 h-3" /> : <ChevronRight className="w-3 h-3" />
          ) : (
            <ChevronRight className="w-3 h-3" />
          )}
        </button>

        <div className="flex-1">
          <p className="font-display text-sm tracking-widest uppercase">{node.title}</p>
          {node.subtitle && <p className="text-xs text-muted-foreground">{node.subtitle}</p>}
          {node.badges && (
            <div className="flex flex-wrap gap-2 mt-2">
              {node.badges.map((b) => (
                <span
                  key={b}
                  className="text-[11px] px-2 py-1 rounded-md bg-secondary/70 border border-border text-foreground/90"
                >
                  {b}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      {hasChildren && open && (
        <div className="pl-6">
          {node.children!.map((child) => (
            <Node key={child.title} node={child} depth={depth + 1} />
          ))}
        </div>
      )}
    </div>
  );
};

const TeamHierarchy = () => {
  const totals = useMemo(
    () => [
      { label: "TOTAL MEMBERS", value: "50,000+" },
      { label: "CONTINENT HEADS", value: "5" },
      { label: "COUNTRY DIRECTORS", value: "≈45" },
      { label: "STATE / PROVINCE HEADS", value: "≈225" },
      { label: "COMMUNITY MANAGERS", value: "≈3,600" },
      { label: "LOCAL PODS", value: "≈10,800" },
    ],
    [],
  );

  return (
    <HelmetProvider>
      <Helmet>
        <title>Team Hierarchy · Right Signal</title>
        <meta
          name="description"
          content="Scalable Signal org: Global Signal → Continent Heads → Country Directors → State Heads → Managers → Pods → Members."
        />
      </Helmet>
      <main className="min-h-screen bg-background text-foreground">
        <section className="px-6 md:px-12 py-12 space-y-10">
          <div className="space-y-3">
            <p className="font-display text-xs tracking-widest text-muted-foreground">
              COMMUNITY GRAPH
            </p>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
              <h1 className="font-display text-4xl md:text-5xl font-black">
                Team Hierarchy
              </h1>
              <Link
                to="/team-hierarchy/nda"
                className="inline-flex w-fit items-center justify-center rounded-lg border border-foreground/25 bg-background px-5 py-2.5 font-display text-[11px] tracking-[0.18em] uppercase text-foreground transition-colors duration-300 hover:bg-foreground hover:text-background hover:border-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/30 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              >
                Sign NDA
              </Link>
            </div>
            <p className="text-sm md:text-base text-muted-foreground max-w-2xl">
              Global Signal to pods, designed to balance load for 50,000 members across continents, countries, states,
              cities, and local pods.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            {totals.map((stat) => (
              <div key={stat.label} className="bg-card border border-border rounded-xl p-3 text-center">
                <p className="font-display text-[11px] tracking-widest text-muted-foreground">{stat.label}</p>
                <p className="font-display text-xl font-black">{stat.value}</p>
              </div>
            ))}
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="md:col-span-2 space-y-4">
              {hierarchy.map((node) => (
                <div key={node.title} className="bg-card border border-border rounded-2xl p-4 shadow-sm">
                  <Node node={node} />
                </div>
              ))}
            </div>

            <div className="bg-card border border-border rounded-2xl overflow-hidden shadow-sm flex flex-col h-[420px] max-h-[420px]">
              <img
                src={mentorImg}
                alt="Team hierarchy visual"
                className="w-full h-44 object-cover media"
              />
              <div className="p-5 space-y-2 flex-1 overflow-hidden">
                <p className="font-display text-[10px] tracking-[0.3em] text-muted-foreground uppercase">
                  SIGNAL ADMIN · CORE TEAM
                </p>
                <h2 className="font-display text-2xl font-black">Chain of Trust</h2>
                <p className="text-sm text-muted-foreground">
                  Admins → Continent Heads → Country Directors → State Heads → Community Managers → Pods → Members.
                </p>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-card border border-border rounded-2xl p-5 flex gap-4 items-center">
              <img src={founderImg} alt="Core team" className="w-20 h-20 rounded-xl object-cover media" />
              <div>
                <p className="font-display text-xs tracking-widest text-muted-foreground">CORE TEAM</p>
                <h3 className="font-display text-xl font-bold">Operational Safety</h3>
                <p className="text-sm text-muted-foreground">Every layer signs off on trust, safety, and onboarding quality.</p>
              </div>
            </div>
            <div className="bg-card border border-border rounded-2xl p-5 flex gap-4 items-center">
              <img src={investorImg} alt="Members" className="w-20 h-20 rounded-xl object-cover media" />
              <div>
                <p className="font-display text-xs tracking-widest text-muted-foreground">MEMBERS</p>
                <h3 className="font-display text-xl font-bold">From Signal to Action</h3>
                <p className="text-sm text-muted-foreground">Clear reporting lines for events, referrals, and app support.</p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </HelmetProvider>
  );
};

export default TeamHierarchy;
