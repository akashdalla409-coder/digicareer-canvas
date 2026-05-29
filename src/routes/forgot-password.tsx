import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { AuthShell, Field, TextInput, PrimaryButton } from "@/components/auth/AuthShell";

export const Route = createFileRoute("/forgot-password")({
  head: () => ({
    meta: [{ title: "Reset password — DigiCareers" }],
  }),
  component: ForgotPage,
});

function ForgotPage() {
  const [sent, setSent] = useState(false);
  return (
    <AuthShell
      aside={{
        eyebrow: "Errata",
        pull: (
          <>
            A small detour. We'll send a <em>quiet link</em> to your inbox and have you back inside.
          </>
        ),
      }}
    >
      <p className="mb-3 text-[10px] font-medium uppercase tracking-[0.25em] text-muted-foreground">
        Account · Recovery
      </p>
      <h1 className="font-serif text-5xl italic leading-none tracking-tight">
        Forgot your<br />password?
      </h1>
      <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
        Enter the email tied to your account — we'll send a single-use link to reset it.
      </p>

      {sent ? (
        <div className="mt-10 border border-border bg-muted/60 p-6">
          <p className="font-serif text-2xl italic">Check your inbox.</p>
          <p className="mt-2 text-sm text-muted-foreground">
            If an account exists for that address, a reset link is on its way. The link expires in 30 minutes.
          </p>
        </div>
      ) : (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setSent(true);
          }}
          className="mt-10 space-y-7"
        >
          <Field label="Email">
            <TextInput type="email" placeholder="you@studio.com" required autoComplete="email" />
          </Field>
          <PrimaryButton type="submit">Send reset link</PrimaryButton>
        </form>
      )}

      <p className="mt-10 text-sm text-muted-foreground">
        Remembered it?{" "}
        <Link to="/sign-in" className="font-serif italic text-foreground underline underline-offset-4">
          Back to sign in
        </Link>
      </p>
    </AuthShell>
  );
}