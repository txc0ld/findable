import { Queue } from "bullmq";
import IORedis from "ioredis";

import { env } from "./env";
import type { ScanJobPayload } from "../services/scanner";
import { processScanJob } from "../workers/scan-worker";

const connection = env.REDIS_URL
  ? new IORedis(env.REDIS_URL, {
      maxRetriesPerRequest: null,
      enableReadyCheck: false,
    })
  : null;

export const scanQueue = connection
  ? new Queue("scan", { connection })
  : null;

export type ShopifyJobPayload = 
  | { type: "sync-all"; shop: string; accessToken: string; storeId: string; currencyCode: string }
  | { type: "sync-single"; shop: string; accessToken: string; storeId: string; productGid: string; currencyCode: string }
  | { type: "install-script-tag"; shop: string; accessToken: string; storeId: string }
  | { type: "bulk-sync"; shop: string; accessToken: string; storeId: string; bulkOpId: string; currencyCode: string };

export const shopifyQueue = connection
  ? new Queue("shopify", { connection })
  : null;

export async function enqueueScanJob(payload: ScanJobPayload) {
  if (scanQueue) {
    await scanQueue.add("free-scan", payload);
    return;
  }

  void processScanJob(payload);
}

export async function enqueueShopifyJob(payload: ShopifyJobPayload) {
  if (shopifyQueue) {
    const jobName = `shopify-${payload.type}`;
    await shopifyQueue.add(jobName, payload, {
      attempts: 3,
      backoff: {
        type: "exponential",
        delay: 5000,
      },
    });
    return;
  }

  // Fallback for dev if no Redis is configured
  console.log(`[ShopifyQueue] No Redis connection, running ${payload.type} immediately.`);
  // We'll import the processor dynamically to avoid circular dependencies if needed
  const { processShopifyJob } = await import("../workers/shopify-worker");
  void processShopifyJob(payload);
}
