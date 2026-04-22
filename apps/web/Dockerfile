FROM node:22-bookworm AS base
WORKDIR /app

# ---

FROM base AS prepare
RUN npm install -g turbo@2.8.16
COPY . .

# Generate a partial monorepo with a pruned lockfile for a target workspace
RUN turbo prune web --docker

# ---

FROM base AS builder

COPY --from=prepare /app/out/json/ .
RUN npm install

COPY --from=prepare /app/out/full/ .
RUN npm -w web run build

# ---

FROM base AS runner
WORKDIR /app

RUN npm install -g serve
COPY --from=builder /app/apps/web/dist ./dist

EXPOSE 3000

CMD ["serve", "-s", "dist", "-l", "3000"]