"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { ApiError, signupCompany } from "@/lib/api";
import { getRoleRoute, setAccessToken } from "@/lib/auth-storage";

type Role = "company" | "employee";

export function SignupForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialRole = (searchParams.get("role") as Role) || "company";
  const isEmployeeIntent = initialRole === "employee";

  const [companyName, setCompanyName] = useState("");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: React.SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrorMessage(null);

    if (isEmployeeIntent) {
      setErrorMessage(
        "Employee self-signup is not available yet. Please ask a company admin to create your account.",
      );
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await signupCompany({
        companyName,
        fullName,
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
        setErrorMessage("Unable to sign up right now. Please try again.");
      }
      setIsSubmitting(false);
    }
  };

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
              Join UniERP
            </h1>
            <p className="mt-2 text-sm" style={{ color: "var(--text-muted)" }}>
              Create a new company admin account.
            </p>
          </div>

          {isEmployeeIntent && (
            <p
              className="mb-4 rounded-[var(--radius-md)] border px-3 py-2 text-sm"
              style={{
                borderColor: "var(--status-warning-fg)",
                background: "var(--status-warning-bg)",
                color: "var(--status-warning-fg)",
              }}
            >
              Employee self-signup is not available yet.
            </p>
          )}

          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <div className="flex flex-col gap-1">
              <label
                htmlFor="companyName"
                className="text-sm font-medium"
                style={{ color: "var(--text-secondary)" }}
              >
                Company Name
              </label>
              <input
                id="companyName"
                type="text"
                required
                value={companyName}
                onChange={(event) => setCompanyName(event.target.value)}
                placeholder="Acme Corp"
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
              <label
                htmlFor="fullName"
                className="text-sm font-medium"
                style={{ color: "var(--text-secondary)" }}
              >
                Admin Full Name
              </label>
              <input
                id="fullName"
                type="text"
                required
                value={fullName}
                onChange={(event) => setFullName(event.target.value)}
                placeholder="John Doe"
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
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="admin@company.com"
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
              {isSubmitting ? "Creating account..." : "Sign up"}
            </button>
          </form>

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
              onMouseEnter={(event) =>
                (event.currentTarget.style.color = "var(--color-accent-blue-300)")
              }
              onMouseLeave={(event) =>
                (event.currentTarget.style.color = "var(--text-link)")
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
