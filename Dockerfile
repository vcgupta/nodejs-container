
FROM node:14.7.0

WORKDIR /app

COPY package.json package.json

COPY package-lock.json package-lock.json

RUN npm install

COPY . . 

CMD [ "node", "server.js" ]

