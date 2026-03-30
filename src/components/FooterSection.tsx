import { motion } from "framer-motion";
import mentorImg from "@/assets/mentor.jpg";
import { Link } from "react-router-dom";

const FooterSection = () => {
  return (
    <footer className="bg-primary text-primary-foreground" role="contentinfo">
      {/* Top bar */}
      <div className="px-6 md:px-12 py-6 flex flex-col md:flex-row items-start md:items-center justify-between border-b border-primary-foreground/10">
        <nav className="flex gap-6" aria-label="Footer navigation">
          {[
            { label: "HOME", href: "/" },
            { label: "EVENTS", href: "/#events" },
            { label: "APPS", href: "/apps" },
            { label: "SIGN IN", href: "/auth" },
          ].map((link) => (
            <Link
              key={link.label}
              to={link.href}
              className="font-display text-xs tracking-widest text-primary-foreground/70 cursor-pointer story-link"
            >
              <span>{link.label}</span>
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-4 mt-4 md:mt-0">
          <span className="font-display text-xs tracking-widest text-primary-foreground/70">
            INSTAGRAM
          </span>
          <motion.div
            whileHover={{ scale: 1.03 }}
            transition={{ duration: 0.4 }}
            className="relative rounded-lg overflow-hidden"
          >
            <img
              src={mentorImg}
              alt="Community mentor of the week spotlight"
              loading="lazy"
              width={512}
              height={640}
              className="w-40 h-48 object-cover media"
            />
            <div className="absolute inset-0 bg-primary/30" />
            <div className="absolute bottom-3 left-3 right-3">
              <h4 className="font-display text-lg font-bold text-primary-foreground leading-tight">
                MENTOR SPOTLIGHT
              </h4>
              <span className="font-display text-[10px] tracking-widest text-primary-foreground/60 bg-primary-foreground/10 px-2 py-0.5 rounded mt-1 inline-block">
                MEMBER OF THE WEEK
              </span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Info */}
      <div className="px-6 md:px-12 py-8">
        <div className="flex flex-col md:flex-row justify-between gap-6 mb-10">
          <div>
            <h4 className="font-display text-lg font-bold text-primary-foreground">RIGHT SIGNAL</h4>
            <p className="text-xs text-primary-foreground/60 font-body max-w-xs mt-2 leading-relaxed">
              A monochrome-first community connecting students, founders, operators, and investors
              through curated programming and thoughtful digital products.
            </p>
          </div>
        </div>

        {/* Big email with reveal */}
        <motion.h2
          initial={{ opacity: 0, y: 40, letterSpacing: "0.1em" }}
          whileInView={{ opacity: 1, y: 0, letterSpacing: "-0.02em" }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="font-display text-4xl md:text-6xl lg:text-7xl font-black text-primary-foreground leading-none tracking-tight"
        >
          HELLO@RIGHTSIGNAL.SOCIAL
        </motion.h2>

        <div className="flex items-center justify-center gap-6 mt-8 text-primary-foreground/40">
          <span className="font-display text-xs tracking-widest">PRIVACY POLICY</span>
          <span className="font-display text-xs tracking-widest">© 2026 RIGHT SIGNAL</span>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;
