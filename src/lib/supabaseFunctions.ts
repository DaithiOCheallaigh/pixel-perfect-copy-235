const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || "https://lgdjivhyveowybzhbqum.supabase.co";
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxnZGppdmh5dmVvd3liemhicXVtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzIzMjMyNDMsImV4cCI6MjA4Nzg5OTI0M30.ThNz5RF9Pco9Up0nIn_gaMIUSV_yc2WINGBXpuvF-A0";

/** POST a JSON body to a Supabase edge function with the anon key; throws on a non-2xx response. */
export const invokeFunction = async (fnName: string, body: Record<string, unknown>) => {
  const res = await fetch(`${SUPABASE_URL}/functions/v1/${fnName}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "apikey": SUPABASE_ANON_KEY,
      "Authorization": `Bearer ${SUPABASE_ANON_KEY}`,
    },
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || `Function ${fnName} returned ${res.status}`);
  }
  return res.json();
};