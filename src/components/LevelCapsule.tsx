import { Check, Lock } from "lucide-react";
import { cn } from "@/lib/utils";

interface LevelCapsuleProps {
  level: number;
  title: string;
  isUnlocked: boolean;
  isCompleted: boolean;
  onClick: () => void;
}

export const LevelCapsule = ({ 
  level, 
  title, 
  isUnlocked, 
  isCompleted,
  onClick 
}: LevelCapsuleProps) => {
  return (
    <button
      onClick={isUnlocked ? onClick : undefined}
      disabled={!isUnlocked}
      className={cn(
        "relative flex flex-col items-center gap-2 transition-all duration-300",
        isUnlocked ? "cursor-pointer" : "cursor-not-allowed opacity-50"
      )}
    >
      {/* Capsule */}
      <div
        className={cn(
          "w-16 h-16 rounded-full flex items-center justify-center font-semibold text-lg transition-all duration-300 shadow-card",
          isCompleted && "gradient-bnp text-white shadow-elevated",
          !isCompleted && isUnlocked && "bg-primary/20 text-primary border-2 border-primary hover:scale-110",
          !isUnlocked && "bg-muted text-muted-foreground border-2 border-border"
        )}
      >
        {isCompleted ? (
          <Check className="w-8 h-8" />
        ) : !isUnlocked ? (
          <Lock className="w-6 h-6" />
        ) : (
          level
        )}
      </div>
      
      {/* Title */}
      <span className={cn(
        "text-xs font-medium text-center",
        isUnlocked ? "text-foreground" : "text-muted-foreground"
      )}>
        {title}
      </span>
    </button>
  );
};
