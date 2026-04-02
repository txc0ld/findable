import { Hono } from "hono";
import { cors } from "hono/cors";

import { env } from "./lib/env";
import { accountRoute } from "./routes/account";
import { healthRoute } from "./routes/health";
import { scanRoute } from "./routes/scan";

const app = new Hono();

app.use("/api/*", cors());

app.get("/", (c) =>
  c.json({
    success: true,
    data: {
      service: "findable-api",
      version: "0.1.0",
      docs: "Phase 1 Step 1 scaffold",
    },
  }),
);

app.route("/api/health", healthRoute);
app.route("/api/account", accountRoute);
app.route("/api/scan", scanRoute);

export type AppType = typeof app;

console.log(`FINDABLE API listening on http://localhost:${env.PORT}`);

Bun.serve({
  port: env.PORT,
  fetch: app.fetch,
});
