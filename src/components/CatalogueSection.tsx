import speakerImg from "@/assets/speaker-keynote.jpg";
import eventPosterImg from "@/assets/event-poster.jpg";
import signatureImg from "@/assets/signature.png";

const CatalogueSection = () => {
  return (
    <section className="px-6 md:px-12 py-16">
      {/* Title */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
        <h2 className="font-display text-5xl md:text-7xl font-black text-foreground leading-none">
          DISCOVER OUR<br />UPCOMING EVENTS
        </h2>
        <div className="mt-4 md:mt-0">
          <p className="font-display text-xs tracking-widest text-muted-foreground">SEASON SPRING 2025</p>
          <p className="text-sm text-muted-foreground mt-1 font-body">Workshops, Pitch Nights, Panels,<br />and Networking Mixers</p>
        </div>
      </div>

      {/* Featured Collaboration */}
      <div className="bg-primary text-primary-foreground rounded-xl p-6 md:p-10">
        <p className="font-display text-xs tracking-widest text-primary-foreground/60 mb-2">FEATURED EVENT</p>
        <div className="flex flex-col md:flex-row gap-8">
          <div className="flex-1">
            <h3 className="font-display text-4xl md:text-5xl font-black leading-none mb-4">FOUNDERS<br />SUMMIT '25</h3>
            <p className="text-sm text-primary-foreground/70 font-body max-w-xs">
              An exclusive gathering of 200+ founders, investors, and mentors for a day of keynotes, pitch sessions, and meaningful connections.
            </p>
          </div>
          <div className="flex gap-4 items-end">
            <img
              src={speakerImg}
              alt="Keynote speaker"
              loading="lazy"
              width={640}
              height={800}
              className="w-40 md:w-52 h-56 md:h-72 object-cover rounded-lg img-grayscale"
            />
            <div className="flex flex-col gap-4 items-center">
              <img
                src={eventPosterImg}
                alt="Startup Pitch Event"
                loading="lazy"
                width={512}
                height={700}
                className="w-28 md:w-36 h-36 md:h-48 object-cover rounded-lg img-grayscale"
              />
              <img
                src={signatureImg}
                alt="Signature"
                loading="lazy"
                width={512}
                height={512}
                className="w-20 h-14 object-contain invert"
              />
            </div>
          </div>
        </div>
        <p className="font-display text-xs tracking-widest text-primary-foreground/50 mt-4">HOSTED BY NEXUS COMMUNITY</p>
      </div>

      {/* Stats row */}
      <div className="flex flex-col md:flex-row items-center justify-between mt-10 gap-6">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 bg-secondary rounded-lg flex items-center justify-center">
            <span className="text-2xl">🎤</span>
          </div>
          <p className="font-display text-xs tracking-widest text-muted-foreground">50+ EVENTS<br />EVERY QUARTER</p>
        </div>
        <div className="text-center">
          <p className="font-display text-xs tracking-widest text-muted-foreground">MEMBERS</p>
          <p className="font-display text-3xl font-bold text-foreground">12k+</p>
          <p className="text-xs text-muted-foreground font-body">Active community members</p>
        </div>
        <div className="text-center">
          <p className="font-display text-xs tracking-widest text-muted-foreground">CONNECTIONS MADE</p>
          <p className="font-display text-3xl font-bold text-foreground">50k+</p>
          <p className="text-xs text-muted-foreground font-body">Introductions & collaborations</p>
        </div>
      </div>
    </section>
  );
};

export default CatalogueSection;
