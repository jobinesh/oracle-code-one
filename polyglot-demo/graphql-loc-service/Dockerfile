FROM node:carbon
WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 7800

CMD [ "npm", "start" ]