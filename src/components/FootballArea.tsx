import lewyImg from "@/assets/lewy.jpg";
import yamalImg from "@/assets/yamal.jpg";
import { Eye, Instagram, Twitter, Facebook } from "lucide-react";

const FootballArea = () => {
  return (
    <section className="px-6 md:px-12 py-16">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <p className="font-display text-xs tracking-widest text-muted-foreground">ALL OF<br />FOOTBALL<br />AREA IS HERE</p>
        <h2 className="font-display text-5xl md:text-7xl font-black text-foreground">FOOTBALL AREA</h2>
        <p className="font-display text-xs tracking-widest text-muted-foreground">2024/2025</p>
      </div>

      {/* Cards grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Lewy card */}
        <div className="bg-secondary rounded-xl p-5">
          <div className="flex items-center gap-3 mb-4">
            <img src={lewyImg} alt="Lewy" loading="lazy" width={512} height={512} className="w-10 h-10 rounded-full object-cover img-grayscale" />
            <span className="font-display text-lg font-bold text-foreground">LEWY</span>
          </div>
          <div className="flex gap-4 mb-4">
            <div>
              <span className="font-display text-3xl font-black text-foreground">22</span>
              <span className="font-display text-xs text-muted-foreground ml-1">GOAL</span>
            </div>
            <div>
              <span className="font-display text-3xl font-black text-foreground">2</span>
              <span className="font-display text-xs text-muted-foreground ml-1">ASSIST</span>
            </div>
          </div>
          <div className="mb-2">
            <div className="flex justify-between text-xs text-muted-foreground font-display">
              <span>GOAL CONVERSION</span>
              <span>24%</span>
            </div>
            <div className="w-full bg-accent h-2 rounded-full mt-1">
              <div className="bg-foreground h-2 rounded-full" style={{ width: '24%' }} />
            </div>
          </div>
          <button className="mt-4 w-full bg-foreground text-background font-display text-xs tracking-widest py-2.5 rounded-lg hover:bg-foreground/90 transition-colors">
            VIEW MORE STAT
          </button>
        </div>

        {/* Yamal card */}
        <div className="relative rounded-xl overflow-hidden group">
          <img src={yamalImg} alt="Lamine Yamal" loading="lazy" width={512} height={640} className="w-full h-full object-cover img-grayscale min-h-[350px]" />
          <div className="absolute inset-0 bg-primary/30" />
          <div className="absolute top-4 right-4 bg-primary-foreground/20 backdrop-blur-sm rounded-full p-2">
            <Eye className="w-4 h-4 text-primary-foreground" />
          </div>
          <div className="absolute inset-x-0 bottom-0 p-5">
            <span className="font-display text-xs tracking-widest text-primary-foreground/60 bg-primary/50 px-2 py-1 rounded">READ STORY</span>
            <h3 className="font-display text-2xl font-bold text-primary-foreground mt-2">LAMINE YAMAL</h3>
            <p className="text-xs text-primary-foreground/70 font-body mt-1">
              Lamine Yamal Nasraoui Ebana is a Spanish professional footballer who plays as a winger.
            </p>
            <div className="flex gap-2 mt-3">
              <Instagram className="w-4 h-4 text-primary-foreground/70" />
              <Twitter className="w-4 h-4 text-primary-foreground/70" />
              <Facebook className="w-4 h-4 text-primary-foreground/70" />
            </div>
          </div>
        </div>

        {/* Barcelona card */}
        <div className="bg-secondary rounded-xl p-5 flex flex-col items-center justify-center text-center">
          <div className="w-24 h-24 mb-4 flex items-center justify-center">
            <div className="font-display text-5xl">⚽</div>
          </div>
          <h3 className="font-display text-2xl font-bold text-foreground">BARCELONA</h3>
          <p className="font-display text-sm text-muted-foreground mt-1">1ST PLACE</p>
        </div>
      </div>
    </section>
  );
};

export default FootballArea;
