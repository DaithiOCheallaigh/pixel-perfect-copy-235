import { Outlet } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const PortfolioLayout = () => (
  <div className="relative isolate bg-card">
    <Navigation visible />
    <div className="relative z-[2] -mb-8 overflow-clip rounded-b-[32px] bg-background">
      <Outlet />
    </div>
    <Footer />
  </div>
);

export default PortfolioLayout;
