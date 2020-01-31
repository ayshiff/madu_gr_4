FROM node:lts as build

WORKDIR /home/node

COPY package.json .

RUN yarn install

COPY . .

RUN yarn run build

FROM nginx:alpine

COPY --from=build /home/node/build /usr/share/nginx/html
COPY serverfront.conf /etc/nginx/conf.d/default.conf