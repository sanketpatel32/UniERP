"use client";

import { useEffect, useState } from "react";
import { checkHealth } from "../lib/api";

type HealthStatus = "loading" | "healthy" | "error";

export default function Home() {
  const [status, setStatus] = useState<HealthStatus>("loading");
  const [timestamp, setTimestamp] = useState<string>("");

  useEffect(() => {
    checkHealth()
      .then((res) => {
        setStatus("healthy");
        if (res.data?.timestamp) {
          setTimestamp(new Date(res.data.timestamp).toLocaleString());
        }
      })
      .catch((_) => {
        setStatus("error");
      });
  }, []);

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex w-full max-w-xl flex-col items-center justify-center p-8 text-center bg-white dark:bg-zinc-900 rounded-2xl shadow-xl border border-zinc-200 dark:border-zinc-800">
        <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-white mb-6">
          API Connection Status
        </h1>

        <div className="flex flex-col items-center gap-4">
          <div className="flex items-center gap-3">
            <span className="text-lg text-zinc-600 dark:text-zinc-400 font-medium">
              Backend Status:
            </span>
            {status === "loading" && (
              <span className="flex items-center text-amber-500 font-bold bg-amber-50 dark:bg-amber-900/30 px-3 py-1 rounded-full">
                <span className="w-2 h-2 rounded-full bg-amber-500 mr-2 animate-pulse"></span>
                Checking...
              </span>
            )}
            {status === "healthy" && (
              <span className="flex items-center text-emerald-600 dark:text-emerald-400 font-bold bg-emerald-50 dark:bg-emerald-900/30 px-3 py-1 rounded-full">
                <span className="w-2 h-2 rounded-full bg-emerald-500 mr-2"></span>
                Online
              </span>
            )}
            {status === "error" && (
              <span className="flex items-center text-red-600 dark:text-red-400 font-bold bg-red-50 dark:bg-red-900/30 px-3 py-1 rounded-full">
                <span className="w-2 h-2 rounded-full bg-red-500 mr-2"></span>
                Offline
              </span>
            )}
          </div>

          {timestamp && (
            <p className="text-sm text-zinc-500 dark:text-zinc-500 mt-2">
              Last checked: {timestamp}
            </p>
          )}
        </div>
      </main>
    </div>
  );
}
