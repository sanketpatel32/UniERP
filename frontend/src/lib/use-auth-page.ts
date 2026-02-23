"use client";

import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { logout, type AuthRole, type AuthUser } from "./api";
import { getRoleRoute } from "./auth-storage";
import { clearSession, resolveUserSession } from "./auth-session";

type UseAuthPageResult = {
  isLoading: boolean;
  user: AuthUser | null;
  errorMessage: string | null;
  signOut: () => Promise<void>;
};

export const useAuthPage = (
  requiredRole?: AuthRole,
): UseAuthPageResult => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<AuthUser | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    let active = true;

    const run = async () => {
      try {
        const currentUser = await resolveUserSession();

        if (!active) {
          return;
        }

        if (requiredRole && currentUser.role !== requiredRole) {
          router.replace(getRoleRoute(currentUser.role));
          return;
        }

        setUser(currentUser);
        setErrorMessage(null);
      } catch {
        if (!active) {
          return;
        }
        clearSession();
        setErrorMessage("Your session has expired. Please sign in again.");
        router.replace("/");
      } finally {
        if (active) {
          setIsLoading(false);
        }
      }
    };

    run();

    return () => {
      active = false;
    };
  }, [requiredRole, router]);

  const signOut = useCallback(async () => {
    try {
      await logout();
    } catch {
      // Continue with local logout cleanup even if API logout fails.
    } finally {
      clearSession();
      router.replace("/");
    }
  }, [router]);

  return {
    isLoading,
    user,
    errorMessage,
    signOut,
  };
};
