import { Trophy, Zap, Award, TrendingUp } from "lucide-react";
import { BottomNav } from "@/components/BottomNav";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import profileAvatar from "@/assets/profile-avatar.png";

const Profil = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white pb-20">
      {/* Header */}
      <header className="gradient-purple text-white">
        <div className="px-4 py-8">
          <div className="flex items-center gap-4 mb-6">
            <Avatar className="w-20 h-20 border-4 border-white/20">
              <AvatarImage src={profileAvatar} alt="Antoine Dupont" />
              <AvatarFallback className="text-2xl font-bold bg-white/20">A</AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-2xl font-bold">Antoine Dupont</h1>
              <p className="text-white/80">Investisseur apprenti</p>
            </div>
          </div>
          
          {/* Stats */}
          <div className="grid grid-cols-3 gap-3">
            <Card className="p-3 bg-white/10 border-white/20 backdrop-blur-sm">
              <div className="text-center">
                <div className="text-2xl font-bold">850</div>
                <div className="text-xs text-white/80">XP</div>
              </div>
            </Card>
            <Card className="p-3 bg-white/10 border-white/20 backdrop-blur-sm">
              <div className="text-center">
                <div className="text-2xl font-bold">12</div>
                <div className="text-xs text-white/80">Chapitres</div>
              </div>
            </Card>
            <Card className="p-3 bg-white/10 border-white/20 backdrop-blur-sm">
              <div className="text-center">
                <div className="text-2xl font-bold">5</div>
                <div className="text-xs text-white/80">Badges</div>
              </div>
            </Card>
          </div>
        </div>
      </header>

      <div className="px-4 py-6 space-y-6">
        {/* Level progress */}
        <Card className="p-6 shadow-card">
          <div className="flex items-center gap-3 mb-4">
            <TrendingUp className="w-6 h-6 text-primary" />
            <h2 className="text-lg font-semibold">Niveau actuel</h2>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Niveau 3</span>
              <span className="font-semibold text-primary">850 / 1000 XP</span>
            </div>
            <Progress value={85} className="h-2" />
            <p className="text-xs text-muted-foreground">150 XP avant le niveau 4</p>
          </div>
        </Card>

        {/* Badges */}
        <Card className="p-6 shadow-card">
          <div className="flex items-center gap-3 mb-4">
            <Award className="w-6 h-6 text-gold" />
            <h2 className="text-lg font-semibold">Badges débloqués</h2>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div className="flex flex-col items-center gap-2">
              <div className="w-16 h-16 rounded-full gradient-bnp flex items-center justify-center">
                <Trophy className="w-8 h-8 text-white" />
              </div>
              <span className="text-xs text-center">Premier pas</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className="w-16 h-16 rounded-full gradient-gold flex items-center justify-center">
                <Zap className="w-8 h-8 text-white" />
              </div>
              <span className="text-xs text-center">Série de 7</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center">
                <Award className="w-8 h-8 text-muted-foreground" />
              </div>
              <span className="text-xs text-center text-muted-foreground">À débloquer</span>
            </div>
          </div>
        </Card>

        {/* Recent activity */}
        <Card className="p-6 shadow-card">
          <h2 className="text-lg font-semibold mb-4">Activité récente</h2>
          <div className="space-y-3">
            <div className="flex items-center gap-3 pb-3 border-b border-border">
              <div className="w-10 h-10 rounded-full gradient-bnp flex items-center justify-center text-white font-semibold">
                2
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium">Fiscalité du PEA</p>
                <p className="text-xs text-muted-foreground">Terminé aujourd'hui</p>
              </div>
              <span className="text-primary font-semibold">+50 XP</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full gradient-bnp flex items-center justify-center text-white font-semibold">
                1
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium">Débuter avec le PEA</p>
                <p className="text-xs text-muted-foreground">Terminé hier</p>
              </div>
              <span className="text-primary font-semibold">+50 XP</span>
            </div>
          </div>
        </Card>
      </div>

      <BottomNav />
    </div>
  );
};

export default Profil;
