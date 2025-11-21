import { useState, useEffect } from "react";
import { useSwipeable } from "react-swipeable";
import { useNavigate } from "react-router-dom";
import { ArrowRight, Search, MoreVertical, ChevronUp, ChevronDown } from "lucide-react";
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

  const goToNext = () => {
    if (currentIndex < reels.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const goToPrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handlers = useSwipeable({
    onSwipedUp: goToNext,
    onSwipedDown: goToPrevious,
    preventScrollOnSwipe: true,
    trackMouse: true,
  });

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
        goToPrevious();
      } else if (e.key === "ArrowDown" || e.key === "ArrowRight") {
        goToNext();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentIndex]);

  // Mouse wheel navigation
  useEffect(() => {
    let isScrolling = false;
    
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      
      if (isScrolling) return;
      isScrolling = true;

      if (e.deltaY > 0) {
        goToNext();
      } else if (e.deltaY < 0) {
        goToPrevious();
      }

      setTimeout(() => {
        isScrolling = false;
      }, 500);
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    return () => window.removeEventListener("wheel", handleWheel);
  }, [currentIndex]);

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

        {/* Progress indicators - clickable */}
        <div className="absolute right-4 top-1/2 -translate-y-1/2 flex flex-col gap-2 z-40">
          {reels.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-1.5 h-8 rounded-full transition-all cursor-pointer hover:scale-110 ${
                index === currentIndex
                  ? "bg-white shadow-elevated"
                  : "bg-white/30 hover:bg-white/50"
              }`}
              aria-label={`Aller au reel ${index + 1}`}
            />
          ))}
        </div>

        {/* Navigation arrows - visible on desktop */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Previous button */}
          {currentIndex > 0 && (
            <button
              onClick={goToPrevious}
              className="absolute top-1/2 left-4 -translate-y-1/2 w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/30 transition-all pointer-events-auto z-40 shadow-elevated"
              aria-label="Reel précédent"
            >
              <ChevronUp className="w-6 h-6" />
            </button>
          )}

          {/* Next button */}
          {currentIndex < reels.length - 1 && (
            <button
              onClick={goToNext}
              className="absolute bottom-32 left-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/30 transition-all pointer-events-auto z-40 shadow-elevated animate-bounce"
              aria-label="Reel suivant"
            >
              <ChevronDown className="w-6 h-6" />
            </button>
          )}
        </div>
      </div>

      {/* Desktop hint */}
      <div className="absolute top-20 left-1/2 -translate-x-1/2 text-white/70 text-sm text-center hidden md:block pointer-events-none z-50">
        <div className="bg-black/40 backdrop-blur-sm px-4 py-2 rounded-full">
          Utilisez ↑ ↓ ou la molette pour naviguer
        </div>
      </div>
    </div>
  );
};

export default Index;
