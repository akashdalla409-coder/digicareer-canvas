import { useMemo, useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowUpRight, MapPin, Plus, Search, ArrowRight, Sparkles } from "lucide-react";
import { JOBS, LEVELS, ROLES, TYPES, type Job } from "./data";
import { cn } from "@/lib/utils";

export function JobBoard() {
  const [query, setQuery] = useState("");
  const [role, setRole] = useState<string | null>(null);
  const [level, setLevel] = useState<string | null>(null);
  const [type, setType] = useState<string | null>(null);
  const [location, setLocation] = useState("");

  const filtered = useMemo(() => {
    return JOBS.filter((j) => {
      if (role && j.role !== role) return false;
      if (level && j.level !== level) return false;
      if (type && j.type !== type) return false;
      if (location && !j.location.toLowerCase().includes(location.toLowerCase())) return false;
      if (query) {
        const q = query.toLowerCase();
        if (
          !j.title.toLowerCase().includes(q) &&
          !j.company.toLowerCase().includes(q) &&
          !j.role.toLowerCase().includes(q)
        )
          return false;
      }
      return true;
    });
  }, [query, role, level, type, location]);

  const clearAll = () => {
    setQuery("");
    setRole(null);
    setLevel(null);
    setType(null);
    setLocation("");
  };

  const hasFilters = !!(query || role || level || type || location);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <Hero count={JOBS.length} />
      <Marquee />
      <DisciplinesCatalog />

      {/* Sticky search & filter rail */}
      <section id="board" className="sticky top-0 z-40 border-y border-border bg-background/85 backdrop-blur-md">
        <div className="mx-auto max-w-7xl px-6 py-3">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="relative flex-1">
              <Search className="pointer-events-none absolute left-0 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search by role, company, tool or keyword…"
                className="w-full bg-transparent py-2 pl-7 text-xl font-medium placeholder:text-muted-foreground/60 focus:outline-none"
              />
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <FilterSelect label="Level" value={level} onChange={setLevel} options={LEVELS as readonly string[]} />
              <FilterSelect label="Type" value={type} onChange={setType} options={TYPES as readonly string[]} />
              <div className="flex items-center gap-1.5 rounded-full bg-muted px-4 py-1.5 ring-1 ring-border">
                <MapPin className="size-3.5 text-muted-foreground" />
                <input
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="Location…"
                  className="w-28 bg-transparent text-sm font-medium placeholder:text-muted-foreground focus:outline-none"
                />
              </div>
              {hasFilters && (
                <button
                  onClick={clearAll}
                  className="text-xs font-medium uppercase tracking-widest text-muted-foreground hover:text-foreground"
                >
                  Reset
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Role chips */}
      <section className="mx-auto max-w-7xl px-6 py-10">
        <div className="mb-4 flex items-baseline justify-between">
          <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-muted-foreground">
            Specialised disciplines
          </p>
          <p className="font-serif text-sm italic text-muted-foreground">
            {filtered.length} matching {filtered.length === 1 ? "role" : "roles"}
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Chip active={role === null} onClick={() => setRole(null)}>
            All roles
          </Chip>
          {ROLES.map((r) => (
            <Chip key={r} active={role === r} onClick={() => setRole(role === r ? null : r)}>
              {r}
            </Chip>
          ))}
        </div>
      </section>

      {/* Job grid */}
      <main className="mx-auto max-w-7xl px-6 pb-32">
        {filtered.length === 0 ? (
          <EmptyState onReset={clearAll} />
        ) : (
          <div className="grid gap-px overflow-hidden bg-border ring-1 ring-border">
            {filtered.map((job) => (
              <JobRow key={job.id} job={job} />
            ))}
          </div>
        )}
      </main>

      <SiteFooter />
    </div>
  );
}

function SiteHeader() {
  return (
    <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6">
      <div className="flex items-center gap-10">
        <Link to="/" className="group flex items-baseline gap-1.5 font-[family-name:var(--font-display)] text-2xl font-medium tracking-tight">
          <span className="grid size-7 place-items-center rounded-full bg-brand text-brand-foreground">
            <span className="font-serif text-base italic leading-none">d</span>
          </span>
          digi<em className="italic text-brand">careers</em>
        </Link>
        <div className="hidden gap-7 text-sm text-muted-foreground lg:flex">
          <a href="#board" className="transition-colors hover:text-foreground">Browse roles</a>
          <Link to="/companies" className="transition-colors hover:text-foreground">Companies</Link>
          <Link to="/about" className="transition-colors hover:text-foreground">About</Link>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <Link to="/post-job" className="hidden text-sm text-muted-foreground hover:text-foreground sm:inline">Post a job</Link>
        <Link
          to="/sign-up"
          className="group flex items-center gap-2 rounded-full bg-foreground py-2 pl-4 pr-2 text-sm font-medium text-background transition-transform active:scale-[0.98]"
        >
          Sign up — it's free
          <span className="grid size-7 place-items-center rounded-full bg-brand text-brand-foreground transition-transform group-hover:translate-x-0.5">
            <ArrowRight className="size-3.5" />
          </span>
        </Link>
      </div>
    </nav>
  );
}

