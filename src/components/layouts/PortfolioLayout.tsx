import { Outlet } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const PortfolioLayout = () => (
  <>
    <Navigation visible />
    <Outlet />
    <Footer />
  </>
);

export default PortfolioLayout;
