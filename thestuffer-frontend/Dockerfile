FROM node:15.14.0 as build
WORKDIR /app
COPY app/package.json app/package-lock.json ./
RUN npm install
COPY ./app .
RUN npm run build

FROM node:15.14.0-alpine3.13
WORKDIR /app
COPY --from=build /app/package.json /app/package-lock.json ./
COPY --from=build /app/server .
COPY --from=build /app/build ./public
RUN npm install
EXPOSE 8080

CMD [ "npm", "start", "public"]