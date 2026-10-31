# syntax=docker/dockerfile:1.7
FROM node:24-bookworm-slim
WORKDIR /app
COPY package.json ./
RUN npm install
COPY . .
RUN npm run build
ENV NODE_ENV=production
EXPOSE 3010
CMD ["sh", "-c", "npx next start -p ${PORT:-3010}"]
