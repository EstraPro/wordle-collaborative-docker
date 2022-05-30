FROM node:16.13.2-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN rm -rf package-lock.json 

RUN npm install -g npm@8.11.0
RUN npm install -g @ionic/cli
RUN npm install

COPY . .

EXPOSE 8100 8101

CMD [ "ionic", "serve" ]