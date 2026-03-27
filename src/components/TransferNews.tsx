import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import workshopImg from "@/assets/workshop.jpg";
import transferImg from "@/assets/transfer.jpg";
import eventPosterImg from "@/assets/event-poster.jpg";
import heroCommunityImg from "@/assets/hero-community.jpg";
import magazineCoverImg from "@/assets/magazine-cover.jpg";

const slides = [
  {
    headline: ["UPCOMING", "EVENTS", "SPRING", "2026"],
    leftTag: "WORKSHOPS",
    rightTag: "PANELS   MIXERS   SUMMITS",
    hero: { src: workshopImg, alt: "Collaborative workshop session with diverse professionals" },
    overlay: "VIEW DETAILS",
    badge: "SPOTS FILLING UP",
    events: [
      { name: "STARTUP PITCH NIGHT", pct: "92%" },
      { name: "INVESTOR ROUNDTABLE", pct: "85%" },
      { name: "FOUNDER FIRESIDE CHAT", pct: "78%" },
    ],
    featured: {
      title: "SCALING YOUR STARTUP",
      copy:
        "A hands-on workshop for early-stage founders covering go-to-market, fundraising, and building your first advisory board.",
    },
  },
  {
    headline: ["UPCOMING", "EVENTS", "SUMMER", "2026"],
    leftTag: "DEMO DAYS",
    rightTag: "SHOWCASES   REVIEWS   PANELS",
    hero: { src: transferImg, alt: "Pitch team presenting at demo day" },
    overlay: "SEE LINEUP",
    badge: "LIMITED STAGE SLOTS",
    events: [
      { name: "FOUNDER DEMO DAY", pct: "88%" },
      { name: "PRODUCT TEARDOWN LAB", pct: "80%" },
      { name: "CUSTOMER STORYFUEL", pct: "76%" },
    ],
    featured: {
      title: "ZERO-TO-ONE PRODUCT CLINIC",
      copy: "Live audits with operators to tune onboarding, retention loops, and activation.",
    },
  },
  {
    headline: ["UPCOMING", "EVENTS", "FALL", "2026"],
    leftTag: "CAP TABLES",
    rightTag: "INVESTORS   OPERATORS   LEGAL",
    hero: { src: eventPosterImg, alt: "Minimalist event poster" },
    overlay: "OPEN SEATS",
    badge: "CURATED ATTENDEES",
    events: [
      { name: "ANGEL 101 FOR FOUNDERS", pct: "82%" },
      { name: "TERM SHEET READ-ALONG", pct: "79%" },
      { name: "SECONDARY MARKET HOUR", pct: "74%" },
    ],
    featured: {
      title: "CAP TABLE DEEP DIVE",
      copy: "Structured walkthrough of real early-stage cap tables with legal and finance mentors.",
    },
  },
  {
    headline: ["UPCOMING", "EVENTS", "WINTER", "2026"],
    leftTag: "GROWTH",
    rightTag: "PERFORMANCE   BRAND   OPS",
    hero: { src: heroCommunityImg, alt: "Founders networking at Right Signal" },
    overlay: "RESERVE",
    badge: "NEAR CAPACITY",
    events: [
      { name: "GROWTH LAB", pct: "90%" },
      { name: "BRAND SYSTEMS 2.0", pct: "83%" },
      { name: "REVOPS FOUNDATIONS", pct: "77%" },
    ],
    featured: {
      title: "COLD-START TO FLYWHEEL",
      copy: "Instrumenting acquisition → activation → retention with live dashboards.",
    },
  },
  {
    headline: ["UPCOMING", "EVENTS", "EARLY", "2027"],
    leftTag: "GLOBAL",
    rightTag: "EXPANSION   CULTURE   TALENT",
    hero: { src: magazineCoverImg, alt: "Magazine style feature cover" },
    overlay: "PREVIEW",
    badge: "EARLY ACCESS",
    events: [
      { name: "MARKET ENTRY PLAYBOOK", pct: "86%" },
      { name: "CULTURE BY DESIGN", pct: "81%" },
      { name: "HIRING OPERATING SYSTEM", pct: "75%" },
    ],
    featured: {
      title: "CROSS-BORDER SPRINT",
      copy: "Two-week sprint to launch in a new region with mentors across legal, ops, and GTM.",
    },
  },
];

