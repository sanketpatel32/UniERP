"use client";

import { useAuthPage } from "@/lib/use-auth-page";

export default function CompanyPage() {
  const { isLoading, user, signOut } = useAuthPage("company_admin");

  if (isLoading) {
    return (
      <main className="flex min-h-screen items-center justify-center text-center">
        <p style={{ color: "var(--text-muted)" }}>Loading your company portal...</p>
      </main>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8 text-center">
      <div className="w-full max-w-2xl space-y-4 rounded-[var(--radius-lg)] border p-8"
        style={{
          background: "var(--color-bg-surface)",
          borderColor: "var(--color-border-default)",
        }}
      >
        <h1 className="text-4xl font-bold tracking-tight" style={{ color: "var(--text-primary)" }}>
          Company Portal
        </h1>
        <p className="text-lg" style={{ color: "var(--text-secondary)" }}>
          Signed in as {user.fullName} ({user.email})
        </p>
        <p className="text-sm" style={{ color: "var(--text-muted)" }}>
          Company ID: {user.companyId}
        </p>
        <button
          type="button"
          onClick={signOut}
          className="rounded-[var(--radius-md)] px-4 py-2 text-sm font-semibold"
          style={{
            background: "var(--color-accent-blue-500)",
            color: "var(--text-inverse)",
          }}
        >
          Sign out
        </button>
      </div>
    </main>
  );
}
