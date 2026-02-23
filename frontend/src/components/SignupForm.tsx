"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";

type Role = "company" | "employee";

export function SignupForm() {
  const searchParams = useSearchParams();
  const initialRole = (searchParams.get("role") as Role) || "company";

  return (
    <div
      className="flex min-h-screen items-center justify-center px-8 py-16"
      style={{ background: "var(--color-bg-canvas)" }}
    >
      <div className="w-full max-w-md">
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
          <div className="mb-8 text-center">
            <h1
              className="text-3xl font-bold"
              style={{ color: "var(--text-primary)", lineHeight: "38px" }}
            >
              Join UniERP
            </h1>
            <p className="mt-2 text-sm" style={{ color: "var(--text-muted)" }}>
              Create a new account as{" "}
              {initialRole === "company" ? "a Company" : "an Employee"}.
            </p>
          </div>

          <form className="flex flex-col gap-4" action={() => {}}>
            {/* Full Name */}
            <div className="flex flex-col gap-1">
              <label
                htmlFor="name"
                className="text-sm font-medium"
                style={{ color: "var(--text-secondary)" }}
              >
                Full Name
              </label>
              <input
                id="name"
                type="text"
                required
                placeholder={
                  initialRole === "company" ? "Acme Corp" : "John Doe"
                }
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
                required
                placeholder={
                  initialRole === "company"
                    ? "admin@company.com"
                    : "you@company.com"
                }
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
              Sign up
            </button>
          </form>

          {/* Footer Login Link */}
          <p
            className="mt-6 text-center text-sm"
            style={{ color: "var(--text-muted)" }}
          >
            Already have an account?{" "}
            <Link
              href="/"
              className="font-medium outline-none"
              style={{
                color: "var(--text-link)",
                transition: `color var(--motion-duration-fast) var(--motion-easing-standard)`,
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.color = "var(--color-accent-blue-300)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.color = "var(--text-link)")
              }
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
