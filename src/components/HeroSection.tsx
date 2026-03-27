import heroImg from "@/assets/hero-football.jpg";

const HeroSection = () => {
  return (
    <section className="relative w-full h-[85vh] overflow-hidden">
      {/* Nav */}
      <nav className="absolute top-0 left-0 right-0 z-20 flex items-center justify-between px-6 md:px-12 py-5">
        <div className="flex items-center gap-6">
          <span className="font-display text-sm tracking-wider text-primary-foreground">COLLECTION</span>
          <span className="font-display text-sm tracking-wider text-primary-foreground">CATALOGUE</span>
          <span className="font-display text-sm tracking-wider text-primary-foreground">CATALOGUE</span>
        </div>
        <span className="font-display text-sm tracking-wider text-primary-foreground">NEW ISSUE 2025</span>
      </nav>

      {/* Hero image */}
      <img
        src={heroImg}
        alt="Football hero"
        width={1920}
        height={1080}
        className="absolute inset-0 w-full h-full object-cover img-grayscale"
      />

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-primary/40" />

      {/* Big title */}
      <div className="absolute inset-0 flex items-center justify-center z-10">
        <h1 className="font-display text-[12vw] md:text-[10vw] font-black tracking-tight text-primary-foreground leading-none">
          OFFSIDE
        </h1>
      </div>

      {/* Bottom info */}
      <div className="absolute bottom-8 left-6 md:left-12 right-6 md:right-12 z-10 flex items-end justify-between">
        <div>
          <p className="font-display text-xs tracking-widest text-primary-foreground/80">THE HOME OF FOOTBALL</p>
        </div>
        <div className="max-w-xs text-right">
          <p className="text-xs text-primary-foreground/70 font-body leading-relaxed">
            The international self-regulatory governing body of association football, beach soccer, and futsal. It was founded on 21 May 2021.
          </p>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
