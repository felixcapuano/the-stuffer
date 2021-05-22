FROM node:15.14.0 as build
WORKDIR /app
COPY app/package.json app/package-lock.json ./
RUN npm install --silent
COPY ./app .
RUN npm run build

FROM nginx:1.20.0-alpine

COPY --from=build /app/build /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf
COPY server/nginx.conf /etc/nginx/conf.d
EXPOSE 8080

CMD [ "nginx", "-g", "daemon off;" ]

# FROM node:15.14.0-alpine3.13
# COPY --from=build /app/package.json /app/package-lock.json ./
# COPY --from=build /app/server .
# RUN npm install
# EXPOSE 8080

# CMD [ "npm", "start", "public"]