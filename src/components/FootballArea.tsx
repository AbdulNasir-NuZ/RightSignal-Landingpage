import { motion } from "framer-motion";
import investorImg from "@/assets/investor-portrait.jpg";
import founderImg from "@/assets/founder-portrait.jpg";
import { Eye, Instagram, Twitter, Linkedin } from "lucide-react";

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

const FootballArea = () => {
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

      {/* Cards grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Investor card */}
        <motion.div
          variants={cardVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          custom={0}
          whileHover={{ y: -8 }}
          transition={{ duration: 0.3 }}
          className="bg-secondary rounded-xl p-5"
        >
          <div className="flex items-center gap-3 mb-4">
            <img
              src={investorImg}
              alt="Sarah Chen, angel investor portrait"
              loading="lazy"
              width={512}
              height={512}
              className="w-10 h-10 rounded-full object-cover media"
            />
            <span className="font-display text-lg font-bold text-foreground">SARAH CHEN</span>
          </div>
          <div className="flex gap-4 mb-4">
            <div>
              <span className="font-display text-3xl font-black text-foreground">48</span>
              <span className="font-display text-xs text-muted-foreground ml-1">INVESTMENTS</span>
            </div>
            <div>
              <span className="font-display text-3xl font-black text-foreground">12</span>
              <span className="font-display text-xs text-muted-foreground ml-1">EXITS</span>
            </div>
          </div>
          <div className="mb-2">
            <div className="flex justify-between text-xs text-muted-foreground font-display">
              <span>SUCCESS RATE</span>
              <span>78%</span>
            </div>
            <div className="w-full bg-accent h-2 rounded-full mt-1 overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: "78%" }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className="bg-foreground h-2 rounded-full"
              />
            </div>
          </div>
          <button className="mt-4 w-full bg-foreground text-background font-display text-xs tracking-widest py-2.5 rounded-lg hover:bg-foreground/90 transition-colors">
            VIEW PROFILE
          </button>
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
            className="w-full h-full object-cover media min-h-[350px]"
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
        </motion.div>
      </div>
    </section>
  );
};

export default FootballArea;
