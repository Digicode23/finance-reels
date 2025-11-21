import { useNavigate } from "react-router-dom";
import { BottomNav } from "@/components/BottomNav";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Lock, Star } from "lucide-react";

const parcours = [
  {
    id: "pea",
    title: "C'est quoi un PEA ?",
    description: "Découvre le Plan d'Épargne en Actions",
    color: "green",
    progress: 20,
    lessons: 10,
    isLocked: false,
  },
  {
    id: "etf",
    title: "ETF pour débutants",
    description: "Investis facilement avec les ETF",
    color: "purple",
    progress: 0,
    lessons: 8,
    isLocked: false,
  },
  {
    id: "immobilier",
    title: "Immobilier vs Livrets",
    description: "Compare les placements",
    color: "blue",
    progress: 0,
    lessons: 12,
    isLocked: true,
  },
  {
    id: "holding",
    title: "Les holdings",
    description: "Optimise ton patrimoine",
    color: "gold",
    progress: 0,
    lessons: 15,
    isLocked: true,
  },
  {
    id: "fiscalite",
    title: "Optimiser sa fiscalité",
    description: "Réduis tes impôts légalement",
    color: "orange",
    progress: 0,
    lessons: 10,
    isLocked: true,
  },
  {
    id: "crypto",
    title: "Cryptomonnaies",
    description: "Comprendre les risques et opportunités",
    color: "pink",
    progress: 0,
    lessons: 9,
    isLocked: true,
  },
];

const ParcoursHome = () => {
  const navigate = useNavigate();

  const getColorClass = (color: string) => {
    switch (color) {
      case "green":
        return "from-green-400 to-green-600";
      case "purple":
        return "from-purple-400 to-purple-600";
      case "blue":
        return "from-blue-400 to-blue-600";
      case "gold":
        return "from-yellow-400 to-yellow-600";
      case "orange":
        return "from-orange-400 to-orange-600";
      case "pink":
        return "from-pink-400 to-pink-600";
      default:
        return "from-gray-400 to-gray-600";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white pb-20">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="px-4 py-6">
          <h1 className="text-3xl font-bold mb-2">Mes parcours</h1>
          <p className="text-muted-foreground">
            Choisis un parcours pour commencer ton apprentissage
          </p>
        </div>
      </header>

      {/* Parcours grid */}
      <div className="px-4 py-6 space-y-4">
        {parcours.map((p) => (
          <Card
            key={p.id}
            className={`
              overflow-hidden shadow-card transition-all
              ${!p.isLocked ? "cursor-pointer hover:shadow-elevated active:scale-98" : "opacity-75"}
            `}
            onClick={() => !p.isLocked && navigate(`/parcours/${p.id}`)}
          >
            <div className="flex items-center gap-4 p-4">
              {/* Icon */}
              <div
                className={`
                  w-20 h-20 rounded-2xl bg-gradient-to-br ${getColorClass(p.color)}
                  flex items-center justify-center shadow-button
                `}
              >
                {p.isLocked ? (
                  <Lock className="w-8 h-8 text-white" />
                ) : (
                  <Star className="w-8 h-8 text-white" fill={p.progress > 0 ? "currentColor" : "none"} />
                )}
              </div>

              {/* Content */}
              <div className="flex-1">
                <h3 className="font-bold text-lg mb-1">{p.title}</h3>
                <p className="text-sm text-muted-foreground mb-3">
                  {p.description}
                </p>

                {!p.isLocked && (
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span className="text-muted-foreground">
                        {p.lessons} leçons
                      </span>
                      <span className="font-bold text-duo-green">
                        {p.progress}%
                      </span>
                    </div>
                    <Progress value={p.progress} className="h-2 bg-gray-200" />
                  </div>
                )}

                {p.isLocked && (
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Lock className="w-4 h-4" />
                    <span>Termine les parcours précédents pour déverrouiller</span>
                  </div>
                )}
              </div>
            </div>
          </Card>
        ))}
      </div>

      <BottomNav />
    </div>
  );
};

export default ParcoursHome;
