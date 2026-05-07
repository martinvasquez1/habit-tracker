# Ant Habit Tracker - API

Ant is a simple yet powerful habit tracker that helps you cultivate and sustain positive habits with ease. It is completely ad-free and open source.

## Environment Variables

```bash
NODE_ENV="development" # Or "production" "GENERATE_OPENAPI"
PORT=3000
DB_URL="your_url"
JWT_SECRET="shhh..."
ORIGIN="your_allowed_origin"
CREATE_ADMIN_PASSWORD=123
APP_URL=http://localhost:3000
UPLOAD_DIR=./uploads
```

## Database

npm run migration:generate src/database/migrations/first

## Testcontainers bug

Fixed with [this](https://stackoverflow.com/questions/61108655/test-container-test-cases-are-failing-due-to-could-not-find-a-valid-docker-envi).
