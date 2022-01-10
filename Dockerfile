FROM node:16

ENV CONTAINER_PATH /var/www/

WORKDIR $CONTAINER_PATH

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 8080

CMD ["npm", "run", "serve"]