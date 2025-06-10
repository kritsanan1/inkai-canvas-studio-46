
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from '@/components/ui/sonner';
import Index from '@/pages/Index';
import Gallery from '@/pages/Gallery';
import CreateDesign from '@/pages/CreateDesign';
import Artists from '@/pages/Artists';
import Pricing from '@/pages/Pricing';
import Studio from '@/pages/Studio';
import Sitemap from '@/pages/Sitemap';
import NotFound from '@/pages/NotFound';
import './App.css';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/create-design" element={<CreateDesign />} />
            <Route path="/artists" element={<Artists />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/studio" element={<Studio />} />
            <Route path="/sitemap" element={<Sitemap />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Toaster />
        </div>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
