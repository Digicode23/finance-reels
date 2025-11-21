import { ArrowLeft, Flame, Zap, Heart, Trophy } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import { motion } from "framer-motion";
import { BottomNav } from "@/components/BottomNav";
import { ChapterIsland } from "@/components/ChapterIsland";
import { LevelBubble } from "@/components/LevelBubble";
import { PathConnector } from "@/components/PathConnector";

import { CompletionCelebration } from "@/components/CompletionCelebration";
import { Leaderboard } from "@/components/Leaderboard";

const parcoursTitles: Record<string, string> = {
  pea: "C'est quoi un PEA ?",
  etf: "ETF pour débutants",
  immobilier: "Immobilier vs Livrets",
  holding: "Le fonctionnement d'une holding",
  fiscalite: "Optimiser sa fiscalité",
  crypto: "Crypto : risques et opportunités",
};

interface Level {
  id: number;
  title: string;
  type: "lesson" | "practice" | "video" | "chest" | "boss" | "story";
  color: string;
  isCompleted: boolean;
  isLocked: boolean;
  chapter: number;
  unit: number;
  stars?: number;
  isNew?: boolean;
}

const chapters = [
  {
    id: 1,
    title: "Les fondamentaux",
    unit: 1,
    description: "Découvre les bases essentielles",
  },
  {
    id: 2,
    title: "Approfondissement",
    unit: 2,
    description: "Va plus loin dans ta compréhension",
  },
  {
    id: 3,
    title: "Expertise",
    unit: 3,
    description: "Deviens un expert",
  },
];

const levels: Level[] = [
  // Chapter 1 - Unit 1
  { id: 1, title: "Introduction", type: "lesson", color: "green", isCompleted: true, isLocked: false, chapter: 1, unit: 1, stars: 3 },
  { id: 2, title: "Les bases", type: "lesson", color: "green", isCompleted: true, isLocked: false, chapter: 1, unit: 1, stars: 2 },
  { id: 3, title: "Pratique", type: "practice", color: "green", isCompleted: false, isLocked: false, chapter: 1, unit: 1, isNew: true },
  { id: 4, title: "Histoire", type: "story", color: "purple", isCompleted: false, isLocked: false, chapter: 1, unit: 1 },
  { id: 5, title: "Révision", type: "video", color: "purple", isCompleted: false, isLocked: true, chapter: 1, unit: 1 },
  
  // Chapter 2 - Unit 2
  { id: 6, title: "Niveau avancé", type: "lesson", color: "purple", isCompleted: false, isLocked: true, chapter: 2, unit: 2 },
  { id: 7, title: "Quiz", type: "practice", color: "purple", isCompleted: false, isLocked: true, chapter: 2, unit: 2 },
  { id: 8, title: "Coffre bonus", type: "chest", color: "gold", isCompleted: false, isLocked: true, chapter: 2, unit: 2 },
  { id: 9, title: "Expert", type: "lesson", color: "gold", isCompleted: false, isLocked: true, chapter: 2, unit: 2 },
  
  // Chapter 3 - Unit 3
  { id: 10, title: "Challenge final", type: "boss", color: "gold", isCompleted: false, isLocked: false, chapter: 3, unit: 3 },
];

