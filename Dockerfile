FROM ubuntu:latest

RUN apt-get update && apt-get upgrade -y
RUN apt-get install -y git g++ make cmake zlib1g-dev libasio-dev build-essential openssl python3 curl wget unzip npm
RUN npm install -g n && n lts

COPY ./ /cen3031_team2

EXPOSE 8080
EXPOSE 3000
