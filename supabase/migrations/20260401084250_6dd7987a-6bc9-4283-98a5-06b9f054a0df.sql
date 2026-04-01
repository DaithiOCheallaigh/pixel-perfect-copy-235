
ALTER TABLE public.bio_pages ADD COLUMN logo_url text;

INSERT INTO storage.buckets (id, name, public) VALUES ('bio-logos', 'bio-logos', true)
ON CONFLICT (id) DO NOTHING;

CREATE POLICY "Anyone can read bio logos" ON storage.objects FOR SELECT TO anon, authenticated USING (bucket_id = 'bio-logos');

CREATE POLICY "Anyone can upload bio logos" ON storage.objects FOR INSERT TO anon, authenticated WITH CHECK (bucket_id = 'bio-logos');
