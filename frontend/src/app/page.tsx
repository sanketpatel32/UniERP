"use client";

import Link from "next/link";
import { useState } from "react";

type Role = "company" | "employee";

export default function HomePage() {
  const [role, setRole] = useState<Role>("company");

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
              Sign in to UniERP
            </h1>
            <p className="mt-2 text-sm" style={{ color: "var(--text-muted)" }}>
              Welcome back! Please enter your details.
            </p>
          </div>

          {/* Role Toggle */}
          <div
            className="mb-8 flex rounded-[var(--radius-md)] p-1"
            style={{
              background: "var(--color-bg-elevated)",
              border: "1px solid var(--color-border-default)",
            }}
          >
            <button
              onClick={() => setRole("company")}
              className="flex-1 rounded-[calc(var(--radius-md)-4px)] py-2 text-sm font-semibold outline-none transition-all duration-[var(--motion-duration-fast)]"
              style={{
                background: role === "company" ? "var(--color-bg-surface)" : "transparent",
                color: role === "company" ? "var(--text-primary)" : "var(--text-secondary)",
                boxShadow: role === "company" ? "var(--shadow-low)" : "none",
              }}
              onFocus={(e) => {
                e.currentTarget.style.outline = `2px solid var(--color-border-focus)`;
                e.currentTarget.style.outlineOffset = "2px";
              }}
              onBlur={(e) => {
                e.currentTarget.style.outline = "none";
              }}
            >
              Company
            </button>
            <button
              onClick={() => setRole("employee")}
              className="flex-1 rounded-[calc(var(--radius-md)-4px)] py-2 text-sm font-semibold outline-none transition-all duration-[var(--motion-duration-fast)]"
              style={{
                background: role === "employee" ? "var(--color-bg-surface)" : "transparent",
                color: role === "employee" ? "var(--text-primary)" : "var(--text-secondary)",
                boxShadow: role === "employee" ? "var(--shadow-low)" : "none",
              }}
              onFocus={(e) => {
                e.currentTarget.style.outline = `2px solid var(--color-border-focus)`;
                e.currentTarget.style.outlineOffset = "2px";
              }}
              onBlur={(e) => {
                e.currentTarget.style.outline = "none";
              }}
            >
              Employee
            </button>
          </div>

          {/* Form */}
          <form className="flex flex-col gap-4" onSubmit={(e) => e.preventDefault()}>
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
                placeholder={role === "company" ? "admin@company.com" : "you@company.com"}
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
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="text-sm font-medium"
                  style={{ color: "var(--text-secondary)" }}
                >
                  Password
                </label>
                <Link
                  href="#"
                  className="text-xs outline-none"
                  style={{ color: "var(--text-link)" }}
                >
                  Forgot password?
                </Link>
              </div>
              <input
                id="password"
                type="password"
                autoComplete="current-password"
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
              Sign in as {role === "company" ? "Company" : "Employee"}
            </button>
          </form>
          
          {/* Footer Signup Link */}
          <p className="mt-6 text-center text-sm" style={{ color: "var(--text-muted)" }}>
            Don&apos;t have an account?{" "}
            <Link
              href={`/signup?role=${role}`}
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
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
