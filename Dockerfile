FROM ubuntu:latest

RUN apt update && apt upgrade -y
RUN apt install -y git g++ make cmake zlib1g-dev libasio-dev build-essential openssl python3 curl wget unzip
RUN git clone https://github.com/CrowCpp/Crow.git && cd Crow && mkdir build && cd build && cmake .. -DCROW_BUILD_EXAMPLES=OFF -DCROW_BUILD_TESTS=OFF && make install
RUN cd cen3031_team2/backend && mkdir build && make

COPY ./ /cen3031_team2

EXPOSE 8080
