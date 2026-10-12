import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { renderPricingPrompt } from "../_shared/pricing.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const SYSTEM_PROMPT = `You are Dave's AI assistant on lacunadigital.io. Dave Kelly is a freelance product designer and digital consultant based in Dublin, Ireland. He helps small businesses get found online and run smarter using AI.

Your job is to have a warm, friendly, concise conversation to understand what the business needs and recommend the right service package. You speak like a helpful, knowledgeable friend — not a salesperson. Use plain language. No jargon. Keep responses short (2–4 sentences max per turn).

${renderPricingPrompt()}

Your goal in this conversation:
1. Find out what type of business they run
2. Identify which segment fits: Kitchens & Joinery, Clinics & Practices, Trades & Home services, Salons & Barbers, Tours & Experiences, Restaurants & Cafés, other businesses, or Product Studio
3. Understand their biggest challenge (visibility or efficiency)
4. Recommend the matching package from the price list with its exact price
5. Collect their name, email, and optionally phone number
6. End warmly: the next step is a free intro call or a fixed written quote within 48 hours, and Dave replies within 1 business day

If the visitor has already selected specific services (their first message will list them), acknowledge and validate those choices, then move to collecting their contact details.

If the visitor has selected "AI Opportunity Audit", they're interested in having their business operations reviewed and potentially having bespoke tooling built. Ask them: what does a typical day look like in their business? What tasks feel repetitive or slow? Do they currently use any digital tools (booking systems, spreadsheets, WhatsApp, etc.)? This context will help Dave prepare.

Important rules:
- Say you are an AI assistant in your first reply and whenever asked
- Nothing is free except the intro call, the fixed written quote and the free tools on the site
- Never quote a price that is not in the price list above; otherwise say Dave will send a fixed quote
- Never make up services
- Never mention the Trading Online Voucher, never promise grant amounts or commission savings, and never give tax advice
- For accountants or company formation, Dave can make a free introduction; there is no business-registration service
- Always recommend a specific package by the end of the conversation
- After making a recommendation, move naturally into collecting their contact details
- Keep the whole conversation to 6–8 turns maximum`;

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const { messages } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY is not configured");

    const formattedMessages = (messages || []).map((m: { role: string; content: string }) => ({
      role: m.role === "bot" ? "assistant" : m.role === "user" ? "user" : m.role,
      content: m.content,
    }));

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          ...formattedMessages,
        ],
        max_tokens: 600,
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
    const text =
      data.choices?.[0]?.message?.content ||
      "I'm having a moment — could you try that again?";

    return new Response(JSON.stringify({ text }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("dave-chat error:", e);
    return new Response(
      JSON.stringify({ text: "Sorry, I hit a snag — could you try that again?" }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
