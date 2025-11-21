import { ArrowLeft, Flame, Zap, Heart, Trophy, Star, Video, Lock, Gift, Book, CheckCircle } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { BottomNav } from "@/components/BottomNav";
import { Progress } from "@/components/ui/progress";

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
  { id: 1, title: "Introduction", type: "lesson", color: "green", isCompleted: true, isLocked: false, chapter: 1, unit: 1 },
  { id: 2, title: "Les bases", type: "lesson", color: "green", isCompleted: true, isLocked: false, chapter: 1, unit: 1 },
  { id: 3, title: "Pratique", type: "practice", color: "green", isCompleted: false, isLocked: false, chapter: 1, unit: 1 },
  { id: 4, title: "Histoire", type: "story", color: "purple", isCompleted: false, isLocked: false, chapter: 1, unit: 1 },
  { id: 5, title: "Révision", type: "video", color: "purple", isCompleted: false, isLocked: true, chapter: 1, unit: 1 },
  
  // Chapter 2 - Unit 2
  { id: 6, title: "Niveau avancé", type: "lesson", color: "purple", isCompleted: false, isLocked: true, chapter: 2, unit: 2 },
  { id: 7, title: "Quiz", type: "practice", color: "purple", isCompleted: false, isLocked: true, chapter: 2, unit: 2 },
  { id: 8, title: "Coffre bonus", type: "chest", color: "gold", isCompleted: false, isLocked: true, chapter: 2, unit: 2 },
  { id: 9, title: "Expert", type: "lesson", color: "gold", isCompleted: false, isLocked: true, chapter: 2, unit: 2 },
  
  // Chapter 3 - Unit 3
  { id: 10, title: "Challenge final", type: "boss", color: "gold", isCompleted: false, isLocked: true, chapter: 3, unit: 3 },
];

