import { Trophy, X, Medal, Shield, Gift } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface LeaderboardProps {
  isOpen: boolean;
  onClose: () => void;
}

const topPlayers = [
  { rank: 1, name: "Luke Skywalker", xp: 12450, avatar: "👨‍🚀" },
  { rank: 2, name: "Leia Organa", xp: 11890, avatar: "👸" },
  { rank: 3, name: "Han Solo", xp: 10320, avatar: "🚀" },
  { rank: 4, name: "Obi-Wan Kenobi", xp: 9875, avatar: "🧙" },
  { rank: 5, name: "Yoda", xp: 9234, avatar: "👽" },
  { rank: 6, name: "Anakin Skywalker", xp: 8756, avatar: "⚔️" },
  { rank: 7, name: "Padmé Amidala", xp: 8123, avatar: "👑" },
  { rank: 8, name: "Moi", xp: 850, avatar: "🙂", isCurrentUser: true },
];

const rewards = [
  {
    rank: 1,
    title: "🥇 Visa Premier",
    description: "Avec l'offre groupée Esprit Libre à partir de 7,61 € /mois",
    cta: "En savoir plus sur la carte",
    url: "https://mabanque.bnpparibas/fr/carte-bancaire/visa-premier",
    gradient: "from-yellow-500 to-yellow-700",
  },
  {
    rank: 2,
    title: "🥈 Visa Classic",
    description: "Avec l'offre groupée Esprit Libre à partir de 3,20 € /mois",
    cta: "En savoir plus sur la carte",
    url: "https://mabanque.bnpparibas/fr/carte-bancaire/visa-classic",
    gradient: "from-green-500 to-green-700",
  },
  {
    rank: 3,
    title: "🥉 Visa Origin",
    description: "Avec l'offre groupée Esprit Libre à partir de 2,96 € /mois",
    cta: "En savoir plus sur la carte",
    url: "https://mabanque.bnpparibas/fr/carte-bancaire/visa-origin",
    gradient: "from-blue-500 to-blue-700",
  },
];

export const Leaderboard = ({ isOpen, onClose }: LeaderboardProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto bg-gradient-to-b from-blue-50 to-white">
        <DialogHeader>
          <DialogTitle className="text-3xl font-bold text-center flex items-center justify-center gap-3">
            <Trophy className="w-8 h-8 text-yellow-500" />
            Classement du Mois
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Rewards Section */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-center text-foreground">
              🎁 Récompenses Exclusives
            </h3>
            <div className="grid gap-4">
              {rewards.map((reward) => (
                <Card
                  key={reward.rank}
                  className={`p-5 bg-gradient-to-r ${reward.gradient} text-white border-0 shadow-elevated`}
                >
                  <div className="space-y-3">
                    <h4 className="text-lg font-bold">{reward.title}</h4>
                    <p className="text-sm text-white/90">{reward.description}</p>
                    <Button
                      className="w-full bg-white text-foreground hover:bg-white/90 font-semibold shadow-md"
                      size="lg"
                      asChild
                    >
                      <a href={reward.url} target="_blank" rel="noopener noreferrer">
                        {reward.cta}
                      </a>
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Leaderboard */}
          <div className="space-y-3">
            <h3 className="text-xl font-bold text-center text-foreground">
              🏆 Top Joueurs
            </h3>
            {topPlayers.map((player, index) => (
              <motion.div
                key={player.rank}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <Card
                  className={`p-4 ${
                    player.isCurrentUser
                      ? "bg-gradient-to-r from-blue-100 to-purple-100 border-2 border-blue-400"
                      : "bg-white"
                  } shadow-card`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      {/* Rank Badge */}
                      <div
                        className={`w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold ${
                          player.rank === 1
                            ? "bg-gradient-to-br from-yellow-400 to-yellow-600 text-white"
                            : player.rank === 2
                            ? "bg-gradient-to-br from-slate-300 to-slate-500 text-white"
                            : player.rank === 3
                            ? "bg-gradient-to-br from-orange-400 to-orange-600 text-white"
                            : "bg-gray-200 text-gray-700"
                        } shadow-md`}
                      >
                        {player.rank <= 3 ? (
                          <Trophy className="w-6 h-6" />
                        ) : (
                          `#${player.rank}`
                        )}
                      </div>

                      {/* Avatar & Name */}
                      <div className="flex items-center gap-3">
                        <div className="text-3xl">{player.avatar}</div>
                        <div>
                          <p className="font-bold text-lg text-foreground">
                            {player.name}
                            {player.isCurrentUser && (
                              <span className="ml-2 text-xs bg-blue-500 text-white px-2 py-1 rounded-full">
                                Vous
                              </span>
                            )}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {player.xp.toLocaleString()} XP
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Medal for top 3 */}
                    {player.rank <= 3 && (
                      <div className="text-3xl">
                        {player.rank === 1 && "🥇"}
                        {player.rank === 2 && "🥈"}
                        {player.rank === 3 && "🥉"}
                      </div>
                    )}
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Info Footer */}
          <Card className="p-4 bg-blue-50 border-blue-200">
            <p className="text-sm text-center text-blue-800">
              💡 Le classement se réinitialise chaque mois. Continuez à apprendre
              pour grimper dans le classement et remporter des récompenses !
            </p>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
};
