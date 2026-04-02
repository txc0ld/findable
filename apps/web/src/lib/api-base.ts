const DEFAULT_API_BASE = "http://localhost:3001";
const PRODUCTION_API_BASE = "https://api.getfindable.au";

export function getApiBaseUrl() {
  const configuredBase = import.meta.env.VITE_API_URL?.trim();

  if (configuredBase) {
    return configuredBase;
  }

  if (typeof window !== "undefined" && window.location.hostname !== "localhost") {
    return PRODUCTION_API_BASE;
  }

  return DEFAULT_API_BASE;
}

export function buildApiUrl(pathname: string) {
  return new URL(pathname, getApiBaseUrl()).toString();
}

export async function parseApiResponse<T>(response: Response): Promise<T> {
  const payload = (await response.json().catch(() => null)) as
    | { data?: T; error?: string; success?: boolean }
    | null;

  if (!response.ok || !payload?.success || payload.data === undefined) {
    throw new Error(payload?.error ?? "Request failed.");
  }

  return payload.data;
}
