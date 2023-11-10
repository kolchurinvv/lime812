FROM liminor/bun-node-20:latest

WORKDIR /app

COPY package.json ./
COPY . .
RUN bun install
RUN bun run build

EXPOSE 3000
CMD ["bun", "./build/index.js"]
# CMD ["sleep", "infinity"]
