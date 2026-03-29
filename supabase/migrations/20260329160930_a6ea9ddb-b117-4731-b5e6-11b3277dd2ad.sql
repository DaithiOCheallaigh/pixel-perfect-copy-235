
-- Tool leads table
CREATE TABLE public.tool_leads (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  tool_used text NOT NULL,
  business_type text NOT NULL DEFAULT '',
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.tool_leads ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anon can insert tool leads"
  ON public.tool_leads FOR INSERT
  TO anon
  WITH CHECK (true);

-- Bio pages table
CREATE TABLE public.bio_pages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text NOT NULL UNIQUE,
  name text NOT NULL,
  tagline text NOT NULL DEFAULT '',
  links jsonb NOT NULL DEFAULT '[]'::jsonb,
  theme text NOT NULL DEFAULT 'dark',
  email text NOT NULL DEFAULT '',
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.bio_pages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anon can insert bio pages"
  ON public.bio_pages FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Anon can select bio pages"
  ON public.bio_pages FOR SELECT
  TO anon
  USING (true);
