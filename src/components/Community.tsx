import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import investorImg from "@/assets/investor-portrait.jpg";
import mentorImg from "@/assets/mentor.jpg";
import speakerImg from "@/assets/speaker-keynote.jpg";
import founderImg from "@/assets/founder-portrait.jpg";
import { Eye, Instagram, Twitter, Linkedin } from "lucide-react";
import { Link } from "react-router-dom";

const cardVariants = {
  hidden: { opacity: 0, y: 60, scale: 0.95 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.7,
      delay: i * 0.15,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  }),
};

const investors = [
  {
    name: "SARAH CHEN",
    slug: "sarah-chen",
    photo: investorImg,
    alt: "Sarah Chen, angel investor portrait",
    investments: 48,
    exits: 12,
    successRate: 78,
  },
  {
    name: "JONAH REED",
    slug: "jonah-reed",
    photo: mentorImg,
    alt: "Jonah Reed, climate tech investor portrait",
    investments: 36,
    exits: 9,
    successRate: 74,
  },
  {
    name: "PRIYA MENON",
    slug: "priya-menon",
    photo: speakerImg,
    alt: "Priya Menon, enterprise AI investor portrait",
    investments: 29,
    exits: 7,
    successRate: 81,
  },
  {
    name: "LEILA KIM",
    slug: "leila-kim",
    photo: investorImg,
    alt: "Leila Kim, consumer fintech investor portrait",
    investments: 41,
    exits: 10,
    successRate: 76,
  },
  {
    name: "DANIEL ORTIZ",
    slug: "daniel-ortiz",
    photo: mentorImg,
    alt: "Daniel Ortiz, deeptech investor portrait",
    investments: 33,
    exits: 6,
    successRate: 72,
  },
];

const positions: ("top" | "center" | "bottom")[] = ["top", "center", "bottom"];

const founderStories = [
  {
    name: "ARJUN PATEL",
    photo: founderImg,
    tag: "READ STORY",
    title: "Serial entrepreneur and YC alum.",
    description: "Built 3 startups from zero; now mentoring the next generation of founders.",
  },
  {
    name: "MAYA SINGH",
    photo: mentorImg,
    tag: "READ STORY",
    title: "Climate + AI operator.",
    description: "Scaled carbon analytics from seed to Series B; angel in 12 climate startups.",
  },
  {
    name: "LUCAS MARTINEZ",
    photo: speakerImg,
    tag: "READ STORY",
    title: "Product-led growth coach.",
    description: "Ex-Stripe PM; helps founders ship revenue-positive experiments in 30 days.",
  },
  {
    name: "ZARA OKAFOR",
    photo: investorImg,
    tag: "READ STORY",
    title: "Fintech founder turned operator.",
    description: "Built payments rails across Africa; now backing emerging-market infra teams.",
  },
];

const stackVariants = {
  top: {
    y: -12,
    scale: 0.9,
    opacity: 0.55,
    filter: "blur(4px)",
  },
  center: {
    y: 0,
    scale: 1,
    opacity: 1,
    filter: "blur(0px)",
  },
  bottom: {
    y: 12,
    scale: 0.9,
    opacity: 0.55,
    filter: "blur(4px)",
  },
};

const continentLinks = {
  Asia: "https://chat.whatsapp.com/DOycrpl2RA8FCtV0Z6wIbp?mode=gi_t",
  Europe: "https://chat.whatsapp.com/Ez7HF2fCoBlCAHf7pP6ipy",
  Africa: "https://chat.whatsapp.com/KFFJWCGYL6O890g4PlKIcR",
  NorthAmerica: "https://chat.whatsapp.com/FejYWZiLYYK8GuzpA6i5Bv",
  SouthAmerica: "https://chat.whatsapp.com/Ht1ZnY0yyJO6kYnfPvsFYU",
  Australia: "https://chat.whatsapp.com/J5lYvk7XwjwJsQ4fyNXYxz",
};

type ContinentKey = keyof typeof continentLinks;

const getUserContinent = async (): Promise<ContinentKey | null> => {
  try {
    const res = await fetch("https://ipapi.co/json/");
    const data = await res.json();

    const map: Record<string, ContinentKey> = {
      AS: "Asia",
      EU: "Europe",
      AF: "Africa",
      NA: "NorthAmerica",
      SA: "SouthAmerica",
      OC: "Australia",
    };

    return map[data.continent_code] ?? null;
  } catch (error) {
    return null;
  }
};