const Parcours = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const title = id ? parcoursTitles[id] || "Parcours" : "Mes parcours";
  
  const completedLevels = levels.filter(l => l.isCompleted).length;

  const getIconForType = (type: string, isCompleted: boolean) => {
    if (isCompleted) {
      return <Star className="w-10 h-10 drop-shadow-lg" fill="currentColor" />;
    }
    
    switch (type) {
      case "video":
        return <Video className="w-9 h-9 drop-shadow-lg" />;
      case "chest":
        return <Gift className="w-10 h-10 drop-shadow-lg" />;
      case "boss":
        return <Trophy className="w-11 h-11 drop-shadow-lg" />;
      case "practice":
        return <Zap className="w-9 h-9 drop-shadow-lg" />;
      case "story":
        return <Book className="w-9 h-9 drop-shadow-lg" />;
      default:
        return <div className="w-4 h-4 rounded-full bg-white drop-shadow-lg" />;
    }
  };

  const getColorClass = (color: string, isCompleted: boolean, isLocked: boolean, type: string) => {
    if (isCompleted) {
      return "bg-gradient-to-b from-yellow-300 via-yellow-400 to-yellow-600 level-button-3d border-4 border-white/30";
    }
    if (isLocked) {
      return "bg-gradient-to-b from-gray-200 to-gray-300 level-button-locked border-4 border-gray-100";
    }
    
    // Special styles for chest and boss
    if (type === "chest") {
      return "chest-button border-4 border-white/20";
    }
    if (type === "boss") {
      return "coin-button border-4 border-white/20";
    }
    
    switch (color) {
      case "green":
        return "bg-gradient-to-b from-green-300 via-green-400 to-green-600 level-button-3d border-4 border-white/30";
      case "purple":
        return "bg-gradient-to-b from-purple-300 via-purple-400 to-purple-600 level-button-3d border-4 border-white/30";
      case "gold":
        return "bg-gradient-to-b from-yellow-300 via-yellow-400 to-yellow-600 level-button-3d border-4 border-white/30";
      case "blue":
        return "bg-gradient-to-b from-blue-300 via-blue-400 to-blue-600 level-button-3d border-4 border-white/30";
      default:
        return "bg-gradient-to-b from-green-300 via-green-400 to-green-600 level-button-3d border-4 border-white/30";
    }
  };

  const getLevelPosition = (index: number): "left" | "center" | "right" => {
    const positions: ("left" | "center" | "right")[] = ["center", "left", "right", "center", "left"];
    return positions[index % 5];
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white pb-24">
      {/* Header with stats */}
      <header className="sticky top-0 z-40 bg-white shadow-md">
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

            {/* Trophy league */}
            <div className="flex items-center gap-2 px-3 py-1.5 bg-yellow-100 rounded-full cursor-pointer hover:bg-yellow-200 transition-colors">
              <Trophy className="w-5 h-5 text-yellow-600" />
              <span className="text-sm font-bold text-yellow-600">Division Or</span>
            </div>
          </div>

          <h1 className="text-xl font-bold text-gray-800">{title}</h1>
        </div>
      </header>

      {/* Path with chapters and levels */}
      <div className="max-w-2xl mx-auto px-4 py-6">
        {chapters.map((chapter, chapterIndex) => {
          const chapterLevels = levels.filter(l => l.chapter === chapter.id);
          const isFirstChapter = chapterIndex === 0;
          
          return (
            <div key={chapter.id} className="mb-8">
              {/* Chapter header banner */}
              <div 
                className={`
                  relative rounded-2xl p-6 mb-8 chapter-banner-3d overflow-hidden
                  ${chapter.id === 1 ? "bg-gradient-to-br from-green-400 to-green-600" : ""}
                  ${chapter.id === 2 ? "bg-gradient-to-br from-purple-400 to-purple-600" : ""}
                  ${chapter.id === 3 ? "bg-gradient-to-br from-yellow-400 to-yellow-600" : ""}
                `}
              >
                {/* Icon button in top right corner */}
                <button className="absolute top-4 right-4 w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center hover:bg-white/30 transition-colors z-20 active:scale-95">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                </button>

                <div className="relative z-10">
                  <div className="text-white/90 text-xs uppercase tracking-wider font-bold mb-1">
                    Chapitre {chapter.id}, Unité {chapter.unit}
                  </div>
                  <h2 className="text-white text-2xl font-bold mb-2">
                    {chapter.title}
                  </h2>
                  <p className="text-white/90 text-sm">
                    {chapter.description}
                  </p>
                </div>
                
                {/* Decorative icon */}
                <div className="absolute -right-4 -bottom-4 text-8xl opacity-20">
                  {chapter.id === 1 && "📚"}
                  {chapter.id === 2 && "🚀"}
                  {chapter.id === 3 && "🏆"}
                </div>
              </div>

              {/* Levels path */}
              <div className="relative space-y-6">
                {/* Animated character - only on first chapter */}
                {isFirstChapter && completedLevels > 0 && (
                  <div 
                    className="absolute transition-all duration-1000 z-20 pointer-events-none"
                    style={{
                      left: getLevelPosition(completedLevels - 1) === "left" ? "10%" :
                            getLevelPosition(completedLevels - 1) === "right" ? "calc(100% - 80px)" :
                            "calc(50% - 40px)",
                      top: `${(completedLevels - 1) * 100 + 10}px`,
                    }}
                  >
                    <div className="text-6xl animate-bounce drop-shadow-lg">
                      🦸
                    </div>
                  </div>
                )}

                {chapterLevels.map((level, levelIndex) => {
                  const position = getLevelPosition(levelIndex);
                  const positionClass = 
                    position === "left" ? "justify-start pl-8" :
                    position === "right" ? "justify-end pr-8" :
                    "justify-center";

                  return (
                    <div key={level.id}>
                      {/* Level button container */}
                      <div className={`flex items-center ${positionClass}`}>
                        <div className="relative flex flex-col items-center">
                          {/* Level button */}
                          <button
                            onClick={() => !level.isLocked && navigate(`/parcours/${id}/niveau/${level.id}`)}
                            disabled={level.isLocked}
                            className={`
                              relative z-10 w-24 h-24 rounded-full flex items-center justify-center
                              text-white font-bold transition-all duration-300
                              ${getColorClass(level.color, level.isCompleted, level.isLocked, level.type)}
                              ${!level.isLocked ? "cursor-pointer" : "cursor-not-allowed opacity-60"}
                            `}
                          >
                            {level.isLocked ? (
                              <Lock className="w-8 h-8 text-white/80" />
                            ) : (
                              getIconForType(level.type, level.isCompleted)
                            )}
                          </button>

                          {/* Special indicators */}
                          {level.type === "chest" && !level.isCompleted && !level.isLocked && (
                            <div className="absolute -top-2 -right-2 w-7 h-7 bg-red-500 rounded-full flex items-center justify-center text-white text-xs font-bold animate-pulse shadow-lg z-20">
                              !
                            </div>
                          )}

                          {/* Level title */}
                          <div className="mt-9 text-center max-w-[120px]">
                            <span 
                              className={`
                                text-sm font-bold block
                                ${!level.isLocked ? "text-gray-700" : "text-gray-400"}
                              `}
                            >
                              {level.title}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Separator between chapters (except last) */}
              {chapterIndex < chapters.length - 1 && (
                <div className="my-12 flex items-center justify-center">
                  <div className="h-px bg-gray-300 flex-1 max-w-xs"></div>
                  <div className="mx-4 text-gray-400 text-sm font-medium">•••</div>
                  <div className="h-px bg-gray-300 flex-1 max-w-xs"></div>
                </div>
              )}
            </div>
          );
        })}

        {/* Final trophy */}
        <div className="mt-16 mb-8 flex flex-col items-center">
          <div className="w-28 h-28 rounded-full bg-gradient-to-br from-yellow-400 to-yellow-600 flex items-center justify-center shadow-elevated animate-pulse">
            <Trophy className="w-14 h-14 text-white" />
          </div>
          <span className="mt-4 text-xl font-bold text-gray-800">Expert Certifié</span>
          <span className="text-sm text-gray-500 mt-1">Termine tous les niveaux</span>
        </div>
      </div>

      <BottomNav />
    </div>
  );
};

export default Parcours;
