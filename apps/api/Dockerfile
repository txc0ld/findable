FROM oven/bun:1.3 AS base
WORKDIR /app

# Install dependencies — copy all workspace package.jsons so the lockfile resolves
FROM base AS deps
COPY package.json bun.lock ./
COPY apps/api/package.json apps/api/
COPY apps/web/package.json apps/web/
COPY packages/shared/package.json packages/shared/
RUN bun install --frozen-lockfile

# Runtime
FROM base AS runner
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY --from=deps /app/apps/api/node_modules ./apps/api/node_modules
COPY --from=deps /app/packages/shared/node_modules ./packages/shared/node_modules
COPY packages/shared ./packages/shared
COPY apps/api ./apps/api
COPY package.json bun.lock ./

EXPOSE 3001
ENV NODE_ENV=production
ENV PORT=3001

CMD ["bun", "run", "apps/api/src/index.ts"]
