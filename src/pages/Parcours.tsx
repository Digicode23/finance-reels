import { ArrowLeft, Flame, Zap, Heart, Trophy, Star, Video, Lock, Gift } from "lucide-react";
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

const levels = [
  { id: 1, title: "Introduction", type: "lesson", color: "green", isCompleted: true, position: "left" },
  { id: 2, title: "Les bases", type: "lesson", color: "green", isCompleted: true, position: "right" },
  { id: 3, title: "Pratique", type: "practice", color: "green", isCompleted: false, position: "left" },
  { id: 4, title: "Révision", type: "video", color: "purple", isCompleted: false, position: "center" },
  { id: 5, title: "Quiz", type: "lesson", color: "purple", isCompleted: false, position: "right" },
  { id: 6, title: "Coffre bonus", type: "chest", color: "gold", isCompleted: false, position: "center" },
  { id: 7, title: "Avancé", type: "lesson", color: "gold", isCompleted: false, position: "left" },
  { id: 8, title: "Expert", type: "lesson", color: "gold", isCompleted: false, position: "right" },
  { id: 9, title: "Challenge", type: "practice", color: "blue", isCompleted: false, position: "center" },
  { id: 10, title: "Boss final", type: "boss", color: "gold", isCompleted: false, position: "center" },
];

const Parcours = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const title = id ? parcoursTitles[id] || "Parcours" : "Mes parcours";
  
  const completedLevels = levels.filter(l => l.isCompleted).length;

  const getIconForType = (type: string) => {
    switch (type) {
      case "video":
        return <Video className="w-6 h-6" />;
      case "chest":
        return <Gift className="w-7 h-7" />;
      case "boss":
        return <Trophy className="w-7 h-7" />;
      case "practice":
        return <Zap className="w-6 h-6" />;
      default:
        return <Star className="w-6 h-6" />;
    }
  };

  const getColorClass = (color: string, isCompleted: boolean, isUnlocked: boolean) => {
    if (isCompleted) return "gradient-bnp";
    if (!isUnlocked) return "bg-gray-300";
    
    switch (color) {
      case "green":
        return "bg-duo-green";
      case "purple":
        return "bg-duo-purple";
      case "gold":
        return "bg-duo-gold";
      case "blue":
        return "bg-duo-blue";
      default:
        return "bg-duo-green";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white pb-20">
      {/* Header with stats */}
      <header className="sticky top-0 z-40 bg-white shadow-md">
        <div className="px-4 py-3">
          <button 
            onClick={() => navigate("/")}
            className="flex items-center gap-2 text-foreground mb-3"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="font-medium">Retour</span>
          </button>

          {/* Stats row */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-4">
              {/* Streak */}
              <div className="flex items-center gap-1.5">
                <Flame className="w-6 h-6 text-orange-500" fill="currentColor" />
                <span className="text-lg font-bold text-orange-500">7</span>
              </div>

              {/* XP */}
              <div className="flex items-center gap-1.5">
                <div className="w-6 h-6 bg-blue-500 rounded-md flex items-center justify-center">
                  <Zap className="w-4 h-4 text-white" fill="currentColor" />
                </div>
                <span className="text-lg font-bold text-blue-500">850</span>
              </div>

              {/* Hearts */}
              <div className="flex items-center gap-1.5">
                <Heart className="w-6 h-6 text-pink-500" fill="currentColor" />
                <span className="text-lg font-bold text-pink-500">5</span>
              </div>
            </div>

            {/* Trophy league */}
            <div className="flex items-center gap-2 px-3 py-1.5 bg-yellow-100 rounded-full">
              <Trophy className="w-5 h-5 text-yellow-600" />
              <span className="text-sm font-bold text-yellow-600">Division Or</span>
            </div>
          </div>

          <h1 className="text-xl font-bold mb-2">{title}</h1>
          
          {/* Progress */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-sm">
              <span className="text-muted-foreground font-medium">Unité 1</span>
              <span className="font-bold text-duo-green">{completedLevels * 10}%</span>
            </div>
            <Progress value={completedLevels * 10} className="h-3 bg-gray-200" />
          </div>
        </div>
      </header>

      {/* Chapter header banner */}
      <div className="px-4 py-6 gradient-bnp">
        <div className="flex items-center justify-between text-white">
          <div>
            <div className="text-sm uppercase tracking-wider opacity-90 mb-1">Chapitre 1, Unité 1</div>
            <div className="text-xl font-bold">Commence ton apprentissage</div>
          </div>
          <button className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
            <div className="text-2xl">📖</div>
          </button>
        </div>
      </div>

      {/* Path with levels */}
      <div className="px-4 py-8 relative">
        {/* Animated character */}
        <div 
          className="absolute transition-all duration-1000 z-10"
          style={{
            left: completedLevels % 2 === 0 ? '25%' : '65%',
            top: `${completedLevels * 140 + 20}px`,
          }}
        >
          <div className="text-6xl animate-bounce">
            🦸
          </div>
        </div>

        {/* Levels path */}
        <div className="space-y-12 relative">
          {levels.map((level, index) => {
            const isUnlocked = index <= completedLevels;
            const positionClass = 
              level.position === "left" ? "mr-auto ml-4" :
              level.position === "right" ? "ml-auto mr-4" :
              "mx-auto";

            return (
              <div
                key={level.id}
                className={`relative flex flex-col items-center ${positionClass}`}
                style={{ width: "fit-content" }}
              >
                {/* Connector line to next level */}
                {index < levels.length - 1 && (
                  <div 
                    className="absolute w-0.5 bg-gray-300 z-0"
                    style={{
                      height: "80px",
                      top: "80px",
                      left: "50%",
                      transform: "translateX(-50%)",
                    }}
                  />
                )}

                {/* Level button */}
                <button
                  onClick={() => isUnlocked && navigate(`/parcours/${id}/niveau/${level.id}`)}
                  disabled={!isUnlocked}
                  className={`
                    relative z-10 w-20 h-20 rounded-full flex items-center justify-center
                    text-white font-bold text-xl transition-all duration-300
                    shadow-button
                    ${getColorClass(level.color, level.isCompleted, isUnlocked)}
                    ${isUnlocked ? "bounce-on-hover cursor-pointer" : "opacity-50 cursor-not-allowed"}
                    ${level.isCompleted && "shadow-elevated"}
                  `}
                  style={{
                    transform: level.isCompleted ? "scale(1.05)" : "scale(1)",
                  }}
                >
                  {level.isCompleted ? (
                    <Star className="w-8 h-8" fill="currentColor" />
                  ) : !isUnlocked ? (
                    <Lock className="w-6 h-6" />
                  ) : (
                    getIconForType(level.type)
                  )}
                </button>

                {/* Level title */}
                <span 
                  className={`
                    mt-2 text-sm font-bold text-center
                    ${isUnlocked ? "text-foreground" : "text-muted-foreground"}
                  `}
                >
                  {level.title}
                </span>

                {/* Special badges */}
                {level.type === "chest" && isUnlocked && !level.isCompleted && (
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center text-white text-xs font-bold animate-pulse">
                    !
                  </div>
                )}
              </div>
            );
          })}

          {/* End trophy */}
          <div className="mt-12 flex flex-col items-center mx-auto">
            <div className="w-24 h-24 rounded-full gradient-gold flex items-center justify-center shadow-elevated">
              <Trophy className="w-12 h-12 text-white" />
            </div>
            <span className="mt-3 text-base font-bold text-foreground">Expert certifié</span>
          </div>
        </div>
      </div>

      <BottomNav />
    </div>
  );
};

export default Parcours;
