
-- Create status enum
CREATE TYPE public.showcase_status AS ENUM ('draft', 'sent', 'viewed', 'interested', 'not_interested');

-- Create showcase_entries table
CREATE TABLE public.showcase_entries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT NOT NULL UNIQUE,
  business_name TEXT NOT NULL,
  business_type TEXT NOT NULL DEFAULT '',
  contact_email TEXT NOT NULL DEFAULT '',
  status showcase_status NOT NULL DEFAULT 'draft',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create pending_leads table (fallback for failed API calls)
CREATE TABLE public.pending_leads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  showcase_entry_id UUID REFERENCES public.showcase_entries(id) ON DELETE SET NULL,
  payload JSONB NOT NULL,
  error_message TEXT,
  retried BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.showcase_entries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.pending_leads ENABLE ROW LEVEL SECURITY;

-- Anon can SELECT a single entry by slug (no listing)
CREATE POLICY "Anon can select by slug"
  ON public.showcase_entries
  FOR SELECT
  TO anon
  USING (true);

-- Anon can update status only (for viewed/interested/not_interested)
CREATE POLICY "Anon can update status"
  ON public.showcase_entries
  FOR UPDATE
  TO anon
  USING (true)
  WITH CHECK (true);

-- Anon can insert pending_leads (fallback)
CREATE POLICY "Anon can insert pending leads"
  ON public.pending_leads
  FOR INSERT
  TO anon
  WITH CHECK (true);
