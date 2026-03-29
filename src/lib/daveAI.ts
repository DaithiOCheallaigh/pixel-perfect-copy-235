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
  const notes = [
    `Business type: ${collectedData.businessType || "Not specified"}`,
    `Main challenge: ${collectedData.challenge || "Not specified"}`,
    `Recommended package: ${recommendation}`,
    collectedData.hasWebsite
      ? `Website: ${collectedData.websiteUrl}`
      : "No existing website",
    collectedData.phone && !collectedData.phone.match(/^\+?\d/)
      ? `Preferred call time: ${collectedData.phone}`
      : "",
    "Source: AI Onboarding Chat",
  ].filter(Boolean).join("\n");

  try {
    await fetch("https://lacuna-lead-manager.vercel.app/api/leads", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: collectedData.name || "",
        contactFirstName: collectedData.name?.split(" ")[0] || "",
        contactLastName: collectedData.name?.split(" ").slice(1).join(" ") || null,
        contactEmail: collectedData.email || "",
        contactPhone: collectedData.phone || null,
        website: collectedData.websiteUrl || null,
        source: "AI Chat Widget",
        status: "new",
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
