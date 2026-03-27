import { motion } from "framer-motion";

const communities = [
  { name: "STUDENTS", emoji: "🎓" },
  { name: "STARTUP FOUNDERS", emoji: "🚀" },
  { name: "PROFESSIONALS", emoji: "💼" },
  { name: "INVESTORS", emoji: "📈" },
  { name: "BUSINESS OWNERS", emoji: "🏢" },
];

const container = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};

const item = {
  hidden: { opacity: 0, x: -40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
  },
};

const LeaguesSection = () => {
  return (
    <motion.section
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      className="px-6 md:px-12 py-12"
      aria-label="Community categories"
    >
      {communities.map((c, i) => (
        <motion.div
          key={i}
          variants={item}
          whileHover={{ x: 12, backgroundColor: "hsl(0 0% 94% / 0.5)" }}
          transition={{ duration: 0.25 }}
          className="flex items-center justify-between py-4 border-b border-border cursor-pointer px-2"
        >
          <div className="flex items-center gap-3">
            <h3 className="font-display text-lg md:text-2xl font-bold tracking-wide text-foreground">
              {c.name}
            </h3>
            <span className="text-lg">{c.emoji}</span>
          </div>
          <motion.span
            whileHover={{ letterSpacing: "0.2em" }}
            className="font-display text-xs tracking-widest text-muted-foreground"
          >
            EXPLORE
          </motion.span>
        </motion.div>
      ))}
    </motion.section>
  );
};

export default LeaguesSection;
