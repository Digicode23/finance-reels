import { User } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { ReelCard } from "@/components/ReelCard";
import { BottomNav } from "@/components/BottomNav";

const reels = [
  {
    id: "pea",
    title: "C'est quoi un PEA ?",
    category: "Épargne",
  },
  {
    id: "etf",
    title: "ETF pour débutants",
    category: "Investissement",
  },
  {
    id: "immobilier",
    title: "Immobilier vs Livrets",
    category: "Patrimoine",
  },
  {
    id: "holding",
    title: "Le fonctionnement d'une holding",
    category: "Expert",
  },
  {
    id: "fiscalite",
    title: "Optimiser sa fiscalité",
    category: "Fiscalité",
  },
  {
    id: "crypto",
    title: "Crypto : risques et opportunités",
    category: "Innovation",
  },
];

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="flex items-center justify-between px-4 py-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl gradient-bnp flex items-center justify-center">
              <span className="text-white font-bold text-lg">F</span>
            </div>
            <h1 className="text-xl font-semibold">Explore la finance</h1>
          </div>
          <button className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
            <User className="w-5 h-5 text-primary" />
          </button>
        </div>
      </header>

      {/* Reels Grid */}
      <div className="px-4 py-6 space-y-6">
        {reels.map((reel) => (
          <ReelCard
            key={reel.id}
            title={reel.title}
            category={reel.category}
            onClick={() => navigate(`/parcours/${reel.id}`)}
          />
        ))}
      </div>

      <BottomNav />
    </div>
  );
};

export default Index;
