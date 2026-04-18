import { useEffect, useMemo, useRef, useState } from "react";
import { motion, useAnimationFrame, useMotionValue } from "framer-motion";

const baseImages = [
  "/team/1.png",
  "/team/2.png",
  "/team/3.png",
  "/team/4.png",
  "/team/5.png",
  "/team/6.png",
  "/team/7.png",
  "/team/8.png",
  "/team/9.png",
  "/team/10.png",
  "/team/11.png",
 "/team/12.png",
  "/team/13.png",
  "/team/14.png",
  // "/team/15.png",
  // "/team/16.png",
  "/team/17.png",



].filter(Boolean);

const TeamImageCarousel = () => {
  const gallery = useMemo(() => [...baseImages, ...baseImages], []);
  const trackRef = useRef<HTMLDivElement>(null);
  const [loopWidth, setLoopWidth] = useState(0);
  const x = useMotionValue(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (!trackRef.current) return;

    const measure = () => {
      if (!trackRef.current) return;
      setLoopWidth((trackRef.current.scrollWidth || 0) / 2);
    };

    measure();

    const resizeObserver = new ResizeObserver(measure);
    resizeObserver.observe(trackRef.current);
    window.addEventListener("resize", measure);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, []);

  useAnimationFrame((_, delta) => {
    if (!loopWidth || isPaused) return;

    const pixelsPerSecond = 70;
    let next = x.get() - (pixelsPerSecond * delta) / 1000;

    if (Math.abs(next) >= loopWidth) {
      next += loopWidth;
    }

    x.set(next);
  });

  const dragBounds = loopWidth ? { left: -loopWidth, right: 0 } : { left: 0, right: 0 };

  return (
    <section className="px-6 md:px-12 pb-16">
      <div
        className="group relative overflow-hidden border-t border-border/60 bg-gradient-to-b from-background to-muted/30"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onPointerDown={() => setIsPaused(true)}
        onPointerUp={() => setIsPaused(false)}
      >
        <div className="pointer-events-none absolute left-0 top-0 h-full w-24 bg-gradient-to-r from-background via-background/80 to-transparent" />
        <div className="pointer-events-none absolute right-0 top-0 h-full w-24 bg-gradient-to-l from-background via-background/80 to-transparent" />

        <motion.div
          ref={trackRef}
          className="flex gap-4 sm:gap-6 py-10 will-change-transform select-none"
          style={{ x }}
          drag="x"
          dragConstraints={dragBounds}
          dragElastic={0.08}
          dragTransition={{ power: 0.3, timeConstant: 120 }}
          onDragStart={() => setIsPaused(true)}
          onDragEnd={() => setIsPaused(false)}
        >
          {gallery.map((src, index) => (
            <motion.div
              key={`${src}-${index}`}
              className="group/card relative shrink-0"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="relative rounded-xl p-[1.5px] bg-transparent group/card">
  {/* Animated border */}
  <div className="absolute inset-0 rounded-xl border border-black opacity-60 group-hover/card:opacity-100 transition-opacity duration-300" />

  <div className="overflow-hidden rounded-xl bg-foreground/[0.035] aspect-[3/4] w-[180px] sm:w-[220px] md:w-[300px] lg:w-[340px]">
    <img
      src={src}
      alt="Right Signal community"
      className="h-full w-full object-contain grayscale transition-all duration-500 ease-soft-out group-hover/card:grayscale-0 group-hover/card:scale-[1.03]"
    />
  </div>
</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default TeamImageCarousel;
