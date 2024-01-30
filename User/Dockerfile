FROM node:18-alpine as development
WORKDIR /app/user
COPY package.json ./

COPY yarn.lock ./

RUN yarn install --frozen-lockfile

COPY . .

RUN yarn build

FROM node:18-alpine as production
ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}
WORKDIR /app/user
COPY .env /app/user/.env
COPY package.json ./

COPY yarn.lock ./
RUN yarn install 
COPY --from=development /app/user/dist ./dist

EXPOSE 4000
CMD ["yarn", "start"]