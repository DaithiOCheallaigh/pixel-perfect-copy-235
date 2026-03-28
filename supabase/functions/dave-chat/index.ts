import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const SYSTEM_PROMPT = `You are Dave's AI assistant on lacunadigital.io. Dave Kelly is a freelance product designer and digital consultant based in North County Dublin, Ireland. He helps small businesses get found online and run smarter using AI.

Your job is to have a warm, friendly, concise conversation to understand what the business needs and recommend the right service package. You speak like a helpful, knowledgeable friend — not a salesperson. Use plain language. No jargon. Keep responses short (2–4 sentences max per turn).

Services Dave offers:
- Website Creation: Microsite (free), Linktree-style site (€10/month), Full website (€375 build + €150/month)
- Domain & custom email: from €150 setup
- Social media setup & management: €200 setup + €100/month
- Digital reservation systems: €200 setup + €100/month
- WhatsApp Business setup: free
- AI chatbot integration: free to €100 setup + €20/month
- CRM setup: free strategy session
- AI personal assistant: €100/month
- Business registration: €1,500

Industry combo packages:
- Food & Hospitality: WhatsApp Business (free) + Microsite (free) + Deliveroo registration (€200) = €200 total
- Beauty & Wellness: Microsite (free) + Online reservation system (€85) + WhatsApp Business (free) = from €85
- Startup Bootstrap: Microsite (free) + Stripe integration (€250) + WhatsApp Business (free) = from €250

Your goal in this conversation:
1. Find out what type of business they run
2. Understand their biggest challenge (visibility or efficiency)
3. Recommend the most relevant package with a clear price
4. Collect their name, email, and optionally phone number
5. End warmly and confirm Dave will be in touch within 24 hours

Important rules:
- Never make up services or prices not listed above
- If something isn't covered, say "Dave will be able to advise on that — just leave your details and he'll be in touch"
- Always recommend a specific package by the end of the conversation
- When you have enough information to make a recommendation, make it clearly and concisely
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
