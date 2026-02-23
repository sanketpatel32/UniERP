import type { AuthRole } from "./api";

const ACCESS_TOKEN_KEY = "unierp_access_token";

export const getAccessToken = (): string | null => {
  if (globalThis.window === undefined) {
    return null;
  }
  return globalThis.localStorage.getItem(ACCESS_TOKEN_KEY);
};

export const setAccessToken = (token: string) => {
  if (globalThis.window === undefined) {
    return;
  }
  globalThis.localStorage.setItem(ACCESS_TOKEN_KEY, token);
};

export const clearAccessToken = () => {
  if (globalThis.window === undefined) {
    return;
  }
  globalThis.localStorage.removeItem(ACCESS_TOKEN_KEY);
};

export const getRoleRoute = (role: AuthRole) => {
  if (role === "company_admin") {
    return "/company";
  }
  return "/employee";
};
