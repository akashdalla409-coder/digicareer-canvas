import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, ArrowUpRight, Bookmark, Building2, MapPin, Share2 } from "lucide-react";
import { JOBS } from "@/components/job-board/data";

export const Route = createFileRoute("/jobs/$id")({
  loader: ({ params }) => {
    const job = JOBS.find((j) => j.id === params.id);
    if (!job) throw notFound();
    return { job };
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: loaderData ? `${loaderData.job.title} — ${loaderData.job.company} · DigiCareers` : "Role — DigiCareers" },
      { name: "description", content: loaderData ? `${loaderData.job.title} at ${loaderData.job.company} (${loaderData.job.location}) — apply via DigiCareers.` : undefined },
    ],
  }),
  notFoundComponent: () => (
    <div className="grid min-h-screen place-items-center bg-background px-6">
      <div className="max-w-md text-center">
        <p className="text-[10px] font-medium uppercase tracking-[0.25em] text-muted-foreground">404 · Errata</p>
        <h1 className="mt-3 font-serif text-5xl italic">Role retired.</h1>
        <p className="mt-3 text-sm text-muted-foreground">This listing has been filled or withdrawn.</p>
        <Link to="/" className="mt-6 inline-flex bg-foreground px-4 py-2 text-sm font-medium text-background">Browse open roles</Link>
      </div>
    </div>
  ),
  errorComponent: ({ error, reset }) => (
    <div className="grid min-h-screen place-items-center bg-background px-6 text-center">
      <div>
        <p className="font-serif text-3xl italic">Something tore.</p>
        <p className="mt-2 text-sm text-muted-foreground">{error.message}</p>
        <button onClick={reset} className="mt-4 bg-foreground px-4 py-2 text-sm text-background">Try again</button>
      </div>
    </div>
  ),
  component: JobDetail,
});

function JobDetail() {
  const { job } = Route.useLoaderData();
  const monogram = job.company
    .split(" ")
    .map((w: string) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Topbar */}
      <div className="border-b border-border">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          <Link to="/" className="font-serif text-2xl italic tracking-tight">DigiCareers</Link>
          <Link to="/" className="inline-flex items-center gap-1.5 text-[10px] font-medium uppercase tracking-[0.25em] text-muted-foreground hover:text-foreground">
            <ArrowLeft className="size-3" /> All roles
          </Link>
        </div>
      </div>

      <article className="mx-auto max-w-7xl px-6 py-16">
        {/* Header */}
        <header className="grid gap-10 border-b border-border pb-12 lg:grid-cols-[1fr_320px] lg:items-end">
          <div>
            <div className="flex items-center gap-4">
              <div className="grid size-16 place-items-center rounded-md bg-muted ring-1 ring-border">
                <span className="font-serif text-xl italic">{monogram}</span>
              </div>
              <div>
                <p className="text-[10px] font-medium uppercase tracking-[0.25em] text-muted-foreground">
                  {job.company}{job.featured && <span className="ml-3">· Featured</span>}
                </p>
                <p className="mt-1 text-sm text-muted-foreground">Posted {job.postedAgo}</p>
              </div>
            </div>
            <h1 className="mt-8 text-balance font-serif text-5xl italic leading-[1.02] tracking-tight md:text-7xl">
              {job.title}
            </h1>
            <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm">
              <span className="inline-flex items-center gap-1.5"><MapPin className="size-3.5 text-muted-foreground" />{job.location}</span>
              <span className="text-muted-foreground">·</span>
              <span>{job.type}</span>
              <span className="text-muted-foreground">·</span>
              <span>{job.level}</span>
              <span className="text-muted-foreground">·</span>
              <span className="font-serif italic">{job.salary}</span>
            </div>
          </div>

          <aside className="space-y-3">
            <button className="group inline-flex w-full items-center justify-between bg-foreground px-5 py-4 text-sm font-medium text-background">
              Apply for this role
              <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </button>
            <div className="grid grid-cols-2 gap-3">
              <button className="inline-flex items-center justify-center gap-1.5 border border-border px-3 py-2 text-sm hover:bg-muted">
                <Bookmark className="size-3.5" /> Save
              </button>
              <button className="inline-flex items-center justify-center gap-1.5 border border-border px-3 py-2 text-sm hover:bg-muted">
                <Share2 className="size-3.5" /> Share
              </button>
            </div>
          </aside>
        </header>

        {/* Body */}
        <div className="grid gap-16 py-16 lg:grid-cols-[1fr_280px]">
          <div className="max-w-[68ch] space-y-10">
            <Section title="The brief">
              <p>
                {job.company} is hiring a {job.title.toLowerCase()} to own the planning, activation
                and optimization of cross-channel campaigns. You'll work alongside a small, senior
                team — no managers of managers, no recruiter middlemen — shipping measurable work
                from day one.
              </p>
            </Section>
            <Section title="What you'll do">
              <ul className="list-inside list-[square] space-y-2 marker:text-muted-foreground">
                <li>Build and run {job.role} programs end-to-end across paid, owned and partner channels.</li>
                <li>Translate business goals into measurable media plans with clear KPIs.</li>
                <li>Partner with creative, analytics and engineering to compound performance.</li>
                <li>Document playbooks the rest of the team can rerun without you.</li>
              </ul>
            </Section>
            <Section title="What we're looking for">
              <ul className="list-inside list-[square] space-y-2 marker:text-muted-foreground">
                <li>3+ years of hands-on {job.role} experience (or equivalent specialist time).</li>
                <li>Comfort with attribution edge cases, measurement gaps and pragmatic trade-offs.</li>
                <li>Strong written communication. You can leave a paper trail.</li>
              </ul>
            </Section>
            <Section title="How we work">
              <p>
                Async-first, with one anchor day a week. Generous tooling budget. Real PTO.
                No surveillance software, ever.
              </p>
            </Section>
          </div>

          <aside className="space-y-8 lg:sticky lg:top-8 lg:self-start">
            <Meta title="At a glance" items={[
              ["Discipline", job.role],
              ["Level", job.level],
              ["Engagement", job.type],
              ["Location", job.location],
              ["Compensation", job.salary],
            ]} />
            <Meta title="Company" items={[
              ["Name", job.company],
              ["Industry", "Digital marketing"],
              ["Size", "11 – 50"],
            ]} icon={<Building2 className="size-3.5" />} />
          </aside>
        </div>
      </article>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h2 className="mb-4 font-serif text-3xl italic">{title}</h2>
      <div className="space-y-3 text-base leading-relaxed text-foreground/85">{children}</div>
    </section>
  );
}

function Meta({ title, items, icon }: { title: string; items: [string, string][]; icon?: React.ReactNode }) {
  return (
    <div className="border border-border bg-muted/40 p-5">
      <p className="mb-4 inline-flex items-center gap-1.5 text-[10px] font-medium uppercase tracking-[0.25em] text-muted-foreground">
        {icon}{title}
      </p>
      <dl className="space-y-3 text-sm">
        {items.map(([k, v]) => (
          <div key={k} className="flex items-baseline justify-between gap-4 border-b border-border/60 pb-2 last:border-0 last:pb-0">
            <dt className="text-muted-foreground">{k}</dt>
            <dd className="text-right font-serif italic">{v}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}