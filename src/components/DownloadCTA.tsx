import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "@/lib/supabaseClient";
import { rememberIntendedPath } from "@/lib/redirect";
import type { Session } from "@supabase/supabase-js";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import rightSignalLogo from "@/assets/right-signal-logo.jpeg";
import { motion } from "framer-motion";

const DownloadCTA = () => {
  const [session, setSession] = useState<Session | null>(null);
  const iosTarget = "/#ios-download";
  const androidTarget = "/#android-download";

  useEffect(() => {
    if (!supabase) return;
    supabase.auth.getSession().then(({ data }) => setSession(data.session));

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);
  return (
    <section className="px-6 md:px-12 py-16" aria-label="Download our application">
      <div className="bg-primary text-primary-foreground rounded-2xl p-8 md:p-12 flex flex-col md:flex-row gap-8 items-center justify-between overflow-hidden">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="flex items-center gap-4 text-center md:text-left"
        >
          <img
            src={rightSignalLogo}
            alt="Right Signal"
            width={72}
            height={72}
            className="w-16 h-16 rounded-xl media bg-primary-foreground/10 p-1"
          />
          <div>
            <p className="font-display text-xs tracking-widest text-primary-foreground/60">RIGHT SIGNAL</p>
            <h3 className="font-display text-3xl md:text-4xl font-black leading-tight">Community OS</h3>
            <p className="text-sm text-primary-foreground/70 font-body mt-2 max-w-md">
              Built for founders and operators: calm, monochrome focus with signal-on-action moments. Available on iOS and Android.
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
          <TooltipProvider>
            <Tooltip delayDuration={300}>
              <TooltipTrigger asChild>
                {session ? (
                  <Link
                    to="/join"
                    className="font-display text-xs tracking-widest px-8 py-4 rounded-xl border-2 border-primary-foreground bg-primary-foreground text-primary hover:bg-primary-foreground/90 transition-all text-center min-w-[220px]"
                  >
                    DOWNLOAD ON iOS
                  </Link>
                ) : (
                  <Link
                    to="/auth"
                    state={{ redirectTo: iosTarget }}
                    onClick={() => rememberIntendedPath(iosTarget)}
                    className="font-display text-xs tracking-widest px-8 py-4 rounded-xl border-2 border-primary-foreground bg-primary-foreground/50 text-white/80 transition-all text-center min-w-[220px]"
                  >
                    LOGIN TO DOWNLOAD
                  </Link>
                )}
              </TooltipTrigger>
              {!session && (
                <TooltipContent className="bg-primary-foreground text-primary border-none mb-2">
                  <p className="font-display text-[10px] tracking-widest uppercase">Please sign in to download</p>
                </TooltipContent>
              )}
            </Tooltip>

            <Tooltip delayDuration={300}>
              <TooltipTrigger asChild>
                {session ? (
                  <Link
                    to="/join"
                    className="font-display text-xs tracking-widest px-8 py-4 rounded-xl border-2 border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10 transition-all text-center min-w-[220px]"
                  >
                    GET IT ON ANDROID
                  </Link>
                ) : (
                  <Link
                    to="/auth"
                    state={{ redirectTo: androidTarget }}
                    onClick={() => rememberIntendedPath(androidTarget)}
                    className="font-display text-xs tracking-widest px-8 py-4 rounded-xl border-2 border-primary-foreground text-primary-foreground/70 transition-all text-center min-w-[220px]"
                  >
                    LOGIN TO DOWNLOAD
                  </Link>
                )}
              </TooltipTrigger>
              {!session && (
                <TooltipContent className="bg-primary-foreground text-primary border-none mb-2">
                  <p className="font-display text-[10px] tracking-widest uppercase">Please sign in to download</p>
                </TooltipContent>
              )}
            </Tooltip>
          </TooltipProvider>
        </motion.div>
      </div>
    </section>
  );
};

export default DownloadCTA;
