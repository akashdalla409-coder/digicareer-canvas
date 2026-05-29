import { useMemo, useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowUpRight, MapPin, Plus, Search, ArrowRight } from "lucide-react";
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
        <div className="mx-auto max-w-7xl px-6 py-4">
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
              <div className="flex items-center gap-1.5 bg-muted px-3 py-1.5 ring-1 ring-border">
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
    <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-7">
      <div className="flex items-center gap-10">
        <Link to="/" className="font-serif text-3xl italic tracking-tight">
          DigiCareers
        </Link>
        <div className="hidden gap-7 text-sm font-medium text-muted-foreground lg:flex">
          <Link to="/" className="transition-colors hover:text-foreground">Browse Roles</Link>
          <a href="#" className="transition-colors hover:text-foreground">Company Index</a>
          <a href="#" className="transition-colors hover:text-foreground">Salary Report</a>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <Link to="/sign-in" className="text-sm font-medium text-muted-foreground hover:text-foreground">Log in</Link>
        <Link to="/post-job" className="flex items-center gap-2 bg-foreground py-2 pl-3 pr-4 text-sm font-medium text-background ring-1 ring-foreground transition-transform active:scale-[0.98]">
          <Plus className="size-4" />
          Post a job
        </Link>
      </div>
    </nav>
  );
}

function Hero({ count }: { count: number }) {
  return (
    <header className="relative mx-auto max-w-7xl px-6 pb-24 pt-8">
      {/* Top meta strip — masthead style */}
      <div className="mb-16 flex items-center justify-between border-b border-border pb-4 text-[10px] font-medium uppercase tracking-[0.25em] text-muted-foreground">
        <span>Vol. 01 · Edition {new Date().getFullYear()}</span>
        <span className="hidden md:inline">A curated index for digital craft</span>
        <span>{new Date().toLocaleDateString("en-US", { month: "long", day: "numeric" })}</span>
      </div>

      <div className="grid items-end gap-16 lg:grid-cols-12">
        {/* Headline */}
        <div className="lg:col-span-8">
          <h1 className="font-serif tracking-[-0.02em] text-[clamp(3.25rem,9vw,8.5rem)] leading-[0.88]">
            The quiet
            <br />
            <em className="italic">job board</em> for
            <br />
            people who <span className="italic">build</span>
            <br />
            the open web.
          </h1>

          <div className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-4">
            <Link
              to="/post-job"
              className="group inline-flex items-center gap-3 bg-foreground py-3 pl-5 pr-3 text-sm font-medium text-background ring-1 ring-foreground transition-transform active:scale-[0.98]"
            >
              Post a role
              <span className="grid size-6 place-items-center bg-background text-foreground transition-transform group-hover:translate-x-0.5">
                <ArrowRight className="size-3.5" />
              </span>
            </Link>
            <a
              href="#board"
              className="inline-flex items-center gap-2 text-sm font-medium underline decoration-border underline-offset-[6px] hover:decoration-foreground"
            >
              Browse {count} open roles
            </a>
          </div>
        </div>

        {/* Index card */}
        <aside className="lg:col-span-4">
          <div className="border-t border-foreground pt-5">
            <p className="font-serif text-sm italic text-muted-foreground">
              An editorial career index for AdOps, programmatic, SEO, social, affiliate, design,
              WordPress and AI marketing specialists — read by 38,000 operators each week.
            </p>
          </div>
          <dl className="mt-8 grid grid-cols-3 divide-x divide-border border-y border-border">
            <Stat n={count.toString().padStart(2, "0")} l="Live roles" />
            <Stat n="12" l="Disciplines" />
            <Stat n="04" l="Levels" />
          </dl>
          <p className="mt-4 text-[10px] font-medium uppercase tracking-[0.25em] text-muted-foreground">
            Updated hourly · No recruiters
          </p>
        </aside>
      </div>
    </header>
  );
}

function Stat({ n, l }: { n: string; l: string }) {
  return (
    <div className="px-3 py-4 text-center first:pl-0 last:pr-0">
      <div className="font-serif text-3xl italic leading-none">{n}</div>
      <div className="mt-2 text-[10px] font-medium uppercase tracking-[0.2em] text-muted-foreground">{l}</div>
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
            {it} <span className="not-italic text-foreground/30">✦</span>
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
            className="group inline-flex items-center gap-3 bg-background py-3 pl-5 pr-3 text-sm font-medium text-foreground"
          >
            Post a role — $99
            <span className="grid size-6 place-items-center bg-foreground text-background transition-transform group-hover:translate-x-0.5">
              <ArrowRight className="size-3.5" />
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
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
    <div className="flex items-center gap-1.5 bg-muted px-3 py-1.5 ring-1 ring-border">
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
        "px-4 py-1.5 text-sm font-medium ring-1 ring-border transition-colors",
        active
          ? "bg-foreground text-background"
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
          <div className="grid size-14 shrink-0 place-items-center rounded-md bg-muted ring-1 ring-border">
            <span className="font-serif text-lg italic">{monogram}</span>
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
            className="flex items-center gap-2 bg-muted py-1.5 pl-3 pr-4 text-sm font-medium text-foreground ring-1 ring-foreground transition-colors group-hover:bg-foreground group-hover:text-background"
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
    <span className="inline-flex items-center px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider ring-1 ring-border bg-muted">
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
        className="mt-6 inline-flex bg-foreground px-4 py-2 text-sm font-medium text-background"
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
            © {new Date().getFullYear()} DigiCareers. All rights reserved.
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