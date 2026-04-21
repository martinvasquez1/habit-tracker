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
RUN npm run build

# ---

FROM base AS runner
WORKDIR /app

RUN npm install -g serve
COPY --from=build /app/build ./build

EXPOSE 12345

CMD ["serve", "-s", "build", "-l", "12345"]