const Community = () => {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const [storyIndex, setStoryIndex] = useState(0);
  const [isJoinLoading, setIsJoinLoading] = useState(false);
  const [detectedContinent, setDetectedContinent] = useState<ContinentKey | null>(null);
  const [showJoinModal, setShowJoinModal] = useState(false);

  useEffect(() => {
    if (paused) return;
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % investors.length);
    }, 3000);
    return () => clearInterval(timer);
  }, [paused]);

  const visibleStack = useMemo(
    () => [
      investors[(current - 1 + investors.length) % investors.length],
      investors[current],
      investors[(current + 1) % investors.length],
    ],
    [current],
  );

  useEffect(() => {
    const timer = setInterval(() => {
      setStoryIndex((prev) => (prev + 1) % founderStories.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const currentStory = founderStories[storyIndex];

  const handleJoinCommunity = async () => {
    setIsJoinLoading(true);
    try {
      const cached = (localStorage.getItem("region") as ContinentKey | null) ?? null;
      const continent = cached || (await getUserContinent());

      if (continent && continentLinks[continent]) {
        setDetectedContinent(continent);
      } else {
        setDetectedContinent(null);
      }
      setShowJoinModal(true);
    } finally {
      setIsJoinLoading(false);
    }
  };

  const handleConfirmJoin = () => {
    const continent = detectedContinent;
    if (!continent || !continentLinks[continent]) return;
    localStorage.setItem("region", continent);
    window.location.href = continentLinks[continent];
  };

  return (
    <section className="px-6 md:px-12 py-16" aria-label="Community leaders">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="flex items-center justify-between mb-8"
      >
        <p className="font-display text-xs tracking-widest text-muted-foreground">
          MEET OUR
          <br />
          SIGNAL
          <br />
          LEADERS
        </p>
        <h2 className="font-display text-5xl md:text-7xl font-black text-foreground">
          COMMUNITY HUB
        </h2>
        <p className="font-display text-xs tracking-widest text-muted-foreground">2026</p>
      </motion.div>

      {/* Original grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Investor stacked carousel */}
        <motion.div
          variants={cardVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          custom={0}
          transition={{ duration: 0.3 }}
          className="bg-secondary rounded-xl p-5 relative overflow-hidden h-full min-h-[420px]"
          style={{ perspective: 1000 }}
          whileHover={{ scale: 1.02 }}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <div className="flex flex-col gap-4 h-full">
            <AnimatePresence initial={false} mode="popLayout">
              {visibleStack.map((investor, idx) => {
                const position = positions[idx];
                const isCenter = position === "center";
                return (
                  <motion.div
                    key={`${investor.name}-${position}`}
                    className="flex-1 flex items-stretch"
                    variants={stackVariants}
                    initial={position}
                    animate={position}
                    exit={{ opacity: 0, y: -32, position: "absolute", width: "100%" }}
                    transition={{
                      type: "spring",
                      stiffness: 120,
                      damping: 18,
                      mass: 0.6,
                    }}
                    style={{ pointerEvents: isCenter ? "auto" : "none" }}
                  >
                    <div
                      className={`
    relative bg-card/60 backdrop-blur-xl border border-border rounded-xl
    w-full p-5 flex flex-col gap-3
    ${isCenter ? "shadow-2xl" : "shadow-none"}
  `}
                    >
                      {isCenter && (
                        <div className="absolute inset-0 rounded-xl ring-1 ring-white/10 pointer-events-none" />
                      )}

                      <div className="flex items-center gap-3">
                        <img
                          src={investor.photo}
                          alt={investor.alt}
                          loading="lazy"
                          width={512}
                          height={512}
                          className="w-10 h-10 rounded-full object-cover media"
                        />
                        <span className="font-display text-lg font-bold text-foreground">
                          {investor.name}
                        </span>
                      </div>

                      <div className="flex gap-4">
                        <div>
                          <span className="font-display text-3xl font-black text-foreground">
                            {investor.investments}
                          </span>
                          <span className="font-display text-xs text-muted-foreground ml-1">
                            INVESTMENTS
                          </span>
                        </div>
                        <div>
                          <span className="font-display text-3xl font-black text-foreground">
                            {investor.exits}
                          </span>
                          <span className="font-display text-xs text-muted-foreground ml-1">
                            EXITS
                          </span>
                        </div>
                      </div>

                      <div className="mb-1">
                        <div className="flex justify-between text-xs text-muted-foreground font-display">
                          <span>SUCCESS RATE</span>
                          <span>{investor.successRate}%</span>
                        </div>
                        <div className="w-full bg-accent h-2 rounded-full mt-1 overflow-hidden">
                          <motion.div
                            key={`${investor.name}-bar-${position}`}
                            initial={{ width: 0 }}
                            animate={{ width: `${investor.successRate}%` }}
                            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                            className="bg-foreground h-2 rounded-full"
                          />
                        </div>
                    </div>

                    {isCenter && (
                      <Link
                        to={`/investors/${investor.slug}`}
                        className="mt-auto w-full bg-foreground text-background text-center font-display text-xs tracking-widest py-2.5 rounded-lg hover:bg-foreground/90 transition-colors"
                      >
                        VIEW PROFILE
                      </Link>
                    )}
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Founder stories carousel */}
        <motion.div
          variants={cardVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          custom={1}
          className="relative rounded-xl overflow-hidden group min-h-[350px]"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStory.name}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="h-full w-full"
            >
              <motion.img
                whileHover={{ scale: 1.03 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                src={currentStory.photo}
                alt={currentStory.name}
                loading="lazy"
                width={512}
                height={640}
                className="w-full h-full object-cover media transition duration-300 group-hover:filter-none group-hover:scale-[1.01]"
              />
              <div className="absolute inset-0 bg-primary/30" />
              <div className="absolute top-4 right-4 bg-primary-foreground/20 backdrop-blur-sm rounded-full p-2">
                <Eye className="w-4 h-4 text-primary-foreground" />
              </div>
              <div className="absolute inset-x-0 bottom-0 p-5">
                <span className="font-display text-xs tracking-widest text-primary-foreground/60 bg-primary/50 px-2 py-1 rounded">
                  {currentStory.tag}
                </span>
                <h3 className="font-display text-2xl font-bold text-primary-foreground mt-2">
                  {currentStory.name}
                </h3>
                <p className="text-xs text-primary-foreground/70 font-body mt-1">
                  {currentStory.title} {currentStory.description}
                </p>
                <div className="flex gap-2 mt-3">
                  <Instagram className="w-4 h-4 text-primary-foreground/70" />
                  <Twitter className="w-4 h-4 text-primary-foreground/70" />
                  <Linkedin className="w-4 h-4 text-primary-foreground/70" />
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </motion.div>

        {/* Community card */}
        <motion.div
          variants={cardVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        custom={2}
        whileHover={{ y: -8 }}
        transition={{ duration: 0.3 }}
        className="relative bg-secondary rounded-xl p-5 flex flex-col items-center justify-center text-center overflow-hidden"
      >
        <motion.div
          animate={{ rotate: [0, 4, -4, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="w-24 h-24 mb-4 flex items-center justify-center border border-border rounded-full"
          >
            <div className="font-display text-lg tracking-widest">GLOBAL</div>
          </motion.div>
          <h3 className="font-display text-2xl font-bold text-foreground">GLOBAL NETWORK</h3>
          <p className="font-display text-sm text-muted-foreground mt-1">25+ CITIES</p>
          <button
            className="mt-4 w-full bg-foreground text-background font-display text-xs tracking-widest py-2.5 rounded-lg hover:bg-foreground/90 transition-colors"
            onClick={handleJoinCommunity}
            disabled={isJoinLoading}
          >
            {isJoinLoading ? "DETECTING..." : "JOIN COMMUNITY"}
          </button>
          <a
            href="https://rightsignal.social"
            target="_blank"
            rel="noreferrer"
            className="mt-2 w-full text-center font-display text-xs tracking-widest px-4 py-2.5 border border-foreground rounded-lg hover:bg-foreground hover:text-background transition-colors"
          >
            VIEW WEBSITE VERSION
          </a>

          {showJoinModal && (
            <div className="absolute inset-0 bg-background/95 backdrop-blur-sm border border-border rounded-xl p-4 flex flex-col gap-3 justify-center">
              <p className="font-display text-sm text-muted-foreground text-center">
                {detectedContinent
                  ? `Detected region: ${detectedContinent}`
                  : "We couldn't detect your region right now."}
              </p>

              <div className="flex gap-2 pt-1">
                <button
                  className="flex-1 rounded-lg bg-foreground text-background font-display text-xs tracking-widest py-2.5 disabled:opacity-50"
                  onClick={handleConfirmJoin}
                  disabled={!detectedContinent}
                >
                  JOIN
                </button>
                <button
                  className="flex-1 rounded-lg border border-border text-foreground font-display text-xs tracking-widest py-2.5"
                  onClick={() => setShowJoinModal(false)}
                >
                  CANCEL
                </button>
              </div>
            </div>
          )}
        </motion.div>
      </div>

    </section>
  );
};

export default Community;
