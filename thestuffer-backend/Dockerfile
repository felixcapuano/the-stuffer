FROM node:15.14.0-alpine3.13
WORKDIR /app
COPY app/package.json app/package-lock.json ./
RUN npm install
COPY ./app .
EXPOSE 3001

CMD [ "npm", "start"]