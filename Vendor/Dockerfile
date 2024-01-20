FROM node:18-alpine as development
WORKDIR /app
COPY package*json yarn.lock ./

RUN yarn install --frozen-lockfile

COPY . .

RUN yarn build

FROM node:18-alpine as production
ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}
WORKDIR /app
COPY .env /app/.env
COPY package*json yarn.lock ./
RUN yarn install --only=production
COPY --from=development /app/dist ./dist

EXPOSE 8000
CMD ["yarn", "start"]
