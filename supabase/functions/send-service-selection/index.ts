import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

interface ServiceItem {
  id: string;
  title: string;
  price: string;
  priceValue: number;
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { name, email, services } = (await req.json()) as {
      name?: string;
      email?: string;
      services?: ServiceItem[];
    };

    if (!name || !email || !services?.length) {
      return new Response(JSON.stringify({ error: "Missing name, email or services" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
    if (!RESEND_API_KEY) throw new Error("RESEND_API_KEY is not configured");

    const total = services.reduce((sum, s) => sum + (s.priceValue || 0), 0);
    const rows = services
      .map(
        (s) =>
          `<tr><td style="padding:6px 12px;border:1px solid #ddd;">${s.title}</td><td style="padding:6px 12px;border:1px solid #ddd;">${s.price}</td></tr>`
      )
      .join("");

    const htmlBody = `
      <h1>New Consultation Request — Service Selection</h1>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <h2>Selected Services (${services.length})</h2>
      <table style="border-collapse:collapse;">${rows}</table>
      <p><strong>Estimated total:</strong> €${total.toLocaleString()}</p>
      <p style="color:#666;">Sent from the services selection bar on lacunadigital.io</p>
    `;

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        // Until lacunadigital.io is verified in Resend, sends must use the
        // shared test sender and can only be delivered to the account owner.
        from: "Lacuna Digital <onboarding@resend.dev>",
        to: [Deno.env.get("NOTIFY_EMAIL") ?? "davekellydesign@gmail.com"],
        reply_to: email,
        subject: `Consultation Request: ${name} — ${services.length} service${services.length === 1 ? "" : "s"} selected`,
        html: htmlBody,
      }),
    });

    if (!res.ok) {
      const errorText = await res.text();
      console.error("Resend error:", res.status, errorText);
      return new Response(JSON.stringify({ error: "Failed to send email" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify({ success: true }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error:", error);
    return new Response(JSON.stringify({ error: "Internal error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
