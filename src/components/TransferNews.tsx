import workshopImg from "@/assets/workshop.jpg";
import { ChevronLeft, ChevronRight } from "lucide-react";

const events = [
  { name: "STARTUP PITCH NIGHT", pct: "92%" },
  { name: "INVESTOR ROUNDTABLE", pct: "85%" },
  { name: "FOUNDER FIRESIDE CHAT", pct: "78%" },
];

const TransferNews = () => {
  return (
    <section className="px-6 md:px-12 py-16">
      <p className="font-display text-xs tracking-widest text-muted-foreground mb-2">UPCOMING<br />EVENTS & WORKSHOPS</p>

      {/* Big title */}
      <div className="flex flex-wrap items-baseline gap-x-4 mb-8">
        <h2 className="font-display text-5xl md:text-7xl font-black text-foreground leading-none">UPCOMING</h2>
        <h2 className="font-display text-5xl md:text-7xl font-black text-foreground leading-none">EVENTS</h2>
        <h2 className="font-display text-5xl md:text-7xl font-black italic text-muted-foreground/40 leading-none">SPRING</h2>
        <h2 className="font-display text-5xl md:text-7xl font-black text-foreground leading-none">2025</h2>
      </div>

      {/* Content */}
      <div className="flex items-start justify-between mb-4">
        <p className="font-display text-xs tracking-widest text-muted-foreground">WORKSHOPS</p>
        <p className="font-display text-xs tracking-widest text-muted-foreground">PANELS &nbsp; MIXERS &nbsp; SUMMITS</p>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Workshop image */}
        <div className="relative flex-1 rounded-xl overflow-hidden">
          <img src={workshopImg} alt="Workshop session" loading="lazy" width={640} height={800} className="w-full h-80 object-cover img-grayscale" />
          <div className="absolute inset-0 bg-primary/20" />
          <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-display text-xs tracking-widest text-primary-foreground bg-primary/50 px-3 py-1.5 rounded">VIEW DETAILS</span>
        </div>

        {/* Event interest */}
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 bg-secondary rounded-full flex items-center justify-center text-sm">🎯</div>
            <p className="font-display text-xs tracking-widest text-muted-foreground">SPOTS FILLING UP</p>
          </div>
          {events.map((event, i) => (
            <div key={i} className="flex items-center justify-between py-3 border-b border-border">
              <span className="font-display text-sm font-bold text-foreground">{event.name}</span>
              <span className="font-display text-sm text-muted-foreground">{event.pct}</span>
            </div>
          ))}

          <div className="mt-8">
            <div className="flex items-center gap-2 mb-2">
              <span className="font-display text-xs tracking-widest text-muted-foreground">FEATURED</span>
              <span className="font-display text-xs tracking-widest text-muted-foreground">WORKSHOP</span>
            </div>
            <h3 className="font-display text-2xl font-bold text-foreground">SCALING YOUR STARTUP</h3>
            <p className="text-sm text-muted-foreground font-body mt-2">
              A hands-on workshop for early-stage founders covering go-to-market strategy, fundraising fundamentals, and building your first advisory board.
            </p>
            <div className="flex gap-2 mt-4">
              <button className="w-10 h-10 rounded-full border border-border flex items-center justify-center hover:bg-secondary transition-colors">
                <ChevronLeft className="w-4 h-4 text-foreground" />
              </button>
              <button className="w-10 h-10 rounded-full border border-border flex items-center justify-center hover:bg-secondary transition-colors">
                <ChevronRight className="w-4 h-4 text-foreground" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TransferNews;
