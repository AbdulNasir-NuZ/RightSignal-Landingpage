import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import investorImg from "@/assets/investor-portrait.jpg";
import mentorImg from "@/assets/mentor.jpg";
import speakerImg from "@/assets/speaker-keynote.jpg";
import founderImg from "@/assets/founder-portrait.jpg";
import { Eye, Instagram, Twitter, Linkedin } from "lucide-react";
import { useNavigate } from "react-router-dom";

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
    photo: investorImg,
    alt: "Sarah Chen, angel investor portrait",
    investments: 48,
    exits: 12,
    successRate: 78,
  },
  {
    name: "JONAH REED",
    photo: mentorImg,
    alt: "Jonah Reed, climate tech investor portrait",
    investments: 36,
    exits: 9,
    successRate: 74,
  },
  {
    name: "PRIYA MENON",
    photo: speakerImg,
    alt: "Priya Menon, enterprise AI investor portrait",
    investments: 29,
    exits: 7,
    successRate: 81,
  },
  {
    name: "LEILA KIM",
    photo: investorImg,
    alt: "Leila Kim, consumer fintech investor portrait",
    investments: 41,
    exits: 10,
    successRate: 76,
  },
  {
    name: "DANIEL ORTIZ",
    photo: mentorImg,
    alt: "Daniel Ortiz, deeptech investor portrait",
    investments: 33,
    exits: 6,
    successRate: 72,
  },
];

const positions: ("top" | "center" | "bottom")[] = ["top", "center", "bottom"];

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

const FootballArea = () => {
  const navigate = useNavigate();
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);

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
                        <button className="mt-auto w-full bg-foreground text-background font-display text-xs tracking-widest py-2.5 rounded-lg hover:bg-foreground/90 transition-colors">
                          VIEW PROFILE
                        </button>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Founder card */}
        <motion.div
          variants={cardVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          custom={1}
          className="relative rounded-xl overflow-hidden group"
        >
          <motion.img
            whileHover={{ scale: 1.08 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            src={founderImg}
            alt="Arjun Patel, serial entrepreneur and YC alum"
            loading="lazy"
            width={512}
            height={640}
            className="w-full h-full object-cover media min-h-[350px] transition duration-300 group-hover:filter-none group-hover:scale-[1.02]"
          />
          <div className="absolute inset-0 bg-primary/30" />
          <div className="absolute top-4 right-4 bg-primary-foreground/20 backdrop-blur-sm rounded-full p-2">
            <Eye className="w-4 h-4 text-primary-foreground" />
          </div>
          <div className="absolute inset-x-0 bottom-0 p-5">
            <span className="font-display text-xs tracking-widest text-primary-foreground/60 bg-primary/50 px-2 py-1 rounded">
              READ STORY
            </span>
            <h3 className="font-display text-2xl font-bold text-primary-foreground mt-2">
              ARJUN PATEL
            </h3>
            <p className="text-xs text-primary-foreground/70 font-body mt-1">
              Serial entrepreneur and YC alum. Built 3 startups from zero, now mentoring the next
              generation of founders.
            </p>
            <div className="flex gap-2 mt-3">
              <Instagram className="w-4 h-4 text-primary-foreground/70" />
              <Twitter className="w-4 h-4 text-primary-foreground/70" />
              <Linkedin className="w-4 h-4 text-primary-foreground/70" />
            </div>
          </div>
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
          className="bg-secondary rounded-xl p-5 flex flex-col items-center justify-center text-center"
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
            onClick={() => navigate("/auth", { state: { redirectTo: "/join" } })}
          >
            JOIN COMMUNITY
          </button>
        </motion.div>
      </div>

    </section>
  );
};

export default FootballArea;
