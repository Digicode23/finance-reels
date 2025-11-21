import { Bell, Globe, Shield, HelpCircle, LogOut } from "lucide-react";
import { BottomNav } from "@/components/BottomNav";
import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";

const Parametres = () => {
  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="px-4 py-4">
          <h1 className="text-2xl font-bold">Paramètres</h1>
        </div>
      </header>

      <div className="px-4 py-6 space-y-6">
        {/* Notifications */}
        <Card className="p-6 shadow-card">
          <div className="flex items-center gap-3 mb-4">
            <Bell className="w-5 h-5 text-primary" />
            <h2 className="text-lg font-semibold">Notifications</h2>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Rappels quotidiens</p>
                <p className="text-sm text-muted-foreground">Recevoir un rappel pour apprendre</p>
              </div>
              <Switch />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Nouveaux contenus</p>
                <p className="text-sm text-muted-foreground">Être notifié des nouveaux modules</p>
              </div>
              <Switch />
            </div>
          </div>
        </Card>

        {/* Language */}
        <Card className="p-6 shadow-card">
          <div className="flex items-center gap-3 mb-4">
            <Globe className="w-5 h-5 text-primary" />
            <h2 className="text-lg font-semibold">Langue</h2>
          </div>
          <button className="w-full p-3 text-left rounded-lg border border-border hover:border-primary hover:bg-primary/5 transition-colors">
            <div className="flex items-center justify-between">
              <span className="font-medium">Français</span>
              <span className="text-sm text-muted-foreground">FR</span>
            </div>
          </button>
        </Card>

        {/* Privacy */}
        <Card className="p-6 shadow-card">
          <div className="flex items-center gap-3 mb-4">
            <Shield className="w-5 h-5 text-primary" />
            <h2 className="text-lg font-semibold">Confidentialité</h2>
          </div>
          <div className="space-y-3">
            <button className="w-full p-3 text-left rounded-lg hover:bg-muted transition-colors">
              <p className="font-medium">Politique de confidentialité</p>
            </button>
            <button className="w-full p-3 text-left rounded-lg hover:bg-muted transition-colors">
              <p className="font-medium">Conditions d'utilisation</p>
            </button>
          </div>
        </Card>

        {/* Help */}
        <Card className="p-6 shadow-card">
          <div className="flex items-center gap-3 mb-4">
            <HelpCircle className="w-5 h-5 text-primary" />
            <h2 className="text-lg font-semibold">Aide & Support</h2>
          </div>
          <div className="space-y-3">
            <button className="w-full p-3 text-left rounded-lg hover:bg-muted transition-colors">
              <p className="font-medium">Centre d'aide</p>
            </button>
            <button className="w-full p-3 text-left rounded-lg hover:bg-muted transition-colors">
              <p className="font-medium">Nous contacter</p>
            </button>
          </div>
        </Card>

        {/* Logout */}
        <button className="w-full p-4 rounded-lg border border-destructive text-destructive hover:bg-destructive/10 transition-colors flex items-center justify-center gap-2">
          <LogOut className="w-5 h-5" />
          <span className="font-semibold">Se déconnecter</span>
        </button>
      </div>

      <BottomNav />
    </div>
  );
};

export default Parametres;
