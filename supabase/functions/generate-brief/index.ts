import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { formData } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY is not configured");

    const systemPrompt = `You are a professional creative consultant at Lacuna Digital, a web design consultancy. Write a concise, professional project brief based on the following client intake information. Format it clearly with the sections: Project Overview, Business Goals, Target Audience, Scope of Work, Design Direction, Timeline & Budget, Additional Notes. Keep it under 400 words. Use professional but warm language. Do not use markdown headers — just use the section names followed by a colon on their own line.`;

    const userMessage = `Client Intake Information:

Name: ${formData.fullName}
Company: ${formData.companyName}
Website: ${formData.websiteUrl || "None"}
Industry: ${formData.industry}
Source: ${formData.source}

Project Type: ${(formData.projectTypes || []).join(", ")}
Description: ${formData.projectDescription}
Existing Brand: ${formData.existingBrand}
Urgency: ${formData.urgency}

Website Goals: ${(formData.websiteGoals || []).join(", ")}
Target Audience: ${formData.targetAudience}
Success Definition: ${formData.successDefinition}
Competitor/Inspiration URLs: ${(formData.competitorUrls || []).filter(Boolean).join(", ") || "None provided"}

Budget: ${formData.budgetRange}
Preferred Launch: ${formData.launchDate || "Flexible"}
Hard Deadline: ${formData.hasDeadline ? formData.deadlineDetails : "No"}

Font Preferences: ${formData.fontPreferences || "Not specified"}
Brand Colours: ${(formData.brandColours || []).join(", ") || "Not specified"}`;

    const response = await fetch(
      "https://ai.gateway.lovable.dev/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${LOVABLE_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "google/gemini-3-flash-preview",
          messages: [
            { role: "system", content: systemPrompt },
            { role: "user", content: userMessage },
          ],
          stream: false,
        }),
      }
    );

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "Rate limit exceeded. Please try again shortly." }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: "AI credits exhausted. Please try again later." }),
          { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      const t = await response.text();
      console.error("AI gateway error:", response.status, t);
      return new Response(
        JSON.stringify({ error: "Failed to generate brief" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const data = await response.json();
    const brief = data.choices?.[0]?.message?.content || "";

    return new Response(JSON.stringify({ brief }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("generate-brief error:", e);
    return new Response(
      JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
