const ACCESS_TOKEN_KEY = "findable:access-token";
const ACCESS_TOKEN_EXPIRY_KEY = "findable:access-token-expiry";

export function getAccessToken() {
  if (typeof window === "undefined") {
    return null;
  }

  return window.localStorage.getItem(ACCESS_TOKEN_KEY);
}

export function getAccessTokenExpiry() {
  if (typeof window === "undefined") {
    return null;
  }

  return window.localStorage.getItem(ACCESS_TOKEN_EXPIRY_KEY);
}

export function setAuthSession(accessToken: string, expiresAt: string) {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
  window.localStorage.setItem(ACCESS_TOKEN_EXPIRY_KEY, expiresAt);
}

export function clearAuthSession() {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.removeItem(ACCESS_TOKEN_KEY);
  window.localStorage.removeItem(ACCESS_TOKEN_EXPIRY_KEY);
}
