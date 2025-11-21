import { Trophy, Zap, Award, TrendingUp, Star, Target, Calendar, Flame } from "lucide-react";
import { BottomNav } from "@/components/BottomNav";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import yodaAvatar from "@/assets/yoda-avatar.jpg";

const Profil = () => {
  const currentStreak = 7;
  const longestStreak = 14;
  const totalXP = 850;
  const currentLevel = 3;
  const xpForNextLevel = 1000;
  const xpProgress = (totalXP / xpForNextLevel) * 100;

  const stats = [
    { icon: Flame, label: "Série actuelle", value: `${currentStreak} jours`, color: "text-orange-500", bg: "bg-orange-50" },
    { icon: Target, label: "Plus longue série", value: `${longestStreak} jours`, color: "text-purple-500", bg: "bg-purple-50" },
    { icon: Star, label: "Niveaux terminés", value: "12", color: "text-yellow-500", bg: "bg-yellow-50" },
    { icon: Trophy, label: "Trophées", value: "5/10", color: "text-blue-500", bg: "bg-blue-50" },
  ];

  const recentAchievements = [
    { id: 1, title: "Challenge Final", subtitle: "PEA Simulation", xp: 100, icon: "🏆", date: "Aujourd'hui", color: "from-yellow-400 to-orange-500" },
    { id: 2, title: "Fiscalité du PEA", subtitle: "Chapitre 2 terminé", xp: 50, icon: "📊", date: "Hier", color: "from-blue-400 to-purple-500" },
    { id: 3, title: "Série de 7", subtitle: "7 jours consécutifs", xp: 100, icon: "⚡", date: "Il y a 2 jours", color: "from-green-400 to-teal-500" },
  ];

  const activeBadges = [
    { id: 1, name: "Premier pas", icon: Trophy, gradient: "from-blue-400 to-blue-600" },
    { id: 2, name: "Série de 7", icon: Zap, gradient: "from-yellow-400 to-orange-500" },
    { id: 3, name: "Apprenti", icon: Award, gradient: "from-purple-400 to-purple-600" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 via-blue-50 to-white pb-20">
      {/* Enhanced Header */}
      <header className="relative overflow-hidden bg-gradient-to-br from-purple-600 via-blue-600 to-indigo-700">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjEiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-20" />
        
        <div className="relative px-4 py-8">
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", duration: 0.6 }}
            className="flex flex-col items-center mb-6"
          >
            <div className="relative mb-4">
              <Avatar className="w-28 h-28 border-4 border-white/30 shadow-2xl ring-4 ring-white/20">
                <AvatarImage src={yodaAvatar} alt="Yoda" className="object-cover" />
                <AvatarFallback className="text-4xl font-bold bg-white/20 text-white">Y</AvatarFallback>
              </Avatar>
              <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg border-2 border-white">
                {currentLevel}
              </div>
            </div>
            
            <h1 className="text-3xl font-bold text-white mb-1">Maître Yoda</h1>
            <Badge className="bg-white/20 text-white border-white/30 backdrop-blur-sm mb-4">
              Investisseur Apprenti
            </Badge>

            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-3 w-full max-w-md">
              <Card className="p-3 bg-white/10 border-white/20 backdrop-blur-sm">
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">{totalXP}</div>
                  <div className="text-xs text-white/80">XP Total</div>
                </div>
              </Card>
              <Card className="p-3 bg-white/10 border-white/20 backdrop-blur-sm">
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">{currentStreak}</div>
                  <div className="text-xs text-white/80">Jours</div>
                </div>
              </Card>
              <Card className="p-3 bg-white/10 border-white/20 backdrop-blur-sm">
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">5</div>
                  <div className="text-xs text-white/80">Badges</div>
                </div>
              </Card>
            </div>
          </motion.div>
        </div>
      </header>

      <div className="px-4 py-6 space-y-6">
        {/* Level Progress - Enhanced */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="p-6 shadow-elevated border-2 border-purple-100 bg-gradient-to-br from-white to-purple-50">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-blue-600 flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <h2 className="text-lg font-bold text-foreground">Niveau {currentLevel}</h2>
                <p className="text-sm text-muted-foreground">150 XP avant le niveau {currentLevel + 1}</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-semibold text-purple-600">{totalXP} / {xpForNextLevel}</p>
              </div>
            </div>
            <Progress value={xpProgress} className="h-3" />
          </Card>
        </motion.div>

        {/* Stats Grid - New Design */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-2 gap-4"
        >
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card key={index} className={`p-4 shadow-card ${stat.bg} border-0`}>
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-full ${stat.bg} flex items-center justify-center`}>
                    <Icon className={`w-5 h-5 ${stat.color}`} />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs text-muted-foreground">{stat.label}</p>
                    <p className={`text-lg font-bold ${stat.color}`}>{stat.value}</p>
                  </div>
                </div>
              </Card>
            );
          })}
        </motion.div>

        {/* Active Badges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="p-6 shadow-card">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <Award className="w-6 h-6 text-yellow-600" />
                <h2 className="text-lg font-semibold">Badges actifs</h2>
              </div>
              <Badge variant="secondary" className="text-xs">
                {activeBadges.length}/10
              </Badge>
            </div>
            <div className="grid grid-cols-3 gap-4">
              {activeBadges.map((badge, index) => {
                const Icon = badge.icon;
                return (
                  <motion.div
                    key={badge.id}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.4 + index * 0.1, type: "spring" }}
                    className="flex flex-col items-center gap-2"
                  >
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${badge.gradient} flex items-center justify-center shadow-lg hover:scale-110 transition-transform cursor-pointer`}>
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <span className="text-xs text-center font-medium">{badge.name}</span>
                  </motion.div>
                );
              })}
            </div>
          </Card>
        </motion.div>

        {/* Recent Activity - Redesigned */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card className="p-6 shadow-card">
            <div className="flex items-center gap-3 mb-4">
              <Calendar className="w-6 h-6 text-blue-600" />
              <h2 className="text-lg font-semibold">Activité récente</h2>
            </div>
            <div className="space-y-3">
              {recentAchievements.map((achievement, index) => (
                <motion.div
                  key={achievement.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                >
                  <Card className={`p-4 bg-gradient-to-r ${achievement.color} border-0 shadow-md`}>
                    <div className="flex items-center gap-3">
                      <div className="text-4xl">{achievement.icon}</div>
                      <div className="flex-1">
                        <p className="font-bold text-white">{achievement.title}</p>
                        <p className="text-sm text-white/80">{achievement.subtitle}</p>
                        <p className="text-xs text-white/70 mt-1">{achievement.date}</p>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center gap-1 bg-white/20 px-3 py-1 rounded-full backdrop-blur-sm">
                          <Zap className="w-4 h-4 text-white fill-white" />
                          <span className="font-bold text-white">+{achievement.xp}</span>
                        </div>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </Card>
        </motion.div>

        {/* Motivation Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          <Card className="p-6 bg-gradient-to-br from-green-100 to-emerald-100 border-2 border-green-200">
            <div className="text-center space-y-2">
              <div className="text-4xl mb-2">🎯</div>
              <h3 className="font-bold text-lg text-foreground">
                Continue ton apprentissage !
              </h3>
              <p className="text-sm text-muted-foreground">
                Encore 150 XP pour atteindre le niveau {currentLevel + 1}
              </p>
            </div>
          </Card>
        </motion.div>
      </div>

      <BottomNav />
    </div>
  );
};

export default Profil;
