FROM node:16

WORKDIR /api

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 8080

ENV PORT=8080
ENV PRIMARYKEY=19af81cd54c84e218adb728cf69fa96c
# COMEBACK: this is for running the start command inside the container
# CMD ["npm", "run", "start"] 