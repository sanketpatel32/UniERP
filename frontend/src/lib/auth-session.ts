import { ApiError, getMe, refreshSession, type AuthUser } from "./api";
import { clearAccessToken, getAccessToken, setAccessToken } from "./auth-storage";

export const resolveUserSession = async (): Promise<AuthUser> => {
  const token = getAccessToken();

  if (!token) {
    throw new ApiError("No access token found", 401);
  }

  try {
    return await getMe(token);
  } catch (error) {
    if (!(error instanceof ApiError) || error.status !== 401) {
      throw error;
    }

    const refreshed = await refreshSession();
    setAccessToken(refreshed.accessToken);
    return refreshed.user;
  }
};

export const clearSession = () => {
  clearAccessToken();
};
