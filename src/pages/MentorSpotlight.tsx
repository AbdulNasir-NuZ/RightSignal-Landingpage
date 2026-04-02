import { Helmet, HelmetProvider } from "react-helmet-async";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import mentorImg from "@/assets/mentor.jpg";
import investorImg from "@/assets/investor-portrait.jpg";
import speakerImg from "@/assets/speaker-keynote.jpg";
import founderImg from "@/assets/founder-portrait.jpg";

const featured = {
  name: "Leila Kim",
  role: "Member of the Week · Platform ops",
  blurb: "Helps founders ship reliable infra and onboard their first 1k users.",
  photo: investorImg,
};

const mentorTree = [
  {
    name: "Sarah Chen",
    role: "Angel · Product velocity",
    focus: "Sprint rooms and GTM discipline",
    photo: investorImg,
  },
  {
    name: "Jonah Reed",
    role: "Climate tech · Systems",
    focus: "Carbon analytics and grid orchestration",
    photo: mentorImg,
  },
  {
    name: "Priya Menon",
    role: "Enterprise AI · Platforms",
    focus: "AI infra and ops tooling",
    photo: speakerImg,
  },
  {
    name: "Daniel Ortiz",
    role: "Deeptech · Robotics",
    focus: "Hardware sprints and first revenue",
    photo: mentorImg,
  },
  {
    name: "Arjun Patel",
    role: "Founder coach",
    focus: "0→1 playbooks and fundraising prep",
    photo: founderImg,
  },
];

const MentorSpotlight = () => {
  return (
    <HelmetProvider>
      <Helmet>
        <title>Mentor Spotlight · Member of the Week</title>
        <meta
          name="description"
          content="Meet the Right Signal mentors and our member of the week—mapped in a simple tree so you can reach the right person fast."
        />
        <link rel="canonical" href="https://rightsignal.social/mentor-spotlight" />
      </Helmet>

      <main className="min-h-screen bg-background text-foreground">
        <section className="px-6 md:px-12 py-14 space-y-10">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="font-display text-xs tracking-widest text-muted-foreground">
                COMMUNITY GRAPH
              </p>
              <h1 className="font-display text-4xl md:text-5xl font-black">
                Mentor Spotlight & Member of the Week
              </h1>
              <p className="text-sm md:text-base text-muted-foreground max-w-2xl mt-2">
                A quick map to the people moving the community forward. Start with our top member,
                then explore mentors by specialty.
              </p>
            </div>
            <Link
              to="/join"
              className="font-display text-xs tracking-widest px-4 py-3 border border-foreground rounded-lg hover:bg-foreground hover:text-background transition-colors whitespace-nowrap"
            >
              REQUEST INTRO
            </Link>
          </div>

          {/* Tree layout */}
          <div className="relative max-w-5xl mx-auto space-y-8">
            {/* vertical line */}
            <div className="absolute left-1/2 top-24 bottom-10 -translate-x-1/2 w-px bg-border hidden md:block" />

            {/* Featured node */}
            <div className="flex justify-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="relative bg-card border border-border rounded-2xl p-6 w-full md:w-[420px] shadow-sm"
              >
                <div className="absolute -top-3 left-6 bg-foreground text-background text-[10px] px-3 py-1 rounded-full uppercase tracking-widest">
                  Member of the Week
                </div>
                <div className="flex items-center gap-4">
                  <img
                    src={featured.photo}
                    alt={featured.name}
                    className="w-16 h-16 rounded-xl object-cover media"
                  />
                  <div>
                    <h3 className="font-display text-xl font-bold">{featured.name}</h3>
                    <p className="text-xs text-muted-foreground tracking-wide">{featured.role}</p>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mt-3">{featured.blurb}</p>
              </motion.div>
            </div>

            {/* Mentor nodes */}
            <div className="grid md:grid-cols-3 gap-4 pt-4">
              {mentorTree.map((mentor, idx) => (
                <motion.div
                  key={mentor.name}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.04 }}
                  className="relative bg-card border border-border rounded-xl p-4 flex flex-col gap-3 shadow-sm"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={mentor.photo}
                      alt={mentor.name}
                      className="w-12 h-12 rounded-lg object-cover media"
                    />
                    <div>
                      <p className="font-display text-lg font-bold">{mentor.name}</p>
                      <p className="text-[11px] uppercase tracking-widest text-muted-foreground">
                        {mentor.role}
                      </p>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">{mentor.focus}</p>
                  <Link
                    to="/join"
                    className="text-xs font-display tracking-widest text-foreground hover:underline mt-auto"
                  >
                    REQUEST INTRO
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </HelmetProvider>
  );
};

export default MentorSpotlight;
