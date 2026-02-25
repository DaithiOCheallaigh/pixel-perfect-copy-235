import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useState, useEffect, useCallback } from "react";
import Index from "./pages/Index";
import Work from "./pages/Work";
import About from "./pages/About";
import Skills from "./pages/Skills";
import Blog from "./pages/Blog";
import CaseStudy from "./pages/CaseStudy";
import ServicePage from "./pages/ServicePage";
import NotFound from "./pages/NotFound";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";

import PageLoader from "./components/PageLoader";

const queryClient = new QueryClient();

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const AppContent = () => {
  const [loaded, setLoaded] = useState(false);
  const handleLoaderComplete = useCallback(() => setLoaded(true), []);

  return (
    <>
      {!loaded && <PageLoader onComplete={handleLoaderComplete} />}
      
      <Navigation visible={loaded} />
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/work" element={<Work />} />
        <Route path="/about" element={<About />} />
        <Route path="/skills" element={<Skills />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/case/:id" element={<CaseStudy />} />
        <Route path="/service/:id" element={<ServicePage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
