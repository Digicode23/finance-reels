import { useState, useEffect } from "react";
import { useSwipeable } from "react-swipeable";
import { useNavigate } from "react-router-dom";
import { ArrowRight, Search, MoreVertical, ChevronUp, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";

const reels = [
  {
    id: "holding",
    title: "Le fonctionnement d'une holding",
    category: "Expert",
    description: "Comprendre la structure holding pour optimiser ton patrimoine",
    videoUrl: "https://tdqtkzzcrdybyvywkubq.supabase.co/storage/v1/object/public/reels/AQPKCAUIoacgAAB85RLl3d8xFBBEyLHDA3NFATe0NjGOWETw0BC0Zz-ZdfVjZPkUxkwNsTF00YiLdmHwzYnknxZr4zrDMSDzkRqdZbM.mp4",
  },
  {
    id: "etf",
    title: "ETF pour débutants",
    category: "Investissement",
    description: "Investis facilement avec les fonds indiciels ETF",
    videoUrl: "https://tdqtkzzcrdybyvywkubq.supabase.co/storage/v1/object/public/reels/AQPLlNFmU7rGtQbZzK0dyj3l6FopfFUdeK9t4oltWm_L1Fr-6yncGBIeRYacFy8SIBOZoHjAv8LB_lMmGNn7m6fwGGW9Jf-tkXsafKA.mp4",
  },
  {
    id: "crypto",
    title: "Crypto : risques et opportunités",
    category: "Innovation",
    description: "Tout savoir sur les cryptomonnaies avant d'investir",
    videoUrl: "https://tdqtkzzcrdybyvywkubq.supabase.co/storage/v1/object/public/reels/AQMBU_gzffV-nXqyx3BgaiI6kaYRVOu-84f1IALv_Mxu43QPhT8iRSIUqEqKOQY_VKuzWyQyOQpBo7V3c8T9jjLQdFy8M4kTgG-io1c.mp4",
  },
  {
    id: "pea",
    title: "C'est quoi un PEA ?",
    category: "Épargne",
    description: "Découvre le Plan d'Épargne en Actions et ses avantages fiscaux",
    videoUrl: "https://tdqtkzzcrdybyvywkubq.supabase.co/storage/v1/object/public/reels/AQOM6U2chf2Jp3f_xcSfiWv_vnUdzQOLHP8yOj8uPC1J_Y3KcDUU4VZbgnWGN03oeQPcGCOWt00qY4qnnKTZJAwIDjy4WoPl15YWpdc.mp4",
  },
  {
    id: "fiscalite",
    title: "Optimiser sa fiscalité",
    category: "Fiscalité",
    description: "Les meilleures stratégies pour réduire tes impôts légalement",
    videoUrl: "https://tdqtkzzcrdybyvywkubq.supabase.co/storage/v1/object/public/reels/AQPDqfu9rKneByreMnwF_GDQT7PtFJvt-Lv26PVHfSZphwWbMfhavDzCDsy2a3gA2HsXWxfLWmANzKpv5kisssqtv8xcsQjqfBL0-mE.mp4",
  },
  {
    id: "immobilier",
    title: "Immobilier vs Livrets",
    category: "Patrimoine",
    description: "Quel placement choisir pour ton épargne ?",
    videoUrl: "https://tdqtkzzcrdybyvywkubq.supabase.co/storage/v1/object/public/reels/AQMXmsqbAIWMkEujRd-COOFtKM_fC2X8GuSrPzolvCA3KrmWNSgOQio8U4EfcDJMnArwJhbuPoxow2zEylNEYzQnkLGB31aNz1vhn_E.mp4",
  },
];

const Index = () => {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToNext = () => {
    setCurrentIndex((currentIndex + 1) % reels.length);
  };

  const goToPrevious = () => {
    setCurrentIndex((currentIndex - 1 + reels.length) % reels.length);
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
              <span className="font-bold text-lg">P</span>
            </div>
            <span className="font-semibold">Paul</span>
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
        {/* Video player */}
        <video
          key={currentReel.id}
          className="absolute inset-0 w-full h-full object-cover"
          src={currentReel.videoUrl}
          autoPlay
          loop
          muted
          playsInline
        />

        {/* Gradient overlay for readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />

        {/* Content overlay */}
        <div className="absolute bottom-32 left-0 right-0 px-6 text-white space-y-3">
          {/* Category badge */}
          <div className="inline-block px-3 py-1.5 rounded-full gradient-bnp backdrop-blur-sm shadow-elevated">
            <span className="text-xs font-bold uppercase tracking-wider">{currentReel.category}</span>
          </div>

          {/* Title */}
          <h1 className="text-2xl font-bold leading-tight">{currentReel.title}</h1>

          {/* Description */}
          <p className="text-sm text-white/90 leading-relaxed">
            {currentReel.description}
          </p>

          {/* CTA Button */}
          <Button
            onClick={() => navigate(`/parcours/${currentReel.id}`)}
            className="w-full gradient-bnp text-white font-bold py-5 text-base rounded-2xl shadow-button hover:shadow-elevated transition-all active:translate-y-1"
          >
            En apprendre plus
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
        </div>

        {/* Navigation arrows - visible on desktop */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Previous button */}
          <button
            onClick={goToPrevious}
            className="absolute top-1/2 left-4 -translate-y-1/2 w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/30 transition-all pointer-events-auto z-40 shadow-elevated"
            aria-label="Reel précédent"
          >
            <ChevronUp className="w-6 h-6" />
          </button>

          {/* Next button */}
          <button
            onClick={goToNext}
            className="absolute bottom-32 left-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/30 transition-all pointer-events-auto z-40 shadow-elevated animate-bounce"
            aria-label="Reel suivant"
          >
            <ChevronDown className="w-6 h-6" />
          </button>
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
