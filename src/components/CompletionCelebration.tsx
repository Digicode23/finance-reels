import { motion, AnimatePresence } from "framer-motion";
import { Trophy, Star, Sparkles } from "lucide-react";
import { useEffect, useState } from "react";

interface CompletionCelebrationProps {
  isVisible: boolean;
  onComplete: () => void;
  xpEarned: number;
  starsEarned: number;
}

export const CompletionCelebration = ({ 
  isVisible, 
  onComplete, 
  xpEarned, 
  starsEarned 
}: CompletionCelebrationProps) => {
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    if (isVisible) {
      setShowConfetti(true);
      const timer = setTimeout(() => {
        onComplete();
        setShowConfetti(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isVisible, onComplete]);

  return (
    <AnimatePresence>
      {isVisible && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center"
          >
            {/* Celebration card */}
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0, rotate: 180 }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
              className="bg-white rounded-3xl p-8 shadow-2xl max-w-md mx-4 relative overflow-hidden"
            >
              {/* Background decorations */}
              <div className="absolute inset-0 bg-gradient-to-br from-yellow-100 via-pink-100 to-purple-100 opacity-50" />
              
              {/* Trophy icon */}
              <motion.div
                animate={{ 
                  scale: [1, 1.2, 1],
                  rotate: [0, 10, -10, 0]
                }}
                transition={{ duration: 2, repeat: Infinity }}
                className="relative w-24 h-24 mx-auto mb-4 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center shadow-xl"
              >
                <Trophy className="w-12 h-12 text-white" />
              </motion.div>

              {/* Text */}
              <motion.h2
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="relative text-3xl font-bold text-center text-gray-800 mb-2"
              >
                Félicitations ! 🎉
              </motion.h2>

              <motion.p
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="relative text-center text-gray-600 mb-6"
              >
                Tu as terminé ce niveau avec succès !
              </motion.p>

              {/* Stats */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.4, type: "spring" }}
                className="relative flex justify-center gap-6 mb-4"
              >
                {/* XP earned */}
                <div className="flex flex-col items-center">
                  <div className="w-16 h-16 bg-blue-500 rounded-2xl flex items-center justify-center mb-2 shadow-lg">
                    <Sparkles className="w-8 h-8 text-white" />
                  </div>
                  <span className="text-2xl font-bold text-blue-500">+{xpEarned}</span>
                  <span className="text-sm text-gray-500">XP</span>
                </div>

                {/* Stars earned */}
                <div className="flex flex-col items-center">
                  <div className="w-16 h-16 bg-yellow-500 rounded-2xl flex items-center justify-center mb-2 shadow-lg">
                    <Star className="w-8 h-8 text-white" fill="currentColor" />
                  </div>
                  <span className="text-2xl font-bold text-yellow-500">{starsEarned}/3</span>
                  <span className="text-sm text-gray-500">Étoiles</span>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Confetti particles */}
          {showConfetti && (
            <div className="fixed inset-0 pointer-events-none z-50">
              {[...Array(50)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ 
                    x: "50vw", 
                    y: "50vh",
                    scale: 0,
                    rotate: 0
                  }}
                  animate={{ 
                    x: `${Math.random() * 100}vw`,
                    y: `${Math.random() * 100}vh`,
                    scale: Math.random() * 2 + 0.5,
                    rotate: Math.random() * 360
                  }}
                  transition={{ 
                    duration: Math.random() * 2 + 1,
                    ease: "easeOut"
                  }}
                  className={`absolute w-3 h-3 ${
                    i % 4 === 0 ? "bg-yellow-400" :
                    i % 4 === 1 ? "bg-pink-400" :
                    i % 4 === 2 ? "bg-purple-400" :
                    "bg-blue-400"
                  } rounded-full`}
                />
              ))}
            </div>
          )}
        </>
      )}
    </AnimatePresence>
  );
};
