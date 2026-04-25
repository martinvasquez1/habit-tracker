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
RUN npm ci

COPY --from=prepare /app/out/full/ .
RUN npx turbo run build --filter=web...

# ---

FROM base AS runner
WORKDIR /app

RUN npm install -g serve
RUN apt-get update && apt-get install -y gettext

COPY --from=builder /app/apps/web/dist ./dist

# Copy runtime env template for docker compose
COPY apps/web/public/env.js.template ./dist/env.js.template

EXPOSE 3000

CMD ["sh", "-c", "envsubst < dist/env.js.template > dist/env.js && echo '// cache-bust $(date)' >> dist/env.js && exec serve -s dist -l 3000"]