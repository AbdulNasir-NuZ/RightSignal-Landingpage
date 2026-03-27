import { motion } from "framer-motion";
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

const CatalogueSection = () => {
  return (
    <section className="px-6 md:px-12 py-16" aria-label="Upcoming events catalogue">
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
          DISCOVER OUR
          <br />
          UPCOMING EVENTS
        </motion.h2>
        <motion.div variants={fadeUp} custom={0.2} className="mt-4 md:mt-0">
          <p className="font-display text-xs tracking-widest text-muted-foreground">
            SEASON SPRING 2025
          </p>
          <p className="text-sm text-muted-foreground mt-1 font-body">
            Workshops, Pitch Nights, Panels,
            <br />
            and Networking Mixers
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
              FOUNDERS
              <br />
              SUMMIT '25
            </motion.h3>
            <p className="text-sm text-primary-foreground/70 font-body max-w-xs">
              An exclusive gathering of 200+ founders, investors, and mentors
              for a day of keynotes, pitch sessions, and meaningful connections.
            </p>
          </div>
          <div className="flex gap-4 items-end">
            <motion.img
              whileHover={{ scale: 1.03 }}
              transition={{ duration: 0.4 }}
              src={speakerImg}
              alt="Keynote speaker at Founders Summit tech conference"
              loading="lazy"
              width={640}
              height={800}
              className="w-40 md:w-52 h-56 md:h-72 object-cover rounded-lg img-grayscale"
            />
            <div className="flex flex-col gap-4 items-center">
              <motion.img
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.4 }}
                src={eventPosterImg}
                alt="Startup Pitch Night event poster"
                loading="lazy"
                width={512}
                height={700}
                className="w-28 md:w-36 h-36 md:h-48 object-cover rounded-lg img-grayscale"
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
          HOSTED BY NEXUS COMMUNITY
        </p>
      </motion.div>

      {/* Stats row */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-40px" }}
        className="flex flex-col md:flex-row items-center justify-between mt-10 gap-6"
      >
        {[
          {
            icon: "🎤",
            label: "50+ EVENTS\nEVERY QUARTER",
            stat: null,
            sub: null,
          },
          {
            icon: null,
            label: "MEMBERS",
            stat: "12k+",
            sub: "Active community members",
          },
          {
            icon: null,
            label: "CONNECTIONS MADE",
            stat: "50k+",
            sub: "Introductions & collaborations",
          },
        ].map((s, i) => (
          <motion.div
            key={i}
            variants={fadeUp}
            custom={i * 0.15}
            className={s.icon ? "flex items-center gap-4" : "text-center"}
          >
            {s.icon && (
              <div className="w-14 h-14 bg-secondary rounded-lg flex items-center justify-center">
                <span className="text-2xl">{s.icon}</span>
              </div>
            )}
            <div>
              <p className="font-display text-xs tracking-widest text-muted-foreground whitespace-pre-line">
                {s.label}
              </p>
              {s.stat && (
                <p className="font-display text-3xl font-bold text-foreground">
                  {s.stat}
                </p>
              )}
              {s.sub && (
                <p className="text-xs text-muted-foreground font-body">
                  {s.sub}
                </p>
              )}
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default CatalogueSection;
