import { motion } from "framer-motion";

interface PathConnectorProps {
  fromPosition: "left" | "center" | "right";
  toPosition: "left" | "center" | "right";
  isCompleted: boolean;
  index: number;
}

export const PathConnector = ({ fromPosition, toPosition, isCompleted, index }: PathConnectorProps) => {
  const getXPosition = (position: "left" | "center" | "right") => {
    switch (position) {
      case "left": return "20%";
      case "right": return "80%";
      default: return "50%";
    }
  };

  const fromX = getXPosition(fromPosition);
  const toX = getXPosition(toPosition);
  
  // Calculate curve control points
  const fromXNum = fromPosition === "left" ? 20 : fromPosition === "right" ? 80 : 50;
  const toXNum = toPosition === "left" ? 20 : toPosition === "right" ? 80 : 50;
  const midX = (fromXNum + toXNum) / 2;

  return (
    <svg 
      className="absolute inset-0 w-full pointer-events-none" 
      style={{ height: '120px', top: '-20px' }}
      preserveAspectRatio="none"
    >
      <defs>
        <linearGradient id={`gradient-${index}`} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor={isCompleted ? "#10b981" : "#e5e7eb"} />
          <stop offset="100%" stopColor={isCompleted ? "#059669" : "#d1d5db"} />
        </linearGradient>
      </defs>
      
      <motion.path
        d={`M ${fromX} 10 Q ${midX}% 60 ${toX} 110`}
        stroke={`url(#gradient-${index})`}
        strokeWidth="6"
        fill="none"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: isCompleted ? 1 : 0.3 }}
        transition={{ duration: 0.8, delay: index * 0.1 }}
      />
      
      {/* Decorative dots along the path */}
      {[0.25, 0.5, 0.75].map((offset, i) => {
        const x = fromXNum + (toXNum - fromXNum) * offset;
        const y = 10 + 50 * Math.sin(offset * Math.PI);
        
        return (
          <motion.circle
            key={i}
            cx={`${x}%`}
            cy={y}
            r="3"
            fill={isCompleted ? "#10b981" : "#d1d5db"}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: index * 0.1 + i * 0.1 }}
          />
        );
      })}
    </svg>
  );
};
