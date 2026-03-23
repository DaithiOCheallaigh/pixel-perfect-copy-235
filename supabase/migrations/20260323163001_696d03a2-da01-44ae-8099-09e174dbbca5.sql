
-- Drop overly permissive policies
DROP POLICY "Anon can update status" ON public.showcase_entries;
DROP POLICY "Anon can insert pending leads" ON public.pending_leads;

-- Create a security definer function for status transitions only
CREATE OR REPLACE FUNCTION public.update_showcase_status(
  p_slug TEXT,
  p_new_status showcase_status
)
RETURNS VOID
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- Only allow specific transitions
  UPDATE public.showcase_entries
  SET status = p_new_status
  WHERE slug = p_slug
    AND (
      (status = 'sent' AND p_new_status = 'viewed')
      OR (status = 'viewed' AND p_new_status IN ('interested', 'not_interested'))
      OR (status = 'interested' AND p_new_status = 'not_interested')
      OR (status = 'not_interested' AND p_new_status = 'interested')
    );
END;
$$;

-- Create a security definer function for inserting pending leads
CREATE OR REPLACE FUNCTION public.insert_pending_lead(
  p_entry_id UUID,
  p_payload JSONB,
  p_error TEXT
)
RETURNS VOID
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.pending_leads (showcase_entry_id, payload, error_message)
  VALUES (p_entry_id, p_payload, p_error);
END;
$$;

-- Grant execute to anon
GRANT EXECUTE ON FUNCTION public.update_showcase_status TO anon;
GRANT EXECUTE ON FUNCTION public.insert_pending_lead TO anon;
