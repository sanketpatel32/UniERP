const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api/v1";

type ApiResponse<T> = {
  message: string;
  data: T | null;
  status: number;
};

export class ApiError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.name = "ApiError";
    this.status = status;
  }
}

type RequestOptions = {
  method?: "GET" | "POST";
  body?: unknown;
  token?: string;
  withCredentials?: boolean;
};

export type AuthRole = "company_admin" | "employee";

export type AuthUser = {
  id: string;
  fullName: string;
  email: string;
  companyId: string;
  role: AuthRole;
};

type AuthData = {
  accessToken: string;
  user: AuthUser;
};

type SignupCompanyPayload = {
  companyName: string;
  fullName: string;
  email: string;
  password: string;
  companySlug?: string;
};

type LoginPayload = {
  email: string;
  password: string;
};

const request = async <T>(
  path: string,
  options: RequestOptions = {},
): Promise<ApiResponse<T>> => {
  const headers: HeadersInit = {
    "Content-Type": "application/json",
  };

  if (options.token) {
    headers.Authorization = `Bearer ${options.token}`;
  }

  const response = await fetch(`${API_BASE_URL}${path}`, {
    method: options.method ?? "GET",
    headers,
    body: options.body ? JSON.stringify(options.body) : undefined,
    credentials: options.withCredentials === false ? "omit" : "include",
  });

  const data = (await response.json()) as ApiResponse<T>;

  if (!response.ok) {
    throw new ApiError(
      data.message || "Request failed",
      data.status || response.status,
    );
  }

  return data;
};

const requireData = <T>(response: ApiResponse<T>, fallbackMessage: string): T => {
  if (!response.data) {
    throw new ApiError(fallbackMessage, response.status);
  }
  return response.data;
};

export const checkHealth = async (): Promise<ApiResponse<{ timestamp: string }>> =>
  request<{ timestamp: string }>("/health", { withCredentials: false });

export const signupCompany = async (
  payload: SignupCompanyPayload,
): Promise<AuthData> => {
  const response = await request<AuthData>("/auth/signup/company", {
    method: "POST",
    body: payload,
  });
  return requireData(response, "Signup response was missing payload");
};

export const login = async (payload: LoginPayload): Promise<AuthData> => {
  const response = await request<AuthData>("/auth/login", {
    method: "POST",
    body: payload,
  });
  return requireData(response, "Login response was missing payload");
};

export const refreshSession = async (): Promise<AuthData> => {
  const response = await request<AuthData>("/auth/refresh", {
    method: "POST",
  });
  return requireData(response, "Refresh response was missing payload");
};

export const getMe = async (accessToken: string): Promise<AuthUser> => {
  const response = await request<AuthUser>("/auth/me", {
    token: accessToken,
  });
  return requireData(response, "Me response was missing payload");
};

export const logout = async (): Promise<void> => {
  await request("/auth/logout", {
    method: "POST",
  });
};
