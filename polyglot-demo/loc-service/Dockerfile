FROM node:8.11.1

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install   

COPY . .

EXPOSE 7070

CMD [ "npm", "start" ]