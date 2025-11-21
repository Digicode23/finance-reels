import { ArrowLeft, CheckCircle2, Star, Heart, Trophy } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { BnpCTA } from "@/components/BnpCTA";
import { BottomNav } from "@/components/BottomNav";
import { Progress } from "@/components/ui/progress";

const levelContent: Record<string, { 
  title: string; 
  content: string; 
  question: string; 
  answers: string[]; 
  correctAnswer: number; 
  isAdvanced: boolean;
  questionType?: "mcq" | "true-false" | "ordering";
}> = {
  "1": {
    title: "Introduction",
    content: "Le Plan d'Épargne en Actions (PEA) est un compte titres qui permet d'investir en bourse tout en bénéficiant d'avantages fiscaux exceptionnels. Il existe deux types : le PEA classique (jusqu'à 150 000€) et le PEA-PME (jusqu'à 225 000€).",
    question: "Le PEA permet d'investir en bourse avec des avantages fiscaux",
    answers: ["VRAI", "FAUX"],
    correctAnswer: 0,
    isAdvanced: false,
    questionType: "true-false",
  },
  "2": {
    title: "Les bases",
    content: "Après 5 ans de détention, les gains réalisés sur un PEA sont exonérés d'impôt sur le revenu (seuls les prélèvements sociaux de 17,2% s'appliquent). C'est l'un des placements les plus avantageux fiscalement en France.",
    question: "Classez ces durées de détention PEA de la moins avantageuse à la plus avantageuse fiscalement :",
    answers: ["Moins de 5 ans", "Entre 5 et 8 ans", "Plus de 8 ans"],
    correctAnswer: 0, // First item is already correct
    isAdvanced: false,
    questionType: "ordering",
  },
  "3": {
    title: "Pratique",
    content: "Dans un PEA, vous pouvez investir dans des actions d'entreprises européennes et des ETF (fonds indiciels). Les ETF permettent de diversifier facilement votre portefeuille à moindre coût.",
    question: "Que signifie ETF ?",
    answers: ["European Trading Fund", "Exchange Traded Fund", "Equity Transfer Fund"],
    correctAnswer: 1,
    isAdvanced: false,
  },
  "4": {
    title: "Histoire",
    content: "Le PEA a été créé en 1992 pour encourager l'investissement des Français dans les entreprises européennes. Depuis sa création, il est devenu l'un des placements préférés des investisseurs français grâce à ses avantages fiscaux.",
    question: "Le PEA existe depuis 1985",
    answers: ["VRAI", "FAUX"],
    correctAnswer: 1,
    isAdvanced: false,
    questionType: "true-false",
  },
  "5": {
    title: "Révision",
    content: "Révisons les points clés : le PEA permet d'investir en bourse avec des avantages fiscaux après 5 ans, vous pouvez y placer des actions européennes et des ETF, et le plafond est de 150 000€ pour un PEA classique.",
    question: "Quel est l'avantage principal du PEA après 5 ans ?",
    answers: ["Pas de frais", "Exonération d'impôt sur le revenu", "Rendement garanti"],
    correctAnswer: 1,
    isAdvanced: false,
  },
  "6": {
    title: "Niveau avancé",
    content: "Pour optimiser votre PEA, il est important de diversifier vos investissements. Investissez dans différents secteurs et zones géographiques pour réduire les risques. Les ETF sont parfaits pour cela.",
    question: "Pourquoi est-il important de diversifier son PEA ?",
    answers: ["Pour payer moins d'impôts", "Pour réduire les risques", "Pour augmenter le plafond"],
    correctAnswer: 1,
    isAdvanced: true,
  },
  "7": {
    title: "Quiz",
    content: "Les frais de gestion peuvent avoir un impact important sur vos rendements à long terme. Privilégiez les courtiers avec des frais réduits et les ETF à frais bas pour maximiser vos gains.",
    question: "Quel type de frais faut-il surveiller dans un PEA ?",
    answers: ["Frais de courtage uniquement", "Tous les frais (courtage, gestion, ETF)", "Aucun frais à surveiller"],
    correctAnswer: 1,
    isAdvanced: true,
  },
  "8": {
    title: "Coffre bonus",
    content: "Félicitations ! Vous avez débloqué un bonus : saviez-vous que vous pouvez transférer votre PEA d'une banque à une autre sans perdre l'ancienneté fiscale ? C'est un excellent moyen de réduire vos frais !",
    question: "On peut transférer son PEA sans perdre l'ancienneté fiscale",
    answers: ["VRAI", "FAUX"],
    correctAnswer: 0,
    isAdvanced: true,
    questionType: "true-false",
  },
  "9": {
    title: "Expert",
    content: "En tant qu'expert, vous devez connaître les stratégies avancées : le Dollar Cost Averaging (investissement régulier), le rééquilibrage annuel de portefeuille, et l'optimisation de la répartition actions/ETF.",
    question: "Classez ces stratégies d'investissement du plus simple au plus complexe :",
    answers: ["Investissement unique", "Dollar Cost Averaging", "Rééquilibrage de portefeuille"],
    correctAnswer: 0,
    isAdvanced: true,
    questionType: "ordering",
  },
};

