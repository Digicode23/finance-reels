import { ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface BnpCTAProps {
  productName: string;
  productUrl: string;
}

export const BnpCTA = ({ productName, productUrl }: BnpCTAProps) => {
  return (
    <Card className="p-6 border-2 border-primary bg-card shadow-elevated mt-8">
      <div className="text-center space-y-4">
        <h3 className="text-xl font-semibold text-foreground">
          Envie de passer à l'action ?
        </h3>
        
        <p className="text-sm text-muted-foreground">
          Découvrez comment BNP Paribas peut vous accompagner
        </p>
        
        <Button 
          className="w-full gradient-bnp text-primary-foreground font-semibold shadow-md hover:shadow-lg transition-all"
          size="lg"
          asChild
        >
          <a href={productUrl} target="_blank" rel="noopener noreferrer">
            Découvrir {productName}
            <ExternalLink className="ml-2 w-4 h-4" />
          </a>
        </Button>
        
        <p className="text-xs text-muted-foreground">
          Lien externe sécurisé – recommandé après ce module
        </p>
      </div>
    </Card>
  );
};
