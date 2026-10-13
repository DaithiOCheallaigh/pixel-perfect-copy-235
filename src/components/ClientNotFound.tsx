import { SEO } from "@/components/SEO";

const ClientNotFound = () => (
  <main className="flex min-h-screen flex-col items-center justify-center gap-3 bg-background px-6 text-center text-foreground">
    <SEO title="Page not found" description="This link isn't available. It may have expired or been mistyped, so please check the address you were sent or contact the person who shared it with you." noindex />
    <h1 className="text-2xl font-bold">Page not found</h1>
    <p className="text-sm text-muted-foreground">This link isn't available. Please check the address you were sent.</p>
  </main>
);

export default ClientNotFound;
