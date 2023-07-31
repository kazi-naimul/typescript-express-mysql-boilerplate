FROM node:18-slim

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install
RUN npm ci --only=production

# Install tspath to handle paths resolution in build
RUN npx tspath

COPY . .

RUN npm run build

EXPOSE 5000

# Use tsconfig-paths/register when starting the app
CMD ["node", "-r", "tsconfig-paths/register", "build/index.js"]
