import { motion } from "framer-motion";
import workshopImg from "@/assets/workshop.jpg";
import { ChevronLeft, ChevronRight } from "lucide-react";

const events = [
  { name: "STARTUP PITCH NIGHT", pct: "92%" },
  { name: "INVESTOR ROUNDTABLE", pct: "85%" },
  { name: "FOUNDER FIRESIDE CHAT", pct: "78%" },
];

const letterVariants = {
  hidden: { opacity: 0, y: 80 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

const TransferNews = () => {
  const words = ["UPCOMING", "EVENTS", "SPRING", "2025"];
  const styles = [
    "text-foreground",
    "text-foreground",
    "italic text-muted-foreground/40",
    "text-foreground",
  ];

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
        {words.map((word, i) => (
          <motion.h2
            key={i}
            variants={letterVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={i}
            className={`font-display text-5xl md:text-7xl font-black leading-none ${styles[i]}`}
          >
            {word}
          </motion.h2>
        ))}
      </div>

      {/* Content */}
      <div className="flex items-start justify-between mb-4">
        <p className="font-display text-xs tracking-widest text-muted-foreground">
          WORKSHOPS
        </p>
        <p className="font-display text-xs tracking-widest text-muted-foreground">
          PANELS &nbsp; MIXERS &nbsp; SUMMITS
        </p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="flex flex-col md:flex-row gap-8"
      >
        {/* Workshop image */}
        <motion.div
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.4 }}
          className="relative flex-1 rounded-xl overflow-hidden cursor-pointer"
        >
          <img
            src={workshopImg}
            alt="Collaborative workshop session with diverse professionals"
            loading="lazy"
            width={640}
            height={800}
            className="w-full h-80 object-cover img-grayscale"
          />
          <div className="absolute inset-0 bg-primary/20" />
          <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-display text-xs tracking-widest text-primary-foreground bg-primary/50 px-3 py-1.5 rounded">
            VIEW DETAILS
          </span>
        </motion.div>

        {/* Event interest */}
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 bg-secondary rounded-full flex items-center justify-center text-sm">
              🎯
            </div>
            <p className="font-display text-xs tracking-widest text-muted-foreground">
              SPOTS FILLING UP
            </p>
          </div>
          {events.map((event, i) => (
            <motion.div
              key={i}
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
              <span className="font-display text-sm font-bold text-foreground">
                {event.name}
              </span>
              <span className="font-display text-sm text-muted-foreground">
                {event.pct}
              </span>
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
            <h3 className="font-display text-2xl font-bold text-foreground">
              SCALING YOUR STARTUP
            </h3>
            <p className="text-sm text-muted-foreground font-body mt-2">
              A hands-on workshop for early-stage founders covering go-to-market
              strategy, fundraising fundamentals, and building your first
              advisory board.
            </p>
            <div className="flex gap-2 mt-4">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="w-10 h-10 rounded-full border border-border flex items-center justify-center hover:bg-secondary transition-colors"
              >
                <ChevronLeft className="w-4 h-4 text-foreground" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="w-10 h-10 rounded-full border border-border flex items-center justify-center hover:bg-secondary transition-colors"
              >
                <ChevronRight className="w-4 h-4 text-foreground" />
              </motion.button>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default TransferNews;
