import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "Manifesto — DigiCareers" },
      { name: "description", content: "Why DigiCareers exists: a curated job board for specialists in digital marketing." },
      { property: "og:title", content: "Manifesto — DigiCareers" },
      { property: "og:description", content: "A curated job board for specialists in digital marketing." },
    ],
  }),
  component: About,
});

function About() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="border-b border-border">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          <Link to="/" className="font-serif text-2xl italic">DigiCareers</Link>
          <nav className="flex items-center gap-6 text-sm">
            <Link to="/" className="text-muted-foreground hover:text-foreground">Roles</Link>
            <Link to="/companies" className="text-muted-foreground hover:text-foreground">Houses</Link>
            <Link to="/about" className="font-medium">Manifesto</Link>
            <Link to="/sign-in" className="text-muted-foreground hover:text-foreground">Sign in</Link>
          </nav>
        </div>
      </header>

      <section className="border-b border-border">
        <div className="mx-auto max-w-5xl px-6 py-24">
          <p className="text-[10px] font-medium uppercase tracking-[0.25em] text-muted-foreground">Manifesto · I.</p>
          <h1 className="mt-6 text-balance font-serif text-6xl italic leading-[1.0] tracking-tight md:text-[7rem]">
            A job board, <br /> set in the typography <br /> of <em>respect</em>.
          </h1>
          <p className="mt-10 max-w-2xl text-lg leading-relaxed text-muted-foreground">
            DigiCareers is a curated index for specialists in digital marketing — AdOps, programmatic, SEO, social, affiliate, design, WordPress and AI marketing. No recruiter spam, no ghost listings, no salary blackouts. Every role is reviewed, compensation is required, and the type is set with care.
          </p>
        </div>
      </section>

      <section className="mx-auto grid max-w-5xl gap-12 px-6 py-24 md:grid-cols-2">
        <Principle n="01" title="Specialists, not generalists.">
          We index roles for people who know what AdOps actually means at 11pm on a Friday. Disciplines, not buzzwords.
        </Principle>
        <Principle n="02" title="Compensation is not optional.">
          Every listing publishes a salary band. If a house won't say the number, it isn't ready to hire.
        </Principle>
        <Principle n="03" title="No tracking pixels.">
          We measure roles, not readers. Your reading list stays on your machine.
        </Principle>
        <Principle n="04" title="Curated, not crowdsourced.">
          Every house is reviewed by a human. The desk is small on purpose.
        </Principle>
      </section>

      <section className="border-t border-border bg-muted/40">
        <div className="mx-auto max-w-5xl px-6 py-20 text-center">
          <h2 className="font-serif text-5xl italic leading-tight">Hiring on the desk?</h2>
          <p className="mx-auto mt-3 max-w-md text-sm text-muted-foreground">Post a role in under ten minutes. We'll review it within the day.</p>
          <Link to="/post-job" className="mt-8 inline-flex bg-foreground px-6 py-3 text-sm font-medium text-background hover:opacity-90">Post a role</Link>
        </div>
      </section>

      <footer className="border-t border-border">
        <div className="mx-auto max-w-7xl px-6 py-10 text-[10px] font-medium uppercase tracking-[0.25em] text-muted-foreground">
          © DigiCareers · Edition MMXXVI
        </div>
      </footer>
    </div>
  );
}

function Principle({ n, title, children }: { n: string; title: string; children: React.ReactNode }) {
  return (
    <div className="border-t border-border pt-6">
      <p className="text-[10px] font-medium uppercase tracking-[0.25em] text-muted-foreground">{n}</p>
      <h3 className="mt-3 font-serif text-3xl italic leading-tight">{title}</h3>
      <p className="mt-3 text-base leading-relaxed text-muted-foreground">{children}</p>
    </div>
  );
}