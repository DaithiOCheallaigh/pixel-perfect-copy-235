import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, useLocation, useRoutes, type RouteObject } from "react-router-dom";
import { useEffect, Component, type ReactNode, type ErrorInfo } from "react";
import Index from "./pages/Index";
import Work from "./pages/Work";
import About from "./pages/About";
import Skills from "./pages/Skills";
import Blog from "./pages/Blog";
import CaseStudy from "./pages/CaseStudy";
import SparkCaseStudy from "./pages/SparkCaseStudy";
import SparkPasswordGate from "./components/SparkPasswordGate";
import ServicePage from "./pages/ServicePage";
import WebDesignServices from "./pages/WebDesignServices";
import AIDesignProcess from "./pages/AIDesignProcess";
import ProductStudio from "./pages/ProductStudio";
import Terms from "./pages/Terms";
import BlogPost from "./pages/BlogPost";
import StartProject from "./pages/StartProject";
import MarshInternalTooling from "./pages/MarshInternalTooling";
import MarshDesignSystem from "./pages/MarshDesignSystem";
import NotFound from "./pages/NotFound";
import Sitemap from "./pages/Sitemap";
import Services from "./pages/Services";
import ShowcasePage from "./pages/ShowcasePage";
import ShowcaseAdmin from "./pages/ShowcaseAdmin";
import ShowcasesIndex from "./pages/ShowcasesIndex";
import ShowcaseNotFound from "./components/showcase/ShowcaseNotFound";
import IndustryLanding from "./pages/IndustryLanding";
import GetStarted from "./pages/GetStarted";
import ToolsIndex from "./pages/ToolsIndex";
import LinkInBio from "./pages/tools/LinkInBio";
import ReviewLink from "./pages/tools/ReviewLink";
import CaptionGenerator from "./pages/tools/CaptionGenerator";
import BioPage from "./pages/tools/BioPage";
import Refer from "./pages/Refer";
import TPIProposal from "./pages/proposals/TPIProposal";
import ElsevierUXAudit from "./pages/proposals/ElsevierUXAudit";

import LegacyRedirect from "./components/LegacyRedirect";
import PortfolioLayout from "./components/layouts/PortfolioLayout";
import ServicesLayout from "./components/layouts/ServicesLayout";
import ServicesNotFound from "./pages/ServicesNotFound";
import ClientNotFound from "./components/ClientNotFound";
import { routeTable, type RouteDef } from "./routing/routeTable";


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

const sparkGate = <SparkPasswordGate><SparkCaseStudy /></SparkPasswordGate>;

const elements: Record<string, ReactNode> = {
  "proposal-tpi": <TPIProposal />,
  "proposal-elsevier": <ElsevierUXAudit />,
  "proposal-unknown": <ClientNotFound />,
  "showcases-index": <ShowcasesIndex />,
  "showcase-root": <ShowcaseNotFound />,
  "showcase-admin": <ShowcaseAdmin />,
  "showcase-page": <ShowcasePage />,
  "showcase-unknown": <ShowcaseNotFound />,
  "bio-page": <BioPage />,
  "bio-unknown": <BioPage />,
  "services-layout": <ServicesLayout />,
  "services-home": <Services />,
  "product-studio": <ProductStudio />,
  "web-design": <WebDesignServices />,
  "start-project": <StartProject />,
  "get-started": <GetStarted />,
  terms: <Terms />,
  refer: <Refer />,
  "tools-index": <ToolsIndex />,
  "tool-link-in-bio": <LinkInBio />,
  "tool-review-link": <ReviewLink />,
  "tool-caption-generator": <CaptionGenerator />,
  "service-detail": <ServicePage />,
  segment: <IndustryLanding />,
  "services-not-found": <ServicesNotFound />,
  "portfolio-layout": <PortfolioLayout />,
  home: <Index />,
  work: <Work />,
  "spark-work": sparkGate,
  "spark-case": sparkGate,
  "case-study": <CaseStudy />,
  "marsh-internal-tooling": <MarshInternalTooling />,
  "marsh-design-system": <MarshDesignSystem />,
  about: <About />,
  skills: <Skills />,
  blog: <Blog />,
  "blog-post": <BlogPost />,
  "ai-design-process": <AIDesignProcess />,
  sitemap: <Sitemap />,
  "not-found": <NotFound />,
};

function buildRoutes(defs: RouteDef[]): RouteObject[] {
  return defs.map((def) => {
    const element = def.redirectTo ? <LegacyRedirect to={def.redirectTo} /> : elements[def.id];
    if (!element) throw new Error(`No element for route id "${def.id}"`);
    const children = def.children ? buildRoutes(def.children) : undefined;
    return (def.index
      ? { id: def.id, index: true, element }
      : { id: def.id, path: def.path, element, children }) as RouteObject;
  });
}

const routes = buildRoutes(routeTable);
const AppRoutes = () => useRoutes(routes);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <GlobalErrorListeners />
      <AppErrorBoundary>
        <BrowserRouter>
          <ScrollToTop />
          <AppRoutes />
        </BrowserRouter>
      </AppErrorBoundary>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
