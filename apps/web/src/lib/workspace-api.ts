import type { PlanTier, WorkspaceData, WorkspaceNotificationSettings } from "@findable/shared";

import { buildApiUrl, parseApiResponse } from "./api-base";

export interface SessionResponse {
  accountId: string;
  email: string;
  freeScanUsed: boolean;
  notifications: WorkspaceNotificationSettings;
  plan: PlanTier;
  storeConnected: boolean;
}

export async function createSession(email: string) {
  const response = await fetch(buildApiUrl("/api/account/session"), {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({ email }),
  });

  return parseApiResponse<SessionResponse>(response);
}

export async function getWorkspace(email: string) {
  const response = await fetch(
    buildApiUrl(`/api/account/workspace?email=${encodeURIComponent(email)}`),
  );

  return parseApiResponse<WorkspaceData>(response);
}

export async function updatePlan(email: string, plan: PlanTier) {
  const response = await fetch(buildApiUrl("/api/account/plan"), {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({ email, plan }),
  });

  return parseApiResponse<{ plan: PlanTier; stripeCheckoutUrl: string | null }>(response);
}

export async function updateStore(
  email: string,
  store: {
    name: string;
    platform: WorkspaceData["store"]["platform"];
    url: string;
  },
) {
  const response = await fetch(buildApiUrl("/api/account/store"), {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({ email, store }),
  });

  return parseApiResponse<unknown>(response);
}

export async function updateNotifications(
  email: string,
  notifications: Partial<WorkspaceNotificationSettings>,
) {
  const response = await fetch(buildApiUrl("/api/account/notifications"), {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({ email, notifications }),
  });

  return parseApiResponse<WorkspaceNotificationSettings>(response);
}

export async function applyFix(email: string, issueId: string) {
  const response = await fetch(buildApiUrl("/api/account/fixes/apply"), {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({ email, issueId }),
  });

  return parseApiResponse<WorkspaceData>(response);
}
