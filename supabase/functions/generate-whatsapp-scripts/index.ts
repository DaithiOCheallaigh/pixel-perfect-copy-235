import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const { businessName, businessType, ownerName, hours, offering, takesBookings, bookingContact, faq1, faq2, faq3 } = await req.json();

    if (!businessName || !ownerName) {
      return new Response(JSON.stringify({ error: "Business name and owner name are required." }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY is not configured");

    const faqs = [faq1, faq2, faq3].filter(Boolean);

    const prompt = `You are writing WhatsApp Business auto-reply messages for a small Irish business. Be warm, friendly, and concise. Use plain language. Include relevant emojis but don't overdo it. Never sound corporate.

Business details:
- Name: ${businessName}
- Type: ${businessType || "General business"}
- Owner: ${ownerName}
- Hours: ${hours || "Not specified"}
- What they do: ${offering || "Not specified"}
- Takes bookings: ${takesBookings ? "yes" : "no"}
- Booking link/phone: ${bookingContact || "N/A"}
- FAQs: ${faqs.length > 0 ? faqs.join(", ") : "None provided"}

Generate: 1) A welcome message, 2) An away/out-of-hours message, 3) Short, helpful auto-reply answers for each FAQ provided.`;

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          { role: "system", content: "You generate WhatsApp Business scripts. Always return valid JSON." },
          { role: "user", content: prompt },
        ],
        tools: [
          {
            type: "function",
            function: {
              name: "return_scripts",
              description: "Return the generated WhatsApp Business scripts",
              parameters: {
                type: "object",
                properties: {
                  welcome: { type: "string", description: "Welcome/greeting message" },
                  away: { type: "string", description: "Away/out-of-hours message" },
                  faqs: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        question: { type: "string" },
                        answer: { type: "string" },
                      },
                      required: ["question", "answer"],
                    },
                  },
                },
                required: ["welcome", "away", "faqs"],
                additionalProperties: false,
              },
            },
          },
        ],
        tool_choice: { type: "function", function: { name: "return_scripts" } },
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Rate limited, please try again shortly." }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const t = await response.text();
      console.error("AI gateway error:", response.status, t);
      throw new Error("AI gateway error");
    }

    const data = await response.json();
    const toolCall = data.choices?.[0]?.message?.tool_calls?.[0];

    if (toolCall?.function?.arguments) {
      const scripts = JSON.parse(toolCall.function.arguments);
      return new Response(JSON.stringify(scripts), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    throw new Error("No tool call response");
  } catch (e) {
    console.error("generate-whatsapp-scripts error:", e);
    return new Response(JSON.stringify({ error: "Failed to generate scripts. Please try again." }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
