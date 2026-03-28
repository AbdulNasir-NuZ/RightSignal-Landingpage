import { Helmet, HelmetProvider } from "react-helmet-async";
import { Link } from "react-router-dom";
import SEOHead from "@/components/SEOHead";
import rightSignalLogo from "@/assets/right-signal-logo.jpeg";

const appPreviews = [
  {
    platform: "iOS",
    version: "v2.3",
    gradient: "from-neutral-900 via-zinc-500 to-emerald-300",
    note: "Gesture-first navigation with monochrome UI elements.",
  },
  {
    platform: "Android",
    version: "v2.3",
    gradient: "from-neutral-900 via-slate-500 to-amber-300",
    note: "Material-inspired surfaces, no color noise until interaction.",
  },
];

const AppShowcase = () => {
  return (
    <HelmetProvider>
      <SEOHead />
      <Helmet>
        <title>Right Signal Apps — iOS & Android in Monochrome</title>
        <meta
          name="description"
          content="Explore the Right Signal iOS and Android apps. Black-and-white by default, full color on hover or tap, with smooth 0.4s transitions."
        />
        <link rel="canonical" href="https://rightsignal.social/apps" />
      </Helmet>

      <main className="min-h-screen bg-background text-foreground">
        <section className="px-6 md:px-12 py-16">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-3 px-3 py-2 bg-secondary rounded-full w-fit">
                <img
                  src={rightSignalLogo}
                  alt="Right Signal logo"
                  className="w-10 h-10 rounded-lg media"
                  width={80}
                  height={80}
                />
                <div>
                  <p className="font-display text-xs tracking-widest text-muted-foreground">
                    RIGHT SIGNAL
                  </p>
                  <p className="font-display text-sm tracking-wide">MOBILE</p>
                </div>
              </div>
              <h1 className="font-display text-5xl md:text-6xl font-black leading-tight">
                Black &amp; white apps built for signal, not noise.
              </h1>
              <p className="text-sm md:text-base text-muted-foreground font-body max-w-xl">
                Both platforms stay grayscale until you engage. Hover (web preview) or tap (device)
                and the interface blooms into color with a smooth 0.4s ease and a subtle 1.04x lift.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link
                  to="#ios"
                  className="font-display text-xs tracking-widest px-4 py-3 border border-foreground rounded-lg hover:bg-foreground hover:text-background transition-colors"
                >
                  VIEW iOS
                </Link>
                <Link
                  to="#android"
                  className="font-display text-xs tracking-widest px-4 py-3 border border-foreground rounded-lg hover:bg-foreground hover:text-background transition-colors"
                >
                  VIEW ANDROID
                </Link>
                <a
                  href="mailto:hello@rightsignal.social"
                  className="font-display text-xs tracking-widest px-4 py-3 bg-foreground text-background rounded-lg hover:bg-foreground/90 transition-colors"
                >
                  REQUEST ACCESS
                </a>
              </div>
            </div>

            <div className="space-y-6">
              {appPreviews.map((app) => (
                <div
                  key={app.platform}
                  id={app.platform.toLowerCase()}
                  className="rounded-2xl border border-border p-4 bg-card shadow-sm"
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-display text-sm tracking-widest text-muted-foreground">
                      {app.platform}
                    </span>
                    <span className="font-display text-xs tracking-widest text-muted-foreground">
                      {app.version}
                    </span>
                  </div>
                  <div
                    className={`media w-full h-72 rounded-xl bg-gradient-to-br ${app.gradient} flex flex-col justify-between p-4`}
                  >
                    <div className="flex items-center justify-between text-primary-foreground">
                      <span className="font-display text-lg">Right Signal</span>
                      <span className="font-display text-xs tracking-widest">BETA</span>
                    </div>
                    <div className="text-primary-foreground/80 font-body text-sm max-w-[80%]">
                      {app.note}
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-10 h-10 rounded-full bg-primary-foreground/20" />
                      <div className="w-16 h-2 rounded-full bg-primary-foreground/30" />
                      <div className="w-12 h-2 rounded-full bg-primary-foreground/30" />
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground font-body mt-3">
                    Default: grayscale 100% + dimmed. Hover/tap: full color + 1.04x lift.
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="px-6 md:px-12 pb-16">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="space-y-3">
              <p className="font-display text-xs tracking-widest text-muted-foreground">
                MOTION PREVIEW
              </p>
              <h2 className="font-display text-4xl md:text-5xl font-black leading-tight">
                Smooth 0.4s ease; color appears only when you engage.
              </h2>
              <p className="text-sm text-muted-foreground font-body">
                Videos follow the same rule set: grayscale + brightness at 0.82 until hover. The
                subtle dim keeps focus on the story, then releases the full palette when users lean
                in.
              </p>
            </div>
            <div className="rounded-2xl overflow-hidden border border-border shadow-sm">
              <video
                className="media w-full h-full"
                muted
                loop
                autoPlay
                playsInline
                poster={rightSignalLogo}
              >
                <source
                  src="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4"
                  type="video/mp4"
                />
                Your browser does not support the video tag.
              </video>
            </div>
          </div>
        </section>

        <section className="px-6 md:px-12 pb-16">
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { title: "BLACK & WHITE FIRST", copy: "Default grayscale for every asset. Color is a conscious state change, not noise." },
              { title: "SMOOTH FEEDBACK", copy: "0.4s ease on hover/tap with a 1.04x scale for premium tactility." },
              { title: "CROSS-PLATFORM", copy: "Parity between iOS and Android with platform-native patterns, one visual language." },
            ].map((item) => (
              <div key={item.title} className="bg-card border border-border rounded-xl p-5 space-y-2">
                <h3 className="font-display text-lg font-bold">{item.title}</h3>
                <p className="text-sm text-muted-foreground font-body">{item.copy}</p>
              </div>
            ))}
          </div>
        </section>
      </main>
    </HelmetProvider>
  );
};

export default AppShowcase;
