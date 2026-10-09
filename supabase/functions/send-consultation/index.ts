import { corsHeaders, escapeHtml, isValidEmail, json, sendResend, str, subjectSafe } from "../_shared/email-utils.ts";

const TEXT = 300;

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
    const f = (body?.formData ?? null) as Record<string, unknown> | null;
    if (!f || typeof f !== "object") return json({ error: "Missing formData" }, 400);

    if (typeof f.company_website === "string" && f.company_website.trim()) return json({ success: true });

    const errors: string[] = [];
    const req_ = (k: string, max: number, required = false) => {
      const v = str(f[k], max, required);
      if (v === null) errors.push(k);
      return v ?? "";
    };

    const fullName = req_("fullName", 100, true);
    const email = typeof f.email === "string" ? f.email.trim() : "";
    if (!isValidEmail(email)) errors.push("email");
    const phone = req_("phone", 40);
    const companyName = req_("companyName", TEXT, true);
    const websiteUrl = req_("websiteUrl", TEXT);
    const industry = req_("industry", TEXT, true);
    const source = req_("source", TEXT, true);
    const projectDescription = req_("projectDescription", 5000, true);
    const existingBrand = req_("existingBrand", TEXT);
    const urgency = req_("urgency", TEXT);
    const budgetRange = req_("budgetRange", TEXT, true);
    const launchDate = req_("launchDate", 20);
    const deadlineDetails = req_("deadlineDetails", TEXT);
    const hasDeadline = f.hasDeadline === true;

    const arr = (k: string, max: number) => {
      const v = f[k];
      if (v === undefined) return [] as string[];
      if (!Array.isArray(v) || v.length > max || v.some((x) => typeof x !== "string" || x.length > TEXT)) {
        errors.push(k);
        return [];
      }
      return (v as string[]).map((x) => x.trim()).filter(Boolean);
    };
    const projectTypes = arr("projectTypes", 10);
    const competitorUrls = arr("competitorUrls", 5);

    if (errors.length) return json({ error: "Invalid fields", fields: errors }, 400);

    const e = escapeHtml;
    const html = `
      <h1>New Project Consultation</h1>
      <hr/>
      <h2>About the Client</h2>
      <p><strong>Name:</strong> ${e(fullName)}</p>
      <p><strong>Email:</strong> ${e(email)}</p>
      <p><strong>Phone:</strong> ${e(phone || "N/A")}</p>
      <p><strong>Company:</strong> ${e(companyName)}</p>
      <p><strong>Website:</strong> ${e(websiteUrl || "N/A")}</p>
      <p><strong>Industry:</strong> ${e(industry)}</p>
      <p><strong>Source:</strong> ${e(source)}</p>

      <h2>Project Details</h2>
      <p><strong>Type:</strong> ${e(projectTypes.join(", ") || "N/A")}</p>
      <p><strong>Existing Brand:</strong> ${e(existingBrand || "N/A")}</p>
      <p><strong>Urgency:</strong> ${e(urgency || "N/A")}</p>
      <p><strong>Competitor / inspiration URLs:</strong> ${e(competitorUrls.join(", ") || "None")}</p>
      <p><strong>Description:</strong></p>
      <pre style="white-space: pre-wrap; font-family: sans-serif;">${e(projectDescription)}</pre>

      <h2>Budget & Timeline</h2>
      <p><strong>Budget:</strong> ${e(budgetRange)}</p>
      <p><strong>Launch Date:</strong> ${e(launchDate || "Flexible")}</p>
      <p><strong>Hard Deadline:</strong> ${hasDeadline ? e(deadlineDetails || "Yes") : "No"}</p>
    `;

    return await sendResend({
      reply_to: email,
      subject: subjectSafe(`New Project Enquiry: ${companyName} — ${fullName}`),
      html,
    });
  } catch (err) {
    console.error("send-consultation error:", err);
    return json({ error: "Internal error" }, 500);
  }
});
