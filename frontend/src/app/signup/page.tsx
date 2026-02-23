"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

const roleConfig = {
  company: {
    label: "Company",
    loginHref: "/login?role=company",
  },
  employee: {
    label: "Employee",
    loginHref: "/login?role=employee",
  },
} as const;

type Role = keyof typeof roleConfig;

function SignupForm() {
  const params = useSearchParams();
  const role = (params.get("role") ?? "company") as Role;
  const config = roleConfig[role] ?? roleConfig.company;

  return (
    <div
      className="flex min-h-screen items-center justify-center px-8 py-16"
      style={{ background: "var(--color-bg-canvas)" }}
    >
      <div className="w-full max-w-md">
        {/* Back link */}
        <Link
          href="/"
          className="mb-8 inline-flex items-center gap-2 text-sm outline-none"
          style={{
            color: "var(--text-muted)",
            transition: `color var(--motion-duration-fast) var(--motion-easing-standard)`,
          }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.color = "var(--text-primary)")
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.color = "var(--text-muted)")
          }
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            aria-hidden="true"
          >
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
          Back
        </Link>

        {/* Card */}
        <div
          className="rounded-[var(--radius-xl)] border p-8"
          style={{
            background: "var(--color-bg-surface)",
            borderColor: "var(--color-border-default)",
            boxShadow: "var(--shadow-high)",
          }}
        >
          {/* Header */}
          <div className="mb-8">
            <p
              className="mb-1 text-sm font-semibold uppercase tracking-widest"
              style={{ color: "var(--color-accent-blue-400)" }}
            >
              {config.label} Portal
            </p>
            <h1
              className="text-3xl font-bold"
              style={{ color: "var(--text-primary)", lineHeight: "38px" }}
            >
              Create an account
            </h1>
            <p className="mt-2 text-sm" style={{ color: "var(--text-muted)" }}>
              Already have an account?{" "}
              <Link
                href={config.loginHref}
                className="font-medium outline-none"
                style={{
                  color: "var(--text-link)",
                  transition: `color var(--motion-duration-fast) var(--motion-easing-standard)`,
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.color =
                    "var(--color-accent-blue-300)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.color = "var(--text-link)")
                }
              >
                Sign in
              </Link>
            </p>
          </div>

          {/* Form */}
          <form
            className="flex flex-col gap-4"
            onSubmit={(e) => e.preventDefault()}
          >
            {/* Name row */}
            <div className="grid grid-cols-2 gap-4">
              {(
                [
                  { id: "first-name", label: "First name", placeholder: "John" },
                  { id: "last-name", label: "Last name", placeholder: "Doe" },
                ] as const
              ).map((f) => (
                <div key={f.id} className="flex flex-col gap-1">
                  <label
                    htmlFor={f.id}
                    className="text-sm font-medium"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    {f.label}
                  </label>
                  <input
                    id={f.id}
                    type="text"
                    required
                    placeholder={f.placeholder}
                    className="rounded-[var(--radius-md)] border px-4 py-2.5 text-sm outline-none"
                    style={{
                      background: "var(--color-bg-elevated)",
                      borderColor: "var(--color-border-default)",
                      color: "var(--text-primary)",
                      transition: `border-color var(--motion-duration-fast) var(--motion-easing-standard)`,
                    }}
                    onFocus={(e) =>
                      (e.currentTarget.style.borderColor =
                        "var(--color-border-focus)")
                    }
                    onBlur={(e) =>
                      (e.currentTarget.style.borderColor =
                        "var(--color-border-default)")
                    }
                  />
                </div>
              ))}
            </div>

            {/* Email */}
            <div className="flex flex-col gap-1">
              <label
                htmlFor="email"
                className="text-sm font-medium"
                style={{ color: "var(--text-secondary)" }}
              >
                Email address
              </label>
              <input
                id="email"
                type="email"
                autoComplete="email"
                required
                placeholder="you@company.com"
                className="rounded-[var(--radius-md)] border px-4 py-2.5 text-sm outline-none"
                style={{
                  background: "var(--color-bg-elevated)",
                  borderColor: "var(--color-border-default)",
                  color: "var(--text-primary)",
                  transition: `border-color var(--motion-duration-fast) var(--motion-easing-standard)`,
                }}
                onFocus={(e) =>
                  (e.currentTarget.style.borderColor =
                    "var(--color-border-focus)")
                }
                onBlur={(e) =>
                  (e.currentTarget.style.borderColor =
                    "var(--color-border-default)")
                }
              />
            </div>

            {/* Password */}
            <div className="flex flex-col gap-1">
              <label
                htmlFor="password"
                className="text-sm font-medium"
                style={{ color: "var(--text-secondary)" }}
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                autoComplete="new-password"
                required
                placeholder="Minimum 8 characters"
                className="rounded-[var(--radius-md)] border px-4 py-2.5 text-sm outline-none"
                style={{
                  background: "var(--color-bg-elevated)",
                  borderColor: "var(--color-border-default)",
                  color: "var(--text-primary)",
                  transition: `border-color var(--motion-duration-fast) var(--motion-easing-standard)`,
                }}
                onFocus={(e) =>
                  (e.currentTarget.style.borderColor =
                    "var(--color-border-focus)")
                }
                onBlur={(e) =>
                  (e.currentTarget.style.borderColor =
                    "var(--color-border-default)")
                }
              />
            </div>

            {/* Confirm Password */}
            <div className="flex flex-col gap-1">
              <label
                htmlFor="confirm-password"
                className="text-sm font-medium"
                style={{ color: "var(--text-secondary)" }}
              >
                Confirm password
              </label>
              <input
                id="confirm-password"
                type="password"
                autoComplete="new-password"
                required
                placeholder="••••••••"
                className="rounded-[var(--radius-md)] border px-4 py-2.5 text-sm outline-none"
                style={{
                  background: "var(--color-bg-elevated)",
                  borderColor: "var(--color-border-default)",
                  color: "var(--text-primary)",
                  transition: `border-color var(--motion-duration-fast) var(--motion-easing-standard)`,
                }}
                onFocus={(e) =>
                  (e.currentTarget.style.borderColor =
                    "var(--color-border-focus)")
                }
                onBlur={(e) =>
                  (e.currentTarget.style.borderColor =
                    "var(--color-border-default)")
                }
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="mt-2 h-11 w-full rounded-[var(--radius-md)] text-sm font-semibold outline-none"
              style={{
                background: "var(--color-accent-blue-500)",
                color: "var(--text-inverse)",
                boxShadow: "var(--shadow-low)",
                transition: `background var(--motion-duration-fast) var(--motion-easing-standard)`,
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.background =
                  "var(--color-accent-blue-600)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.background =
                  "var(--color-accent-blue-500)")
              }
              onFocus={(e) => {
                e.currentTarget.style.outline = `2px solid var(--color-border-focus)`;
                e.currentTarget.style.outlineOffset = "2px";
              }}
              onBlur={(e) => {
                e.currentTarget.style.outline = "none";
              }}
            >
              Create account
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default function SignupPage() {
  return (
    <Suspense
      fallback={
        <div
          style={{ background: "var(--color-bg-canvas)", minHeight: "100vh" }}
        />
      }
    >
      <SignupForm />
    </Suspense>
  );
}
