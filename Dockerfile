FROM ubuntu:latest

RUN apt update && apt upgrade -y
RUN apt install -y git g++ make cmake zlib1g-dev libasio-dev build-essential openssl python3 curl wget unzip libaio1 npm
RUN npm install -g n && n lts
RUN git clone https://github.com/CrowCpp/Crow.git && cd Crow && mkdir build && cd build && cmake .. -DCROW_BUILD_EXAMPLES=OFF -DCROW_BUILD_TESTS=OFF && make install
RUN wget https://download.oracle.com/otn_software/linux/instantclient/2113000/instantclient-basic-linux.x64-21.13.0.0.0dbru.zip
RUN wget https://download.oracle.com/otn_software/linux/instantclient/2113000/instantclient-sdk-linux.x64-21.13.0.0.0dbru.zip
RUN unzip instantclient-basic-linux.x64-21.13.0.0.0dbru.zip && unzip instantclient-sdk-linux.x64-21.13.0.0.0dbru.zip

COPY ./ /cen3031_team2

RUN cd cen3031_team2/backend && mkdir build && make

EXPOSE 8080
EXPOSE 3000
