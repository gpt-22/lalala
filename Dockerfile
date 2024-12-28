FROM node:alpine as build

COPY package.json package.json
RUN yarn install
COPY . .
RUN yarn generate

FROM nginx:stable-alpine

COPY --from=build /.output/public /usr/share/nginx/html
COPY --from=build nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
