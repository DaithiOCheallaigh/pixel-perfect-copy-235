export const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

export const NOTIFY_EMAIL = () => Deno.env.get("NOTIFY_EMAIL") ?? "davekellydesign@gmail.com";
export const RESEND_FROM = () => Deno.env.get("RESEND_FROM") ?? "Lacuna Digital <onboarding@resend.dev>";

export const escapeHtml = (v: unknown): string =>
  String(v ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

export const subjectSafe = (v: unknown, max = 120): string =>
  String(v ?? "").replace(/[\r\n]+/g, " ").trim().slice(0, max);

const EMAIL_RE = /^[^\s@<>"',;]+@[^\s@<>"',;]+\.[^\s@<>"',;]{2,}$/;
export const isValidEmail = (v: unknown): v is string =>
  typeof v === "string" && v.length <= 254 && EMAIL_RE.test(v.trim());

/** Returns trimmed string, or null when not a string / too long. */
export const str = (v: unknown, max: number, required = false): string | null => {
  if (v === undefined || v === null || v === "") return required ? null : "";
  if (typeof v !== "string") return null;
  const t = v.trim();
  if (required && !t) return null;
  if (t.length > max) return null;
  return t;
};

export const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });

export async function sendResend(payload: Record<string, unknown>) {
  const key = Deno.env.get("RESEND_API_KEY");
  if (!key) throw new Error("RESEND_API_KEY is not configured");
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify({ from: RESEND_FROM(), to: [NOTIFY_EMAIL()], ...payload }),
  });
  if (!res.ok) {
    const details = await res.text();
    console.error("Resend error:", res.status, details);
    return json({ error: "Failed to send email", status: res.status, details }, 502);
  }
  return json({ success: true });
}
