FROM node:22-bookworm AS base
WORKDIR /app

# ---

FROM base AS prepare
RUN npm install -g turbo@2.8.16
COPY . .

# Generate a partial monorepo with a pruned lockfile for a target workspace
RUN turbo prune api --docker

# ---

FROM base AS builder

COPY --from=prepare /app/out/json/ .
RUN npm install

COPY --from=prepare /app/out/full/ .
RUN npm -w api run build

# ---

FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production

COPY --from=prepare /app/out/json/ ./
COPY --from=prepare /app/out/package-lock.json ./
RUN npm install --omit=dev

COPY --from=builder /app/apps/api/dist ./dist

EXPOSE 3000 

CMD ["node", "dist/main.js"]