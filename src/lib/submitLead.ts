export type LeadSource =
  | "website_chatbot"
  | "whatsapp_inbound"
  | "missed_call_reply"
  | "email_form"
  | "manual";

export interface LeadPayload {
  name: string;
  website?: string;
  contactFirstName?: string;
  contactLastName?: string;
  contactEmail?: string;
  contactPhone?: string;
  source: LeadSource;
  status: "new";
  priority: "low" | "medium" | "high";
  currency: "EUR";
  notes?: string;
  estimatedValue?: number;
}

const LEAD_MANAGER_URL = "https://lacuna-lead-manager.vercel.app/api/leads";

export async function submitLead(payload: LeadPayload): Promise<{ success: boolean; error?: string }> {
  try {
    const response = await fetch(LEAD_MANAGER_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const text = await response.text();
      console.error("[submitLead] API error:", response.status, text);
      return { success: false, error: `API returned ${response.status}` };
    }

    return { success: true };
  } catch (err) {
    console.error("[submitLead] Network error:", err);
    return { success: false, error: "Network error — lead not submitted" };
  }
}
