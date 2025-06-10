
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
import Index from "./pages/Index";
import Studio from "./pages/Studio";
import Gallery from "./pages/Gallery";
import Artists from "./pages/Artists";
import Pricing from "./pages/Pricing";
import CreateDesign from "./pages/CreateDesign";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <div className="min-h-screen bg-deep-black text-foreground">
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/studio" element={<Studio />} />
              <Route path="/gallery" element={<Gallery />} />
              <Route path="/artists" element={<Artists />} />
              <Route path="/pricing" element={<Pricing />} />
              <Route path="/create-design" element={<CreateDesign />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
