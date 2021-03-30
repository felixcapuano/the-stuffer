FROM node:latest

WORKDIR /app

EXPOSE 3000

COPY app .

RUN npm i
RUN npm i -g nodemon

CMD [ "nodemon", "server.js"]