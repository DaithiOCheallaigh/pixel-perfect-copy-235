import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import type { Json } from "@/integrations/supabase/types";
import { Loader2 } from "lucide-react";

interface Entry {
  id: string;
  slug: string;
  business_name: string;
  business_type: string;
}

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  entry: Entry;
  onSuccess: (name: string) => void;
}

const ShowcaseInterestModal = ({ open, onOpenChange, entry, onSuccess }: Props) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) {
      setError("Name and email are required.");
      return;
    }

    setSubmitting(true);
    setError("");

    // Update status to interested
    await supabase.rpc("update_showcase_status", {
      p_slug: entry.slug,
      p_new_status: "interested",
    });

    const leadPayload = {
      name: name.trim(),
      email: email.trim(),
      phone: phone.trim() || undefined,
      company: entry.business_name,
      service: "Showcase mockup",
      message: `Responded to /showcase/${entry.slug}. Business type: ${entry.business_type}. Captured via showcase interest modal.`,
    };

    try {
      const { submitLead } = await import("@/lib/submitLead");
      const result = await submitLead(leadPayload);
      if (!result.success) throw new Error(result.error || "API error");
    } catch (err: unknown) {
      // Fallback: save to pending_leads
      const errorMsg = err instanceof Error ? err.message : "Unknown error";
      await supabase.rpc("insert_pending_lead", {
        p_entry_id: entry.id,
        p_payload: leadPayload as Json,
        p_error: errorMsg,
      });
    }

    setSubmitting(false);
    onSuccess(name.trim());
    setName("");
    setEmail("");
    setPhone("");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-lg">Get in touch</DialogTitle>
          <DialogDescription className="text-sm text-muted-foreground">
            Leave your details and Dave will follow up.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 pt-2">
          <div className="space-y-2">
            <Label htmlFor="sc-name">Name *</Label>
            <Input
              id="sc-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name"
              maxLength={100}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="sc-business">Business</Label>
            <Input
              id="sc-business"
              value={entry.business_name}
              disabled
              className="opacity-60"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="sc-email">Email *</Label>
            <Input
              id="sc-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              maxLength={255}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="sc-phone">Phone (optional)</Label>
            <Input
              id="sc-phone"
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+353 ..."
              maxLength={20}
            />
          </div>
          {error && <p className="text-sm text-destructive">{error}</p>}
          <Button type="submit" disabled={submitting} className="w-full">
            {submitting ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              "Send my details to Dave"
            )}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ShowcaseInterestModal;
