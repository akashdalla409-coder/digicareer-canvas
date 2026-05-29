import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Check } from "lucide-react";
import { LEVELS, ROLES, TYPES } from "@/components/job-board/data";
import { Field, TextInput } from "@/components/auth/AuthShell";

export const Route = createFileRoute("/post-job")({
  head: () => ({
    meta: [
      { title: "Post a role — DigiCareers" },
      { name: "description", content: "List a digital marketing role in front of specialists — no recruiter middlemen, no noise." },
    ],
  }),
  component: PostJobPage,
});

const STEPS = ["The role", "The details", "The package", "Review"] as const;

function PostJobPage() {
  const [step, setStep] = useState(0);
  const [company, setCompany] = useState("");
  const [title, setTitle] = useState("");
  const [role, setRole] = useState<string>(ROLES[0]);
  const [level, setLevel] = useState<string>(LEVELS[2]);
  const [type, setType] = useState<string>(TYPES[1]);
  const [location, setLocation] = useState("");
  const [salary, setSalary] = useState("");
  const [description, setDescription] = useState("");
  const [submitted, setSubmitted] = useState(false);

  if (submitted) return <PostedConfirmation title={title} company={company} />;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="border-b border-border">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          <Link to="/" className="font-serif text-2xl italic tracking-tight">DigiCareers</Link>
          <Link to="/" className="text-[10px] font-medium uppercase tracking-[0.25em] text-muted-foreground hover:text-foreground">Save & exit</Link>
        </div>
      </header>

      <div className="mx-auto grid max-w-7xl gap-16 px-6 py-16 lg:grid-cols-[280px_1fr]">
        {/* Stepper */}
        <aside className="lg:sticky lg:top-8 lg:self-start">
          <p className="mb-2 text-[10px] font-medium uppercase tracking-[0.25em] text-muted-foreground">
            Manuscript · v0.{step + 1}
          </p>
          <h2 className="font-serif text-4xl italic leading-tight">Post a role.</h2>
          <p className="mt-2 max-w-[28ch] text-sm text-muted-foreground">
            Four chapters. Roughly three minutes. We'll publish it the moment you sign off.
          </p>

          <ol className="mt-10 space-y-1">
            {STEPS.map((s, i) => {
              const done = i < step;
              const active = i === step;
              return (
                <li key={s}>
                  <button
                    onClick={() => i <= step && setStep(i)}
                    className={
                      "flex w-full items-center gap-3 border-l-2 py-3 pl-4 text-left transition-colors " +
                      (active
                        ? "border-foreground text-foreground"
                        : done
                          ? "border-foreground/40 text-muted-foreground hover:text-foreground"
                          : "border-border text-muted-foreground/60")
                    }
                  >
                    <span className="font-serif text-sm italic">0{i + 1}</span>
                    <span className="text-sm font-medium">{s}</span>
                    {done && <Check className="ml-auto size-3.5" />}
                  </button>
                </li>
              );
            })}
          </ol>
        </aside>

        {/* Form */}
        <section className="max-w-[640px]">
          {step === 0 && (
            <StepWrap title="The role" sub="The shape of the job in three lines.">
              <Field label="Company">
                <TextInput value={company} onChange={(e) => setCompany(e.target.value)} placeholder="Atlas & Co." />
              </Field>
              <Field label="Job title">
                <TextInput value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Senior Programmatic Manager" />
              </Field>
              <Field label="Discipline">
                <Select value={role} onChange={setRole} options={ROLES as readonly string[]} />
              </Field>
            </StepWrap>
          )}

          {step === 1 && (
            <StepWrap title="The details" sub="Where, how, and who for.">
              <div className="grid gap-7 sm:grid-cols-2">
                <Field label="Seniority">
                  <Select value={level} onChange={setLevel} options={LEVELS as readonly string[]} />
                </Field>
                <Field label="Engagement">
                  <Select value={type} onChange={setType} options={TYPES as readonly string[]} />
                </Field>
              </div>
              <Field label="Location">
                <TextInput value={location} onChange={(e) => setLocation(e.target.value)} placeholder="Remote · Europe / Berlin / Hybrid" />
              </Field>
              <Field label="Description">
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={8}
                  placeholder="What the role does. What you're looking for. How you work."
                  className="w-full resize-none border border-border bg-transparent p-4 text-base leading-relaxed placeholder:text-muted-foreground/50 focus:border-foreground focus:outline-none"
                />
              </Field>
            </StepWrap>
          )}

          {step === 2 && (
            <StepWrap title="The package" sub="Be specific — specialists skip vague listings.">
              <Field label="Compensation range" hint="Required">
                <TextInput value={salary} onChange={(e) => setSalary(e.target.value)} placeholder="$120k – $150k + equity" />
              </Field>
              <div className="grid gap-3 border border-border bg-muted/40 p-5 text-sm text-muted-foreground">
                <p className="font-serif text-lg italic text-foreground">A small house rule.</p>
                <p>
                  We don't publish roles without a compensation range. It saves everyone — you, the candidate, us — a great deal of time.
                </p>
              </div>
            </StepWrap>
          )}

          {step === 3 && (
            <StepWrap title="Review" sub="A final read before it goes to print.">
              <ReviewRow label="Role" value={title || "—"} />
              <ReviewRow label="Company" value={company || "—"} />
              <ReviewRow label="Discipline" value={role} />
              <ReviewRow label="Level" value={level} />
              <ReviewRow label="Engagement" value={type} />
              <ReviewRow label="Location" value={location || "—"} />
              <ReviewRow label="Compensation" value={salary || "—"} />
              <ReviewRow label="Description" value={description ? `${description.slice(0, 120)}${description.length > 120 ? "…" : ""}` : "—"} />
            </StepWrap>
          )}

          {/* Nav */}
          <div className="mt-12 flex items-center justify-between border-t border-border pt-6">
            <button
              type="button"
              onClick={() => setStep((s) => Math.max(0, s - 1))}
              disabled={step === 0}
              className="text-sm font-medium text-muted-foreground hover:text-foreground disabled:opacity-40"
            >
              ← Back
            </button>
            {step < STEPS.length - 1 ? (
              <button
                onClick={() => setStep((s) => s + 1)}
                className="inline-flex items-center gap-2 bg-foreground px-5 py-3 text-sm font-medium text-background"
              >
                Continue
                <span className="font-serif italic">→</span>
              </button>
            ) : (
              <button
                onClick={() => setSubmitted(true)}
                className="inline-flex items-center gap-2 bg-foreground px-5 py-3 text-sm font-medium text-background"
              >
                Publish role
                <span className="font-serif italic">→</span>
              </button>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}

function StepWrap({ title, sub, children }: { title: string; sub: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="text-[10px] font-medium uppercase tracking-[0.25em] text-muted-foreground">Now writing</p>
      <h3 className="mt-2 font-serif text-4xl italic">{title}</h3>
      <p className="mt-2 text-sm text-muted-foreground">{sub}</p>
      <div className="mt-10 space-y-7">{children}</div>
    </div>
  );
}

function Select({ value, onChange, options }: { value: string; onChange: (v: string) => void; options: readonly string[] }) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full cursor-pointer border-b border-border bg-transparent py-2 font-serif text-2xl italic focus:border-foreground focus:outline-none"
    >
      {options.map((o) => (
        <option key={o} value={o}>{o}</option>
      ))}
    </select>
  );
}

function ReviewRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-baseline justify-between gap-6 border-b border-border py-3">
      <span className="text-[10px] font-medium uppercase tracking-[0.25em] text-muted-foreground">{label}</span>
      <span className="text-right font-serif text-lg italic">{value}</span>
    </div>
  );
}

function PostedConfirmation({ title, company }: { title: string; company: string }) {
  return (
    <div className="grid min-h-screen place-items-center bg-background px-6">
      <div className="max-w-lg text-center">
        <p className="text-[10px] font-medium uppercase tracking-[0.25em] text-muted-foreground">
          Published · Edition {new Date().toLocaleDateString()}
        </p>
        <h1 className="mt-4 font-serif text-6xl italic leading-none">It's live.</h1>
        <p className="mt-6 text-base text-muted-foreground">
          <span className="font-serif italic text-foreground">{title || "Your role"}</span>
          {company && <> at <span className="font-serif italic text-foreground">{company}</span></>} is now in the index.
          We'll email you the moment the first qualified candidate applies.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link to="/" className="bg-foreground px-5 py-3 text-sm font-medium text-background">View the index</Link>
          <Link to="/post-job" className="border border-border px-5 py-3 text-sm font-medium hover:bg-muted">Post another</Link>
        </div>
      </div>
    </div>
  );
}