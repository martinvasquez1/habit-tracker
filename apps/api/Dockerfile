FROM node:22-bookworm AS base

# ---

FROM base AS prepare
WORKDIR /app

RUN npm install -g turbo@2.8.16
COPY . .

# Generate a partial monorepo with a pruned lockfile for a target workspace
RUN turbo prune api --docker

# ---

FROM base AS builder
WORKDIR /app

COPY --from=prepare /app/out/json/ .
RUN npm ci

COPY --from=prepare /app/out/full/ .
RUN npx turbo run build --filter=api...

# ---

FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production
COPY --from=builder /app .

EXPOSE 3000 

CMD ["node", "apps/api/dist/main.js"]