const Niveau = () => {
  const navigate = useNavigate();
  const { id, niveauId } = useParams();
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [xpEarned, setXpEarned] = useState(0);
  
  const level = niveauId && levelContent[niveauId] ? levelContent[niveauId] : levelContent["1"];
  
  // Safety check - redirect if level doesn't exist
  if (!level) {
    navigate(`/parcours/${id}`);
    return null;
  }
  
  const handleAnswerClick = (index: number) => {
    if (selectedAnswer !== null) return; // Already answered
    
    // For niveau 10, redirect to simulation
    if (niveauId === "10") {
      navigate(`/parcours/${id}/simulation`);
      return;
    }
    
    setSelectedAnswer(index);
    const correct = index === level.correctAnswer;
    setIsCorrect(correct);
    
    if (correct) {
      setXpEarned(50);
      // Animate XP gain
      setTimeout(() => {
        setXpEarned(0);
      }, 2000);
    }
  };

  const getAnswerClass = (index: number) => {
    // Special styling for niveau 10
    if (niveauId === "10") {
      return "border-purple-300 hover:border-purple-500 hover:bg-purple-50 bg-gradient-to-r from-purple-50 to-blue-50";
    }
    
    if (selectedAnswer === null) {
      return "border-gray-300 hover:border-duo-green hover:bg-green-50";
    }
    if (index === level.correctAnswer) {
      return "border-green-500 bg-green-50";
    }
    if (index === selectedAnswer && !isCorrect) {
      return "border-red-500 bg-red-50";
    }
    return "border-gray-300 opacity-50";
  };

  // Get question icon based on type
  const getQuestionIcon = () => {
    if (level.questionType === "true-false") return "🤷";
    if (level.questionType === "ordering") return "📊";
    return "🤔";
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white pb-20">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white shadow-md">
        <div className="px-4 py-4">
          <div className="flex items-center justify-between mb-3">
            <button 
              onClick={() => navigate(`/parcours/${id}`)}
              className="flex items-center gap-2 text-foreground"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            
            {/* Progress bar */}
            <div className="flex-1 mx-4">
              <Progress value={selectedAnswer !== null ? 100 : 50} className="h-4 bg-gray-200" />
            </div>

            {/* Hearts */}
            <div className="flex items-center gap-1">
              <Heart className="w-6 h-6 text-pink-500" fill="currentColor" />
              <span className="font-bold text-pink-500">5</span>
            </div>
          </div>
        </div>
      </header>

      {/* XP Animation */}
      {xpEarned > 0 && (
        <div className="fixed top-1/3 left-1/2 -translate-x-1/2 z-50 animate-bounce">
          <div className="bg-yellow-500 text-white px-6 py-3 rounded-full shadow-elevated font-bold text-xl">
            +{xpEarned} XP
          </div>
        </div>
      )}

      {/* Content */}
      <div className="px-4 py-6 space-y-6">
        {/* Level badge */}
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full gradient-bnp flex items-center justify-center text-white text-lg font-bold shadow-button">
            {niveauId}
          </div>
          <h1 className="text-2xl font-bold">{level.title}</h1>
        </div>

        {/* Lesson card */}
        <Card className="p-6 shadow-card bg-white border-2 border-gray-100">
          <div className="space-y-4">
            <p className="text-foreground leading-relaxed text-lg">
              {level.content}
            </p>
            
            {level.isAdvanced && (
              <div className="mt-6 p-4 bg-yellow-50 rounded-2xl border-2 border-yellow-200">
                <div className="flex items-start gap-3">
                  <div className="text-3xl">💡</div>
                  <div>
                    <h3 className="font-bold text-yellow-800 mb-1">Point clé</h3>
                    <p className="text-sm text-yellow-900">
                      La régularité des versements et la durée d'investissement sont vos meilleurs alliés pour faire fructifier votre PEA.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </Card>

        {/* Quiz card */}
        <Card className="p-6 shadow-card bg-white border-2 border-gray-100">
          <h3 className="font-bold text-xl mb-2 flex items-center gap-2">
            <span className="text-2xl">{getQuestionIcon()}</span>
            {level.questionType === "true-false" ? "Vrai ou Faux ?" : 
             level.questionType === "ordering" ? "Ordonner" : "Question"}
          </h3>
          <p className="text-foreground mb-6 text-lg">
            {level.question}
          </p>
          
          <div className="space-y-3">
            {level.answers.map((answer, index) => (
              <motion.button
                key={index}
                onClick={() => handleAnswerClick(index)}
                disabled={selectedAnswer !== null && niveauId !== "10"}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`
                  w-full p-4 text-left rounded-2xl border-2 transition-all font-medium text-lg
                  ${getAnswerClass(index)}
                  ${selectedAnswer === null || niveauId === "10" ? "active:scale-95" : ""}
                  ${niveauId === "10" ? "cursor-pointer" : ""}
                  ${selectedAnswer !== null && niveauId !== "10" ? "disabled:cursor-not-allowed" : ""}
                `}
              >
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-3">
                    {level.questionType === "ordering" && (
                      <span className="text-sm bg-gray-200 px-2 py-1 rounded-full font-bold">
                        {index + 1}
                      </span>
                    )}
                    {answer}
                  </span>
                  {selectedAnswer !== null && index === level.correctAnswer && niveauId !== "10" && (
                    <CheckCircle2 className="w-6 h-6 text-green-600" />
                  )}
                  {selectedAnswer === index && !isCorrect && niveauId !== "10" && (
                    <div className="w-6 h-6 text-red-600 font-bold">✗</div>
                  )}
                  {niveauId === "10" && (
                    <span className="text-2xl">🚀</span>
                  )}
                </div>
              </motion.button>
            ))}
          </div>

          {/* Feedback */}
          {isCorrect !== null && (
            <div className={`
              mt-6 p-4 rounded-2xl border-2 animate-in slide-in-from-bottom
              ${isCorrect ? "bg-green-50 border-green-200" : "bg-red-50 border-red-200"}
            `}>
              <div className="flex items-center gap-3">
                <div className="text-4xl">{isCorrect ? "🎉" : "😢"}</div>
                <div>
                  <h4 className={`font-bold text-lg ${isCorrect ? "text-green-800" : "text-red-800"}`}>
                    {isCorrect ? "Bravo !" : "Pas tout à fait..."}
                  </h4>
                  <p className={`text-sm ${isCorrect ? "text-green-700" : "text-red-700"}`}>
                    {isCorrect 
                      ? "Tu as gagné 50 XP ! Continue comme ça !" 
                      : "Réessaie, tu vas y arriver !"}
                  </p>
                </div>
              </div>
            </div>
          )}
        </Card>

        {/* BNP CTA - only show after correct answer */}
        {isCorrect && (
          <div className="animate-in slide-in-from-bottom">
            <BnpCTA 
              productName="le PEA BNP Paribas"
              productUrl="https://www.bnpparibas.fr"
            />
          </div>
        )}

        {/* Complete button */}
        {isCorrect && (
          <Button 
            className="w-full gradient-bnp text-white font-bold py-6 text-lg rounded-2xl shadow-button hover:shadow-elevated transition-all active:translate-y-1"
            size="lg"
            onClick={() => navigate(`/parcours/${id}`)}
          >
            <CheckCircle2 className="mr-2 w-6 h-6" />
            Continuer
          </Button>
        )}
      </div>

      <BottomNav />
    </div>
  );
};

export default Niveau;
