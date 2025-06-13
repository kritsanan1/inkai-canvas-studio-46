import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from '@/components/ui/sonner';
import { AuthProvider } from '@/contexts/AuthContext';
import Index from '@/pages/Index';
import Gallery from '@/pages/Gallery';
import CreateDesign from '@/pages/CreateDesign';
import Artists from '@/pages/Artists';
import Pricing from '@/pages/Pricing';
import Studio from '@/pages/Studio';
import Sitemap from '@/pages/Sitemap';
import NotFound from '@/pages/NotFound';
import AuthCallback from '@/pages/AuthCallback';
import ResetPassword from '@/pages/ResetPassword';
import UserProfile from '@/components/auth/UserProfile';
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import './App.css';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      retry: 1,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Router>
          <div className="App">
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/gallery" element={<Gallery />} />
              <Route path="/artists" element={<Artists />} />
              <Route path="/pricing" element={<Pricing />} />
              <Route path="/sitemap" element={<Sitemap />} />
              <Route path="/auth/callback" element={<AuthCallback />} />
              <Route path="/auth/reset-password" element={<ResetPassword />} />
              
              {/* Protected Routes */}
              <Route 
                path="/create-design" 
                element={
                  <ProtectedRoute>
                    <CreateDesign />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/studio" 
                element={
                  <ProtectedRoute>
                    <Studio />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/profile" 
                element={
                  <ProtectedRoute>
                    <UserProfile />
                  </ProtectedRoute>
                } 
              />
              
              <Route path="*" element={<NotFound />} />
            </Routes>
            <Toaster />
          </div>
        </Router>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;