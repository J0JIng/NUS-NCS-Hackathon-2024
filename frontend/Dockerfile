FROM node:20-alpine

RUN apk update && apk upgrade

COPY . .
WORKDIR /production
RUN npm install

EXPOSE 8081

CMD ["npm", "start"]



