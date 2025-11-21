import { useState } from "react";
import { useSwipeable } from "react-swipeable";
import { useNavigate } from "react-router-dom";
import { ArrowRight, Search, MoreVertical } from "lucide-react";
import { Button } from "@/components/ui/button";

const reels = [
  {
    id: "pea",
    title: "C'est quoi un PEA ?",
    category: "Épargne",
    description: "Découvre le Plan d'Épargne en Actions et ses avantages fiscaux",
  },
  {
    id: "etf",
    title: "ETF pour débutants",
    category: "Investissement",
    description: "Investis facilement avec les fonds indiciels ETF",
  },
  {
    id: "immobilier",
    title: "Immobilier vs Livrets",
    category: "Patrimoine",
    description: "Quel placement choisir pour ton épargne ?",
  },
  {
    id: "holding",
    title: "Le fonctionnement d'une holding",
    category: "Expert",
    description: "Comprendre la structure holding pour optimiser ton patrimoine",
  },
  {
    id: "fiscalite",
    title: "Optimiser sa fiscalité",
    category: "Fiscalité",
    description: "Les meilleures stratégies pour réduire tes impôts légalement",
  },
  {
    id: "crypto",
    title: "Crypto : risques et opportunités",
    category: "Innovation",
    description: "Tout savoir sur les cryptomonnaies avant d'investir",
  },
];

const Index = () => {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlers = useSwipeable({
    onSwipedUp: () => {
      if (currentIndex < reels.length - 1) {
        setCurrentIndex(currentIndex + 1);
      }
    },
    onSwipedDown: () => {
      if (currentIndex > 0) {
        setCurrentIndex(currentIndex - 1);
      }
    },
    preventScrollOnSwipe: true,
    trackMouse: true,
  });

  const currentReel = reels[currentIndex];

  return (
    <div className="fixed inset-0 bg-black overflow-hidden" {...handlers}>
      {/* Header overlay */}
      <div className="absolute top-0 left-0 right-0 z-50 bg-gradient-to-b from-black/60 to-transparent p-4">
        <div className="flex items-center justify-between text-white">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl gradient-bnp flex items-center justify-center">
              <span className="font-bold text-lg">F</span>
            </div>
            <span className="font-semibold">FinLearn</span>
          </div>
          <div className="flex items-center gap-3">
            <button className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
              <Search className="w-5 h-5" />
            </button>
            <button className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
              <MoreVertical className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Reel container */}
      <div className="relative h-full w-full">
        {/* Video placeholder */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-black flex items-center justify-center">
          <div className="text-6xl opacity-20">🎥</div>
        </div>

        {/* Gradient overlay for readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />

        {/* Content overlay */}
        <div className="absolute bottom-20 left-0 right-0 px-6 text-white space-y-4">
          {/* Category badge */}
          <div className="inline-block px-4 py-2 rounded-full gradient-bnp backdrop-blur-sm shadow-elevated">
            <span className="text-sm font-bold uppercase tracking-wider">{currentReel.category}</span>
          </div>

          {/* Title */}
          <h1 className="text-3xl font-bold leading-tight">{currentReel.title}</h1>

          {/* Description */}
          <p className="text-base text-white/90 leading-relaxed">
            {currentReel.description}
          </p>

          {/* CTA Button */}
          <Button
            onClick={() => navigate(`/parcours/${currentReel.id}`)}
            className="w-full gradient-bnp text-white font-bold py-6 text-lg rounded-2xl shadow-button hover:shadow-elevated transition-all active:translate-y-1"
          >
            En apprendre plus
            <ArrowRight className="ml-2 w-6 h-6" />
          </Button>
        </div>

        {/* Progress indicators */}
        <div className="absolute right-4 top-1/2 -translate-y-1/2 flex flex-col gap-2">
          {reels.map((_, index) => (
            <div
              key={index}
              className={`w-1.5 h-8 rounded-full transition-all ${
                index === currentIndex
                  ? "bg-white shadow-elevated"
                  : "bg-white/30"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Swipe indicators */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/50 text-xs flex flex-col items-center gap-1">
        {currentIndex < reels.length - 1 && (
          <div className="animate-bounce">
            <div className="text-2xl">↑</div>
            <span>Swipe pour le suivant</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
