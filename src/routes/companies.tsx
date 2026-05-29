import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";

export const Route = createFileRoute("/companies")({
  head: () => ({
    meta: [
      { title: "Houses — DigiCareers" },
      { name: "description", content: "Browse the agencies, studios and in-house teams hiring digital marketing specialists on DigiCareers." },
      { property: "og:title", content: "Houses — DigiCareers" },
      { property: "og:description", content: "The agencies, studios and in-house teams hiring on DigiCareers." },
    ],
  }),
  component: Companies,
});

const HOUSES = [
  { name: "Aura Commerce", kind: "DTC · 50–200", roles: 4, blurb: "House of programmatic operators rewriting the playbook for direct-to-consumer." },
  { name: "Stellar Agency", kind: "Independent · 11–50", roles: 2, blurb: "An independent media buying shop with a stubborn point of view on creative." },
  { name: "Nexus AI", kind: "Series A · 11–50", roles: 6, blurb: "Building the marketing stack for the post-LLM era. Quietly profitable." },
  { name: "Origin Studio", kind: "Studio · 2–10", roles: 1, blurb: "Editorial-first SEO and content. Small by design, sharp by necessity." },
  { name: "Halo Media", kind: "Network · 200+", roles: 12, blurb: "Global AdOps trafficking at scale. Training ground for the discipline." },
  { name: "Drift Collective", kind: "Collective · 2–10", roles: 3, blurb: "Native social operators for brands who refuse to feel like brands." },
  { name: "Verve Labs", kind: "Product studio · 11–50", roles: 2, blurb: "Headless WordPress and bespoke CMS work for premium publishers." },
  { name: "Kindling Studio", kind: "Brand studio · 2–10", roles: 1, blurb: "Identity systems and marketing design for ambitious early-stage teams." },
];

function Companies() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="border-b border-border">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          <Link to="/" className="font-serif text-2xl italic">DigiCareers</Link>
          <nav className="flex items-center gap-6 text-sm">
            <Link to="/" className="text-muted-foreground hover:text-foreground">Roles</Link>
            <Link to="/companies" className="font-medium">Houses</Link>
            <Link to="/about" className="text-muted-foreground hover:text-foreground">Manifesto</Link>
            <Link to="/sign-in" className="text-muted-foreground hover:text-foreground">Sign in</Link>
          </nav>
        </div>
      </header>

      <section className="border-b border-border">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 py-20 lg:grid-cols-[1.4fr_1fr] lg:items-end">
          <div>
            <p className="text-[10px] font-medium uppercase tracking-[0.25em] text-muted-foreground">Index · Houses</p>
            <h1 className="mt-3 text-balance font-serif text-6xl italic leading-[1.02] tracking-tight md:text-8xl">
              The houses <em className="not-italic font-sans font-normal text-3xl align-middle text-muted-foreground">·</em> hiring on the desk.
            </h1>
          </div>
          <p className="max-w-md text-base leading-relaxed text-muted-foreground">
            A working register of agencies, studios, networks and in-house teams currently hiring digital marketing specialists through DigiCareers. Curated, not crowdsourced.
          </p>
        </div>
      </section>

      <ul className="mx-auto max-w-7xl divide-y divide-border px-6">
        {HOUSES.map((h) => {
          const mono = h.name.split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase();
          return (
            <li key={h.name}>
              <a href="#" className="group grid items-center gap-6 py-8 md:grid-cols-[64px_1fr_auto_auto]">
                <div className="grid size-16 place-items-center rounded-md bg-muted ring-1 ring-border">
                  <span className="font-serif text-xl italic">{mono}</span>
                </div>
                <div className="min-w-0">
                  <p className="text-[10px] font-medium uppercase tracking-[0.25em] text-muted-foreground">{h.kind}</p>
                  <p className="mt-1 font-serif text-3xl italic">{h.name}</p>
                  <p className="mt-1 max-w-2xl text-sm text-muted-foreground">{h.blurb}</p>
                </div>
                <p className="hidden font-serif text-2xl italic md:block">{h.roles}<span className="ml-2 text-[10px] font-sans not-italic uppercase tracking-[0.25em] text-muted-foreground">open</span></p>
                <ArrowUpRight className="hidden size-5 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-foreground md:block" />
              </a>
            </li>
          );
        })}
      </ul>

      <footer className="mt-16 border-t border-border">
        <div className="mx-auto max-w-7xl px-6 py-10 text-[10px] font-medium uppercase tracking-[0.25em] text-muted-foreground">
          © DigiCareers · Edition MMXXVI
        </div>
      </footer>
    </div>
  );
}