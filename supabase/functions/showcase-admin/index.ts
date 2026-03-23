import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const body = await req.json();
    const { password, action, ...params } = body;

    const ADMIN_PASSWORD = Deno.env.get("SHOWCASE_ADMIN_PASSWORD");
    if (!ADMIN_PASSWORD) {
      return new Response(
        JSON.stringify({ error: "Admin password not configured" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    if (password !== ADMIN_PASSWORD) {
      return new Response(
        JSON.stringify({ success: false, error: "Invalid password" }),
        { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, serviceKey);

    let result: any = { success: true };

    switch (action) {
      case "verify":
        result = { success: true };
        break;

      case "list_entries": {
        const { data, error } = await supabase
          .from("showcase_entries")
          .select("*")
          .order("created_at", { ascending: false });
        if (error) throw error;
        result = { data };
        break;
      }

      case "list_pending_leads": {
        const { data, error } = await supabase
          .from("pending_leads")
          .select("*")
          .order("created_at", { ascending: false });
        if (error) throw error;
        result = { data };
        break;
      }

      case "create_entry": {
        const { slug, business_name, business_type, contact_email } = params;
        const { data, error } = await supabase
          .from("showcase_entries")
          .insert({ slug, business_name, business_type, contact_email })
          .select()
          .single();
        if (error) throw error;
        result = { data };
        break;
      }

      case "update_entry": {
        const { id, business_name, business_type, contact_email } = params;
        const { data, error } = await supabase
          .from("showcase_entries")
          .update({ business_name, business_type, contact_email })
          .eq("id", id)
          .select()
          .single();
        if (error) throw error;
        result = { data };
        break;
      }

      case "update_status": {
        const { id, status } = params;
        const { error } = await supabase
          .from("showcase_entries")
          .update({ status })
          .eq("id", id);
        if (error) throw error;
        break;
      }

      case "delete_entry": {
        const { id } = params;
        const { error } = await supabase
          .from("showcase_entries")
          .delete()
          .eq("id", id);
        if (error) throw error;
        break;
      }

      case "mark_lead_retried": {
        const { id } = params;
        const { error } = await supabase
          .from("pending_leads")
          .update({ retried: true })
          .eq("id", id);
        if (error) throw error;
        break;
      }

      default:
        return new Response(
          JSON.stringify({ error: "Unknown action" }),
          { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
    }

    return new Response(JSON.stringify(result), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err: any) {
    console.error("Showcase admin error:", err);
    return new Response(
      JSON.stringify({ error: err.message || "Internal error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
