import { Outlet } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { PortfolioSEO } from "@/components/PortfolioSEO";

const PortfolioLayout = () => (
  <>
    <PortfolioSEO title="Home" description="Dave Kelly — Senior Product Designer" />
    <Navigation visible />
    <Outlet />
    <Footer />
  </>
);

export default PortfolioLayout;
