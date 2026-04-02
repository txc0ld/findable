import type { PlanTier, WorkspaceData, WorkspaceNotificationSettings } from "@findable/shared";

import { authenticatedFetch } from "./auth-api";
import { parseApiResponse } from "./api-base";

export async function getWorkspace() {
  const response = await authenticatedFetch("/api/account/workspace");
  return parseApiResponse<WorkspaceData>(response);
}

export async function updatePlan(plan: PlanTier) {
  const response = await authenticatedFetch("/api/account/plan", {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({ plan }),
  });

  return parseApiResponse<{ plan: PlanTier; stripeCheckoutUrl: string | null }>(response);
}

export async function updateStore(store: {
  name: string;
  platform: WorkspaceData["store"]["platform"];
  url: string;
}) {
  const response = await authenticatedFetch("/api/account/store", {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({ store }),
  });

  return parseApiResponse<unknown>(response);
}

export async function updateNotifications(notifications: Partial<WorkspaceNotificationSettings>) {
  const response = await authenticatedFetch("/api/account/notifications", {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({ notifications }),
  });

  return parseApiResponse<WorkspaceNotificationSettings>(response);
}

export async function applyFix(issueId: string) {
  const response = await authenticatedFetch("/api/account/fixes/apply", {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({ issueId }),
  });

  return parseApiResponse<WorkspaceData>(response);
}
