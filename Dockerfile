FROM node:24-alpine

WORKDIR /app

COPY imperium/package.json ./package.json
COPY imperium/package-lock.json ./package-lock.json
RUN npm install

COPY imperium/src ./src
COPY imperium/tsconfig.json ./tsconfig.json
COPY imperium/imperium.json ./imperium.json

RUN npx tsc

CMD ["node", "dist/src/server.js"]
