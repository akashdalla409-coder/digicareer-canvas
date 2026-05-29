import { Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";

type Aside = {
  eyebrow: string;
  pull: React.ReactNode;
  attribution?: string;
  stats?: { value: string; label: string }[];
};

export function AuthShell({
  children,
  aside,
}: {
  children: React.ReactNode;
  aside: Aside;
}) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="grid min-h-screen lg:grid-cols-[1.05fr_1fr]">
        {/* Left — editorial */}
        <aside className="relative hidden flex-col justify-between border-r border-border bg-muted/40 p-10 lg:flex">
          <div className="flex items-center justify-between">
            <Link to="/" className="font-serif text-3xl italic tracking-tight">
              DigiCareers
            </Link>
            <Link
              to="/"
              className="inline-flex items-center gap-1.5 text-[10px] font-medium uppercase tracking-[0.25em] text-muted-foreground hover:text-foreground"
            >
              <ArrowLeft className="size-3" />
              Back to index
            </Link>
          </div>

          <div className="max-w-[44ch]">
            <p className="mb-6 text-[10px] font-medium uppercase tracking-[0.25em] text-muted-foreground">
              {aside.eyebrow}
            </p>
            <p className="font-serif text-5xl italic leading-[1.05] tracking-tight">
              {aside.pull}
            </p>
            {aside.attribution && (
              <p className="mt-6 text-[10px] font-medium uppercase tracking-[0.25em] text-muted-foreground">
                — {aside.attribution}
              </p>
            )}
          </div>

          <div className="grid grid-cols-3 gap-6 border-t border-border pt-6">
            {(aside.stats ?? [
              { value: "12", label: "Disciplines" },
              { value: "00", label: "Recruiters" },
              { value: "24h", label: "Refresh" },
            ]).map((s) => (
              <div key={s.label}>
                <p className="font-serif text-3xl italic">{s.value}</p>
                <p className="mt-1 text-[10px] font-medium uppercase tracking-[0.25em] text-muted-foreground">
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </aside>

        {/* Right — form column */}
        <main className="flex flex-col">
          <header className="flex items-center justify-between border-b border-border px-6 py-5 lg:hidden">
            <Link to="/" className="font-serif text-2xl italic tracking-tight">
              DigiCareers
            </Link>
            <Link to="/" className="text-[10px] font-medium uppercase tracking-[0.25em] text-muted-foreground">
              Back
            </Link>
          </header>
          <div className="flex flex-1 items-center justify-center px-6 py-12 lg:px-16">
            <div className="w-full max-w-[420px]">{children}</div>
          </div>
        </main>
      </div>
    </div>
  );
}

export function Field({
  label,
  hint,
  children,
  id,
}: {
  label: string;
  hint?: React.ReactNode;
  children: React.ReactNode;
  id?: string;
}) {
  return (
    <label htmlFor={id} className="block">
      <div className="mb-2 flex items-baseline justify-between">
        <span className="text-[10px] font-medium uppercase tracking-[0.25em] text-muted-foreground">
          {label}
        </span>
        {hint && <span className="text-xs text-muted-foreground">{hint}</span>}
      </div>
      {children}
    </label>
  );
}

export function TextInput(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className={
        "w-full border-b border-border bg-transparent py-2 font-serif text-2xl italic placeholder:text-muted-foreground/50 focus:border-foreground focus:outline-none " +
        (props.className ?? "")
      }
    />
  );
}

export function PrimaryButton({
  children,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...props}
      className={
        "group inline-flex w-full items-center justify-between bg-foreground px-5 py-3.5 text-sm font-medium text-background ring-1 ring-foreground transition-transform active:scale-[0.99] disabled:opacity-50 " +
        (props.className ?? "")
      }
    >
      <span>{children}</span>
      <span className="font-serif italic">→</span>
    </button>
  );
}

export function GhostButton(props: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...props}
      className={
        "inline-flex w-full items-center justify-center gap-2 border border-border bg-background px-5 py-3 text-sm font-medium text-foreground transition-colors hover:bg-muted " +
        (props.className ?? "")
      }
    />
  );
}

export function Divider({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-4 py-2">
      <div className="h-px flex-1 bg-border" />
      <span className="text-[10px] font-medium uppercase tracking-[0.25em] text-muted-foreground">
        {children}
      </span>
      <div className="h-px flex-1 bg-border" />
    </div>
  );
}