
FROM node:22.13.0

WORKDIR /APP

RUN npm install -g pnpm

COPY package.json pnpm-lock.yaml ./

RUN pnpm install

COPY . .

ENV HOSTNAME "0.0.0.0"

EXPOSE 3000

CMD ["pnpm","start:dev"]