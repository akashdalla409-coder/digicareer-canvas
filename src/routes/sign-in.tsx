import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { AuthShell, Field, TextInput, PrimaryButton, GhostButton, Divider } from "@/components/auth/AuthShell";

export const Route = createFileRoute("/sign-in")({
  head: () => ({
    meta: [
      { title: "Sign in — DigiCareers" },
      { name: "description", content: "Sign in to DigiCareers — the curated job index for digital marketing specialists." },
    ],
  }),
  component: SignInPage,
});

function SignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <AuthShell
      aside={{
        eyebrow: "Welcome back",
        pull: (
          <>
            The work finds the people <em className="not-italic font-sans text-3xl tracking-tight">—</em> who already know the work.
          </>
        ),
        attribution: "DigiCareers, Vol. I",
        stats: [
          { value: "12", label: "Disciplines" },
          { value: "0", label: "Recruiters" },
          { value: "24h", label: "Refresh" },
        ],
      }}
    >
      <p className="mb-3 text-[10px] font-medium uppercase tracking-[0.25em] text-muted-foreground">
        Chapter 01 · Sign in
      </p>
      <h1 className="font-serif text-5xl italic leading-none tracking-tight">
        Good to see you<br />again.
      </h1>
      <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
        Pick up where you left off — your saved roles, applications and alerts are waiting.
      </p>

      <form
        onSubmit={(e) => e.preventDefault()}
        className="mt-10 space-y-7"
      >
        <Field label="Email">
          <TextInput
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@studio.com"
            autoComplete="email"
            required
          />
        </Field>

        <Field
          label="Password"
          hint={
            <Link to="/forgot-password" className="font-serif italic underline-offset-4 hover:underline">
              Forgot?
            </Link>
          }
        >
          <TextInput
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            autoComplete="current-password"
            required
          />
        </Field>

        <PrimaryButton type="submit">Sign in</PrimaryButton>

        <Divider>or</Divider>

        <div className="grid grid-cols-2 gap-3">
          <GhostButton type="button">Google</GhostButton>
          <GhostButton type="button">LinkedIn</GhostButton>
        </div>
      </form>

      <p className="mt-10 text-sm text-muted-foreground">
        New here?{" "}
        <Link to="/sign-up" className="font-serif italic text-foreground underline underline-offset-4">
          Create an account
        </Link>
      </p>
    </AuthShell>
  );
}