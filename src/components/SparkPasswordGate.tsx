import { useEffect, useState, type FormEvent, type ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { LockKeyhole, ArrowLeft, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { SEO } from '@/components/SEO';
import { supabase } from '@/integrations/supabase/client';
import { BulletList } from '@/components/case-study/CaseLayout';
import { imgDims } from '@/data/imageDimensions';
import { PORTFOLIO_EMAIL } from '@/data/profile';
import { projects } from '@/data/projects';

const timeline = projects.find(p => p.id === 'spark')?.timeline;
const eyebrow = `Elsevier · Contract UI/UX Designer · ${timeline && /\d/.test(timeline) ? timeline : '2025–2026'}`;
const tags = ['Healthcare Education', 'Design Systems', 'AI Workflow'];
const inside = [
  'Narrated 3-minute walkthrough of the student and faculty experiences',
  'Feature loops: USMLE study guide, AI coach, exam readiness',
  'Interactive Alpha prototype you can click through',
  'Process: spec-driven design, Figma MCP, multi-squad delivery',
];
const poster = '/images/work/spark-walkthrough-poster.jpg';
const accessHref = `mailto:${PORTFOLIO_EMAIL}?subject=${encodeURIComponent('MedEd Workspace case study access')}`;

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
    <main className="min-h-screen px-6 pt-24 text-foreground md:px-12">
      <SEO title="MedEd Workspace (password protected)" description="Password-protected case study by Dave Kelly on MedEd Workspace, a healthcare-education product for Elsevier. Enter the password you were sent to view it." noindex />
      <div className="mx-auto grid w-full max-w-5xl gap-12 py-16 md:grid-cols-[minmax(0,1fr)_minmax(0,22rem)] md:items-start md:gap-16 md:py-24">
        <section className="min-w-0">
          <p className="mb-4 font-mono-label text-muted-foreground">{eyebrow}</p>
          <h1 className="mb-6 text-4xl font-black tracking-[-0.04em] leading-[0.9] md:text-6xl">MedEd Workspace</h1>
          <p className="mb-6 text-lg leading-[1.75] text-muted-foreground">A self-guided study companion for nursing and health-sciences students, and an LMS companion for the faculty who teach them, designed on and extended into Elsevier's Leyden design system.</p>
          <div className="mb-8 flex flex-wrap gap-2">
            {tags.map(tag => <span key={tag} className="rounded-md border border-border px-3 py-1 text-xs font-medium text-foreground">{tag}</span>)}
          </div>
          <div className="mb-8 overflow-hidden rounded-2xl border border-border bg-card">
            <img src={poster} alt="MedEd Workspace walkthrough cover" className="no-lightbox block h-auto w-full" {...imgDims(poster)} loading="eager" decoding="async" />
          </div>
          <h2 className="mb-4 text-xl font-bold tracking-tight">What's inside</h2>
          <BulletList items={inside} />
        </section>
        <div className="min-w-0 rounded-2xl border border-border bg-card p-6 md:sticky md:top-28 md:p-8">
          <LockKeyhole className="mb-6 h-8 w-8 text-primary" aria-hidden="true" />
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
          <p className="mt-6 text-sm text-muted-foreground">Don't have the password? <a href={accessHref} className="font-semibold text-primary underline-offset-4 hover:underline">Email me</a> and I'll send it over.</p>
          <Button asChild variant="link" className="mt-4 px-0"><Link to="/work"><ArrowLeft />Back to Work</Link></Button>
        </div>
      </div>
    </main>
  );
}