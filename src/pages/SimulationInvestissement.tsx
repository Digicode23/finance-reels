import { ArrowLeft, TrendingUp, Zap, DollarSign } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { BnpCTA } from "@/components/BnpCTA";
import { BottomNav } from "@/components/BottomNav";

const SimulationInvestissement = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [investmentAmount, setInvestmentAmount] = useState<string>("5000");
  const [isSimulating, setIsSimulating] = useState(false);
  const [currentYear, setCurrentYear] = useState(0);
  const [currentAmount, setCurrentAmount] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);

  const annualReturn = 0.07;
  const years = 10;
  const initialAmount = parseFloat(investmentAmount) || 0;
  const finalAmount = initialAmount * Math.pow(1 + annualReturn, years);
  const totalGain = finalAmount - initialAmount;

  const startSimulation = () => {
    if (!initialAmount || initialAmount < 100) {
      return;
    }
    setHasStarted(true);
    setIsSimulating(true);
    setCurrentYear(0);
    setCurrentAmount(initialAmount);
    setShowResults(false);

    // Simulate year by year with animation
    let year = 0;
    const interval = setInterval(() => {
      year++;
      if (year <= years) {
        setCurrentYear(year);
        setCurrentAmount(initialAmount * Math.pow(1 + annualReturn, year));
      } else {
        clearInterval(interval);
        setShowResults(true);
      }
    }, 200); // 200ms per year = 2 seconds total
  };

  const resetSimulation = () => {
    setHasStarted(false);
    setIsSimulating(false);
    setShowResults(false);
    setCurrentYear(0);
    setCurrentAmount(0);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-100 via-blue-50 to-indigo-100 pb-20">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md shadow-md">
        <div className="px-4 py-4">
          <button
            onClick={() => navigate(`/parcours/${id}`)}
            className="flex items-center gap-2 text-foreground hover:text-primary transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="font-medium">Retour</span>
          </button>
        </div>
      </header>

      {/* Content */}
      <div className="px-4 py-8 space-y-8 max-w-2xl mx-auto">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center space-y-3"
        >
          <div className="w-20 h-20 mx-auto rounded-full gradient-purple flex items-center justify-center text-white text-3xl font-bold shadow-elevated">
            🏆
          </div>
          <h1 className="text-3xl font-bold text-foreground">Challenge Final</h1>
          <p className="text-lg text-muted-foreground">
            Jeu de simulation PEA sur 10 ans
          </p>
        </motion.div>

        {/* Investment Input */}
        {!hasStarted && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="space-y-6"
          >
            <Card className="p-6 shadow-elevated bg-white border-2 border-purple-200">
              <div className="space-y-4">
                <h2 className="text-2xl font-bold text-foreground flex items-center gap-2">
                  <DollarSign className="w-7 h-7 text-purple-500" />
                  Combien voulez-vous investir ?
                </h2>

                <p className="text-foreground leading-relaxed">
                  Choisissez un montant fictif à placer dans un PEA avec un
                  rendement annuel de <strong className="text-purple-600">7%</strong> sur{" "}
                  <strong className="text-purple-600">10 ans</strong>.
                </p>

                <div className="space-y-3">
                  <label className="text-sm font-medium text-foreground">
                    Montant de l'investissement (€)
                  </label>
                  <Input
                    type="number"
                    min="100"
                    max="1000000"
                    step="100"
                    value={investmentAmount}
                    onChange={(e) => setInvestmentAmount(e.target.value)}
                    className="text-2xl font-bold text-center h-16"
                    placeholder="5000"
                  />
                  <div className="flex gap-2 flex-wrap">
                    {[1000, 5000, 10000, 20000].map((amount) => (
                      <Button
                        key={amount}
                        variant="outline"
                        size="sm"
                        onClick={() => setInvestmentAmount(amount.toString())}
                        className="flex-1"
                      >
                        {amount.toLocaleString()} €
                      </Button>
                    ))}
                  </div>
                </div>

                <div className="bg-blue-50 p-4 rounded-xl border-2 border-blue-200">
                  <h3 className="font-bold text-blue-800 mb-2 flex items-center gap-2">
                    <span className="text-2xl">💡</span>
                    Le pouvoir du temps
                  </h3>
                  <p className="text-sm text-blue-900">
                    Avec un rendement de 7% par an, votre argent double
                    approximativement tous les 10 ans grâce aux intérêts composés.
                  </p>
                </div>
              </div>
            </Card>

            <Button
              className="w-full gradient-purple text-white font-bold py-8 text-xl rounded-2xl shadow-button hover:shadow-elevated transition-all active:translate-y-1"
              size="lg"
              onClick={startSimulation}
              disabled={!initialAmount || initialAmount < 100}
            >
              <Zap className="mr-2 w-6 h-6" fill="currentColor" />
              Lancer la simulation
            </Button>
          </motion.div>
        )}

        {/* Simulation Animation */}
        {isSimulating && !showResults && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Button
              className="w-full gradient-purple text-white font-bold py-8 text-xl rounded-2xl shadow-button hover:shadow-elevated transition-all active:translate-y-1"
              size="lg"
              onClick={startSimulation}
            >
              <Zap className="mr-2 w-6 h-6" fill="currentColor" />
              Lancer la simulation
            </Button>
          </motion.div>
        )}

        {/* Simulation Animation */}
        {isSimulating && !showResults && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="space-y-6"
          >
            <Card className="p-8 shadow-elevated bg-gradient-to-br from-purple-500 to-blue-600 text-white border-0">
              <div className="text-center space-y-6">
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                  className="text-6xl"
                >
                  📈
                </motion.div>

                <div>
                  <p className="text-xl font-medium text-white/90 mb-2">
                    Année {currentYear} / {years}
                  </p>
                  <motion.p
                    key={currentAmount}
                    initial={{ scale: 1.2, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="text-5xl font-bold"
                  >
                    {Math.round(currentAmount).toLocaleString()} €
                  </motion.p>
                </div>

                <div className="w-full bg-white/20 rounded-full h-4 overflow-hidden">
                  <motion.div
                    className="h-full bg-white rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${(currentYear / years) * 100}%` }}
                    transition={{ duration: 0.15 }}
                  />
                </div>
              </div>
            </Card>
          </motion.div>
        )}

        {/* Results */}
        <AnimatePresence>
          {showResults && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              {/* Big Gain Card */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", duration: 0.6 }}
              >
                <Card className="p-8 bg-gradient-to-br from-green-500 to-emerald-600 text-white border-0 shadow-elevated">
                  <div className="text-center space-y-4">
                    <div className="text-6xl">🎉</div>
                    <h2 className="text-2xl font-bold">Vous avez gagné</h2>
                    <motion.p
                      initial={{ scale: 1.5, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 0.2 }}
                      className="text-6xl font-bold"
                    >
                      +{Math.round(totalGain).toLocaleString()} €
                    </motion.p>
                    <p className="text-xl text-white/90">
                      En {years} ans d'investissement PEA
                    </p>
                  </div>
                </Card>
              </motion.div>

              {/* KPIs */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  <Card className="p-6 bg-blue-50 border-2 border-blue-200 text-center">
                    <p className="text-sm text-blue-700 font-medium mb-2">
                      Investissement initial
                    </p>
                    <p className="text-3xl font-bold text-blue-600">
                      {initialAmount.toLocaleString()} €
                    </p>
                  </Card>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <Card className="p-6 bg-green-50 border-2 border-green-200 text-center">
                    <p className="text-sm text-green-700 font-medium mb-2">
                      Gain total
                    </p>
                    <p className="text-3xl font-bold text-green-600">
                      +{Math.round(totalGain).toLocaleString()} €
                    </p>
                  </Card>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <Card className="p-6 bg-purple-50 border-2 border-purple-200 text-center">
                    <p className="text-sm text-purple-700 font-medium mb-2">
                      Capital final
                    </p>
                    <p className="text-3xl font-bold text-purple-600">
                      {Math.round(finalAmount).toLocaleString()} €
                    </p>
                  </Card>
                </motion.div>
              </div>

              {/* Fun Fact Card */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 }}
              >
                <Card className="p-6 bg-gradient-to-br from-blue-500 to-purple-600 text-white border-0 shadow-elevated">
                  <div className="text-center space-y-3">
                    <div className="text-4xl">💰</div>
                    <h3 className="text-xl font-bold">
                      Votre argent a été multiplié par{" "}
                      {(finalAmount / initialAmount).toFixed(1)}x !
                    </h3>
                    <p className="text-sm text-white/90">
                      C'est la magie des intérêts composés sur {years} ans
                    </p>
                  </div>
                </Card>
              </motion.div>

              {/* Insights */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <Card className="p-6 bg-white border-2 border-gray-200">
                  <h3 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
                    <span className="text-2xl">🎓</span>
                    Ce que vous avez appris
                  </h3>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <span className="text-green-500 font-bold text-xl">✓</span>
                      <span className="text-foreground">
                        Le PEA permet de faire fructifier votre épargne avec une fiscalité avantageuse après 5 ans
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-green-500 font-bold text-xl">✓</span>
                      <span className="text-foreground">
                        Un rendement moyen de 7% permet de doubler son capital tous les 10 ans
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-green-500 font-bold text-xl">✓</span>
                      <span className="text-foreground">
                        Les intérêts composés font la différence sur le long terme
                      </span>
                    </li>
                  </ul>
                </Card>
              </motion.div>

              {/* BNP CTA */}
              <BnpCTA
                productName="le PEA BNP Paribas"
                productUrl="https://mabanque.bnpparibas/fr/bourse/les-comptes-dedies/plan-epargne-actions"
              />

              {/* Buttons */}
              <div className="space-y-3">
                <Button
                  className="w-full gradient-bnp text-white font-bold py-6 text-lg rounded-2xl shadow-button hover:shadow-elevated transition-all"
                  size="lg"
                  onClick={() => navigate(`/parcours/${id}`)}
                >
                  Retour au parcours
                </Button>

                <Button
                  variant="outline"
                  className="w-full font-semibold py-6 text-lg rounded-2xl"
                  size="lg"
                  onClick={resetSimulation}
                >
                  Refaire la simulation
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <BottomNav />
    </div>
  );
};

export default SimulationInvestissement;
