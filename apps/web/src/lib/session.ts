const SESSION_EMAIL_KEY = "findable:session-email";

export function getSessionEmail() {
  if (typeof window === "undefined") {
    return null;
  }

  return window.localStorage.getItem(SESSION_EMAIL_KEY);
}

export function setSessionEmail(email: string) {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(SESSION_EMAIL_KEY, email.trim().toLowerCase());
}

export function clearSessionEmail() {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.removeItem(SESSION_EMAIL_KEY);
}
