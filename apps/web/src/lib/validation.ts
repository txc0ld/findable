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

const urlPattern = /^https?:\/\/[^\s/$.?#].[^\s]*$/i;
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export interface ScanFormValues {
  urls: [string, string, string];
  email: string;
}

export interface ScanFormErrors {
  urls: [string | null, string | null, string | null];
  email: string | null;
  submit: string | null;
  turnstile: string | null;
}

export function createEmptyErrors(): ScanFormErrors {
  return {
    urls: [null, null, null],
    email: null,
    submit: null,
    turnstile: null,
  };
}

export function validateScanForm(
  values: ScanFormValues,
  turnstileToken: string | null,
): ScanFormErrors {
  const errors = createEmptyErrors();
  const trimmedUrls = values.urls.map((url) => url.trim());
  const populatedUrls = trimmedUrls.filter((url) => url.length > 0);

  if (populatedUrls.length === 0) {
    errors.urls[0] = "Add at least one product URL to run the free scan.";
  }

  trimmedUrls.forEach((url, index) => {
    if (!url) {
      return;
    }

    if (!urlPattern.test(url)) {
      errors.urls[index] = "Use a full product URL starting with https://";
    }
  });

  const email = values.email.trim().toLowerCase();

  if (!email) {
    errors.email = "Enter the email address where the report should go.";
  } else if (!emailPattern.test(email)) {
    errors.email = "Enter a valid email address.";
  } else {
    const domain = email.split("@")[1];

    if (domain && DISPOSABLE_EMAIL_DOMAINS.has(domain)) {
      errors.email = "Use a work or store email, not a disposable inbox.";
    }
  }

  if (!turnstileToken) {
    errors.turnstile = "Complete the Turnstile check to start your scan.";
  }

  return errors;
}

export function hasFormErrors(errors: ScanFormErrors): boolean {
  return Boolean(
    errors.email ||
      errors.submit ||
      errors.turnstile ||
      errors.urls.some((message) => message !== null),
  );
}
