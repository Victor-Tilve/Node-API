FROM node:16

WORKDIR /api

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 8080

# COMEBACK: this is for running the start command inside the container
# CMD ["npm", "run", "start"] 