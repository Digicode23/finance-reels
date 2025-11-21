import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Parcours from "./pages/Parcours";
import ParcoursHome from "./pages/ParcoursHome";
import Niveau from "./pages/Niveau";
import SimulationInvestissement from "./pages/SimulationInvestissement";
import Profil from "./pages/Profil";
import Parametres from "./pages/Parametres";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/parcours" element={<ParcoursHome />} />
          <Route path="/parcours/:id" element={<Parcours />} />
          <Route path="/parcours/:id/niveau/:niveauId" element={<Niveau />} />
          <Route path="/parcours/:id/simulation" element={<SimulationInvestissement />} />
          <Route path="/profil" element={<Profil />} />
          <Route path="/parametres" element={<Parametres />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
