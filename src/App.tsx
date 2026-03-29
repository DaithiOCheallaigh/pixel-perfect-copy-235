import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect, Component, type ReactNode, type ErrorInfo } from "react";
import Index from "./pages/Index";
import Work from "./pages/Work";
import About from "./pages/About";
import Skills from "./pages/Skills";
import Blog from "./pages/Blog";
import CaseStudy from "./pages/CaseStudy";
import ServicePage from "./pages/ServicePage";
import WebDesignServices from "./pages/WebDesignServices";
import AIDesignProcess from "./pages/AIDesignProcess";
import AIIntegration from "./pages/AIIntegration";
import BlogPost from "./pages/BlogPost";
import StartProject from "./pages/StartProject";
import MarshInternalTooling from "./pages/MarshInternalTooling";
import MarshDesignSystem from "./pages/MarshDesignSystem";
import NotFound from "./pages/NotFound";
import Sitemap from "./pages/Sitemap";
import Services from "./pages/Services";
import ShowcasePage from "./pages/ShowcasePage";
import ShowcaseAdmin from "./pages/ShowcaseAdmin";
import ShowcaseNotFound from "./components/showcase/ShowcaseNotFound";
import IndustryLanding from "./pages/IndustryLanding";
import GetStarted from "./pages/GetStarted";
import ToolsIndex from "./pages/ToolsIndex";
import WhatsAppScriptGenerator from "./pages/WhatsAppScriptGenerator";
import WhatsAppScripts from "./pages/tools/WhatsAppScripts";
import LinkInBio from "./pages/tools/LinkInBio";
import ReviewLink from "./pages/tools/ReviewLink";
import CaptionGenerator from "./pages/tools/CaptionGenerator";
import BioPage from "./pages/tools/BioPage";
import Refer from "./pages/Refer";
import ChatWidget from "./components/chat/ChatWidget";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";


const queryClient = new QueryClient();

class AppErrorBoundary extends Component<{ children: ReactNode }, { hasError: boolean }> {
  constructor(props: { children: ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("App render error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex min-h-screen items-center justify-center bg-background px-6 text-foreground">
          <div className="max-w-md space-y-4 text-center">
            <h1 className="text-2xl font-bold">Something went wrong</h1>
            <p className="text-sm text-muted-foreground">Please refresh the page. If this keeps happening, we can debug the exact runtime error.</p>
            <button
              type="button"
              onClick={() => window.location.reload()}
              className="rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground"
            >
              Refresh page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

const GlobalErrorListeners = () => {
  useEffect(() => {
    const handleUnhandledRejection = (event: PromiseRejectionEvent) => {
      console.error("Unhandled promise rejection:", event.reason);
    };

    const handleError = (event: ErrorEvent) => {
      console.error("Uncaught runtime error:", event.error ?? event.message);
    };

    window.addEventListener("unhandledrejection", handleUnhandledRejection);
    window.addEventListener("error", handleError);

    return () => {
      window.removeEventListener("unhandledrejection", handleUnhandledRejection);
      window.removeEventListener("error", handleError);
    };
  }, []);

  return null;
};

const ScrollToTop = () => {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) {
      setTimeout(() => {
        const el = document.querySelector(hash);
        el?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname, hash]);
  return null;
};

const MainLayout = () => (
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
      <Route path="/ai-integration" element={<AIIntegration />} />
      <Route path="/work/marsh-internal-tooling" element={<MarshInternalTooling />} />
      <Route path="/work/marsh-design-system" element={<MarshDesignSystem />} />
      <Route path="/start-project" element={<StartProject />} />
      <Route path="/sitemap" element={<Sitemap />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
    <Footer />
  </>
);

const AppContent = () => {
  const location = useLocation();
  const servicesRoutes = ["/services", "/web-design", "/ai-integration", "/get-started", "/refer"];
  const isServicesRoute =
    servicesRoutes.includes(location.pathname) ||
    location.pathname.startsWith("/services/") ||
    location.pathname.startsWith("/tools");

  const bioRoutes = location.pathname.startsWith("/bio");

  const showcaseRoutes = location.pathname.startsWith("/showcase");

  return (
    <>
      <ScrollToTop />
      {showcaseRoutes ? (
        <Routes>
          <Route path="/showcase/admin" element={<ShowcaseAdmin />} />
          <Route path="/showcase/:slug" element={<ShowcasePage />} />
          <Route path="/showcase" element={<ShowcaseNotFound />} />
        </Routes>
      ) : isServicesRoute ? (
        <>
          <Routes>
            <Route path="/services" element={<Services />} />
            <Route path="/services/:slug" element={<IndustryLanding />} />
            <Route path="/web-design" element={<WebDesignServices />} />
            <Route path="/ai-integration" element={<AIIntegration />} />
            <Route path="/get-started" element={<GetStarted />} />
            <Route path="/tools" element={<ToolsIndex />} />
            <Route path="/tools/whatsapp-script-generator" element={<WhatsAppScriptGenerator />} />
            <Route path="/refer" element={<Refer />} />
          </Routes>
          <ChatWidget />
        </>
      ) : (
        <MainLayout />
      )}
    </>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <GlobalErrorListeners />
      <AppErrorBoundary>
        <BrowserRouter>
          <AppContent />
        </BrowserRouter>
      </AppErrorBoundary>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