function Hero({ count }: { count: number }) {
  return (
    <header className="relative mx-auto flex min-h-[calc(100vh-88px)] max-w-7xl flex-col justify-between px-6 pb-12 pt-6">
      {/* Top meta strip — masthead style */}
      <div className="flex items-center justify-between border-b border-border pb-4 text-[10px] font-medium uppercase tracking-[0.25em] text-muted-foreground">
        <span className="inline-flex items-center gap-2">
          <span className="inline-block size-1.5 animate-pulse rounded-full bg-brand" />
          {count} live roles · updated hourly
        </span>
        <span className="hidden md:inline">A curated index for digital craft</span>
        <span className="font-[family-name:var(--font-mono)] normal-case tracking-normal text-foreground/60">v.01</span>
      </div>

      {/* Big hero line */}
      <div className="flex flex-1 flex-col justify-center py-16">
        <p className="mb-8 inline-flex w-fit items-center gap-2 rounded-full bg-accent px-4 py-1.5 text-xs font-medium text-accent-foreground">
          <Sparkles className="size-3.5" />
          Built for digital marketing specialists
        </p>
        <h1 className="font-[family-name:var(--font-display)] text-[clamp(3rem,10vw,9.5rem)] font-light leading-[0.9] tracking-[-0.04em]">
          Find your next
          <br />
          <span className="italic text-brand">digital</span> career
          <br />
          <span className="relative inline-block">
            in <em className="italic">good company</em>.
            <svg
              aria-hidden
              viewBox="0 0 300 12"
              preserveAspectRatio="none"
              className="absolute -bottom-2 left-0 h-2 w-full text-brand"
            >
              <path
                d="M2 8 Q 75 1, 150 6 T 298 4"
                stroke="currentColor"
                strokeWidth="2"
                fill="none"
                strokeLinecap="round"
              />
            </svg>
          </span>
        </h1>

        <p className="mt-10 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">
          A handpicked job board for <span className="text-foreground">AdOps, programmatic, SEO,
          performance, social, design, WordPress &amp; AI marketing</span> specialists. No
          recruiters. No noise. Just the work.
        </p>

        <div className="mt-10 flex flex-wrap items-center gap-3">
          <a
            href="#board"
            className="group inline-flex items-center gap-3 rounded-full bg-foreground py-3 pl-6 pr-3 text-sm font-medium text-background transition-transform active:scale-[0.98]"
          >
            Browse {count} open roles
            <span className="grid size-8 place-items-center rounded-full bg-brand text-brand-foreground transition-transform group-hover:translate-x-0.5">
              <ArrowRight className="size-4" />
            </span>
          </a>
          <Link
            to="/post-job"
            className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-5 py-3 text-sm font-medium hover:bg-muted"
          >
            <Plus className="size-4" />
            Post a role
          </Link>
        </div>
      </div>

      {/* Bottom stat bar */}
      <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl bg-border ring-1 ring-border md:grid-cols-4">
        <Stat n={count.toString().padStart(2, "0")} l="Live roles" />
        <Stat n="12" l="Disciplines" />
        <Stat n="04" l="Career levels" />
        <Stat n="38k" l="Weekly readers" />
      </dl>
    </header>
  );
}

function Stat({ n, l }: { n: string; l: string }) {
  return (
    <div className="flex items-baseline justify-between gap-3 bg-background px-5 py-5">
      <div className="font-[family-name:var(--font-display)] text-4xl font-light leading-none tracking-tight">
        {n}
      </div>
      <div className="text-[10px] font-medium uppercase tracking-[0.2em] text-muted-foreground">{l}</div>
    </div>
  );
}

