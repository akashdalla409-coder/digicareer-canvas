import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { AuthShell } from "@/components/auth/AuthShell";

export const Route = createFileRoute("/reset-password")({
  head: () => ({
    meta: [
      { title: "Set a new password — DigiCareers" },
      { name: "description", content: "Choose a new password for your DigiCareers account." },
    ],
  }),
  component: ResetPassword,
});

function ResetPassword() {
  const [done, setDone] = useState(false);
  return (
    <AuthShell
      aside={{
        eyebrow: "Chapter · 03",
        pull: <>A new key, <em>quietly</em> cut. Welcome back to the desk.</>,
        attribution: "DigiCareers — house notes",
        stats: [
          { value: "256-bit", label: "Encryption at rest" },
          { value: "0", label: "Passwords stored in plaintext" },
        ],
      }}
    >
      <div className="mx-auto w-full max-w-md">
        <p className="text-[10px] font-medium uppercase tracking-[0.25em] text-muted-foreground">Reset password</p>
        <h1 className="mt-3 font-serif text-5xl italic leading-[1.05] tracking-tight">Set a new password.</h1>
        <p className="mt-3 text-sm text-muted-foreground">Pick something memorable. We'll sign you in immediately afterwards.</p>

        {done ? (
          <div className="mt-8 border border-border bg-muted/40 p-6">
            <p className="font-serif text-2xl italic">All set.</p>
            <p className="mt-2 text-sm text-muted-foreground">Your password has been updated.</p>
            <Link to="/sign-in" className="mt-5 inline-flex bg-foreground px-4 py-2 text-sm font-medium text-background">Continue to sign in</Link>
          </div>
        ) : (
          <form
            onSubmit={(e) => { e.preventDefault(); setDone(true); }}
            className="mt-8 space-y-5"
          >
            <Field label="New password" type="password" placeholder="At least 8 characters" />
            <Field label="Confirm password" type="password" placeholder="Repeat it back to us" />
            <button className="w-full bg-foreground px-4 py-3 text-sm font-medium text-background hover:opacity-90">Update password</button>
            <p className="text-center text-xs text-muted-foreground">
              Remembered it? <Link to="/sign-in" className="underline underline-offset-4 hover:text-foreground">Sign in instead</Link>
            </p>
          </form>
        )}
      </div>
    </AuthShell>
  );
}

function Field({ label, type, placeholder }: { label: string; type: string; placeholder?: string }) {
  return (
    <label className="block">
      <span className="mb-2 block text-[10px] font-medium uppercase tracking-[0.25em] text-muted-foreground">{label}</span>
      <input type={type} placeholder={placeholder} className="w-full border-b border-border bg-transparent py-2 text-base outline-none placeholder:text-muted-foreground/60 focus:border-foreground" />
    </label>
  );
}