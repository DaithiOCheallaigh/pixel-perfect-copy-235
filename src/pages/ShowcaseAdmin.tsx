import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Copy, Trash2, Send, Plus, RefreshCw, Pencil, Lock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const STATUS_COLORS: Record<string, string> = {
  draft: "bg-muted text-muted-foreground",
  sent: "bg-blue-500/15 text-blue-600 border-blue-500/20",
  viewed: "bg-amber-500/15 text-amber-600 border-amber-500/20",
  interested: "bg-green-500/15 text-green-600 border-green-500/20",
  not_interested: "bg-red-500/15 text-red-600 border-red-500/20",
};

interface Entry {
  id: string;
  slug: string;
  business_name: string;
  business_type: string;
  contact_email: string;
  status: string;
  created_at: string;
}

interface PendingLead {
  id: string;
  showcase_entry_id: string | null;
  payload: any;
  error_message: string | null;
  retried: boolean;
  created_at: string;
}

const ShowcaseAdmin = () => {
  const [authenticated, setAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [authError, setAuthError] = useState("");
  const [entries, setEntries] = useState<Entry[]>([]);
  const [pendingLeads, setPendingLeads] = useState<PendingLead[]>([]);
  const [createOpen, setCreateOpen] = useState(false);
  const [editEntry, setEditEntry] = useState<Entry | null>(null);
  const [form, setForm] = useState({ slug: "", business_name: "", business_type: "", contact_email: "" });
  const [saving, setSaving] = useState(false);
  const { toast } = useToast();

  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
  const supabaseKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

  const adminFetch = useCallback(
    async (path: string, options?: RequestInit) => {
      const res = await fetch(`${supabaseUrl}/functions/v1/showcase-admin`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${supabaseKey}`,
          apikey: supabaseKey,
        },
        body: JSON.stringify({ password, action: path, ...JSON.parse(options?.body as string || "{}") }),
      });
      return res.json();
    },
    [password, supabaseUrl, supabaseKey]
  );

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError("");
    try {
      const data = await adminFetch("verify");
      if (data.success) {
        setAuthenticated(true);
      } else {
        setAuthError("Incorrect password");
      }
    } catch {
      setAuthError("Connection failed");
    }
  };

  const loadData = useCallback(async () => {
    if (!authenticated) return;
    const [entriesData, leadsData] = await Promise.all([
      adminFetch("list_entries"),
      adminFetch("list_pending_leads"),
    ]);
    if (entriesData.data) setEntries(entriesData.data);
    if (leadsData.data) setPendingLeads(leadsData.data);
  }, [authenticated, adminFetch]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const copyLink = (slug: string) => {
    navigator.clipboard.writeText(`${window.location.origin}/showcase/${slug}`);
    toast({ title: "Link copied" });
  };

  const markAsSent = async (id: string) => {
    await adminFetch("update_status", { body: JSON.stringify({ id, status: "sent" }) });
    loadData();
  };

  const deleteEntry = async (id: string) => {
    if (!confirm("Delete this entry?")) return;
    await adminFetch("delete_entry", { body: JSON.stringify({ id }) });
    loadData();
  };

  const handleCreateOrEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    const action = editEntry ? "update_entry" : "create_entry";
    const body = editEntry ? { ...form, id: editEntry.id } : form;
    await adminFetch(action, { body: JSON.stringify(body) });
    setSaving(false);
    setCreateOpen(false);
    setEditEntry(null);
    setForm({ slug: "", business_name: "", business_type: "", contact_email: "" });
    loadData();
  };

  const retryLead = async (lead: PendingLead) => {
    try {
      const res = await fetch("https://lacuna-lead-manager.vercel.app/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(lead.payload),
      });
      if (!res.ok) throw new Error(`API returned ${res.status}`);
      // Mark as retried
      await adminFetch("mark_lead_retried", { body: JSON.stringify({ id: lead.id }) });
      toast({ title: "Lead synced successfully" });
      loadData();
    } catch {
      toast({ title: "Retry failed", variant: "destructive" });
    }
  };

  const openEdit = (entry: Entry) => {
    setEditEntry(entry);
    setForm({
      slug: entry.slug,
      business_name: entry.business_name,
      business_type: entry.business_type,
      contact_email: entry.contact_email,
    });
    setCreateOpen(true);
  };

  const openCreate = () => {
    setEditEntry(null);
    setForm({ slug: "", business_name: "", business_type: "", contact_email: "" });
    setCreateOpen(true);
  };

  if (!authenticated) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background px-6">
        <form onSubmit={handleLogin} className="w-full max-w-sm space-y-4">
          <div className="flex items-center gap-2 mb-6">
            <Lock className="h-5 w-5 text-muted-foreground" />
            <h1 className="text-lg font-semibold text-foreground">Showcase Admin</h1>
          </div>
          <div className="space-y-2">
            <Label htmlFor="admin-pw">Password</Label>
            <Input
              id="admin-pw"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoFocus
            />
          </div>
          {authError && <p className="text-sm text-destructive">{authError}</p>}
          <Button type="submit" className="w-full">Sign in</Button>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background px-6 py-8">
      <div className="mx-auto max-w-5xl">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-xl font-semibold text-foreground">Showcase Admin</h1>
          <Button onClick={openCreate} size="sm">
            <Plus className="h-4 w-4 mr-1" /> New Entry
          </Button>
        </div>

        <Tabs defaultValue="entries">
          <TabsList>
            <TabsTrigger value="entries">Entries ({entries.length})</TabsTrigger>
            <TabsTrigger value="pending">
              Pending Leads ({pendingLeads.filter((l) => !l.retried).length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="entries" className="mt-4">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Slug</TableHead>
                  <TableHead>Business</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Created</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {entries.map((entry) => (
                  <TableRow key={entry.id}>
                    <TableCell className="font-mono text-xs">{entry.slug}</TableCell>
                    <TableCell>{entry.business_name}</TableCell>
                    <TableCell>
                      <Badge className={STATUS_COLORS[entry.status] || ""} variant="outline">
                        {entry.status.replace("_", " ")}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-xs text-muted-foreground">
                      {new Date(entry.created_at).toLocaleDateString()}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-1">
                        <Button variant="ghost" size="icon" onClick={() => copyLink(entry.slug)} title="Copy link">
                          <Copy className="h-3.5 w-3.5" />
                        </Button>
                        {entry.status === "draft" && (
                          <Button variant="ghost" size="icon" onClick={() => markAsSent(entry.id)} title="Mark as sent">
                            <Send className="h-3.5 w-3.5" />
                          </Button>
                        )}
                        <Button variant="ghost" size="icon" onClick={() => openEdit(entry)} title="Edit">
                          <Pencil className="h-3.5 w-3.5" />
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => deleteEntry(entry.id)} title="Delete">
                          <Trash2 className="h-3.5 w-3.5 text-destructive" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
                {entries.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center text-muted-foreground py-8">
                      No entries yet
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TabsContent>

          <TabsContent value="pending" className="mt-4">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Company</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Error</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead className="text-right">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {pendingLeads
                  .filter((l) => !l.retried)
                  .map((lead) => (
                    <TableRow key={lead.id}>
                      <TableCell>{lead.payload?.company || "—"}</TableCell>
                      <TableCell className="text-xs">{lead.payload?.email || "—"}</TableCell>
                      <TableCell className="text-xs text-destructive max-w-[200px] truncate">
                        {lead.error_message}
                      </TableCell>
                      <TableCell className="text-xs text-muted-foreground">
                        {new Date(lead.created_at).toLocaleDateString()}
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="icon" onClick={() => retryLead(lead)} title="Retry">
                          <RefreshCw className="h-3.5 w-3.5" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                {pendingLeads.filter((l) => !l.retried).length === 0 && (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center text-muted-foreground py-8">
                      No pending leads
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TabsContent>
        </Tabs>
      </div>

      {/* Create / Edit Dialog */}
      <Dialog open={createOpen} onOpenChange={setCreateOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>{editEntry ? "Edit Entry" : "New Entry"}</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleCreateOrEdit} className="space-y-4 pt-2">
            <div className="space-y-2">
              <Label>Slug</Label>
              <Input
                value={form.slug}
                onChange={(e) => setForm({ ...form, slug: e.target.value })}
                placeholder="kellys-butchers"
                disabled={!!editEntry}
                maxLength={100}
              />
            </div>
            <div className="space-y-2">
              <Label>Business Name</Label>
              <Input
                value={form.business_name}
                onChange={(e) => setForm({ ...form, business_name: e.target.value })}
                placeholder="Kelly's Butchers"
                maxLength={200}
              />
            </div>
            <div className="space-y-2">
              <Label>Business Type</Label>
              <Input
                value={form.business_type}
                onChange={(e) => setForm({ ...form, business_type: e.target.value })}
                placeholder="Retail"
                maxLength={100}
              />
            </div>
            <div className="space-y-2">
              <Label>Contact Email</Label>
              <Input
                type="email"
                value={form.contact_email}
                onChange={(e) => setForm({ ...form, contact_email: e.target.value })}
                placeholder="info@kellys.ie"
                maxLength={255}
              />
            </div>
            <Button type="submit" disabled={saving} className="w-full">
              {saving ? "Saving…" : editEntry ? "Update" : "Create"}
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ShowcaseAdmin;
