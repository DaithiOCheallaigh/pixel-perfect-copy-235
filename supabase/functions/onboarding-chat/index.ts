import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const { businessType, challenge, context } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY is not configured");

    const systemPrompt = `You are Dave's AI assistant at Lacuna Digital. You help match small businesses with the right digital service package.

Based on the user's business type and challenge, recommend the most appropriate package. Return a JSON object with:
- packageName: string (the recommended package name)
- bullets: string[] (3 key things included)
- price: string (estimated cost)
- reason: string (1 sentence explaining why this is the right fit)

Recommendation logic:
- Food/Hospitality + visibility → Food & Hospitality Package (€200)
- Food/Hospitality + bookings → Food & Hospitality Package + Reservation add-on (€285)
- Beauty/Wellness + visibility OR bookings → Beauty & Wellness Package (from €85)
- Startup + payments OR leads → Startup Bootstrap Package (from €300)
- Any + workflows → AI Integration Retainer (€500/month)
- Any + leads → Lead Gen consultation (Free discovery call)
- Default → Book a free Discovery Call

Be warm, concise, and helpful. Irish freelancer tone.`;

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          { role: "system", content: systemPrompt },
          {
            role: "user",
            content: `Business type: ${businessType}\nBiggest challenge: ${challenge}\nAdditional context: ${context || "none"}`,
          },
        ],
        tools: [
          {
            type: "function",
            function: {
              name: "recommend_package",
              description: "Return a package recommendation for the business",
              parameters: {
                type: "object",
                properties: {
                  packageName: { type: "string" },
                  bullets: { type: "array", items: { type: "string" } },
                  price: { type: "string" },
                  reason: { type: "string" },
                },
                required: ["packageName", "bullets", "price", "reason"],
                additionalProperties: false,
              },
            },
          },
        ],
        tool_choice: { type: "function", function: { name: "recommend_package" } },
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Rate limited, please try again shortly." }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "Service temporarily unavailable." }), {
          status: 402,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const t = await response.text();
      console.error("AI gateway error:", response.status, t);
      throw new Error("AI gateway error");
    }

    const data = await response.json();
    const toolCall = data.choices?.[0]?.message?.tool_calls?.[0];
    let recommendation;

    if (toolCall?.function?.arguments) {
      recommendation = JSON.parse(toolCall.function.arguments);
    } else {
      recommendation = {
        packageName: "Free Discovery Call",
        bullets: ["30-minute video call", "Understand your needs", "Get a personalised plan"],
        price: "Free",
        reason: "Let's chat about what would work best for your business.",
      };
    }

    return new Response(JSON.stringify(recommendation), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("onboarding-chat error:", e);
    return new Response(
      JSON.stringify({
        packageName: "Free Discovery Call",
        bullets: ["30-minute video call", "Understand your needs", "Get a personalised plan"],
        price: "Free",
        reason: "Let's chat about what would work best for your business.",
      }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
