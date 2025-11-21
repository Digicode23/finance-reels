import { ArrowLeft, Trophy } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { LevelCapsule } from "@/components/LevelCapsule";
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
  { id: 1, title: "Débuter", isCompleted: true },
  { id: 2, title: "Fiscalité", isCompleted: true },
  { id: 3, title: "Actions/ETF", isCompleted: false },
  { id: 4, title: "Risque", isCompleted: false },
  { id: 5, title: "Simulation", isCompleted: false },
  { id: 6, title: "Optimisation", isCompleted: false },
  { id: 7, title: "Avancé", isCompleted: false },
  { id: 8, title: "Expert", isCompleted: false },
  { id: 9, title: "Stratégie", isCompleted: false },
  { id: 10, title: "Quiz final", isCompleted: false },
];

const Parcours = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const title = id ? parcoursTitles[id] || "Parcours" : "Parcours";
  
  const completedLevels = levels.filter(l => l.isCompleted).length;
  const progress = (completedLevels / levels.length) * 100;

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="px-4 py-4">
          <button 
            onClick={() => navigate("/")}
            className="flex items-center gap-2 text-foreground mb-3"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="font-medium">Retour</span>
          </button>
          <h1 className="text-2xl font-bold mb-3">{title}</h1>
          
          {/* Progress bar */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-sm">
              <span className="text-muted-foreground">Progression</span>
              <span className="font-semibold text-primary">{completedLevels}/10</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        </div>
      </header>

      {/* Parcours path */}
      <div className="px-4 py-8">
        <div className="flex flex-col items-center gap-8">
          {levels.map((level, index) => (
            <div key={level.id} className="flex flex-col items-center">
              <LevelCapsule
                level={level.id}
                title={level.title}
                isUnlocked={index <= completedLevels}
                isCompleted={level.isCompleted}
                onClick={() => navigate(`/parcours/${id}/niveau/${level.id}`)}
              />
              
              {/* Connector line */}
              {index < levels.length - 1 && (
                <div className="w-1 h-12 bg-border my-2" />
              )}
            </div>
          ))}
          
          {/* Trophy at the end */}
          <div className="mt-4 flex flex-col items-center gap-3">
            <div className="w-20 h-20 rounded-full gradient-gold flex items-center justify-center shadow-elevated">
              <Trophy className="w-10 h-10 text-white" />
            </div>
            <span className="text-sm font-semibold text-foreground">Expert certifié</span>
          </div>
        </div>
      </div>

      <BottomNav />
    </div>
  );
};

export default Parcours;
