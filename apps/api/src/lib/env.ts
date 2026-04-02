import { z } from "zod";

const EnvSchema = z.object({
  NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
  PORT: z.coerce.number().int().positive().default(3001),
  DATABASE_URL: z.string().optional(),
  REDIS_URL: z.string().optional(),
  CLOUDFLARE_TURNSTILE_SECRET: z.string().optional(),
});

export const env = EnvSchema.parse({
  NODE_ENV: process.env.NODE_ENV,
  PORT: process.env.PORT,
  DATABASE_URL: process.env.DATABASE_URL,
  REDIS_URL: process.env.REDIS_URL,
  CLOUDFLARE_TURNSTILE_SECRET: process.env.CLOUDFLARE_TURNSTILE_SECRET,
});