const Parcours = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const title = id ? parcoursTitles[id] || "Parcours" : "Mes parcours";
  
  const [showCelebration, setShowCelebration] = useState(false);
  const [showLeaderboard, setShowLeaderboard] = useState(false);
  
  const completedLevels = levels.filter(l => l.isCompleted).length;

  const getLevelPosition = (index: number): "left" | "center" | "right" => {
    const positions: ("left" | "center" | "right")[] = ["center", "left", "right", "center", "left"];
    return positions[index % 5];
  };

  const getChapterProgress = (chapterId: number) => {
    const chapterLevels = levels.filter(l => l.chapter === chapterId);
    const completed = chapterLevels.filter(l => l.isCompleted).length;
    return (completed / chapterLevels.length) * 100;
  };

  const handleLevelClick = (levelId: number) => {
    // Simulate level completion for demo
    // In real app, navigate to level
    navigate(`/parcours/${id}/niveau/${levelId}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-100 via-blue-50 to-indigo-50 pb-24 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Floating clouds */}
        <div className="absolute top-20 left-10 w-32 h-16 bg-white/40 rounded-full blur-xl animate-float" />
        <div className="absolute top-40 right-20 w-40 h-20 bg-white/30 rounded-full blur-xl animate-float-delayed" />
        <div className="absolute top-96 left-1/4 w-24 h-12 bg-white/30 rounded-full blur-xl animate-float" />
      </div>

      {/* Header with stats */}
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md shadow-md">
        <div className="px-4 py-3">
          <button 
            onClick={() => navigate("/")}
            className="flex items-center gap-2 text-foreground mb-3 hover:text-primary transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="font-medium">Retour</span>
          </button>

          {/* Stats row */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-4">
              {/* Streak */}
              <div className="flex items-center gap-1.5 group cursor-pointer">
                <Flame className="w-6 h-6 text-orange-500 group-hover:scale-110 transition-transform" fill="currentColor" />
                <span className="text-lg font-bold text-orange-500">7</span>
              </div>

              {/* XP */}
              <div className="flex items-center gap-1.5 group cursor-pointer">
                <div className="w-6 h-6 bg-blue-500 rounded-md flex items-center justify-center group-hover:scale-110 transition-transform shadow-sm">
                  <Zap className="w-4 h-4 text-white" fill="currentColor" />
                </div>
                <span className="text-lg font-bold text-blue-500">850</span>
              </div>

              {/* Hearts */}
              <div className="flex items-center gap-1.5 group cursor-pointer">
                <Heart className="w-6 h-6 text-pink-500 group-hover:scale-110 transition-transform" fill="currentColor" />
                <span className="text-lg font-bold text-pink-500">5</span>
              </div>
            </div>

            {/* Trophy league - clickable */}
            <button 
              onClick={() => setShowLeaderboard(true)}
              className="flex items-center gap-2 px-3 py-1.5 bg-yellow-100 rounded-full hover:bg-yellow-200 transition-colors"
            >
              <Trophy className="w-5 h-5 text-yellow-600" />
              <span className="text-sm font-bold text-yellow-600">Division Or</span>
            </button>
          </div>

          <h1 className="text-xl font-bold text-gray-800">{title}</h1>
        </div>
      </header>

      {/* Path with chapters and levels */}
      <div className="max-w-2xl mx-auto px-4 py-8 relative">
        {chapters.map((chapter, chapterIndex) => {
          const chapterLevels = levels.filter(l => l.chapter === chapter.id);
          const progress = getChapterProgress(chapter.id);
          
          return (
            <div key={chapter.id} className="mb-12">
              {/* Chapter Island */}
              <ChapterIsland
                id={chapter.id}
                title={chapter.title}
                unit={chapter.unit}
                description={chapter.description}
                progress={progress}
                index={chapterIndex}
              />

              {/* Levels path */}
              <div className="relative space-y-8 mt-12">
                {chapterLevels.map((level, levelIndex) => {
                  const position = getLevelPosition(levelIndex);
                  const positionClass = 
                    position === "left" ? "justify-start pl-8" :
                    position === "right" ? "justify-end pr-8" :
                    "justify-center";

                  const nextLevel = chapterLevels[levelIndex + 1];
                  const nextPosition = nextLevel ? getLevelPosition(levelIndex + 1) : "center";

                  return (
                    <div key={level.id}>
                      {/* Path connector to next level */}
                      {levelIndex < chapterLevels.length - 1 && (
                        <PathConnector
                          fromPosition={position}
                          toPosition={nextPosition}
                          isCompleted={level.isCompleted}
                          index={levelIndex}
                        />
                      )}

                      {/* Level bubble */}
                      <div className={`flex items-center ${positionClass} relative z-10`}>
                        <LevelBubble
                          id={level.id}
                          title={level.title}
                          type={level.type}
                          color={level.color}
                          isCompleted={level.isCompleted}
                          isLocked={level.isLocked}
                          stars={level.stars}
                          isNew={level.isNew}
                          onClick={() => handleLevelClick(level.id)}
                          index={levelIndex}
                        />
                      </div>
                    </div>
                  );
                })}

                {/* Unit completion CTA */}
                <div className="flex justify-center mt-12">
                  <motion.button
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-8 py-4 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white font-bold rounded-2xl shadow-xl hover:shadow-2xl transition-all"
                  >
                    Révision de l'unité {chapter.unit}
                  </motion.button>
                </div>
              </div>

              {/* Separator between chapters (except last) */}
              {chapterIndex < chapters.length - 1 && (
                <div className="my-16 flex items-center justify-center">
                  <div className="h-1 bg-gradient-to-r from-transparent via-gray-300 to-transparent flex-1 max-w-xs rounded-full"></div>
                </div>
              )}
            </div>
          );
        })}

        {/* Final trophy */}
        <motion.a
          href="https://mabanque.bnpparibas/fr/bourse/les-comptes-dedies/plan-epargne-actions"
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.05, y: -5 }}
          whileTap={{ scale: 0.95 }}
          className="mt-20 mb-8 flex flex-col items-center cursor-pointer group"
        >
          <div className="w-32 h-32 rounded-full bg-gradient-to-br from-yellow-400 to-yellow-600 flex items-center justify-center shadow-2xl relative transition-all group-hover:shadow-3xl">
            <Trophy className="w-16 h-16 text-white" />
            <div className="absolute inset-0 rounded-full bg-gradient-to-b from-white/40 via-transparent to-transparent" style={{ clipPath: "ellipse(70% 40% at 50% 20%)" }} />
          </div>
          <span className="mt-4 text-2xl font-bold text-gray-800 group-hover:text-yellow-600 transition-colors">Expert Certifié</span>
          <span className="text-sm text-gray-500 mt-1 group-hover:text-gray-700 transition-colors">Ouvrir mon PEA chez BNP Paribas →</span>
        </motion.a>
      </div>

      {/* Completion celebration */}
      <CompletionCelebration
        isVisible={showCelebration}
        onComplete={() => setShowCelebration(false)}
        xpEarned={50}
        starsEarned={3}
      />

      {/* Leaderboard */}
      <Leaderboard 
        isOpen={showLeaderboard} 
        onClose={() => setShowLeaderboard(false)} 
      />

      <BottomNav />
    </div>
  );
};

export default Parcours;
