import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import heroImg from "@/assets/hero-community.jpg";

const HeroSection = () => {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);

  return (
    <section ref={ref} className="relative w-full h-[85vh] overflow-hidden">
      {/* Nav */}
      <motion.nav
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="absolute top-0 left-0 right-0 z-20 flex items-center justify-between px-6 md:px-12 py-5"
      >
        <div className="flex items-center gap-6">
          <span className="font-display text-sm tracking-wider text-primary-foreground cursor-pointer story-link"><span>EVENTS</span></span>
          <span className="font-display text-sm tracking-wider text-primary-foreground cursor-pointer story-link"><span>COMMUNITY</span></span>
          <span className="font-display text-sm tracking-wider text-primary-foreground cursor-pointer story-link"><span>MEMBERS</span></span>
        </div>
        <span className="font-display text-sm tracking-wider text-primary-foreground">JOIN US 2025</span>
      </motion.nav>

      {/* Parallax hero image */}
      <motion.div style={{ y, scale }} className="absolute inset-0">
        <img
          src={heroImg}
          alt="Nexus community networking event with professionals and founders connecting"
          width={1920}
          height={1080}
          className="w-full h-full object-cover img-grayscale"
        />
      </motion.div>

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-primary/50" />

      {/* Big title with stagger */}
      <motion.div
        style={{ opacity }}
        className="absolute inset-0 flex items-center justify-center z-10"
      >
        <motion.h1
          initial={{ y: 60, opacity: 0, letterSpacing: "0.3em" }}
          animate={{ y: 0, opacity: 1, letterSpacing: "-0.02em" }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
          className="font-display text-[14vw] md:text-[10vw] font-black text-primary-foreground leading-none"
        >
          NEXUS
        </motion.h1>
      </motion.div>

      {/* Bottom info */}
      <motion.div
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="absolute bottom-8 left-6 md:left-12 right-6 md:right-12 z-10 flex items-end justify-between"
      >
        <p className="font-display text-xs tracking-widest text-primary-foreground/80">
          WHERE IDEAS CONNECT
        </p>
        <p className="text-xs text-primary-foreground/70 font-body leading-relaxed max-w-xs text-right">
          A thriving community for students, startup founders, professionals,
          investors, and business owners to connect, learn, and grow together.
        </p>
      </motion.div>
    </section>
  );
};

export default HeroSection;
