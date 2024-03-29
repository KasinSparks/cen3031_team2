FROM ubuntu:latest

RUN apt-get update && apt-get upgrade -y
RUN apt-get install -y git g++ make cmake zlib1g-dev libasio-dev build-essential openssl python3 curl wget unzip libaio1 npm
RUN npm install -g n && n lts
RUN git clone https://github.com/CrowCpp/Crow.git && cd Crow && mkdir build && cd build && cmake .. -DCROW_BUILD_EXAMPLES=OFF -DCROW_BUILD_TESTS=OFF && make install
RUN wget https://download.oracle.com/otn_software/linux/instantclient/2113000/instantclient-basic-linux.x64-21.13.0.0.0dbru.zip
RUN wget https://download.oracle.com/otn_software/linux/instantclient/2113000/instantclient-sdk-linux.x64-21.13.0.0.0dbru.zip
RUN unzip instantclient-basic-linux.x64-21.13.0.0.0dbru.zip && unzip instantclient-sdk-linux.x64-21.13.0.0.0dbru.zip

COPY ./ /cen3031_team2

RUN echo "export LD_LIBRARY_PATH=$LD_LIBRARY_PATH:/cen3031_team2/backend/include/instantclient_21_13/linux_libs/" >> .bashrc

RUN cd cen3031_team2/backend/include/instantclient_21_13/ && mkdir linux_libs && cp /instantclient_21_13/*.so* ./linux_libs/ && cd /

RUN mkdir /cen3031_team2/build && cd /cen3031_team2/build/ && cmake ..

EXPOSE 8080
EXPOSE 3000
