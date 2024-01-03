FROM liminor/bun-node-20:arm

WORKDIR /app

COPY package.json ./
COPY . .
RUN bun install
RUN bun run build

EXPOSE 3000
CMD ["bun", "./build/index.js"]
# CMD ["sleep", "infinity"]
