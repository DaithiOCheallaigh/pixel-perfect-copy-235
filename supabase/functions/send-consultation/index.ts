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
    const { formData, brief } = await req.json();
    const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
    if (!RESEND_API_KEY) throw new Error("RESEND_API_KEY is not configured");

    const htmlBody = `
      <h1>New Project Consultation</h1>
      <hr/>
      <h2>About the Client</h2>
      <p><strong>Name:</strong> ${formData.fullName}</p>
      <p><strong>Company:</strong> ${formData.companyName}</p>
      <p><strong>Website:</strong> ${formData.websiteUrl || "N/A"}</p>
      <p><strong>Industry:</strong> ${formData.industry}</p>
      <p><strong>Source:</strong> ${formData.source}</p>
      
      <h2>Project Details</h2>
      <p><strong>Type:</strong> ${(formData.projectTypes || []).join(", ")}</p>
      <p><strong>Description:</strong> ${formData.projectDescription}</p>
      <p><strong>Existing Brand:</strong> ${formData.existingBrand}</p>
      <p><strong>Urgency:</strong> ${formData.urgency}</p>
      
      <h2>Goals & Audience</h2>
      <p><strong>Goals:</strong> ${(formData.websiteGoals || []).join(", ")}</p>
      <p><strong>Target Audience:</strong> ${formData.targetAudience}</p>
      <p><strong>Success Definition:</strong> ${formData.successDefinition}</p>
      <p><strong>Competitor URLs:</strong> ${(formData.competitorUrls || []).filter(Boolean).join(", ") || "None"}</p>
      
      <h2>Budget & Timeline</h2>
      <p><strong>Budget:</strong> ${formData.budgetRange}</p>
      <p><strong>Launch Date:</strong> ${formData.launchDate || "Flexible"}</p>
      <p><strong>Hard Deadline:</strong> ${formData.hasDeadline ? formData.deadlineDetails : "No"}</p>
      
      <h2>Brand Assets</h2>
      <p><strong>Font Preferences:</strong> ${formData.fontPreferences || "Not specified"}</p>
      <p><strong>Brand Colours:</strong> ${(formData.brandColours || []).join(", ") || "Not specified"}</p>
      
      <hr/>
      <h2>AI-Generated Project Brief</h2>
      <pre style="white-space: pre-wrap; font-family: sans-serif;">${brief || "No brief generated"}</pre>
    `;

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "Lacuna Digital <onboarding@resend.dev>",
        to: ["info@lacunaconsulting.com"],
        subject: `New Project Enquiry: ${formData.companyName} — ${formData.fullName}`,
        html: htmlBody,
      }),
    });

    if (!res.ok) {
      const errorText = await res.text();
      console.error("Resend error:", res.status, errorText);
      return new Response(
        JSON.stringify({ error: "Failed to send email" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    return new Response(JSON.stringify({ success: true }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("send-consultation error:", e);
    return new Response(
      JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
