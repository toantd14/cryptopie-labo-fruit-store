FROM node:17-alpine

WORKDIR /usr/src/app

COPY ./app/package*.json ./

RUN apk add --update nodejs npm
RUN npm install

COPY ./app /usr/src/app

EXPOSE 3000

CMD [ "npm", "start" ]