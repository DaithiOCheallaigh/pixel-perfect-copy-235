import { corsHeaders } from 'npm:@supabase/supabase-js@2/cors';
import { z } from 'npm:zod@3';

const schema = z.union([
  z.object({ password: z.string().min(1).max(256) }),
  z.object({ token: z.string().min(1).max(512) }),
]);
const encoder = new TextEncoder();
const attempts = new Map<string, { count: number; until: number }>();
const reply = (data: unknown, status = 200) => new Response(JSON.stringify(data), {
  status, headers: { ...corsHeaders, 'Content-Type': 'application/json', 'Cache-Control': 'no-store' },
});

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders });
  if (req.method !== 'POST') return reply({ error: 'Method not allowed' }, 405);
  try {
    const parsed = schema.safeParse(await req.json());
    if (!parsed.success) return reply({ error: 'Enter a valid password or access token.' }, 400);
    const password = Deno.env.get('SPARK_PROJECT_PASSWORD');
    const signingKey = Deno.env.get('SPARK_GATE_SIGNING_KEY');
    if (!password || !signingKey) return reply({ error: 'Project access is temporarily unavailable.' }, 503);
    const key = await crypto.subtle.importKey('raw', encoder.encode(signingKey), { name: 'HMAC', hash: 'SHA-256' }, false, ['sign', 'verify']);
    if ('token' in parsed.data) {
      const [expires, signature] = parsed.data.token.split('.');
      if (!expires || !signature || !/^\d+$/.test(expires) || !/^[a-f0-9]{64}$/.test(signature) || Number(expires) <= Date.now()) {
        return reply({ error: 'Please enter the password again.' }, 401);
      }
      const bytes = new Uint8Array(signature.match(/.{2}/g)?.map(byte => parseInt(byte, 16)) ?? []);
      const valid = await crypto.subtle.verify('HMAC', key, bytes, encoder.encode(`spark:${expires}`));
      return valid ? reply({ authorized: true }) : reply({ error: 'Please enter the password again.' }, 401);
    }
    const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown';
    const now = Date.now();
    for (const [address, entry] of attempts) if (entry.until <= now) attempts.delete(address);
    const attempt = attempts.get(ip);
    if (attempt && attempt.count >= 10) return reply({ error: 'Too many attempts. Please try again in 15 minutes.' }, 429);
    if (parsed.data.password !== password) {
      attempts.set(ip, { count: (attempt?.count ?? 0) + 1, until: attempt?.until ?? now + 15 * 60 * 1000 });
      return reply({ error: 'Incorrect password. Please try again.' }, 401);
    }
    attempts.delete(ip);
    const expires = String(now + 8 * 60 * 60 * 1000);
    const signature = new Uint8Array(await crypto.subtle.sign('HMAC', key, encoder.encode(`spark:${expires}`)));
    const hex = Array.from(signature, byte => byte.toString(16).padStart(2, '0')).join('');
    return reply({ token: `${expires}.${hex}` });
  } catch {
    return reply({ error: 'Unable to check project access. Please try again.' }, 400);
  }
});