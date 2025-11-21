import { Home, BookOpen, User, Settings, Heart } from "lucide-react";
import { NavLink } from "@/components/NavLink";
import { cn } from "@/lib/utils";

export const BottomNav = () => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50 pb-safe">
      <div className="flex items-center justify-around h-16">
        <NavLink
          to="/"
          end
          className="flex flex-col items-center justify-center gap-0.5 px-4 py-2 transition-all"
        >
          {({ isActive }) => (
            <>
              <div className={cn(
                "w-10 h-10 rounded-xl flex items-center justify-center transition-all",
                isActive ? "bg-blue-100" : "bg-transparent"
              )}>
                <Home className={cn(
                  "w-6 h-6 transition-colors",
                  isActive ? "text-blue-500" : "text-gray-400"
                )} />
              </div>
              <span className={cn(
                "text-xs font-medium",
                isActive ? "text-blue-500" : "text-gray-400"
              )}>Accueil</span>
            </>
          )}
        </NavLink>
        
        <NavLink
          to="/parcours"
          className="flex flex-col items-center justify-center gap-0.5 px-4 py-2 transition-all"
        >
          {({ isActive }) => (
            <>
              <div className={cn(
                "w-10 h-10 rounded-xl flex items-center justify-center transition-all",
                isActive ? "bg-green-100" : "bg-transparent"
              )}>
                <BookOpen className={cn(
                  "w-6 h-6 transition-colors",
                  isActive ? "text-green-500" : "text-gray-400"
                )} />
              </div>
              <span className={cn(
                "text-xs font-medium",
                isActive ? "text-green-500" : "text-gray-400"
              )}>Parcours</span>
            </>
          )}
        </NavLink>
        
        <NavLink
          to="/trophees"
          className="flex flex-col items-center justify-center gap-0.5 px-4 py-2 transition-all"
        >
          {({ isActive }) => (
            <>
              <div className={cn(
                "w-10 h-10 rounded-xl flex items-center justify-center transition-all",
                isActive ? "bg-orange-100" : "bg-transparent"
              )}>
                <Trophy className={cn(
                  "w-6 h-6 transition-colors",
                  isActive ? "text-orange-500" : "text-gray-400"
                )} />
              </div>
              <span className={cn(
                "text-xs font-medium",
                isActive ? "text-orange-500" : "text-gray-400"
              )}>Trophées</span>
            </>
          )}
        </NavLink>
        
        <NavLink
          to="/profil"
          className="flex flex-col items-center justify-center gap-0.5 px-4 py-2 transition-all"
        >
          {({ isActive }) => (
            <>
              <div className={cn(
                "w-10 h-10 rounded-xl flex items-center justify-center transition-all",
                isActive ? "bg-purple-100" : "bg-transparent"
              )}>
                <User className={cn(
                  "w-6 h-6 transition-colors",
                  isActive ? "text-purple-500" : "text-gray-400"
                )} />
              </div>
              <span className={cn(
                "text-xs font-medium",
                isActive ? "text-purple-500" : "text-gray-400"
              )}>Profil</span>
            </>
          )}
        </NavLink>
      </div>
    </nav>
  );
};

// Add Trophy import
import { Trophy } from "lucide-react";
