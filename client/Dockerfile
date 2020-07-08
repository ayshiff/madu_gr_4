FROM node:lts as build

WORKDIR /home/node

COPY package.json .

ENV REACT_APP_API_BASE_URL=http://staging-madu-back-end-elb-1448654197.eu-west-2.elb.amazonaws.com

RUN yarn install

COPY . .

RUN yarn upgrade

RUN yarn run build

FROM nginx:alpine

COPY --from=build /home/node/build /usr/share/nginx/html
COPY serverfront.conf /etc/nginx/conf.d/default.conf