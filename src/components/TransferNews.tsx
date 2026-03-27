import transferImg from "@/assets/transfer.jpg";
import { ChevronLeft, ChevronRight } from "lucide-react";

const clubs = [
  { name: "CHELSEA", pct: "85%" },
  { name: "NAPOLI", pct: "72%" },
  { name: "PARIS SAINT GERMAIN", pct: "57%" },
];

const TransferNews = () => {
  return (
    <section className="px-6 md:px-12 py-16">
      <p className="font-display text-xs tracking-widest text-muted-foreground mb-2">TRANSFER<br />AND RUMOUR OF FOOTBALL</p>

      {/* Big title */}
      <div className="flex flex-wrap items-baseline gap-x-4 mb-8">
        <h2 className="font-display text-5xl md:text-7xl font-black text-foreground leading-none">TRANSFER</h2>
        <h2 className="font-display text-5xl md:text-7xl font-black text-foreground leading-none">NEWS</h2>
        <h2 className="font-display text-5xl md:text-7xl font-black italic text-muted-foreground/40 leading-none">SUMMER</h2>
        <h2 className="font-display text-5xl md:text-7xl font-black text-foreground leading-none">2025</h2>
      </div>

      {/* Content */}
      <div className="flex items-start justify-between mb-4">
        <p className="font-display text-xs tracking-widest text-muted-foreground">PREMIER LEAGUE</p>
        <p className="font-display text-xs tracking-widest text-muted-foreground">SERIE A &nbsp; BUNDESLIGA &nbsp; LA LIGA</p>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Transfer image */}
        <div className="relative flex-1 rounded-xl overflow-hidden">
          <img src={transferImg} alt="Transfer news" loading="lazy" width={640} height={800} className="w-full h-80 object-cover img-grayscale" />
          <div className="absolute inset-0 bg-primary/20" />
          <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-display text-xs tracking-widest text-primary-foreground bg-primary/50 px-3 py-1.5 rounded">READ NEWS</span>
        </div>

        {/* Club interest */}
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 bg-secondary rounded-full flex items-center justify-center text-sm">⚽</div>
            <p className="font-display text-xs tracking-widest text-muted-foreground">CLUB INTERESTED</p>
          </div>
          {clubs.map((club, i) => (
            <div key={i} className="flex items-center justify-between py-3 border-b border-border">
              <span className="font-display text-sm font-bold text-foreground">{club.name}</span>
              <span className="font-display text-sm text-muted-foreground">{club.pct}</span>
            </div>
          ))}

          <div className="mt-8">
            <div className="flex items-center gap-2 mb-2">
              <span className="font-display text-xs tracking-widest text-muted-foreground">TRANSFER</span>
              <span className="font-display text-xs tracking-widest text-muted-foreground">RUMOUR</span>
            </div>
            <h3 className="font-display text-2xl font-bold text-foreground">GARNANCHO TRANSFER</h3>
            <p className="text-sm text-muted-foreground font-body mt-2">
              Manchester United star Alejandro Garnacho's agents were spotted at Chelsea amid talks of the Argentina moving to Stamford Bridge this January.
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
