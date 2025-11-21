import { motion } from "framer-motion";
import { Book, Rocket, Trophy, Menu } from "lucide-react";

interface ChapterIslandProps {
  id: number;
  title: string;
  unit: number;
  description: string;
  progress: number;
  index: number;
}

export const ChapterIsland = ({ id, title, unit, description, progress, index }: ChapterIslandProps) => {
  const getGradientClass = (id: number) => {
    switch (id) {
      case 1: return "from-emerald-400 via-emerald-500 to-emerald-600";
      case 2: return "from-violet-400 via-violet-500 to-violet-600";
      case 3: return "from-amber-400 via-amber-500 to-amber-600";
      default: return "from-emerald-400 via-emerald-500 to-emerald-600";
    }
  };

  const getIcon = (id: number) => {
    switch (id) {
      case 1: return <Book className="w-12 h-12" />;
      case 2: return <Rocket className="w-12 h-12" />;
      case 3: return <Trophy className="w-12 h-12" />;
      default: return <Book className="w-12 h-12" />;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ 
        duration: 0.6, 
        delay: index * 0.2,
        type: "spring",
        stiffness: 100
      }}
      className="relative mb-8"
    >
      {/* Main island container */}
      <div 
        className={`
          relative rounded-3xl p-8 overflow-hidden shadow-2xl
          bg-gradient-to-br ${getGradientClass(id)}
          transform hover:scale-[1.02] transition-transform duration-300
        `}
        style={{
          boxShadow: `
            0 20px 50px -10px rgba(0,0,0,0.3),
            inset 0 -5px 20px rgba(0,0,0,0.2),
            inset 0 5px 20px rgba(255,255,255,0.2)
          `
        }}
      >
        {/* Menu button */}
        <motion.button 
          whileHover={{ scale: 1.1, rotate: 90 }}
          whileTap={{ scale: 0.9 }}
          className="absolute top-6 right-6 w-12 h-12 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center hover:bg-white/30 transition-colors z-20 shadow-lg"
        >
          <Menu className="w-6 h-6 text-white" />
        </motion.button>

        {/* Content */}
        <div className="relative z-10">
          {/* Badge */}
          <motion.div 
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: index * 0.2 + 0.2 }}
            className="inline-block px-4 py-1.5 bg-white/30 backdrop-blur-sm rounded-full mb-4"
          >
            <span className="text-white/95 text-xs uppercase tracking-wider font-bold">
              Chapitre {id} • Unité {unit}
            </span>
          </motion.div>

          {/* Title */}
          <motion.h2 
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: index * 0.2 + 0.3 }}
            className="text-white text-3xl font-bold mb-2 drop-shadow-lg"
          >
            {title}
          </motion.h2>

          {/* Description */}
          <motion.p 
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: index * 0.2 + 0.4 }}
            className="text-white/95 text-base mb-4"
          >
            {description}
          </motion.p>

          {/* Progress bar */}
          <motion.div 
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: index * 0.2 + 0.5, duration: 0.6 }}
            className="h-3 bg-white/20 rounded-full overflow-hidden backdrop-blur-sm"
          >
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ delay: index * 0.2 + 0.7, duration: 0.8 }}
              className="h-full bg-white/90 rounded-full shadow-inner"
            />
          </motion.div>
          <motion.span 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: index * 0.2 + 0.8 }}
            className="text-white/90 text-sm font-medium mt-2 inline-block"
          >
            {Math.round(progress)}% complété
          </motion.span>
        </div>

        {/* Decorative floating icon */}
        <motion.div 
          animate={{ 
            y: [0, -15, 0],
            rotate: [0, 5, 0, -5, 0]
          }}
          transition={{ 
            duration: 4, 
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute -right-4 -bottom-4 text-white/10"
        >
          {getIcon(id)}
        </motion.div>

        {/* Shimmer effect */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
          initial={{ x: "-100%" }}
          animate={{ x: "200%" }}
          transition={{ 
            duration: 3, 
            repeat: Infinity,
            repeatDelay: 5
          }}
        />

        {/* Bottom shadow for 3D effect */}
        <div 
          className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-black/30 to-transparent rounded-b-3xl"
        />
      </div>

      {/* Island shadow */}
      <div 
        className="absolute -bottom-4 left-8 right-8 h-6 bg-black/10 rounded-full blur-xl"
      />
    </motion.div>
  );
};
