import { Video } from "lucide-react";
import { Card } from "@/components/ui/card";

interface ReelCardProps {
  title: string;
  category: string;
  onClick: () => void;
}

export const ReelCard = ({ title, category, onClick }: ReelCardProps) => {
  return (
    <Card 
      className="relative h-[520px] w-full overflow-hidden cursor-pointer transition-transform duration-300 hover:scale-[1.02] shadow-card"
      onClick={onClick}
    >
      {/* Black placeholder background */}
      <div className="absolute inset-0 bg-black flex items-center justify-center">
        <Video className="w-16 h-16 text-muted-foreground/30" strokeWidth={1.5} />
      </div>
      
      {/* Gradient overlay for text readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
      
      {/* Content overlay */}
      <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
        <div className="inline-block px-3 py-1 mb-3 rounded-full bg-primary/90 backdrop-blur-sm">
          <span className="text-xs font-medium uppercase tracking-wider">{category}</span>
        </div>
        <h3 className="text-xl font-semibold leading-tight">{title}</h3>
      </div>
    </Card>
  );
};
