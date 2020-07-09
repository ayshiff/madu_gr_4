FROM node:lts as build

WORKDIR /home/node

COPY package.json .

ARG API_BASE_URL
ENV REACT_APP_API_BASE_URL=$API_BASE_URL

RUN yarn install

COPY . .

RUN yarn upgrade

RUN yarn run build

FROM nginx:alpine

COPY --from=build /home/node/build /usr/share/nginx/html
COPY serverfront.conf /etc/nginx/conf.d/default.conf