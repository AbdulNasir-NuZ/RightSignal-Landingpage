import { Link } from "react-router-dom";
import rightSignalLogo from "@/assets/right-signal-logo.jpeg";
import { motion } from "framer-motion";

const DownloadCTA = () => {
  return (
    <section className="px-6 md:px-12 py-16" aria-label="Download our application">
      <div className="bg-primary text-primary-foreground rounded-2xl p-8 md:p-12 flex flex-col md:flex-row gap-8 items-center justify-between overflow-hidden">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="flex items-center gap-4"
        >
          <img
            src={rightSignalLogo}
            alt="Right Signal"
            width={72}
            height={72}
            className="w-16 h-16 rounded-xl media bg-primary-foreground/10 p-1"
          />
          <div>
            <p className="font-display text-xs tracking-widest text-primary-foreground/60">
              RIGHT SIGNAL
            </p>
            <h3 className="font-display text-3xl md:text-4xl font-black leading-tight">
              Download our application
            </h3>
            <p className="text-sm text-primary-foreground/70 font-body mt-2 max-w-md">
              Black-and-white by default. Full color when you engage. Available on iOS and Android.
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col sm:flex-row gap-3"
        >
          <Link
            to="/apps#ios"
            className="font-display text-xs tracking-widest px-5 py-3 rounded-lg border border-primary-foreground bg-primary-foreground text-primary hover:bg-primary-foreground/90 transition-colors"
          >
            DOWNLOAD ON iOS
          </Link>
          <Link
            to="/apps#android"
            className="font-display text-xs tracking-widest px-5 py-3 rounded-lg border border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10 transition-colors"
          >
            GET IT ON ANDROID
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default DownloadCTA;
