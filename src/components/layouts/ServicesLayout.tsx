import { Outlet } from "react-router-dom";
import ServicesNavigation from "@/components/ServicesNavigation";
import ServicesFooter from "@/components/ServicesFooter";
import ServiceSelectionBar from "@/components/ServiceSelectionBar";

const ServicesLayout = () => (
  <>
    <ServicesNavigation visible />
    <Outlet />
    <ServicesFooter />
    <ServiceSelectionBar />
  </>
);

export default ServicesLayout;
