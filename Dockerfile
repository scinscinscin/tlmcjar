FROM node:15-alpine
WORKDIR /app
COPY . .
RUN npm install -g serve
CMD [ "npm", "run", "production" ]