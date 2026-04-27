## Build images (test only)

Build the Dockerfile from the root of your monorepo:

```sh
docker build -f apps/web/Dockerfile -t ant-web .
docker build -f apps/api/Dockerfile -t ant-api .
```

```sh
docker exec -it <name> /bash
```

## Compose

```sh
docker compose up --build
```