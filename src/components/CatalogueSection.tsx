import mbappeImg from "@/assets/mbappe.jpg";
import magazineImg from "@/assets/magazine-cover.jpg";
import signatureImg from "@/assets/signature.png";

const CatalogueSection = () => {
  return (
    <section className="px-6 md:px-12 py-16">
      {/* Title */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
        <h2 className="font-display text-5xl md:text-7xl font-black text-foreground leading-none">
          TAKE A LOOK<br />OUR CATALOGUE
        </h2>
        <div className="mt-4 md:mt-0">
          <p className="font-display text-xs tracking-widest text-muted-foreground">ISSUE MARC 2025</p>
          <p className="text-sm text-muted-foreground mt-1 font-body">Magazine, Jersey, Ball, and<br />Collaboration</p>
        </div>
      </div>

      {/* Mbappe x Offside */}
      <div className="bg-primary text-primary-foreground rounded-xl p-6 md:p-10">
        <p className="font-display text-xs tracking-widest text-primary-foreground/60 mb-2">GIVE AWAY ALERT</p>
        <div className="flex flex-col md:flex-row gap-8">
          <div className="flex-1">
            <h3 className="font-display text-4xl md:text-5xl font-black leading-none mb-4">MBAPPE X<br />OFFSIDE</h3>
            <p className="text-sm text-primary-foreground/70 font-body max-w-xs">
              The collaboration with the young Prince of France to celebrate our 4th anniversary.
            </p>
          </div>
          <div className="flex gap-4 items-end">
            <img
              src={mbappeImg}
              alt="Mbappe"
              loading="lazy"
              width={640}
              height={800}
              className="w-40 md:w-52 h-56 md:h-72 object-cover rounded-lg img-grayscale"
            />
            <div className="flex flex-col gap-4 items-center">
              <img
                src={magazineImg}
                alt="Magazine VOL 1"
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
        <p className="font-display text-xs tracking-widest text-primary-foreground/50 mt-4">KYLIAN MBAPPE LOTTIN</p>
      </div>

      {/* Stats row */}
      <div className="flex flex-col md:flex-row items-center justify-between mt-10 gap-6">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 bg-secondary rounded-lg flex items-center justify-center">
            <span className="text-2xl">📺</span>
          </div>
          <p className="font-display text-xs tracking-widest text-muted-foreground">OUR 4TH<br />ANNIVERSARY SPECIAL</p>
        </div>
        <div className="text-center">
          <p className="font-display text-xs tracking-widest text-muted-foreground">CASH OUT</p>
          <p className="font-display text-3xl font-bold text-foreground">$15k</p>
          <p className="text-xs text-muted-foreground font-body">Total give away amount</p>
        </div>
        <div className="text-center">
          <p className="font-display text-xs tracking-widest text-muted-foreground">MERCHANDISE</p>
          <p className="font-display text-3xl font-bold text-foreground">1000+</p>
          <p className="text-xs text-muted-foreground font-body">Jersey, Magazine, Shoes</p>
        </div>
      </div>
    </section>
  );
};

export default CatalogueSection;
