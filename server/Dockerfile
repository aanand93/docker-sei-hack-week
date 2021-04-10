
FROM node:14-slim

WORKDIR /usr/src/app

COPY ./package.json ./
COPY ./package-lock.json ./

RUN npm install

COPY controllers ./controllers
COPY db ./db
COPY models ./models
COPY routes ./routes
COPY index.js ./index.js

EXPOSE 5000

CMD [ "npm", "start" ]