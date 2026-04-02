import { z } from "zod";

const EnvSchema = z.object({
  NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
  PORT: z.coerce.number().int().positive().default(3001),
  DATABASE_URL: z.string().optional(),
  REDIS_URL: z.string().optional(),
  FRONTEND_URL: z.string().url().default("http://localhost:5173"),
  CORS_ORIGINS: z.string().optional(),
  CLOUDFLARE_TURNSTILE_SECRET: z.string().optional(),
  JWT_SECRET: z.string().min(32).default("findable-local-jwt-secret-change-me-123456"),
  JWT_ISSUER: z.string().default("findable-api"),
  RESEND_API_KEY: z.string().optional(),
  RESEND_FROM_EMAIL: z.string().default("Findable <no-reply@getfindable.ai>"),
  COOKIE_DOMAIN: z.string().optional(),
});

export const env = EnvSchema.parse({
  NODE_ENV: process.env.NODE_ENV,
  PORT: process.env.PORT,
  DATABASE_URL: process.env.DATABASE_URL,
  REDIS_URL: process.env.REDIS_URL,
  FRONTEND_URL: process.env.FRONTEND_URL,
  CORS_ORIGINS: process.env.CORS_ORIGINS,
  CLOUDFLARE_TURNSTILE_SECRET: process.env.CLOUDFLARE_TURNSTILE_SECRET,
  JWT_SECRET: process.env.JWT_SECRET,
  JWT_ISSUER: process.env.JWT_ISSUER,
  RESEND_API_KEY: process.env.RESEND_API_KEY,
  RESEND_FROM_EMAIL: process.env.RESEND_FROM_EMAIL,
  COOKIE_DOMAIN: process.env.COOKIE_DOMAIN,
});
