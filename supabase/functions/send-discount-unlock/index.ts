import { corsHeaders, escapeHtml, isValidEmail, json, sendResend, str, subjectSafe } from "../_shared/email-utils.ts";

/** Mirrors the welcome-offer entry in src/data/pricing.ts (`discountCodes`, id "welcome10"). */
const WELCOME_CODE = "LACUNA10";
const WELCOME_TERMS = "10% off website packages and care plans for the length of the contract";

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
    if (!body || typeof body !== "object") return json({ error: "Missing body" }, 400);

    // Honeypot: bots that fill the hidden field get a quiet success and no email.
    if (typeof body.company_website === "string" && body.company_website.trim()) return json({ success: true });

    const email = typeof body.email === "string" ? body.email.trim() : "";
    if (!isValidEmail(email)) return json({ error: "Invalid fields", fields: ["email"] }, 400);
    const page = str(body.page, 200) ?? "";

    const e = escapeHtml;
    const html = `
      <h1>Welcome offer unlocked</h1>
      <hr/>
      <p><strong>Email:</strong> ${e(email)}</p>
      <p><strong>Code shown:</strong> ${e(WELCOME_CODE)} (${e(WELCOME_TERMS)})</p>
      <p><strong>Page:</strong> ${e(page || "/services")}</p>
      <p><strong>Time:</strong> ${e(new Date().toISOString())}</p>
      <p>The visitor was sent on to /services/start-project with the code pre-filled. It stays valid until you say otherwise.</p>
    `;

    return await sendResend({
      reply_to: email,
      subject: subjectSafe(`Welcome offer unlocked: ${email}`),
      html,
    });
  } catch (err) {
    console.error("send-discount-unlock error:", err);
    return json({ error: "Internal error" }, 500);
  }
});