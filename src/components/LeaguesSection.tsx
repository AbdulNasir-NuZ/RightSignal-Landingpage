import { motion } from "framer-motion";

const communities = [
  { name: "STUDENTS", icon: "*" },
  { name: "CREATORS", icon: "*" },
  { name: "FOUNDERS", icon: "*" },
  { name: "INVESTORS", icon: "*" },
  { name: "OPERATORS", icon: "*" },
  { name: "PROFESSIONAL", icon: "*" },
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
      id="community"
      className="px-5 md:px-12 py-12"
      aria-label="Community categories"
    >
      {communities.map((c, i) => (
        <motion.div
          key={i}
          variants={item}
          whileHover={{ x: 12, backgroundColor: "hsl(0 0% 92% / 0.6)" }}
          whileTap={{ scale: 0.98, backgroundColor: "hsl(0 0% 94% / 0.9)" }}
          transition={{ duration: 0.22 }}
          className="flex items-center justify-between py-4 border-b border-border cursor-pointer px-2 rounded-lg sm:rounded-none"
        >
          <div className="flex items-center gap-3">
            <h3 className="font-display text-base sm:text-lg md:text-2xl font-bold tracking-wide text-foreground">
              {c.name}
            </h3>
            <span className="text-sm text-muted-foreground">{c.icon}</span>
          </div>
          <motion.span
            whileHover={{ letterSpacing: "0.2em" }}
            whileTap={{ scale: 0.97 }}
            className="font-display text-[11px] tracking-[0.28em] text-muted-foreground"
          >
            ENGAGE
          </motion.span>
        </motion.div>
      ))}
    </motion.section>
  );
};

export default LeaguesSection;
