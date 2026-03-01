import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Index from "./pages/Index";
import Work from "./pages/Work";
import About from "./pages/About";
import Skills from "./pages/Skills";
import Blog from "./pages/Blog";
import CaseStudy from "./pages/CaseStudy";
import ServicePage from "./pages/ServicePage";
import WebDesignServices from "./pages/WebDesignServices";
import AIDesignProcess from "./pages/AIDesignProcess";
import BlogPost from "./pages/BlogPost";
import StartProject from "./pages/StartProject";
import NotFound from "./pages/NotFound";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";


const queryClient = new QueryClient();

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const AppContent = () => {
  return (
    <>
      <Navigation visible={true} />
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/work" element={<Work />} />
        <Route path="/about" element={<About />} />
        <Route path="/skills" element={<Skills />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:id" element={<BlogPost />} />
        <Route path="/case/:id" element={<CaseStudy />} />
        <Route path="/service/:id" element={<ServicePage />} />
        <Route path="/web-design" element={<WebDesignServices />} />
        <Route path="/ai-design-process" element={<AIDesignProcess />} />
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
