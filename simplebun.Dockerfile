FROM oven/bun:1.2-slim

ENV PORT 5000
ENV HOSTNAME="0.0.0.0"

# Create app directory
COPY ./.next/standalone /usr/src/app/ 
WORKDIR /usr/src/app
COPY ./public public
RUN mkdir -p /usr/src/app/.next
COPY ./.next/static .next/static

# Expose the port
EXPOSE 5000

# Start the app
CMD ["bun", "server.js"]