function Marquee() {
  const items = [
    "Programmatic",
    "AdOps",
    "SEO",
    "Affiliate",
    "Media Buying",
    "AI Marketing",
    "WordPress",
    "Design",
    "Social",
    "Digital Strategy",
  ];
  return (
    <div className="relative overflow-hidden border-y border-border bg-muted/50 py-5">
      <div className="flex animate-[marquee_45s_linear_infinite] gap-12 whitespace-nowrap">
        {[...items, ...items, ...items].map((it, i) => (
          <span
            key={i}
            className="font-serif text-3xl italic text-muted-foreground/80"
          >
            {it} <span className="not-italic text-brand">✦</span>
          </span>
        ))}
      </div>
      <style>{`@keyframes marquee { to { transform: translateX(-33.333%); } }`}</style>
    </div>
  );
}

function DisciplinesCatalog() {
  const items: { n: string; name: string; blurb: string }[] = [
    { n: "01", name: "Programmatic", blurb: "DSPs, SSPs, supply paths, bid logic, MMM." },
    { n: "02", name: "AdOps", blurb: "Trafficking, QA, GAM, attribution, brand safety." },
    { n: "03", name: "Media Buying", blurb: "Meta, TikTok, Google, performance creative." },
    { n: "04", name: "SEO", blurb: "Technical, on-page, link, programmatic content." },
    { n: "05", name: "Affiliate", blurb: "Partner programs, networks, payouts, tracking." },
    { n: "06", name: "Social", blurb: "Org social, community, TikTok-first, short-form." },
    { n: "07", name: "Design", blurb: "Brand, marketing, motion, ad creative." },
    { n: "08", name: "WordPress", blurb: "Headless, custom themes, ACF, performance." },
    { n: "09", name: "AI Marketing", blurb: "Generative workflows, RAG, prompt systems." },
  ];
  return (
    <section className="mx-auto max-w-7xl px-6 py-24">
      <div className="mb-12 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
        <div>
          <p className="mb-3 text-[10px] font-medium uppercase tracking-[0.25em] text-muted-foreground">
            § Disciplines we cover
          </p>
          <h2 className="max-w-2xl font-serif text-4xl leading-[1] tracking-tight md:text-5xl">
            Twelve disciplines.{" "}
            <em className="italic text-muted-foreground">One careful index.</em>
          </h2>
        </div>
        <a
          href="#board"
          className="inline-flex items-center gap-2 text-sm font-medium underline decoration-border underline-offset-[6px] hover:decoration-foreground"
        >
          See all open roles <ArrowRight className="size-4" />
        </a>
      </div>
      <div className="grid grid-cols-1 gap-px overflow-hidden bg-border ring-1 ring-border md:grid-cols-2 lg:grid-cols-3">
        {items.map((it) => (
          <article
            key={it.n}
            className="group flex items-start gap-5 bg-background p-7 transition-colors hover:bg-muted/60"
          >
            <span className="font-serif text-2xl italic text-muted-foreground">{it.n}</span>
            <div>
              <h3 className="font-serif text-2xl leading-tight">{it.name}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{it.blurb}</p>
            </div>
            <ArrowUpRight className="ml-auto size-4 -translate-y-0.5 text-muted-foreground transition-all group-hover:-translate-y-1 group-hover:translate-x-0.5 group-hover:text-foreground" />
          </article>
        ))}
      </div>
    </section>
  );
}

function ClosingBand() {
  return (
    <section className="border-t border-border bg-foreground text-background">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 py-24 lg:grid-cols-[1fr_auto] lg:items-end">
        <h2 className="font-serif text-5xl leading-[0.95] tracking-tight md:text-7xl">
          Hiring a specialist?
          <br />
          <em className="italic text-background/60">Skip the noise.</em>
        </h2>
        <div className="flex flex-col items-start gap-4">
          <p className="max-w-sm text-pretty text-background/70">
            Reach 38,000 working operators in adtech, growth and the open web. Listings priced
            once, no add-ons, no auto-renew.
          </p>
          <Link
            to="/post-job"
            className="group inline-flex items-center gap-3 rounded-full bg-background py-3 pl-6 pr-3 text-sm font-medium text-foreground"
          >
            Post a role — $99
            <span className="grid size-7 place-items-center rounded-full bg-brand text-brand-foreground transition-transform group-hover:translate-x-0.5">
              <ArrowRight className="size-3.5" />
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}

function FilterSelect({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string | null;
  onChange: (v: string | null) => void;
  options: readonly string[];
}) {
  return (
    <div className="flex items-center gap-1.5 rounded-full bg-muted px-4 py-1.5 ring-1 ring-border">
      <span className="text-xs font-medium text-muted-foreground">{label}:</span>
      <select
        value={value ?? ""}
        onChange={(e) => onChange(e.target.value || null)}
        className="cursor-pointer bg-transparent text-sm font-medium focus:outline-none"
      >
        <option value="">All</option>
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
    </div>
  );
}

function Chip({
  active,
  onClick,
  children,
}: {
  active?: boolean;
  onClick?: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "rounded-full px-4 py-1.5 text-sm font-medium ring-1 ring-border transition-colors",
        active
          ? "bg-foreground text-background ring-foreground"
          : "bg-muted text-muted-foreground hover:bg-accent hover:text-foreground"
      )}
    >
      {children}
    </button>
  );
}

