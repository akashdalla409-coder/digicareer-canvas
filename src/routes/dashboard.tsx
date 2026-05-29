import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight, Bookmark, FileText, Inbox } from "lucide-react";
import { JOBS } from "@/components/job-board/data";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "Your desk — DigiCareers" },
      { name: "description", content: "Your saved roles, applications and signal feed on DigiCareers." },
    ],
  }),
  component: Dashboard,
});

function Dashboard() {
  const saved = JOBS.slice(0, 3);
  const applied = JOBS.slice(3, 5);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="border-b border-border">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          <Link to="/" className="font-serif text-2xl italic">DigiCareers</Link>
          <nav className="flex items-center gap-6 text-sm">
            <Link to="/" className="text-muted-foreground hover:text-foreground">Roles</Link>
            <Link to="/companies" className="text-muted-foreground hover:text-foreground">Houses</Link>
            <Link to="/dashboard" className="font-medium">Desk</Link>
            <div className="grid size-8 place-items-center rounded-full bg-foreground text-xs font-medium text-background">AS</div>
          </nav>
        </div>
      </header>

      <section className="border-b border-border">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 py-16 lg:grid-cols-[1.3fr_1fr] lg:items-end">
          <div>
            <p className="text-[10px] font-medium uppercase tracking-[0.25em] text-muted-foreground">Folio · No. 014</p>
            <h1 className="mt-3 font-serif text-6xl italic leading-[1.02] tracking-tight md:text-7xl">Good morning, Anika.</h1>
            <p className="mt-4 max-w-xl text-base text-muted-foreground">Three roles match the brief you set last week. Two replies are pending in your inbox.</p>
          </div>
          <dl className="grid grid-cols-3 divide-x divide-border border-y border-border">
            <Stat value="12" label="Saved" />
            <Stat value="5" label="Applied" />
            <Stat value="2" label="Replies" />
          </dl>
        </div>
      </section>

      <div className="mx-auto grid max-w-7xl gap-12 px-6 py-16 lg:grid-cols-[1fr_300px]">
        <main className="space-y-16">
          <Block title="Saved roles" eyebrow="01" icon={<Bookmark className="size-3.5" />} jobs={saved} />
          <Block title="In review" eyebrow="02" icon={<FileText className="size-3.5" />} jobs={applied} />
        </main>
        <aside className="space-y-8 lg:sticky lg:top-8 lg:self-start">
          <Card title="Brief" body="Senior IC roles · Programmatic / AI Marketing · Remote-first · 140k+ USD" cta="Edit brief" />
          <Card title="Signal" body="3 new roles match your brief this week. We'll surface them as they arrive." cta="Adjust frequency" icon={<Inbox className="size-3.5" />} />
        </aside>
      </div>
    </div>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="px-4 py-5 first:pl-0">
      <p className="font-serif text-4xl italic">{value}</p>
      <p className="mt-1 text-[10px] font-medium uppercase tracking-[0.25em] text-muted-foreground">{label}</p>
    </div>
  );
}

function Block({ title, eyebrow, icon, jobs }: { title: string; eyebrow: string; icon: React.ReactNode; jobs: typeof JOBS }) {
  return (
    <section>
      <div className="mb-6 flex items-end justify-between border-b border-border pb-3">
        <h2 className="inline-flex items-baseline gap-3 font-serif text-3xl italic">
          <span className="text-[10px] font-sans font-medium not-italic uppercase tracking-[0.25em] text-muted-foreground">{eyebrow}</span>
          {title}
        </h2>
        <span className="inline-flex items-center gap-1.5 text-[10px] font-medium uppercase tracking-[0.25em] text-muted-foreground">{icon}{jobs.length} entries</span>
      </div>
      <ul className="divide-y divide-border">
        {jobs.map((j) => (
          <li key={j.id}>
            <Link to="/jobs/$id" params={{ id: j.id }} className="group flex items-center justify-between gap-6 py-5 hover:bg-muted/40">
              <div className="min-w-0">
                <p className="text-[10px] font-medium uppercase tracking-[0.25em] text-muted-foreground">{j.company}</p>
                <p className="mt-1 truncate font-serif text-2xl italic">{j.title}</p>
                <p className="mt-1 text-sm text-muted-foreground">{j.location} · {j.type} · {j.salary}</p>
              </div>
              <ArrowUpRight className="size-5 shrink-0 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-foreground" />
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}

function Card({ title, body, cta, icon }: { title: string; body: string; cta: string; icon?: React.ReactNode }) {
  return (
    <div className="border border-border bg-muted/40 p-5">
      <p className="inline-flex items-center gap-1.5 text-[10px] font-medium uppercase tracking-[0.25em] text-muted-foreground">{icon}{title}</p>
      <p className="mt-3 font-serif text-xl italic leading-snug">{body}</p>
      <button className="mt-4 text-xs font-medium underline underline-offset-4 hover:opacity-70">{cta}</button>
    </div>
  );
}