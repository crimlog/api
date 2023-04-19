# FROM node:16 as base

# RUN npm i -g pnpm

# FROM base AS build

FROM node:16 as build

WORKDIR /usr/src/app

COPY package.json pnpm-lock.yaml ./

# RUN pnpm i --frozen-lockfile

RUN npm i

COPY . .

RUN npm run prisma:generate

RUN npm run graphql-codegen

RUN npm run build

FROM node:16 as deploy

WORKDIR /usr/src/app

COPY --from=build /usr/src/app/package.json /usr/src/app/

# COPY --from=build /usr/src/app/pnpm-lock.yaml /usr/src/app/

COPY --from=build /usr/src/app/dist/ /usr/src/app/dist/

COPY --from=build /usr/src/app/graphql/ /usr/src/app/graphql/

COPY --from=build /usr/src/app/src/ /usr/src/app/src/

COPY --from=build /usr/src/app/node_modules/.prisma/ /usr/src/app/node_modules/.prisma/

COPY --from=build /usr/src/app/node_modules/@prisma/ /usr/src/app/node_modules/@prisma/

RUN npm install --production

CMD [ "node", "dist/src/main.js"]

# CMD [ "pnpm", "start:prod" ]