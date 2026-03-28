import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Link } from "react-router-dom";
import heroImg from "@/assets/hero-community.jpg";
import rightSignalLogo from "@/assets/right-signal-logo.jpeg";

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
    <>
      <section ref={ref} className="relative w-full h-[85vh] overflow-hidden">
      {/* Nav */}
      <motion.nav
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="absolute top-0 left-0 right-0 z-20 flex items-center justify-between px-6 md:px-12 py-5"
      >
        <div className="flex items-center gap-3">
          <img
            src={rightSignalLogo}
            alt="Right Signal mark"
            width={48}
            height={48}
            className="w-10 h-10 rounded-lg bg-primary-foreground/10 p-1 media"
          />
          <span className="font-display text-sm tracking-wider text-primary-foreground">RIGHT SIGNAL</span>
        </div>
        <div className="flex items-center gap-6">
          <Link to="/" className="font-display text-sm tracking-wider text-primary-foreground cursor-pointer story-link">
            <span>HOME</span>
          </Link>
          <Link to="/events" className="font-display text-sm tracking-wider text-primary-foreground cursor-pointer story-link">
            <span>EVENTS</span>
          </Link>
          <Link to="/apps" className="font-display text-sm tracking-wider text-primary-foreground cursor-pointer story-link">
            <span>APPS</span>
          </Link>
        </div>
        <span className="font-display text-sm tracking-wider text-primary-foreground">JOIN US 2026</span>
      </motion.nav>

      <div className="absolute top-14 left-6 md:left-12 text-white">
        <p className="font-display text-[10px] tracking-[0.28em] text-white">
          RIGHT PEOPLE. RIGHT SIGNAL. RIGHT GROWTH.
        </p>
      </div>

      {/* Parallax hero image */}
      <motion.div style={{ y, scale }} className="absolute inset-0">
        <img
          src={heroImg}
          alt="Right Signal community networking event with professionals and founders connecting"
          width={1920}
          height={1080}
          className="w-full h-full object-cover media"
        />
      </motion.div>

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-primary/50" />

      {/* Big title with stagger */}
      <motion.div
        style={{ opacity }}
        className="absolute inset-0 flex flex-col items-center justify-center z-10"
      >
        <motion.h1
          initial={{ y: 60, opacity: 0, letterSpacing: "0.3em" }}
          animate={{ y: 0, opacity: 1, letterSpacing: "-0.02em" }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
          className="font-display text-[14vw] md:text-[10vw] font-black text-primary-foreground leading-none"
        >
          RIGHT SIGNAL
        </motion.h1>
        {/* <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mt-3 md:mt-4 text-white text-xs md:text-sm uppercase text-center leading-relaxed font-black"
        >
          RIGHT PEOPLE. RIGHT SIGNAL. RIGHT GROWTH.
        </motion.p> */}
      </motion.div>

      {/* Bottom info */}
      <motion.div
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="absolute bottom-8 left-6 md:left-12 right-6 md:right-12 z-10 flex items-end justify-between"
      >
        <p className="font-display text-xs tracking-widest text-primary-foreground/80">
          WHERE SIGNALS ALIGN
        </p>
        <p className="text-xs text-primary-foreground/70 font-body leading-relaxed max-w-xs text-right">
          A monochrome-first community for students, founders, professionals,
          investors, and operators to connect, learn, and ship together.
        </p>
      </motion.div>
      </section>
      <div className="text-center py-6 bg-background">
        <p className="font-display text-xs md:text-sm tracking-[0.28em] text-foreground font-black uppercase">
          RIGHT PEOPLE. RIGHT SIGNAL. RIGHT GROWTH.
        </p>
      </div>
    </>
  );
};

export default HeroSection;
