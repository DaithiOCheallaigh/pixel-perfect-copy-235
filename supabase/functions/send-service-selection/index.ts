import { addOns, entry, eur, priceLabel, VAT_REGISTERED, webLadder } from "../_shared/pricing.ts";
import { corsHeaders, escapeHtml, isValidEmail, json, sendResend, str, subjectSafe } from "../_shared/email-utils.ts";

// Server-side source of truth, built from the shared pricing (mirrors the /services cards).
const v = VAT_REGISTERED ? " + VAT" : "";
const SERVICES: Record<string, { title: string; price: string; oneOff: number; monthly: number }> = {
  website: { title: "Website (Launch)", price: `From ${priceLabel(webLadder[0])}`, oneOff: webLadder[0].price ?? 0, monthly: 0 },
  "domain-email": { title: "Domain & Custom Email", price: `${eur(addOns.email.setup)} setup${v} (${addOns.email.inboxesIncluded} inboxes) · licences at cost`, oneOff: addOns.email.setup, monthly: 0 },
  "social-media": { title: "Social Media Setup", price: `${eur(addOns.socialSetup)} setup${v} · optional posting ${eur(addOns.socialPosting.monthly)}/mo (${addOns.socialPosting.posts} posts)`, oneOff: addOns.socialSetup, monthly: 0 },
  "local-seo": { title: "Google profile & local SEO", price: `${eur(addOns.gbp)} setup${v}`, oneOff: addOns.gbp, monthly: 0 },
  "platform-onboarding": { title: "Delivery listing tune-up", price: `${eur(addOns.listingTuneup)}${v} per platform, after approval`, oneOff: addOns.listingTuneup, monthly: 0 },
  "ai-audit": { title: "AI Opportunity Audit", price: `${eur(entry.aiAudit.price)}${v} · half credited`, oneOff: entry.aiAudit.price, monthly: 0 },
  chatbots: { title: "AI website assistant", price: `${eur(addOns.aiAssistant.setup)} + ${eur(addOns.aiAssistant.monthly)}/mo${v}`, oneOff: addOns.aiAssistant.setup, monthly: addOns.aiAssistant.monthly },
  reservations: { title: "Online booking setup", price: `${eur(addOns.booking)} setup${v}`, oneOff: addOns.booking, monthly: 0 },
  crm: { title: "CRM starter", price: `${eur(addOns.crmStarter)}${v}`, oneOff: addOns.crmStarter, monthly: 0 },
  "ai-assistant": { title: "AI receptionist", price: `${eur(addOns.aiReceptionist.setup)} setup + ${eur(addOns.aiReceptionist.monthly)}/mo${v}`, oneOff: addOns.aiReceptionist.setup, monthly: addOns.aiReceptionist.monthly },
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
    const oneOff = services.reduce((t, s) => t + s.oneOff, 0);
    const monthly = services.reduce((t, s) => t + s.monthly, 0);
    const rows = services
      .map((s) => `<tr><td style="padding:6px 12px;border:1px solid #ddd;">${escapeHtml(s.title)}</td><td style="padding:6px 12px;border:1px solid #ddd;">${escapeHtml(s.price)}</td></tr>`)
      .join("");

    const html = `
      <h1>New Consultation Request — Service Selection</h1>
      <p><strong>Name:</strong> ${escapeHtml(name)}</p>
      <p><strong>Email:</strong> ${escapeHtml(email)}</p>
      <h2>Selected Services (${services.length})</h2>
      <table style="border-collapse:collapse;">${rows}</table>
      <p><strong>One-off total:</strong> ${eur(oneOff)}</p>
      ${monthly ? `<p><strong>Monthly total:</strong> ${eur(monthly)}/month</p>` : ""}
      <p style="color:#666;">Indicative, ex VAT — final fixed quote follows. Sent from the services selection bar on lacunadigital.io</p>
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
