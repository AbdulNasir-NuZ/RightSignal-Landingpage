import { motion, useMotionValue, animate } from "framer-motion";
import { useEffect, useState } from "react";
import speakerImg from "@/assets/speaker-keynote.jpg";
import eventPosterImg from "@/assets/event-poster.jpg";
import signatureImg from "@/assets/signature.png";

const fadeUp = {
  hidden: { opacity: 0, y: 50 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

const stats = [
  {
    label: "PROGRAMS THIS QUARTER",
    value: 50,
    suffix: "+",
    sub: "workshops, pitch nights, deep dives",
  },
  {
    label: "MEMBERS",
    value: 12000,
    suffix: "",
    sub: "active across cities",
  },
  {
    label: "CONNECTIONS",
    value: 50000,
    suffix: "",
    sub: "intros & collaborations",
  },
];

const CountUp = ({ value, suffix = "", duration = 1.4 }: { value: number; suffix?: string; duration?: number }) => {
  const motionValue = useMotionValue(0);
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    const controls = animate(motionValue, value, {
      duration,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (latest) => setDisplay(Math.round(latest)),
    });
    return () => controls.stop();
  }, [motionValue, value, duration]);

  return (
    <motion.span>
      {display.toLocaleString()}
      {suffix}
    </motion.span>
  );
};

const CatalogueSection = () => {
  return (
    <section id="events" className="px-6 md:px-12 py-16" aria-label="Upcoming events catalogue">
      {/* Title */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
        className="flex flex-col md:flex-row md:items-end justify-between mb-12"
      >
        <motion.h2
          variants={fadeUp}
          custom={0}
          className="font-display text-5xl md:text-7xl font-black text-foreground leading-none"
        >
          DISCOVER THE SIGNAL
          <br />
          UPCOMING PROGRAMS
        </motion.h2>
        <motion.div variants={fadeUp} custom={0.2} className="mt-4 md:mt-0">
          <p className="font-display text-xs tracking-widest text-muted-foreground">
            SPRING 2026
          </p>
          <p className="text-sm text-muted-foreground mt-1 font-body">
            Workshops, pitch nights, panels,
            <br />
            and monochrome networking.
          </p>
        </motion.div>
      </motion.div>

      {/* Featured Collaboration */}
      <motion.div
        initial={{ opacity: 0, y: 60, scale: 0.97 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        className="bg-primary text-primary-foreground rounded-xl p-6 md:p-10 overflow-hidden"
      >
        <p className="font-display text-xs tracking-widest text-primary-foreground/60 mb-2">
          FEATURED EVENT
        </p>
        <div className="flex flex-col md:flex-row gap-8">
          <div className="flex-1">
            <motion.h3
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="font-display text-4xl md:text-5xl font-black leading-none mb-4"
            >
              SIGNALS
              <br />
              SUMMIT '26
            </motion.h3>
            <p className="text-sm text-primary-foreground/70 font-body max-w-xs">
              A single-day pulse check with 200+ founders, investors, and mentors. Keynotes,
              product teardowns, and tightly curated roundtables.
            </p>
          </div>
          <div className="flex gap-4 items-end">
            <motion.img
              whileHover={{ scale: 1.03 }}
              transition={{ duration: 0.4 }}
              src={speakerImg}
              alt="Keynote speaker at Right Signal Summit"
              loading="lazy"
              width={640}
              height={800}
              className="w-40 md:w-52 h-56 md:h-72 object-cover rounded-lg media"
            />
            <div className="flex flex-col gap-4 items-center">
              <motion.img
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.4 }}
                src={eventPosterImg}
                alt="Signals Summit monochrome poster"
                loading="lazy"
                width={512}
                height={700}
                className="w-28 md:w-36 h-36 md:h-48 object-cover rounded-lg media"
              />
              <img
                src={signatureImg}
                alt="Event signature"
                loading="lazy"
                width={512}
                height={512}
                className="w-20 h-14 object-contain invert"
              />
            </div>
          </div>
        </div>
        <p className="font-display text-xs tracking-widest text-primary-foreground/50 mt-4">
          HOSTED BY RIGHT SIGNAL
        </p>
      </motion.div>

      {/* Stats row */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-40px" }}
        className="flex flex-col md:flex-row items-center justify-between mt-10 gap-6"
      >
        {stats.map((s, i) => (
          <motion.div key={i} variants={fadeUp} custom={i * 0.15} className="text-center">
            <p className="font-display text-xs tracking-widest text-muted-foreground whitespace-pre-line">
              {s.label}
            </p>
            <p className="font-display text-3xl font-bold text-foreground mt-1">
              <CountUp value={s.value} suffix={s.suffix} />
            </p>
            <p className="text-xs text-muted-foreground font-body">{s.sub}</p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default CatalogueSection;
