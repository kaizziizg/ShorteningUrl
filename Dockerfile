FROM node:latest
WORKDIR /usr/src/app
COPY . /usr/src/app
run npm install


CMD [ "npm", "start" ]