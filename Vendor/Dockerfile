FROM node:18-alpine AS development
WORKDIR /app/vendor
COPY package.json ./

COPY yarn.lock ./

RUN yarn install --frozen-lockfile

COPY . .

RUN yarn build

FROM node:18-alpine AS production
ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}
WORKDIR /app/vendor
COPY .env /app/vendor/.env

COPY package.json ./

COPY yarn.lock ./
RUN yarn install 
COPY --from=development /app/vendor/dist ./dist

EXPOSE 5000
CMD ["yarn", "start"]