import mentorImg from "@/assets/mentor.jpg";

const FooterSection = () => {
  return (
    <footer className="bg-primary text-primary-foreground">
      {/* Top bar */}
      <div className="px-6 md:px-12 py-6 flex flex-col md:flex-row items-start md:items-center justify-between border-b border-primary-foreground/10">
        <div className="flex gap-6">
          <span className="font-display text-xs tracking-widest text-primary-foreground/70">HOME</span>
          <span className="font-display text-xs tracking-widest text-primary-foreground/70">EVENTS</span>
          <span className="font-display text-xs tracking-widest text-primary-foreground/70">COMMUNITY</span>
        </div>
        <div className="flex items-center gap-4 mt-4 md:mt-0">
          <span className="font-display text-xs tracking-widest text-primary-foreground/70">INSTAGRAM</span>
          <div className="relative rounded-lg overflow-hidden">
            <img src={mentorImg} alt="Mentor of the week" loading="lazy" width={512} height={640} className="w-40 h-48 object-cover img-grayscale" />
            <div className="absolute inset-0 bg-primary/30" />
            <div className="absolute bottom-3 left-3 right-3">
              <h4 className="font-display text-lg font-bold text-primary-foreground leading-tight">MENTOR SPOTLIGHT</h4>
              <span className="font-display text-[10px] tracking-widest text-primary-foreground/60 bg-primary-foreground/10 px-2 py-0.5 rounded mt-1 inline-block">MEMBER OF THE WEEK</span>
            </div>
          </div>
        </div>
      </div>

      {/* Info */}
      <div className="px-6 md:px-12 py-8">
        <div className="flex flex-col md:flex-row justify-between gap-6 mb-10">
          <div>
            <h4 className="font-display text-lg font-bold text-primary-foreground">NEXUS</h4>
            <p className="text-xs text-primary-foreground/50 font-body max-w-xs mt-2 leading-relaxed">
              A community-driven platform connecting students, founders, professionals, investors, and business owners through curated events and meaningful connections.
            </p>
          </div>
        </div>

        {/* Big email */}
        <h2 className="font-display text-4xl md:text-6xl lg:text-7xl font-black text-primary-foreground leading-none tracking-tight">
          HELLO@NEXUS.COM
        </h2>

        <div className="flex items-center justify-center gap-6 mt-8 text-primary-foreground/40">
          <span className="font-display text-xs tracking-widest">PRIVACY POLICY</span>
          <span className="font-display text-xs tracking-widest">© 2025 COPYRIGHT</span>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;
