FROM node:14-slim

WORKDIR /usr/src/app

ENV PATH /usr/src/app/node_modules/.bin:$PATH

COPY ./package.json ./
COPY ./package-lock.json ./

RUN npm install 

COPY src ./src
COPY public ./public

EXPOSE 8000

CMD [ "npm", "start" ]