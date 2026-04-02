const DISPOSABLE_EMAIL_DOMAINS = new Set([
  "10minutemail.com",
  "dispostable.com",
  "fakeinbox.com",
  "getairmail.com",
  "guerrillamail.com",
  "maildrop.cc",
  "mailinator.com",
  "sharklasers.com",
  "tempmail.com",
  "throwawaymail.com",
  "yopmail.com",
]);

export function normalizeEmail(email: string): string {
  return email.trim().toLowerCase();
}

export function isDisposableEmail(email: string): boolean {
  const domain = normalizeEmail(email).split("@")[1];

  return domain ? DISPOSABLE_EMAIL_DOMAINS.has(domain) : false;
}
