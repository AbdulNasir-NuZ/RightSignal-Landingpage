const leagues = [
  { name: "BUNDESLIGA", flag: "🇩🇪" },
  { name: "PREMIER LEAGUE", flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿" },
  { name: "SERIE A", flag: "🇮🇹" },
  { name: "LA LIGA", flag: "🇪🇸" },
];

const LeaguesSection = () => {
  return (
    <section className="px-6 md:px-12 py-12">
      {leagues.map((league, i) => (
        <div
          key={i}
          className="flex items-center justify-between py-4 border-b border-border group cursor-pointer hover:bg-secondary/50 transition-colors px-2"
        >
          <div className="flex items-center gap-3">
            <h3 className="font-display text-lg md:text-2xl font-bold tracking-wide text-foreground">{league.name}</h3>
            <span className="text-lg">{league.flag}</span>
          </div>
          <span className="font-display text-xs tracking-widest text-muted-foreground group-hover:text-foreground transition-colors">VIEW MORE</span>
        </div>
      ))}
    </section>
  );
};

export default LeaguesSection;
