import { Trophy, Star, Zap, Crown, Target, TrendingUp, Award, Sparkles, Lock } from "lucide-react";
import { BottomNav } from "@/components/BottomNav";
import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface TrophyItem {
  id: number;
  name: string;
  description: string;
  icon: any;
  color: string;
  isUnlocked: boolean;
  category: "beginner" | "progression" | "master" | "special";
  xpReward: number;
  progress?: number;
  target?: number;
}

const trophies: TrophyItem[] = [
  // Débutant
  { id: 1, name: "Premier pas", description: "Termine ton premier niveau", icon: Trophy, color: "from-blue-400 to-blue-600", isUnlocked: true, category: "beginner", xpReward: 10 },
  { id: 2, name: "Débutant", description: "Atteins le niveau 2", icon: Star, color: "from-green-400 to-green-600", isUnlocked: true, category: "beginner", xpReward: 25 },
  { id: 3, name: "Apprenti", description: "Termine 5 niveaux", icon: Target, color: "from-purple-400 to-purple-600", isUnlocked: false, category: "beginner", xpReward: 50, progress: 3, target: 5 },
  
  // Progression
  { id: 4, name: "Série de 7", description: "7 jours consécutifs", icon: Zap, color: "from-yellow-400 to-orange-500", isUnlocked: true, category: "progression", xpReward: 100 },
  { id: 5, name: "Marathon", description: "14 jours consécutifs", icon: TrendingUp, color: "from-orange-400 to-red-500", isUnlocked: false, category: "progression", xpReward: 200, progress: 7, target: 14 },
  { id: 6, name: "Invincible", description: "30 jours consécutifs", icon: Crown, color: "from-red-400 to-pink-600", isUnlocked: false, category: "progression", xpReward: 500, progress: 7, target: 30 },
  
  // Maître
  { id: 7, name: "Expert PEA", description: "Maîtrise tous les modules PEA", icon: Award, color: "from-indigo-400 to-purple-600", isUnlocked: false, category: "master", xpReward: 300 },
  { id: 8, name: "Investisseur", description: "Score parfait sur 10 niveaux", icon: Star, color: "from-pink-400 to-purple-600", isUnlocked: false, category: "master", xpReward: 400 },
  
  // Spécial
  { id: 9, name: "Champion", description: "Termine le Challenge Final", icon: Crown, color: "from-yellow-300 to-yellow-600", isUnlocked: false, category: "special", xpReward: 500 },
  { id: 10, name: "Perfectionniste", description: "3 étoiles sur tous les niveaux", icon: Sparkles, color: "from-cyan-400 to-blue-600", isUnlocked: false, category: "special", xpReward: 1000 },
];

const categoryLabels = {
  beginner: "🎯 Débutant",
  progression: "📈 Progression",
  master: "🎓 Maître",
  special: "✨ Spécial"
};

