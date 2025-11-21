import { motion, AnimatePresence } from "framer-motion";
import mascotCharacter from "@/assets/mascot-character.png";

interface ProgressCharacterProps {
  position: "left" | "center" | "right";
  levelIndex: number;
  isVisible: boolean;
}

export const ProgressCharacter = ({ position, levelIndex, isVisible }: ProgressCharacterProps) => {
  const getXPosition = () => {
    switch (position) {
      case "left": return "10%";
      case "right": return "calc(100% - 100px)";
      default: return "calc(50% - 50px)";
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ scale: 0, rotate: -180, opacity: 0 }}
          animate={{ 
            scale: 1, 
            rotate: 0, 
            opacity: 1,
            y: [0, -10, 0]
          }}
          exit={{ scale: 0, rotate: 180, opacity: 0 }}
          transition={{ 
            scale: { type: "spring", stiffness: 200, damping: 15 },
            rotate: { duration: 0.5 },
            y: { 
              duration: 2, 
              repeat: Infinity, 
              ease: "easeInOut" 
            }
          }}
          className="absolute z-30 pointer-events-none"
          style={{
            left: getXPosition(),
            top: `${levelIndex * 140 - 120}px`,
          }}
        >
          {/* Character shadow */}
          <motion.div
            animate={{ 
              scale: [1, 0.8, 1],
              opacity: [0.3, 0.2, 0.3]
            }}
            transition={{ 
              duration: 2, 
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-16 h-4 bg-black/30 rounded-full blur-sm"
          />

          {/* Character */}
          <motion.div
            whileHover={{ scale: 1.1 }}
            className="relative w-24 h-24 cursor-pointer"
          >
            <img 
              src={mascotCharacter}
              alt="Mascotte"
              className="w-full h-full object-contain drop-shadow-2xl"
            />

            {/* Celebration particles */}
            <motion.div
              animate={{ 
                scale: [0, 1.5, 0],
                opacity: [0.8, 0, 0]
              }}
              transition={{ 
                duration: 2, 
                repeat: Infinity,
                repeatDelay: 3
              }}
              className="absolute inset-0 rounded-full bg-gradient-to-r from-yellow-400 via-pink-400 to-purple-400"
            />

            {/* Sparkles */}
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                animate={{
                  x: [0, Math.cos(i * 120 * Math.PI / 180) * 30],
                  y: [0, Math.sin(i * 120 * Math.PI / 180) * 30],
                  scale: [0, 1, 0],
                  opacity: [0, 1, 0]
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  delay: i * 0.3,
                  repeatDelay: 2
                }}
                className="absolute top-1/2 left-1/2 w-2 h-2 bg-yellow-400 rounded-full"
              />
            ))}
          </motion.div>

          {/* Speech bubble */}
          <motion.div
            initial={{ scale: 0, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            transition={{ delay: 0.5, type: "spring" }}
            className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-white rounded-2xl px-4 py-2 shadow-xl whitespace-nowrap"
          >
            <span className="text-sm font-bold text-gray-800">Bravo ! 🎉</span>
            <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-8 border-r-8 border-t-8 border-transparent border-t-white" />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
