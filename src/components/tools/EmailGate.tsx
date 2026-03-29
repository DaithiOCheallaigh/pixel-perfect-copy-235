import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";

interface EmailGateProps {
  toolUsed: string;
  businessType?: string;
  ctaLabel: string;
  onUnlock: () => void;
}

const EmailGate = ({ toolUsed, businessType = "", ctaLabel, onUnlock }: EmailGateProps) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!name.trim() || !email.trim()) {
      toast({ title: "Please enter your name and email", variant: "destructive" });
      return;
    }
    setSubmitting(true);
    try {
      await supabase.from("tool_leads" as any).insert({
        name: name.trim(),
        email: email.trim(),
        tool_used: toolUsed,
        business_type: businessType,
      });
      onUnlock();
    } catch {
      toast({ title: "Something went wrong — please try again", variant: "destructive" });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="rounded-xl border border-border bg-card p-6">
      <p className="mb-4 text-sm font-semibold text-foreground">Enter your details to unlock the full results</p>
      <div className="flex flex-col gap-3 sm:flex-row">
        <Input placeholder="Your name" value={name} onChange={(e) => setName(e.target.value)} className="flex-1" />
        <Input placeholder="Your email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="flex-1" />
        <Button onClick={handleSubmit} disabled={submitting} className="shrink-0 whitespace-nowrap">
          {submitting ? <Loader2 className="h-4 w-4 animate-spin" /> : ctaLabel}
        </Button>
      </div>
    </div>
  );
};

export default EmailGate;