const Trophees = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  
  const unlockedCount = trophies.filter(t => t.isUnlocked).length;
  const totalCount = trophies.length;
  const completionPercentage = (unlockedCount / totalCount) * 100;

  const filteredTrophies = selectedCategory === "all" 
    ? trophies 
    : trophies.filter(t => t.category === selectedCategory);

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 via-yellow-50 to-white pb-20">
      {/* Hero Header */}
      <header className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-yellow-400 via-orange-500 to-red-500" />
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjEiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-30" />
        
        <div className="relative px-4 py-8">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", duration: 0.6 }}
            className="w-24 h-24 mx-auto mb-4 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center border-4 border-white/40"
          >
            <Trophy className="w-12 h-12 text-white" />
          </motion.div>
          
          <h1 className="text-3xl font-bold text-white text-center mb-2">
            Tes Trophées
          </h1>
          
          <div className="text-center mb-6">
            <p className="text-white/90 text-lg font-semibold">
              {unlockedCount} / {totalCount} débloqués
            </p>
            <div className="w-full max-w-xs mx-auto mt-3 h-3 bg-white/20 rounded-full overflow-hidden backdrop-blur-sm">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${completionPercentage}%` }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="h-full bg-white rounded-full shadow-glow"
              />
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-3 gap-3 max-w-md mx-auto">
            <Card className="p-3 bg-white/10 border-white/20 backdrop-blur-sm">
              <div className="text-center">
                <div className="text-2xl font-bold text-white">{unlockedCount}</div>
                <div className="text-xs text-white/80">Débloqués</div>
              </div>
            </Card>
            <Card className="p-3 bg-white/10 border-white/20 backdrop-blur-sm">
              <div className="text-center">
                <div className="text-2xl font-bold text-white">
                  {trophies.filter(t => t.isUnlocked).reduce((sum, t) => sum + t.xpReward, 0)}
                </div>
                <div className="text-xs text-white/80">XP gagné</div>
              </div>
            </Card>
            <Card className="p-3 bg-white/10 border-white/20 backdrop-blur-sm">
              <div className="text-center">
                <div className="text-2xl font-bold text-white">
                  {Math.round(completionPercentage)}%
                </div>
                <div className="text-xs text-white/80">Complétés</div>
              </div>
            </Card>
          </div>
        </div>
      </header>

      {/* Category Filter */}
      <div className="sticky top-0 z-10 bg-white/80 backdrop-blur-md border-b border-gray-200 px-4 py-3">
        <div className="flex gap-2 overflow-x-auto scrollbar-hide">
          <button
            onClick={() => setSelectedCategory("all")}
            className={cn(
              "px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all",
              selectedCategory === "all"
                ? "bg-orange-500 text-white shadow-md"
                : "bg-white text-gray-600 border border-gray-200"
            )}
          >
            🏆 Tous
          </button>
          {Object.entries(categoryLabels).map(([key, label]) => (
            <button
              key={key}
              onClick={() => setSelectedCategory(key)}
              className={cn(
                "px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all",
                selectedCategory === key
                  ? "bg-orange-500 text-white shadow-md"
                  : "bg-white text-gray-600 border border-gray-200"
              )}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Trophies Grid */}
      <div className="px-4 py-6 space-y-4">
        {filteredTrophies.map((trophy, index) => {
          const Icon = trophy.icon;
          const progressPercent = trophy.progress && trophy.target 
            ? (trophy.progress / trophy.target) * 100 
            : 0;

          return (
            <motion.div
              key={trophy.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Card className={cn(
                "p-4 transition-all duration-300",
                trophy.isUnlocked 
                  ? "shadow-card hover:shadow-elevated cursor-pointer border-2 border-transparent hover:border-orange-200" 
                  : "opacity-60 bg-gray-50"
              )}>
                <div className="flex gap-4">
                  {/* Trophy Icon */}
                  <div className="relative">
                    <div className={cn(
                      "w-16 h-16 rounded-2xl flex items-center justify-center transition-transform",
                      trophy.isUnlocked 
                        ? `bg-gradient-to-br ${trophy.color} shadow-lg hover:scale-110` 
                        : "bg-gray-200"
                    )}>
                      {trophy.isUnlocked ? (
                        <Icon className="w-8 h-8 text-white" />
                      ) : (
                        <Lock className="w-8 h-8 text-gray-400" />
                      )}
                    </div>
                    {trophy.isUnlocked && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="absolute -top-1 -right-1 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center border-2 border-white"
                      >
                        <Star className="w-3 h-3 text-white fill-white" />
                      </motion.div>
                    )}
                  </div>

                  {/* Trophy Info */}
                  <div className="flex-1">
                    <h3 className={cn(
                      "font-bold text-lg mb-1",
                      trophy.isUnlocked ? "text-foreground" : "text-gray-500"
                    )}>
                      {trophy.name}
                    </h3>
                    <p className={cn(
                      "text-sm mb-2",
                      trophy.isUnlocked ? "text-muted-foreground" : "text-gray-400"
                    )}>
                      {trophy.description}
                    </p>

                    {/* Progress bar for locked trophies */}
                    {!trophy.isUnlocked && trophy.progress !== undefined && trophy.target !== undefined && (
                      <div className="space-y-1">
                        <div className="flex justify-between text-xs text-gray-500">
                          <span>{trophy.progress} / {trophy.target}</span>
                          <span>{Math.round(progressPercent)}%</span>
                        </div>
                        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-gradient-to-r from-orange-400 to-orange-600 rounded-full transition-all"
                            style={{ width: `${progressPercent}%` }}
                          />
                        </div>
                      </div>
                    )}

                    {/* XP Reward */}
                    <div className="flex items-center gap-1 mt-2">
                      <Zap className={cn(
                        "w-4 h-4",
                        trophy.isUnlocked ? "text-yellow-500 fill-yellow-500" : "text-gray-400"
                      )} />
                      <span className={cn(
                        "text-sm font-semibold",
                        trophy.isUnlocked ? "text-yellow-600" : "text-gray-400"
                      )}>
                        +{trophy.xpReward} XP
                      </span>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {/* Motivational CTA */}
      {unlockedCount < totalCount && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="px-4 pb-6"
        >
          <Card className="p-6 bg-gradient-to-br from-orange-100 to-yellow-100 border-2 border-orange-200">
            <div className="text-center space-y-2">
              <div className="text-4xl mb-2">🎯</div>
              <h3 className="font-bold text-lg text-foreground">
                Continue comme ça !
              </h3>
              <p className="text-sm text-muted-foreground">
                Encore {totalCount - unlockedCount} trophées à débloquer
              </p>
            </div>
          </Card>
        </motion.div>
      )}

      <BottomNav />
    </div>
  );
};

export default Trophees;
