const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api/v1";

type ApiResponse<T> = {
  message: string;
  data: T | null;
  status: number;
};

export const checkHealth = async (): Promise<
  ApiResponse<{ timestamp: string }>
> => {
  const response = await fetch(`${API_BASE_URL}/health`);
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};
