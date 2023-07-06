FROM liminor/bun-node:latest

WORKDIR /app

# RUN apt update
# RUN apt install curl -y
# SHELL [ "/bin/bash", "-c" ]
# RUN curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.3/install.sh | bash
# RUN bash -c "source /root/.nvm/nvm.sh && nvm install --lts --latest-npm && nvm alias default lts/*"
COPY package.json ./
COPY . .
RUN bun install
# RUN bash -i -c 'npm run build'
RUN bun run build

EXPOSE 3000
CMD ["bun", "./build/index.js"]
# CMD ["sleep", "infinity"]