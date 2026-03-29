export const DAVE_SYSTEM_PROMPT = `You are Dave's AI assistant on lacunadigital.io...`; // kept in edge function

export interface Message {
  id: string;
  role: "bot" | "user";
  content: string;
  chips?: string[];
  timestamp: Date;
}

export interface ChatState {
  messages: Message[];
  stage: "intro" | "business-type" | "challenge" | "recommendation" | "collecting" | "done";
  collectedData: {
    businessType?: string;
    challenge?: string;
    recommendation?: string;
    name?: string;
    email?: string;
    phone?: string;
    hasWebsite?: boolean;
    websiteUrl?: string;
  };
  isTyping: boolean;
  inputValue: string;
  inputMode: "chips" | "text";
  collectField?: "name" | "email" | "phone" | "website-ask" | "website-url" | "call-time";
}

export async function callDaveAI(messages: Message[]): Promise<string> {
  const formatted = messages.map((m) => ({
    role: m.role,
    content: m.content,
  }));

  try {
    const res = await fetch(
      `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/dave-chat`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
        },
        body: JSON.stringify({ messages: formatted }),
      }
    );

    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      if (data.error) return data.error;
      throw new Error("API error");
    }

    const data = await res.json();
    return data.text || "I'm having a moment — could you try that again?";
  } catch {
    return "Sorry, I hit a snag — could you try that again?";
  }
}

export async function submitLead(
  collectedData: ChatState["collectedData"],
  recommendation: string
) {
  // Extract services from recommendation if present
  const servicesMatch = recommendation.match(/Custom package: (.+?) \(/);
  const selectedServices = servicesMatch ? servicesMatch[1] : "";
  const callTime = collectedData.phone || "Not specified";

  const notes = [
    selectedServices ? `Services of interest: ${selectedServices}.` : "",
    `Preferred call time: ${callTime}.`,
    collectedData.businessType ? `Business type: ${collectedData.businessType}` : "",
    collectedData.challenge ? `Main challenge: ${collectedData.challenge}` : "",
    `Recommended package: ${recommendation}`,
    collectedData.hasWebsite
      ? `Website: ${collectedData.websiteUrl}`
      : "",
    "Captured via services page chatbot.",
  ].filter(Boolean).join(" ");

  try {
    await fetch("https://lacuna-lead-manager.vercel.app/api/leads", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: collectedData.name || "Unknown",
        contactFirstName: collectedData.name?.split(" ")[0] || "",
        contactLastName: collectedData.name?.split(" ").slice(1).join(" ") || "",
        contactEmail: collectedData.email || "",
        contactPhone: collectedData.phone || null,
        website: collectedData.websiteUrl || "",
        source: "website_chatbot",
        status: "New",
        priority: "medium",
        notes,
      }),
    });
  } catch (e) {
    console.error("Lead submission failed:", e);
  }
}

export function generateId(): string {
  return Math.random().toString(36).slice(2, 10);
}
