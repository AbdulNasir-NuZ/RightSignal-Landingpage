import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { supabase } from "@/lib/supabaseClient";
import heroImg from "@/assets/hero-community.jpg";
import rightSignalLogo from "@/assets/right-signal-logo.jpeg";

const HeroSection = () => {
  const ref = useRef<HTMLElement>(null);
  const [session, setSession] = useState<any>(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    if (!supabase) return;
    supabase.auth.getSession().then(({ data }) => setSession(data.session));

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    document.body.classList.toggle("overflow-hidden", mobileOpen);
    return () => document.body.classList.remove("overflow-hidden");
  }, [mobileOpen]);

  const handleLogout = async () => {
    if (!supabase) return;
    await supabase.auth.signOut();
    setSession(null);
  };

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);

  return (
    <>
      <section
        ref={ref}
        className="relative w-full h-[82vh] min-h-[540px] md:min-h-[640px] overflow-hidden"
      >
      {/* Nav */}
      <motion.nav
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="absolute top-0 left-0 right-0 z-20 flex items-center justify-between px-4 md:px-12 py-4 md:py-5"
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

        <div className="hidden md:flex items-center gap-6">
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

        {session ? (
          <div className="hidden md:flex items-center gap-4">
            <span className="font-display text-[10px] tracking-widest text-primary-foreground/60">
              {session.user.email}
            </span>
            <div className="flex items-center gap-2">
              <Link
                to="/"
                className="font-display text-xs tracking-widest px-4 py-2 rounded-full border border-primary-foreground/30 text-primary-foreground transition-colors"
              >
                ACCOUNT
              </Link>
              <button
                onClick={handleLogout}
                className="font-display text-[10px] tracking-widest text-primary-foreground/60 hover:text-primary-foreground transition-colors uppercase ml-1"
              >
                Sign Out
              </button>
            </div>
          </div>
        ) : (
          <div className="hidden md:flex items-center gap-4">
            <Link
              to="/auth"
              className="font-display text-sm tracking-wider text-primary-foreground cursor-pointer story-link"
            >
              JOIN 2026
            </Link>
          </div>
        )}

        <button
          className="md:hidden inline-flex items-center justify-center w-11 h-11 rounded-full border border-primary-foreground/30 text-primary-foreground/90 backdrop-blur bg-black/30"
          aria-expanded={mobileOpen}
          aria-label="Toggle navigation"
          onClick={() => setMobileOpen((prev) => !prev)}
        >
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </motion.nav>

      {mobileOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="md:hidden absolute top-0 inset-x-0 z-10 pt-20 pb-6 px-4 bg-primary/80 backdrop-blur border-b border-primary-foreground/10"
        >
          <div className="flex flex-col gap-3">
            {[
              { label: "Home", to: "/" },
              { label: "Events", to: "/events" },
              { label: "Apps", to: "/apps" },
              { label: "Join 2026", to: "/auth" },
            ].map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setMobileOpen(false)}
                className="font-display text-sm tracking-widest text-primary-foreground/90 py-2"
              >
                {link.label}
              </Link>
            ))}
            {session ? (
              <button
                onClick={() => {
                  handleLogout();
                  setMobileOpen(false);
                }}
                className="font-display text-xs tracking-widest text-primary-foreground/80 text-left py-2"
              >
                Sign Out
              </button>
            ) : null}
          </div>
        </motion.div>
      )}

      <div className="absolute top-16 left-4 right-4 md:left-12 md:right-auto text-white">
        <p className="font-display text-[10px] tracking-[0.28em] text-white text-center md:text-left">
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
        className="absolute bottom-6 left-4 md:left-12 right-4 md:right-12 z-10 flex flex-col md:flex-row items-start md:items-end justify-between gap-4"
      >
        <p className="font-display text-xs tracking-widest text-primary-foreground/80">
          WHERE SIGNALS ALIGN
        </p>
        <div className="text-sm md:text-xs text-primary-foreground/80 font-body leading-relaxed max-w-xl md:max-w-xs text-left">
          A monochrome-first community for students, founders, professionals,
          investors, and operators to connect, learn, and ship together.
        </div>
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
