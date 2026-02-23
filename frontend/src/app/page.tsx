"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ApiError, login } from "@/lib/api";
import { getRoleRoute, setAccessToken } from "@/lib/auth-storage";

type Role = "company" | "employee";

export default function HomePage() {
  const router = useRouter();
  const [role, setRole] = useState<Role>("company");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: React.SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrorMessage(null);
    setIsSubmitting(true);

    try {
      const response = await login({
        email,
        password,
      });

      setAccessToken(response.accessToken);
      router.push(getRoleRoute(response.user.role));
      setIsSubmitting(false);
    } catch (error) {
      if (error instanceof ApiError) {
        setErrorMessage(error.message);
      } else {
        setErrorMessage("Unable to sign in right now. Please try again.");
      }
      setIsSubmitting(false);
    }
  };

  const roleText = role === "company" ? "Company" : "Employee";

  return (
    <div
      className="flex min-h-screen items-center justify-center px-8 py-16"
      style={{ background: "var(--color-bg-canvas)" }}
    >
      <div className="w-full max-w-md">
        <div
          className="rounded-[var(--radius-xl)] border p-8"
          style={{
            background: "var(--color-bg-surface)",
            borderColor: "var(--color-border-default)",
            boxShadow: "var(--shadow-high)",
          }}
        >
          <div className="mb-8 text-center">
            <h1
              className="text-3xl font-bold"
              style={{ color: "var(--text-primary)", lineHeight: "38px" }}
            >
              Sign in to UniERP
            </h1>
            <p className="mt-2 text-sm" style={{ color: "var(--text-muted)" }}>
              Welcome back! Please enter your details.
            </p>
          </div>

          <div
            className="mb-8 flex rounded-[var(--radius-md)] p-1"
            style={{
              background: "var(--color-bg-elevated)",
              border: "1px solid var(--color-border-default)",
            }}
          >
            <button
              type="button"
              onClick={() => setRole("company")}
              className="flex-1 rounded-[calc(var(--radius-md)-4px)] py-2 text-sm font-semibold outline-none transition-all duration-[var(--motion-duration-fast)]"
              style={{
                background:
                  role === "company"
                    ? "var(--color-bg-surface)"
                    : "transparent",
                color:
                  role === "company"
                    ? "var(--text-primary)"
                    : "var(--text-secondary)",
                boxShadow: role === "company" ? "var(--shadow-low)" : "none",
              }}
              onFocus={(event) => {
                event.currentTarget.style.outline = `2px solid var(--color-border-focus)`;
                event.currentTarget.style.outlineOffset = "2px";
              }}
              onBlur={(event) => {
                event.currentTarget.style.outline = "none";
              }}
            >
              Company
            </button>
            <button
              type="button"
              onClick={() => setRole("employee")}
              className="flex-1 rounded-[calc(var(--radius-md)-4px)] py-2 text-sm font-semibold outline-none transition-all duration-[var(--motion-duration-fast)]"
              style={{
                background:
                  role === "employee"
                    ? "var(--color-bg-surface)"
                    : "transparent",
                color:
                  role === "employee"
                    ? "var(--text-primary)"
                    : "var(--text-secondary)",
                boxShadow: role === "employee" ? "var(--shadow-low)" : "none",
              }}
              onFocus={(event) => {
                event.currentTarget.style.outline = `2px solid var(--color-border-focus)`;
                event.currentTarget.style.outlineOffset = "2px";
              }}
              onBlur={(event) => {
                event.currentTarget.style.outline = "none";
              }}
            >
              Employee
            </button>
          </div>

          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
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
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder={
                  role === "company" ? "admin@company.com" : "you@company.com"
                }
                className="rounded-[var(--radius-md)] border px-4 py-2.5 text-sm outline-none"
                style={{
                  background: "var(--color-bg-elevated)",
                  borderColor: "var(--color-border-default)",
                  color: "var(--text-primary)",
                  transition: `border-color var(--motion-duration-fast) var(--motion-easing-standard)`,
                }}
                onFocus={(event) =>
                  (event.currentTarget.style.borderColor =
                    "var(--color-border-focus)")
                }
                onBlur={(event) =>
                  (event.currentTarget.style.borderColor =
                    "var(--color-border-default)")
                }
              />
            </div>

            <div className="flex flex-col gap-1">
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="text-sm font-medium"
                  style={{ color: "var(--text-secondary)" }}
                >
                  Password
                </label>
                <button
                  type="button"
                  className="text-xs outline-none hover:underline"
                  style={{ color: "var(--text-link)" }}
                >
                  Forgot password?
                </button>
              </div>
              <input
                id="password"
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="********"
                className="rounded-[var(--radius-md)] border px-4 py-2.5 text-sm outline-none"
                style={{
                  background: "var(--color-bg-elevated)",
                  borderColor: "var(--color-border-default)",
                  color: "var(--text-primary)",
                  transition: `border-color var(--motion-duration-fast) var(--motion-easing-standard)`,
                }}
                onFocus={(event) =>
                  (event.currentTarget.style.borderColor =
                    "var(--color-border-focus)")
                }
                onBlur={(event) =>
                  (event.currentTarget.style.borderColor =
                    "var(--color-border-default)")
                }
              />
            </div>

            {errorMessage && (
              <p
                className="rounded-[var(--radius-md)] border px-3 py-2 text-sm"
                style={{
                  borderColor: "var(--status-error-fg)",
                  background: "var(--status-error-bg)",
                  color: "var(--status-error-fg)",
                }}
              >
                {errorMessage}
              </p>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="mt-2 h-11 w-full rounded-[var(--radius-md)] text-sm font-semibold outline-none"
              style={{
                background: "var(--color-accent-blue-500)",
                color: "var(--text-inverse)",
                boxShadow: "var(--shadow-low)",
                transition: `background var(--motion-duration-fast) var(--motion-easing-standard)`,
                opacity: isSubmitting ? 0.75 : 1,
                cursor: isSubmitting ? "not-allowed" : "pointer",
              }}
              onMouseEnter={(event) =>
                (event.currentTarget.style.background =
                  "var(--color-accent-blue-600)")
              }
              onMouseLeave={(event) =>
                (event.currentTarget.style.background =
                  "var(--color-accent-blue-500)")
              }
              onFocus={(event) => {
                event.currentTarget.style.outline = `2px solid var(--color-border-focus)`;
                event.currentTarget.style.outlineOffset = "2px";
              }}
              onBlur={(event) => {
                event.currentTarget.style.outline = "none";
              }}
            >
              {isSubmitting ? "Signing in..." : `Sign in as ${roleText}`}
            </button>
          </form>

          <p
            className="mt-6 text-center text-sm"
            style={{ color: "var(--text-muted)" }}
          >
            Don&apos;t have an account?{" "}
            <Link
              href={`/signup?role=${role}`}
              className="font-medium outline-none"
              style={{
                color: "var(--text-link)",
                transition: `color var(--motion-duration-fast) var(--motion-easing-standard)`,
              }}
              onMouseEnter={(event) =>
                (event.currentTarget.style.color = "var(--color-accent-blue-300)")
              }
              onMouseLeave={(event) =>
                (event.currentTarget.style.color = "var(--text-link)")
              }
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
