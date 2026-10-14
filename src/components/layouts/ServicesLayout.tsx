import { Outlet } from "react-router-dom";
import ServicesNavigation from "@/components/ServicesNavigation";
import ServicesFooter from "@/components/ServicesFooter";
import ServiceSelectionBar from "@/components/ServiceSelectionBar";

const ServicesLayout = () => (
  <div className="relative isolate bg-card">
    <ServicesNavigation visible />
    <div className="relative z-[2] -mb-8 overflow-clip rounded-b-[32px] bg-background">
      <Outlet />
    </div>
    <ServicesFooter />
    <ServiceSelectionBar />
  </div>
);

export default ServicesLayout;
