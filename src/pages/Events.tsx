import { useMemo } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Home } from "lucide-react";
import heroCommunity from "@/assets/hero-community.jpg";
import eventPoster from "@/assets/event-poster.jpg";
import transferImg from "@/assets/transfer.jpg";
import workshopImg from "@/assets/workshop.jpg";
import speakerImg from "@/assets/speaker-keynote.jpg";

const events = [
  {
    id: "ai-workshop",
    title: "AI Startup Workshop",
    date: "May 12, 2026 · San Francisco",
    image: speakerImg,
    tag: "AI WORKSHOP",
  },
  {
    id: "demo-day",
    title: "Founder Demo Day",
    date: "May 28, 2026 · Remote",
    image: transferImg,
    tag: "DEMO DAY",
  },
  {
    id: "pitch-night",
    title: "Pitch Night",
    date: "June 6, 2026 · New York",
    image: eventPoster,
    tag: "PITCH",
  },
  {
    id: "growth-lab",
    title: "Growth Lab",
    date: "June 18, 2026 · Remote",
    image: workshopImg,
    tag: "GROWTH",
  },
  {
    id: "founders-summit",
    title: "Founders Summit",
    date: "July 10, 2026 · Austin",
    image: heroCommunity,
    tag: "SUMMIT",
  },
];

const Events = () => {
  const navigate = useNavigate();
  const featured = useMemo(() => events[0], []);

  const handleRegister = () => {
    navigate("/auth", { state: { redirectTo: "/join" } });
  };

  return (
    <main className="min-h-screen bg-background text-foreground">
      <Link
        to="/"
        className="fixed top-6 left-6 w-10 h-10 rounded-md border border-border bg-secondary flex items-center justify-center hover:bg-secondary/70 transition"
        aria-label="Back to Home"
      >
        <Home className="w-4 h-4" />
      </Link>
      {/* Hero Banner */}
      <section className="relative h-[70vh] w-full overflow-hidden group">
        <img
          src={heroCommunity}
          alt="Build. Connect. Launch."
          className="w-full h-full object-cover grayscale brightness-75 transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:grayscale-0 group-hover:brightness-100 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-black/60 group-hover:bg-black/30 transition-all duration-500" />
        <div className="absolute bottom-10 left-10 text-white max-w-xl space-y-3">
          <h1 className="text-4xl md:text-5xl font-black">BUILD. CONNECT. LAUNCH.</h1>
          <p className="text-white/70 text-sm md:text-base">
            Join events that turn ideas into startups — curated by Right Signal.
          </p>
          <button
            onClick={handleRegister}
            className="mt-4 px-6 py-3 bg-white text-black rounded-lg font-semibold hover:bg-white/90 transition"
          >
            Explore Events
          </button>
        </div>
      </section>

      {/* Featured Event */}
      <section className="px-6 md:px-12 py-12">
        <div className="group relative rounded-xl overflow-hidden">
          <img
            src={featured.image}
            alt={featured.title}
            className="w-full h-[320px] object-cover grayscale brightness-75 transition-all duration-700 group-hover:grayscale-0 group-hover:brightness-100 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-black/50 group-hover:bg-black/20 transition" />
          <div className="absolute bottom-6 left-6 text-white space-y-2">
            <span className="text-xs tracking-widest">{featured.tag}</span>
            <h2 className="text-3xl font-bold">{featured.title}</h2>
            <p className="text-sm text-white/70">{featured.date}</p>
            <button
              onClick={handleRegister}
              className="mt-3 px-5 py-2 bg-white text-black rounded-lg text-sm hover:bg-white/90 transition"
            >
              Register Now
            </button>
          </div>
        </div>
      </section>

      {/* Cards grid */}
      <section className="px-6 md:px-12 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {events.map((event) => (
            <div key={event.id} className="group relative rounded-xl overflow-hidden">
              <img
                src={event.image}
                alt={event.title}
                className="w-full h-[260px] object-cover grayscale brightness-75 transition-all duration-700 group-hover:grayscale-0 group-hover:brightness-100 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/50 group-hover:bg-black/20 transition" />
              <div className="absolute bottom-4 left-4 text-white space-y-1">
                <h3 className="text-lg font-bold">{event.title}</h3>
                <p className="text-xs text-white/70">{event.date}</p>
                <button
                  onClick={handleRegister}
                  className="mt-2 text-xs bg-white text-black px-3 py-1 rounded hover:bg-white/90 transition"
                >
                  Join Event
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Video section */}
      <section className="px-6 md:px-12 pb-12">
        <div className="group rounded-xl overflow-hidden">
          <video
            src="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4"
            autoPlay
            muted
            loop
            className="w-full h-[400px] object-cover grayscale brightness-75 transition-all duration-700 group-hover:grayscale-0 group-hover:brightness-100"
          />
        </div>
      </section>

      {/* Sandbox poster */}
      <section className="px-6 md:px-12 pb-16">
        <div className="bg-secondary rounded-xl p-8">
          <h2 className="text-3xl font-bold">Startup Sandbox</h2>
          <div className="grid grid-cols-2 md:grid-cols-6 gap-4 mt-6 text-sm">
            {["Submit Idea", "Build Team", "Develop", "Test", "Launch", "Pitch"].map((item) => (
              <div key={item} className="font-display text-xs tracking-widest text-foreground/80">
                {item}
              </div>
            ))}
          </div>
          <button
            onClick={handleRegister}
            className="mt-6 px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition"
          >
            Submit Your Idea
          </button>
        </div>
      </section>
    </main>
  );
};

export default Events;
