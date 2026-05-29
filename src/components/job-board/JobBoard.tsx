import { useMemo, useState } from "react";
import { ArrowUpRight, MapPin, Plus, Search, Sparkles } from "lucide-react";
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

      {/* Sticky search & filter rail */}
      <section className="sticky top-0 z-40 border-y border-border bg-background/85 backdrop-blur-md">
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
        <a href="/" className="font-serif text-3xl italic tracking-tight">
          DigiCareers
        </a>
        <div className="hidden gap-7 text-sm font-medium text-muted-foreground lg:flex">
          <a href="#" className="transition-colors hover:text-foreground">Browse Roles</a>
          <a href="#" className="transition-colors hover:text-foreground">Company Index</a>
          <a href="#" className="transition-colors hover:text-foreground">Salary Report</a>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <button className="text-sm font-medium text-muted-foreground hover:text-foreground">Log in</button>
        <button className="flex items-center gap-2 bg-foreground py-2 pl-3 pr-4 text-sm font-medium text-background ring-1 ring-foreground transition-transform active:scale-[0.98]">
          <Plus className="size-4" />
          Post a job
        </button>
      </div>
    </nav>
  );
}

function Hero({ count }: { count: number }) {
  return (
    <header className="mx-auto max-w-7xl px-6 pb-20 pt-12">
      <div className="grid items-end gap-12 lg:grid-cols-[1fr_360px]">
        <div>
          <p className="mb-6 inline-flex items-center gap-2 text-[10px] font-medium uppercase tracking-[0.25em] text-muted-foreground">
            <Sparkles className="size-3" />
            The talent layer for digital marketing
          </p>
          <h1 className="text-balance font-serif text-6xl leading-[0.95] tracking-tight md:text-8xl">
            Roles for the people who actually <em className="italic">run</em> the internet.
          </h1>
          <p className="mt-8 max-w-[58ch] text-pretty text-lg leading-relaxed text-muted-foreground">
            A curated index of opportunities for AdOps, programmatic, SEO, social, affiliate,
            design, WordPress and AI marketing specialists — at every level, from fresher to senior.
          </p>
        </div>

        <aside className="rounded-lg bg-muted p-6 ring-1 ring-border">
          <p className="mb-3 text-[10px] font-medium uppercase tracking-[0.25em] text-muted-foreground">
            Live this week
          </p>
          <div className="flex items-baseline gap-2">
            <span className="font-serif text-6xl italic">{count.toString().padStart(2, "0")}</span>
            <span className="text-sm text-muted-foreground">curated roles</span>
          </div>
          <div className="mt-5 h-px w-full bg-border" />
          <div className="mt-5 flex justify-between text-xs text-muted-foreground">
            <span>Updated hourly</span>
            <span className="font-serif italic">No spam · no recruiters</span>
          </div>
        </aside>
      </div>
    </header>
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
          <button className="flex items-center gap-2 bg-muted py-1.5 pl-3 pr-4 text-sm font-medium text-foreground ring-1 ring-foreground transition-colors group-hover:bg-foreground group-hover:text-background">
            <ArrowUpRight className="size-4" />
            View details
          </button>
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