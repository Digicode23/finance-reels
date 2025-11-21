import { ArrowLeft, CheckCircle2 } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { BnpCTA } from "@/components/BnpCTA";
import { BottomNav } from "@/components/BottomNav";

const levelContent: Record<string, { title: string; content: string; isAdvanced: boolean }> = {
  "1": {
    title: "Débuter avec le PEA",
    content: "Le Plan d'Épargne en Actions (PEA) est un compte titres qui permet d'investir en bourse tout en bénéficiant d'avantages fiscaux. Il existe deux types : le PEA classique (jusqu'à 150 000€) et le PEA-PME (jusqu'à 225 000€).",
    isAdvanced: false,
  },
  "2": {
    title: "Fiscalité du PEA",
    content: "Après 5 ans de détention, les gains réalisés sur un PEA sont exonérés d'impôt sur le revenu (seuls les prélèvements sociaux de 17,2% s'appliquent). C'est l'un des placements les plus avantageux fiscalement en France.",
    isAdvanced: false,
  },
  "3": {
    title: "Actions et ETF",
    content: "Dans un PEA, vous pouvez investir dans des actions d'entreprises européennes et des ETF (fonds indiciels). Les ETF permettent de diversifier facilement votre portefeuille à moindre coût.",
    isAdvanced: false,
  },
  "5": {
    title: "Simulation d'investissement",
    content: "Simulez votre stratégie d'investissement. Avec un versement mensuel de 200€ sur 20 ans et un rendement moyen de 7%, vous pourriez obtenir environ 104 000€.",
    isAdvanced: true,
  },
};

const Niveau = () => {
  const navigate = useNavigate();
  const { id, niveauId } = useParams();
  
  const level = niveauId ? levelContent[niveauId] : levelContent["1"];
  
  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="px-4 py-4">
          <button 
            onClick={() => navigate(`/parcours/${id}`)}
            className="flex items-center gap-2 text-foreground mb-3"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="font-medium">Retour au parcours</span>
          </button>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full gradient-bnp flex items-center justify-center text-white text-sm font-semibold">
              {niveauId}
            </div>
            <h1 className="text-xl font-bold">{level.title}</h1>
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="px-4 py-6 space-y-6">
        {/* Lesson card */}
        <Card className="p-6 shadow-card">
          <div className="space-y-4">
            <p className="text-foreground leading-relaxed">
              {level.content}
            </p>
            
            {level.isAdvanced && (
              <div className="mt-6 p-4 bg-primary/5 rounded-lg border border-primary/20">
                <h3 className="font-semibold text-primary mb-2">💡 Point clé</h3>
                <p className="text-sm text-foreground">
                  La régularité des versements et la durée d'investissement sont vos meilleurs alliés pour faire fructifier votre PEA.
                </p>
              </div>
            )}
          </div>
        </Card>

        {/* Interactive quiz (simple example) */}
        <Card className="p-6 shadow-card">
          <h3 className="font-semibold text-foreground mb-4">📝 Question rapide</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Après combien d'années les gains d'un PEA sont-ils exonérés d'impôt sur le revenu ?
          </p>
          
          <div className="space-y-2">
            {["3 ans", "5 ans", "8 ans"].map((answer, index) => (
              <button
                key={index}
                className="w-full p-3 text-left rounded-lg border border-border hover:border-primary hover:bg-primary/5 transition-colors"
              >
                {answer}
              </button>
            ))}
          </div>
        </Card>

        {/* BNP CTA */}
        <BnpCTA 
          productName="le PEA BNP Paribas"
          productUrl="https://www.bnpparibas.fr"
        />

        {/* Complete button */}
        <Button 
          className="w-full gradient-bnp text-primary-foreground font-semibold shadow-md"
          size="lg"
          onClick={() => navigate(`/parcours/${id}`)}
        >
          <CheckCircle2 className="mr-2 w-5 h-5" />
          Marquer comme terminé
        </Button>
      </div>

      <BottomNav />
    </div>
  );
};

export default Niveau;
