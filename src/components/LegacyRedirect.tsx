import { Navigate, useLocation, useParams } from "react-router-dom";
import { resolveLegacyTarget } from "@/routing/resolveLegacyTarget";

const LegacyRedirect = ({ to }: { to: string }) => {
  const params = useParams();
  const { search, hash } = useLocation();
  return <Navigate to={resolveLegacyTarget(to, params, search, hash)} replace />;
};

export default LegacyRedirect;
