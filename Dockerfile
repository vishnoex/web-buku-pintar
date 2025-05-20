# Build stage
FROM oven/bun:1.2 AS builder

WORKDIR /app

# Copy package files
COPY package.json bun.lock ./

# Install dependencies
RUN bun install --frozen-lockfile

# Copy the rest of the application
COPY . .

# Build the application
RUN bun run build

# Production stage
FROM oven/bun:1.2-slim

WORKDIR /app

# Copy built assets from builder
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/bun.lock ./bun.lock

# Install production dependencies only
RUN bun install --frozen-lockfile --production

# Expose the port the app runs on
EXPOSE 3000

# Start the application
CMD ["bun", "run", "start"] 