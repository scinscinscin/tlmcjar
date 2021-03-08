FROM node:15-alpine
WORKDIR /app
COPY package*.json ./
COPY build/ ./
RUN npm install -g serve
COPY . .
CMD [ "npm", "run", "production" ]