import { Helmet } from "react-helmet-async";

const ClientNotFound = () => (
  <main className="flex min-h-screen flex-col items-center justify-center gap-3 bg-background px-6 text-center text-foreground">
    <Helmet><meta name="robots" content="noindex,nofollow" /></Helmet>
    <h1 className="text-2xl font-bold">Page not found</h1>
    <p className="text-sm text-muted-foreground">This link isn't available. Please check the address you were sent.</p>
  </main>
);

export default ClientNotFound;
