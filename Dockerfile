FROM node:14-slim

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install
RUN npm ci --only=production

COPY . .

RUN npm run build

EXPOSE 5000

CMD [ "node", "build/index.js" ]
