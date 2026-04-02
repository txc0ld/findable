import { Hono } from "hono";
import { z } from "zod";

import {
  applyWorkspaceFix,
  buildWorkspaceData,
  createOrLoadSession,
  updateWorkspaceNotifications,
  updateWorkspacePlan,
  updateWorkspaceStore,
} from "../lib/workspace-data";

const accountRoute = new Hono();

const EmailSchema = z.object({
  email: z.string().trim().email(),
});

const WorkspaceQuerySchema = z.object({
  email: z.string().trim().email(),
});

const PlanSchema = z.object({
  email: z.string().trim().email(),
  plan: z.enum(["free", "starter", "growth", "pro", "agency"]),
});

const NotificationSchema = z.object({
  email: z.string().trim().email(),
  notifications: z
    .object({
      competitorChanges: z.boolean().optional(),
      criticalAlerts: z.boolean().optional(),
      weeklyReport: z.boolean().optional(),
    })
    .refine((value) => Object.keys(value).length > 0, {
      message: "At least one notification setting is required.",
    }),
});

const StoreSchema = z.object({
  email: z.string().trim().email(),
  store: z.object({
    name: z.string().trim().min(1),
    platform: z.enum(["shopify", "woocommerce", "bigcommerce", "custom"]).nullable(),
    url: z.string().trim().url(),
  }),
});

const FixSchema = z.object({
  email: z.string().trim().email(),
  issueId: z.string().trim().min(1),
});

accountRoute.post("/session", async (c) => {
  const parseResult = EmailSchema.safeParse(await c.req.json().catch(() => null));

  if (!parseResult.success) {
    return c.json(
      {
        success: false,
        error: parseResult.error.issues[0]?.message ?? "A valid email is required.",
      },
      400,
    );
  }

  const session = await createOrLoadSession(parseResult.data.email);

  return c.json({
    success: true,
    data: session,
  });
});

accountRoute.get("/workspace", async (c) => {
  const parseResult = WorkspaceQuerySchema.safeParse(c.req.query());

  if (!parseResult.success) {
    return c.json(
      {
        success: false,
        error: "A valid email query parameter is required.",
      },
      400,
    );
  }

  const workspace = await buildWorkspaceData(parseResult.data.email);

  return c.json({
    success: true,
    data: workspace,
  });
});

accountRoute.post("/plan", async (c) => {
  const parseResult = PlanSchema.safeParse(await c.req.json().catch(() => null));

  if (!parseResult.success) {
    return c.json(
      {
        success: false,
        error: parseResult.error.issues[0]?.message ?? "Invalid plan update request.",
      },
      400,
    );
  }

  const plan = await updateWorkspacePlan(parseResult.data.email, parseResult.data.plan);

  return c.json({
    success: true,
    data: {
      plan,
      stripeCheckoutUrl: null,
    },
  });
});

accountRoute.post("/notifications", async (c) => {
  const parseResult = NotificationSchema.safeParse(await c.req.json().catch(() => null));

  if (!parseResult.success) {
    return c.json(
      {
        success: false,
        error: parseResult.error.issues[0]?.message ?? "Invalid notification settings.",
      },
      400,
    );
  }

  const notifications = await updateWorkspaceNotifications(
    parseResult.data.email,
    Object.fromEntries(
      Object.entries(parseResult.data.notifications).filter(([, value]) => value !== undefined),
    ),
  );

  return c.json({
    success: true,
    data: notifications,
  });
});

accountRoute.post("/store", async (c) => {
  const parseResult = StoreSchema.safeParse(await c.req.json().catch(() => null));

  if (!parseResult.success) {
    return c.json(
      {
        success: false,
        error: parseResult.error.issues[0]?.message ?? "Invalid store payload.",
      },
      400,
    );
  }

  const store = await updateWorkspaceStore(parseResult.data.email, parseResult.data.store);

  return c.json({
    success: true,
    data: store,
  });
});

accountRoute.post("/fixes/apply", async (c) => {
  const parseResult = FixSchema.safeParse(await c.req.json().catch(() => null));

  if (!parseResult.success) {
    return c.json(
      {
        success: false,
        error: parseResult.error.issues[0]?.message ?? "Invalid fix request.",
      },
      400,
    );
  }

  await applyWorkspaceFix(parseResult.data.email, parseResult.data.issueId);
  const workspace = await buildWorkspaceData(parseResult.data.email);

  return c.json({
    success: true,
    data: workspace,
  });
});

export { accountRoute };
