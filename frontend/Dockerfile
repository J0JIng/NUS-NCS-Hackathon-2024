FROM node:20-alpine

RUN apk update && apk upgrade

COPY . .
WORKDIR /production
RUN npm install

EXPOSE 8081
EXPOSE 19006


CMD ["npx", "expo", "start", "--web"]
