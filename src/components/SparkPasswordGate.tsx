import { useEffect, useState, type FormEvent, type ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { LockKeyhole, ArrowLeft, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { SEO } from '@/components/SEO';
import { supabase } from '@/integrations/supabase/client';
import { Helmet } from 'react-helmet-async';

const storageKey = 'spark-project-access';

export default function SparkPasswordGate({ children }: { children: ReactNode }) {
  const [authorized, setAuthorized] = useState(false);
  const [checking, setChecking] = useState(true);
  const [password, setPassword] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    let active = true;
    const check = async () => {
      try {
        const token = sessionStorage.getItem(storageKey);
        if (token) {
          const result = await supabase.functions.invoke('spark-project-access', { body: { token } });
          if (active) setAuthorized(!result.error && result.data?.authorized === true);
          if (result.error || !result.data?.authorized) sessionStorage.removeItem(storageKey);
        }
      } catch {
        if (active) setError('Unable to check project access. Please try again.');
      } finally {
        if (active) setChecking(false);
      }
    };
    void check();
    return () => { active = false; };
  }, []);

  const unlock = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitting(true);
    setError('');
    try {
      const result = await supabase.functions.invoke('spark-project-access', { body: { password } });
      if (result.error || typeof result.data?.token !== 'string') {
        let message = 'Unable to check project access. Please try again.';
        if (result.error?.context instanceof Response) {
          const details = await result.error.context.json().catch(() => null);
          if (typeof details?.error === 'string') message = details.error;
        }
        setError(message);
        return;
      }
      sessionStorage.setItem(storageKey, result.data.token);
      setPassword('');
      setAuthorized(true);
    } catch {
      setError('Unable to check project access. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  if (authorized) return <>{children}</>;
  return (
    <main className="flex min-h-screen items-center justify-center px-6 pt-24 text-foreground">
      <SEO title="MedEd Workspace — Password protected" description="Private MedEd Workspace case study by Lacuna Digital." url="/work/spark" />
      <Helmet><meta name="robots" content="noindex, nofollow" /></Helmet>
      <div className="w-full max-w-sm py-24">
        <LockKeyhole className="mb-6 h-8 w-8 text-primary" aria-hidden="true" />
        <h1 className="mb-4 text-4xl font-black">MedEd Workspace</h1>
        <p className="mb-8 text-muted-foreground">Password-protected case study</p>
        {checking ? <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" aria-label="Checking project access" /> : (
          <form onSubmit={unlock} className="space-y-4">
            <label htmlFor="spark-password" className="block text-sm font-medium">Password</label>
            <Input id="spark-password" type="password" autoComplete="current-password" autoFocus required maxLength={256} value={password} onChange={event => setPassword(event.target.value)} aria-invalid={!!error} aria-describedby={error ? 'spark-password-error' : undefined} disabled={submitting} />
            {error && <p id="spark-password-error" role="alert" className="text-sm text-destructive">{error}</p>}
            <Button type="submit" className="w-full" disabled={submitting}>
              {submitting && <Loader2 className="animate-spin" />}
              {submitting ? 'Checking…' : 'View project'}
            </Button>
          </form>
        )}
        <Button asChild variant="link" className="mt-6 px-0"><Link to="/work"><ArrowLeft />Back to Work</Link></Button>
      </div>
    </main>
  );
}