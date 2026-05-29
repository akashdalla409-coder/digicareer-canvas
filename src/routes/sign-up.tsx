import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { AuthShell, Field, TextInput, PrimaryButton, GhostButton, Divider } from "@/components/auth/AuthShell";
import { ROLES } from "@/components/job-board/data";

export const Route = createFileRoute("/sign-up")({
  head: () => ({
    meta: [
      { title: "Create an account — DigiCareers" },
      { name: "description", content: "Join DigiCareers — get curated digital marketing roles delivered weekly." },
    ],
  }),
  component: SignUpPage,
});

const INTENT = [
  { id: "candidate", label: "I'm looking for work", sub: "Apply, save, get alerts" },
  { id: "employer", label: "I'm hiring", sub: "Post roles, source talent" },
] as const;

function SignUpPage() {
  const [intent, setIntent] = useState<(typeof INTENT)[number]["id"]>("candidate");
  const [primaryRole, setPrimaryRole] = useState<string>(ROLES[0] ?? "AdOps");

  return (
    <AuthShell
      aside={{
        eyebrow: "Volume II — Join the index",
        pull: (
          <>
            A quiet room for <em>specialists</em>. No recruiters. No noise. Just the work.
          </>
        ),
        attribution: "An invitation, of sorts",
      }}
    >
      <p className="mb-3 text-[10px] font-medium uppercase tracking-[0.25em] text-muted-foreground">
        Chapter 02 · Create account
      </p>
      <h1 className="font-serif text-5xl italic leading-none tracking-tight">
        Start your<br />dossier.
      </h1>
      <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
        Two minutes. No phone number. No marketing email. Ever.
      </p>

      {/* Intent picker */}
      <div className="mt-8 grid grid-cols-2 gap-2">
        {INTENT.map((opt) => {
          const active = intent === opt.id;
          return (
            <button
              key={opt.id}
              type="button"
              onClick={() => setIntent(opt.id)}
              className={
                "border p-4 text-left transition-colors " +
                (active
                  ? "border-foreground bg-foreground text-background"
                  : "border-border bg-background hover:bg-muted")
              }
            >
              <p className="font-serif text-lg italic leading-tight">{opt.label}</p>
              <p className={"mt-1 text-xs " + (active ? "text-background/70" : "text-muted-foreground")}>
                {opt.sub}
              </p>
            </button>
          );
        })}
      </div>

      <form
        onSubmit={(e) => e.preventDefault()}
        className="mt-8 space-y-7"
      >
        <Field label="Full name">
          <TextInput type="text" placeholder="Jane Mercer" required autoComplete="name" />
        </Field>
        <Field label="Email">
          <TextInput type="email" placeholder="you@studio.com" required autoComplete="email" />
        </Field>
        <Field label="Password" hint="8+ characters">
          <TextInput type="password" placeholder="••••••••" required autoComplete="new-password" />
        </Field>

        {intent === "candidate" ? (
          <Field label="Primary discipline">
            <select
              value={primaryRole}
              onChange={(e) => setPrimaryRole(e.target.value)}
              className="w-full cursor-pointer border-b border-border bg-transparent py-2 font-serif text-2xl italic focus:border-foreground focus:outline-none"
            >
              {ROLES.map((r) => (
                <option key={r} value={r}>
                  {r}
                </option>
              ))}
            </select>
          </Field>
        ) : (
          <Field label="Company">
            <TextInput type="text" placeholder="Atlas & Co." required />
          </Field>
        )}

        <PrimaryButton type="submit">
          {intent === "candidate" ? "Create account" : "Start hiring"}
        </PrimaryButton>

        <Divider>or continue with</Divider>

        <div className="grid grid-cols-2 gap-3">
          <GhostButton type="button">Google</GhostButton>
          <GhostButton type="button">LinkedIn</GhostButton>
        </div>

        <p className="text-xs leading-relaxed text-muted-foreground">
          By continuing you agree to our{" "}
          <a href="#" className="underline underline-offset-2">Terms</a> and{" "}
          <a href="#" className="underline underline-offset-2">Privacy Notice</a>.
        </p>
      </form>

      <p className="mt-8 text-sm text-muted-foreground">
        Already have an account?{" "}
        <Link to="/sign-in" className="font-serif italic text-foreground underline underline-offset-4">
          Sign in
        </Link>
      </p>
    </AuthShell>
  );
}