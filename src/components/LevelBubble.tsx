import { motion } from "framer-motion";
import { Star, Video, Gift, Trophy, Zap, Book, Lock, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

interface LevelBubbleProps {
  id: number;
  title: string;
  type: "lesson" | "practice" | "video" | "chest" | "boss" | "story";
  color: string;
  isCompleted: boolean;
  isLocked: boolean;
  stars?: number;
  isNew?: boolean;
  onClick: () => void;
  index: number;
}

export const LevelBubble = ({
  id,
  title,
  type,
  color,
  isCompleted,
  isLocked,
  stars = 0,
  isNew = false,
  onClick,
  index
}: LevelBubbleProps) => {
  const getIcon = () => {
    if (isCompleted) {
      return <Star className="w-10 h-10 drop-shadow-xl" fill="currentColor" />;
    }
    
    switch (type) {
      case "video": return <Video className="w-9 h-9 drop-shadow-lg" />;
      case "chest": return <Gift className="w-10 h-10 drop-shadow-lg" />;
      case "boss": return <Trophy className="w-11 h-11 drop-shadow-lg" />;
      case "practice": return <Zap className="w-9 h-9 drop-shadow-lg" />;
      case "story": return <Book className="w-9 h-9 drop-shadow-lg" />;
      default: return <div className="w-5 h-5 rounded-full bg-white drop-shadow-lg" />;
    }
  };

  const getGradientClass = () => {
    if (isCompleted) {
      return "from-yellow-300 via-yellow-400 to-yellow-600";
    }
    if (isLocked) {
      return "from-gray-200 via-gray-300 to-gray-400";
    }
    
    switch (type) {
      case "chest": return "from-amber-400 via-yellow-500 to-amber-600";
      case "boss": return "from-red-400 via-pink-500 to-red-600";
      default:
        switch (color) {
          case "green": return "from-emerald-400 via-emerald-500 to-emerald-600";
          case "purple": return "from-violet-400 via-violet-500 to-violet-600";
          case "gold": return "from-amber-400 via-amber-500 to-amber-600";
          case "blue": return "from-blue-400 via-blue-500 to-blue-600";
          default: return "from-emerald-400 via-emerald-500 to-emerald-600";
        }
    }
  };

  const getBubbleSize = () => {
    if (type === "boss") return "w-32 h-32";
    if (type === "chest") return "w-28 h-28";
    return "w-24 h-24";
  };

  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ 
        delay: index * 0.1,
        type: "spring",
        stiffness: 200,
        damping: 15
      }}
      className="relative flex flex-col items-center"
    >
      {/* NEW badge */}
      {isNew && !isCompleted && !isLocked && (
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ delay: index * 0.1 + 0.3, type: "spring" }}
          className="absolute -top-3 -right-2 z-20 px-3 py-1 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full shadow-lg"
        >
          <span className="text-xs font-bold text-white uppercase tracking-wide flex items-center gap-1">
            <Sparkles className="w-3 h-3" />
            New
          </span>
        </motion.div>
      )}

      {/* Special indicator for chest */}
      {type === "chest" && !isCompleted && !isLocked && (
        <motion.div
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 1, repeat: Infinity }}
          className="absolute -top-2 -right-2 w-8 h-8 bg-red-500 rounded-full flex items-center justify-center text-white text-sm font-bold shadow-xl z-20"
        >
          !
        </motion.div>
      )}

      {/* Main bubble */}
      <motion.button
        onClick={isLocked ? undefined : onClick}
        disabled={isLocked}
        whileHover={!isLocked ? { scale: 1.1, y: -5 } : {}}
        whileTap={!isLocked ? { scale: 0.95 } : { x: [-5, 5, -5, 5, 0] }}
        className={cn(
          "relative rounded-full flex items-center justify-center text-white font-bold transition-all",
          "shadow-2xl",
          getBubbleSize(),
          `bg-gradient-to-b ${getGradientClass()}`,
          !isLocked && "cursor-pointer hover:shadow-3xl",
          isLocked && "cursor-not-allowed opacity-60"
        )}
        style={{
          boxShadow: isLocked 
            ? "0 10px 25px -5px rgba(0,0,0,0.3), inset 0 -3px 10px rgba(0,0,0,0.2)"
            : "0 15px 35px -5px rgba(0,0,0,0.4), inset 0 -5px 15px rgba(0,0,0,0.3), inset 0 3px 15px rgba(255,255,255,0.4)"
        }}
      >
        {/* Glossy overlay */}
        {!isLocked && (
          <div 
            className="absolute inset-0 rounded-full bg-gradient-to-b from-white/40 via-transparent to-transparent"
            style={{ 
              clipPath: "ellipse(70% 40% at 50% 20%)" 
            }}
          />
        )}

        {/* Icon */}
        <div className="relative z-10">
          {isLocked ? <Lock className="w-9 h-9 text-white/80" /> : getIcon()}
        </div>

        {/* Shimmer effect for unlocked levels */}
        {!isLocked && !isCompleted && (
          <motion.div
            className="absolute inset-0 rounded-full bg-gradient-to-r from-transparent via-white/30 to-transparent"
            initial={{ x: "-100%" }}
            animate={{ x: "200%" }}
            transition={{ 
              duration: 2, 
              repeat: Infinity,
              repeatDelay: 3
            }}
          />
        )}
      </motion.button>

      {/* Title */}
      <motion.span
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.1 + 0.2 }}
        className={cn(
          "text-sm font-bold text-center mt-2 max-w-[120px]",
          isLocked ? "text-gray-400" : "text-gray-700"
        )}
      >
        {title}
      </motion.span>

      {/* Bottom shadow */}
      <div 
        className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-16 h-4 bg-black/20 rounded-full blur-md"
      />
    </motion.div>
  );
};