const letterVariants = {
  hidden: { opacity: 0, y: 80 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

const slideVariants = {
  initial: { opacity: 0, x: 24 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -24 },
};

const TransferNews = () => {
  const [current, setCurrent] = useState(0);
  const slide = slides[current];

  const handlePrev = () => setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
  const handleNext = () => setCurrent((prev) => (prev + 1) % slides.length);

  return (
    <section className="px-6 md:px-12 py-16" aria-label="Upcoming events">
      <motion.p
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="font-display text-xs tracking-widest text-muted-foreground mb-2"
      >
        UPCOMING
        <br />
        EVENTS & WORKSHOPS
      </motion.p>

      {/* Big title with staggered words */}
      <div className="flex flex-wrap items-baseline gap-x-4 mb-8">
        {slide.headline.map((word, i) => (
          <motion.h2
            key={`${word}-${i}`}
            variants={letterVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={i}
            className={`font-display text-5xl md:text-7xl font-black leading-none ${
              i === 2 ? "italic text-muted-foreground/40" : "text-foreground"
            }`}
          >
            {word}
          </motion.h2>
        ))}
      </div>

      {/* Content */}
      <div className="flex items-start justify-between mb-4">
        <p className="font-display text-xs tracking-widest text-muted-foreground">{slide.leftTag}</p>
        <p className="font-display text-xs tracking-widest text-muted-foreground">{slide.rightTag}</p>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          variants={slideVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col md:flex-row gap-8"
          aria-live="polite"
        >
          {/* Workshop image */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.4 }}
            className="relative flex-1 rounded-xl overflow-hidden cursor-pointer"
          >
            <img
              src={slide.hero.src}
              alt={slide.hero.alt}
              loading="lazy"
              width={640}
              height={800}
              className="w-full h-80 object-cover media"
            />
            <div className="absolute inset-0 bg-primary/20" />
            <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-display text-xs tracking-widest text-primary-foreground bg-primary/50 px-3 py-1.5 rounded">
              {slide.overlay}
            </span>
          </motion.div>

          {/* Event interest */}
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-secondary rounded-full flex items-center justify-center text-sm">
                *
              </div>
              <p className="font-display text-xs tracking-widest text-muted-foreground">
                {slide.badge}
              </p>
            </div>
            {slide.events.map((event, i) => (
              <motion.div
                key={event.name}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.5,
                  delay: i * 0.1,
                  ease: [0.22, 1, 0.36, 1],
                }}
                whileHover={{ x: 6 }}
                className="flex items-center justify-between py-3 border-b border-border cursor-pointer"
              >
                <span className="font-display text-sm font-bold text-foreground">{event.name}</span>
                <span className="font-display text-sm text-muted-foreground">{event.pct}</span>
              </motion.div>
            ))}

            <div className="mt-8">
              <div className="flex items-center gap-2 mb-2">
                <span className="font-display text-xs tracking-widest text-muted-foreground">
                  FEATURED
                </span>
                <span className="font-display text-xs tracking-widest text-muted-foreground">
                  WORKSHOP
                </span>
              </div>
              <h3 className="font-display text-2xl font-bold text-foreground">{slide.featured.title}</h3>
              <p className="text-sm text-muted-foreground font-body mt-2">{slide.featured.copy}</p>
              <div className="flex gap-2 mt-4">
                <motion.button
                  whileHover={{ scale: 1.08 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handlePrev}
                  aria-label="Previous upcoming event"
                  className="w-10 h-10 rounded-full border border-border flex items-center justify-center hover:bg-secondary transition-colors"
                >
                  <ChevronLeft className="w-4 h-4 text-foreground" />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.08 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleNext}
                  aria-label="Next upcoming event"
                  className="w-10 h-10 rounded-full border border-border flex items-center justify-center hover:bg-secondary transition-colors"
                >
                  <ChevronRight className="w-4 h-4 text-foreground" />
                </motion.button>
              </div>
              <p className="font-display text-[10px] tracking-widest text-muted-foreground mt-3">
                {current + 1} / {slides.length} UPCOMING EVENTS
              </p>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </section>
  );
};

export default TransferNews;
