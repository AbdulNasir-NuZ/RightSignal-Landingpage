import { motion } from "framer-motion";
import mentorImg from "@/assets/mentor.jpg";
import { Link } from "react-router-dom";

const HierarchyCard = () => (
  <Link to="/team-hierarchy" className="group">
    <motion.div
      whileHover={{ scale: 1.03 }}
      transition={{ duration: 0.4 }}
      className="relative rounded-lg overflow-hidden"
    >
      <img
        src={mentorImg}
        alt="Team hierarchy spotlight"
        loading="lazy"
        width={512}
        height={640}
        className="w-40 h-48 object-cover media group-hover:grayscale-0"
      />
      <div className="absolute inset-0 bg-primary/30 pointer-events-none" />
      <div className="absolute bottom-3 left-3 right-3">
        <h4 className="font-display text-lg font-bold text-primary-foreground leading-tight">
          TEAM HIERARCHY
        </h4>
        <span className="font-display text-[10px] tracking-widest text-primary-foreground/60 bg-primary-foreground/10 px-2 py-0.5 rounded mt-1 inline-block">
          COMMUNITY GRAPH
        </span>
      </div>
    </motion.div>
  </Link>
);

export default HierarchyCard;
