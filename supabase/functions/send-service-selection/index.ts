import { corsHeaders, escapeHtml, isValidEmail, json, sendResend, str, subjectSafe } from "../_shared/email-utils.ts";

// Server-side source of truth (mirrors allServices in src/pages/Services.tsx)
const SERVICES: Record<string, { title: string; price: string; priceValue: number; monthly?: boolean }> = {
  website: { title: "Website Creation", price: "From €375", priceValue: 375 },
  "domain-email": { title: "Domain & Custom Email", price: "From €150 setup", priceValue: 150 },
  "social-media": { title: "Social Media Setup", price: "From €200 setup", priceValue: 200 },
  "local-seo": { title: "Local SEO & Google", price: "Strategy free", priceValue: 0 },
  "platform-onboarding": { title: "Platform Onboarding", price: "From €200", priceValue: 200 },
  "ai-audit": { title: "Bespoke AI Audit", price: "Free Consultation", priceValue: 0 },
  chatbots: { title: "AI-Powered Chatbots", price: "Free Consultation", priceValue: 0 },
  reservations: { title: "Reservation Systems", price: "€200 setup", priceValue: 200 },
  crm: { title: "CRM Setup & Integration", price: "Free Consultation", priceValue: 0 },
  "ai-assistant": { title: "AI Personal Assistant", price: "€100/month", priceValue: 100, monthly: true },
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });
  if (req.method !== "POST") return json({ error: "Method not allowed" }, 405);

  try {
    let body: Record<string, unknown>;
    try {
      body = await req.json();
    } catch {
      return json({ error: "Invalid JSON" }, 400);
    }
    if (!body || typeof body !== "object") return json({ error: "Invalid body" }, 400);

    // Honeypot: pretend success, send nothing
    if (typeof body.company_website === "string" && body.company_website.trim()) return json({ success: true });

    const name = str(body.name, 100, true);
    if (name === null) return json({ error: "Name is required (max 100 characters)" }, 400);
    if (!isValidEmail(body.email)) return json({ error: "A valid email is required" }, 400);
    const email = (body.email as string).trim();

    const rawIds = Array.isArray(body.serviceIds) ? body.serviceIds.slice(0, 20) : [];
    const ids = [...new Set(rawIds.filter((id): id is string => typeof id === "string" && id in SERVICES))];
    if (!ids.length) return json({ error: "No valid services selected" }, 400);

    const services = ids.map((id) => SERVICES[id]);
    const oneOff = services.filter((s) => !s.monthly).reduce((t, s) => t + s.priceValue, 0);
    const monthly = services.filter((s) => s.monthly).reduce((t, s) => t + s.priceValue, 0);
    const rows = services
      .map((s) => `<tr><td style="padding:6px 12px;border:1px solid #ddd;">${escapeHtml(s.title)}</td><td style="padding:6px 12px;border:1px solid #ddd;">${escapeHtml(s.price)}</td></tr>`)
      .join("");

    const html = `
      <h1>New Consultation Request — Service Selection</h1>
      <p><strong>Name:</strong> ${escapeHtml(name)}</p>
      <p><strong>Email:</strong> ${escapeHtml(email)}</p>
      <h2>Selected Services (${services.length})</h2>
      <table style="border-collapse:collapse;">${rows}</table>
      <p><strong>Indicative one-off setup (from):</strong> €${oneOff.toLocaleString()}</p>
      ${monthly ? `<p><strong>Indicative monthly:</strong> €${monthly.toLocaleString()}/month</p>` : ""}
      <p style="color:#666;">Indicative only — "from" prices and free consultations; final quote depends on scope. Sent from the services selection bar on lacunadigital.io</p>
    `;

    return await sendResend({
      reply_to: email,
      subject: subjectSafe(`Consultation Request: ${name} — ${services.length} service${services.length === 1 ? "" : "s"} selected`),
      html,
    });
  } catch (error) {
    console.error("send-service-selection error:", error);
    return json({ error: "Internal error" }, 500);
  }
});
