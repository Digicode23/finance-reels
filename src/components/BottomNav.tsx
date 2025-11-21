import { Home, BookOpen, User, Settings } from "lucide-react";
import { NavLink } from "@/components/NavLink";
import { cn } from "@/lib/utils";

export const BottomNav = () => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-card border-t border-border z-50">
      <div className="flex items-center justify-around h-16 px-2">
        <NavLink
          to="/"
          end
          className="flex flex-col items-center justify-center gap-1 px-4 py-2 rounded-xl transition-colors"
          activeClassName="text-primary bg-primary/10"
        >
          {({ isActive }) => (
            <>
              <Home className={cn("w-5 h-5", isActive && "fill-primary")} />
              <span className="text-xs font-medium">Accueil</span>
            </>
          )}
        </NavLink>
        
        <NavLink
          to="/parcours"
          className="flex flex-col items-center justify-center gap-1 px-4 py-2 rounded-xl transition-colors"
          activeClassName="text-primary bg-primary/10"
        >
          {({ isActive }) => (
            <>
              <BookOpen className={cn("w-5 h-5", isActive && "fill-primary")} />
              <span className="text-xs font-medium">Parcours</span>
            </>
          )}
        </NavLink>
        
        <NavLink
          to="/profil"
          className="flex flex-col items-center justify-center gap-1 px-4 py-2 rounded-xl transition-colors"
          activeClassName="text-primary bg-primary/10"
        >
          {({ isActive }) => (
            <>
              <User className={cn("w-5 h-5", isActive && "fill-primary")} />
              <span className="text-xs font-medium">Profil</span>
            </>
          )}
        </NavLink>
        
        <NavLink
          to="/parametres"
          className="flex flex-col items-center justify-center gap-1 px-4 py-2 rounded-xl transition-colors"
          activeClassName="text-primary bg-primary/10"
        >
          {({ isActive }) => (
            <>
              <Settings className={cn("w-5 h-5", isActive && "fill-primary")} />
              <span className="text-xs font-medium">Paramètres</span>
            </>
          )}
        </NavLink>
      </div>
    </nav>
  );
};