function JobRow({ job }: { job: Job }) {
  const monogram = job.company
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <article className="group relative bg-background p-8 transition-colors hover:bg-muted/60">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
        <div className="flex gap-6">
          <div className="grid size-14 shrink-0 place-items-center rounded-full bg-accent ring-1 ring-border">
            <span className="font-serif text-lg italic text-accent-foreground">{monogram}</span>
          </div>
          <div>
            <p className="mb-1 text-[10px] font-medium uppercase tracking-[0.2em] text-muted-foreground">
              {job.company}
              {job.featured && (
                <span className="ml-3 text-foreground/80">· Featured</span>
              )}
            </p>
            <h3 className="mb-3 font-serif text-2xl italic leading-tight">{job.title}</h3>
            <div className="flex flex-wrap gap-2">
              <Tag>{job.level}</Tag>
              <Tag>{job.type}</Tag>
              <Tag>
                <MapPin className="mr-1 size-3" />
                {job.location}
              </Tag>
              <Tag>{job.salary}</Tag>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-4 lg:flex-col lg:items-end">
          <span className="text-xs font-medium text-muted-foreground">Posted {job.postedAgo}</span>
          <Link
            to="/jobs/$id"
            params={{ id: job.id }}
            className="flex items-center gap-2 rounded-full bg-muted py-1.5 pl-3 pr-4 text-sm font-medium text-foreground ring-1 ring-foreground transition-colors group-hover:bg-brand group-hover:text-brand-foreground group-hover:ring-brand"
          >
            <ArrowUpRight className="size-4" />
            View details
          </Link>
        </div>
      </div>
    </article>
  );
}

function Tag({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full bg-muted px-2.5 py-0.5 text-[10px] font-medium uppercase tracking-wider ring-1 ring-border">
      {children}
    </span>
  );
}

function EmptyState({ onReset }: { onReset: () => void }) {
  return (
    <div className="border border-dashed border-border bg-muted/40 px-6 py-24 text-center">
      <p className="font-serif text-3xl italic">Nothing here — yet.</p>
      <p className="mt-2 text-muted-foreground">Try widening your filters or clearing the search.</p>
      <button
        onClick={onReset}
        className="mt-6 inline-flex rounded-full bg-foreground px-5 py-2 text-sm font-medium text-background"
      >
        Reset filters
      </button>
    </div>
  );
}

function SiteFooter() {
  return (
    <footer className="border-t border-border bg-muted/40 py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-col gap-12 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <span className="mb-5 block font-serif text-3xl italic tracking-tight">DigiCareers</span>
            <p className="max-w-[36ch] text-pretty text-sm leading-relaxed text-muted-foreground">
              The industry standard for sourcing technical digital marketing talent — built for
              specialists, by specialists.
            </p>
          </div>
          <div className="flex gap-16">
            <FooterCol
              title="Platform"
              items={["Browse jobs", "Post a role", "Pricing", "API"]}
            />
            <FooterCol
              title="Resources"
              items={["Salary guide", "Interviews", "Newsletter", "Support"]}
            />
          </div>
        </div>
        <div className="mt-20 flex flex-col gap-3 border-t border-border pt-6 md:flex-row md:items-center md:justify-between">
          <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-muted-foreground">
            © DigiCareers. All rights reserved.
          </p>
          <div className="flex gap-6 text-[10px] font-medium uppercase tracking-[0.2em] text-muted-foreground">
            <a href="#" className="hover:text-foreground">Privacy</a>
            <a href="#" className="hover:text-foreground">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="space-y-4">
      <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-muted-foreground">
        {title}
      </p>
      <ul className="space-y-2 text-sm font-medium">
        {items.map((i) => (
          <li key={i}>
            <a href="#" className="hover:text-muted-foreground">
              {i}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}