FROM node:16 as base

RUN npm i -g pnpm

FROM base AS build

WORKDIR /usr/src/app

COPY package.json pnpm-lock.yaml ./

RUN pnpm i --frozen-lockfile

COPY . .

RUN pnpm prisma:generate

RUN pnpm graphql-codegen

RUN pnpm build

FROM node:16 as deploy

WORKDIR /usr/src/app

COPY --from=build /usr/src/app/package.json /usr/src/app/

COPY --from=build /usr/src/app/pnpm-lock.yaml /usr/src/app/

COPY --from=build /usr/src/app/dist/ /usr/src/app/dist/

COPY --from=build /usr/src/app/graphql/ /usr/src/app/graphql/

COPY --from=build /usr/src/app/src/ /usr/src/app/src/

COPY --from=build /usr/src/app/node_modules/.prisma/ /usr/src/app/node_modules/.prisma/

COPY --from=build /usr/src/app/node_modules/@prisma/ /usr/src/app/node_modules/@prisma/

RUN pnpm install --prod

CMD [ "node", "dist/src/main.js"]

# CMD [ "pnpm", "start:prod" ]