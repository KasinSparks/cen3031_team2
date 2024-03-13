# cen3031_team2
The semester group project for CEN3031


# 1. Setting up Your Development Environment
## 1.1 Windows
   1.1.1. Install [Git](https://git-scm.com/downloads) (You may want to change the default editor to Notepad or something else unless you know how to use Vim) (The other default options should be fine).

   1.1.2. Open the Command Prompt (cmd)

   1.1.3. Run the following commands:

    * `git clone https://github.com/kasinsparks/cen3031_team2`

    * `cd cen3031_team2`

   1.1.4. Install [Nodejs](https://nodejs.org/dist/v21.7.1/node-v21.7.1-x64.msi)

   1.1.5. Use `cd` and `dir` to change and list directories. Change into wherever you cloned the cen3031_team2 repo, then `cd` into the frontend folder.

   1.1.6. Run the following commands when you are in the frontend folder:

    * `npm install`

    * `npm start`

   1.1.7. If prompted, allow firewall access

   1.1.8. Check in your browser at http://localhost:3000 to see if the front end worked!

   1.1.9. Use ctrl+c in the command prompt to stop the frontend server.

   1.1.10. Download the Oracle DB Instant Connect Client libraries. [Oracle Instant Client Downloads](https://download.oracle.com/otn_software/nt/instantclient/2113000/instantclient-basic-windows.x64-21.13.0.0.0dbru.zip)

   1.1.11. Copy all the .dll files in the Oracle Instant Client folder you just downloaded to C:\Windows\System32\

   ### Using Visual Studio 2022

   * Open Visual Studio 2022, and choose the cen3031_team2 folder as the "Open a local folder" option.
   * Wait for Visual Studio 2022 to generate the needed makefiles from CMake (around 1 or 2 minutes). Once it is done, you will be able to run the project with the play button at the top. 

   ### Using Mingw64 TODO: verify this works

   In the project's root directory, run the following commannds:
   * `mkdir build && cd build`
   * `cmake .. && make` 

   1.1.12. Goto section "Connecting to the DB"

## 1.2 Mac (TODO: Not verified yet)
1.2.0. Install git, cmake, npm, and gcc / g++
1.2.1. Run the following commands:

    * `git clone https://github.com/kasinsparks/cen3031_team2`

    * `cd cen3031_team2`

1.2.2. Run the following commands:
   * `cd frontend`
   * `npm install`
   * `npm start`

1.2.3 You can see if the frontend worked by opening http://localhost:3000 in your web browser. Use ctrl+c to exit.

1.2.4. Download the Oracle libraries at [Oracle Instant Client (Mac)](https://download.oracle.com/otn_software/mac/instantclient/1916000/instantclient-basic-macos.x64-19.16.0.0.0dbru.dmg).

   NOTE: TODO: add the mac_libs folder, and add the instant client header files

1.2.5. Move all the .so files to cen3031_team2/backend/include/instantclient_21_13/mac_libs/

1.2.6 Run the following commands:
   * `cd ../backend`
   * `mkdir build && cd build`
   * `cmake .. && make`
   * `export LD_LIBRARY_PATH=$LD_LIBRARY_PATH:/cen3031_team2/backend/include/instantclient_21_13/mac_libs`

1.2.7. You can run the backend API server by using the following command: `./backend/backend_server`. You can access this via curl or web at http://localhost:8080.
1.2.8. Goto section "Connecting to the DB"
1.2.9. 
TODO

## 1.3 Linux
1.3.0. Install git, gcc, g++, make, cmake zlib1g-dev libasio-dev build-essential openssl, python3, curl, wget, unzip libaio1, and npm

1.3.1. You may have to update Node. To do so, run `npm install -g n && n lts`

1.3.2. `git clone https://github.com/kasinsparks/cen3031_team2`

1.3.3. Download the Oracle libraries at [Oracle Instant Client (Linux)](https://download.oracle.com/otn_software/linux/instantclient/2113000/instantclient-basic-linux.x64-21.13.0.0.0dbru.zip).

1.3.4. Move all the .so files to cen3031_team2/backend/include/instantclient_21_13/linux_libs/

1.3.5. Run `export LD_LIBRARY_PATH=$LD_LIBRARY_PATH:/cen3031_team2/backend/include/instantclient_21_13/linux_libs/`

   NOTE: Save this in your ~/.bashrc or ~/.profile so you don't have to enter this every time a terminal gets closed.

1.3.6. Run the following commands:
   * `cd frontend`
   * `npm install`
   * `npm start`

1.3.7 You can see if the frontend worked by opening http://localhost:3000 in your web browser. Use ctrl+c to exit.

1.3.8. Run the following commands
   * `cd ../backend`
   * `mkdir build && cd build`
   * `cmake .. && make`
     
1.3.9. You can run the backend API server by using the following command: `./backend/backend_server`. You can access this via curl or web at http://localhost:8080.
1.3.10. Goto section "Connecting to the DB"

TODO

## 1.4 Docker
### Using Docker to Set up Instance
1.4.1. docker build --tag=[image_name]:[version.minor_version] .

   (Do not forget the dot at the end)


1.4.2. docker container run --name=[container_name] --net=host -it [image_name]:[version.minor_version]

1.4.3. Restart the docker service for the network to work correctly. (Linux: systemctl restart docker)

1.4.4. Start and attach to the container using the following commands:

    * docker container start [container_name]

    * docker container attach [container_name]

1.4.5. Goto the section "Connecting the DB"

1.4.6. Goto Building the Project

TODO: NOTE: Put this as an environment variable every time you run start up the container, but make sure the path is correct for generic docker container `export LD_LIBRARY_PATH=$LD_LIBRARY_PATH:/cen3031_team2/backend/include/instantclient_21_13/linux_libs/`


# 2 Connecting to the DB
## 2.1 First-Time Setup
2.1.1. Create the folder secrets in the cen3031_team2/backend directory
2.1.2. Create the file db.hpp in the secrets directory
2.1.3. Add the following to db.hpp and insert your details inside the double-quotes
```
#ifndef OCDB_USERNAME
#define OCDB_USERNAME ""
#endif

#ifndef OCDB_PASSWORD
#define OCDB_PASSWORD ""
#endif

#ifndef OCDB_CONNECTSTRING
#define OCDB_CONNECTSTRING "oracle.cise.ufl.edu:1521/orcl"
#endif
```
2.1.4. You may have to rebuild the project (in the build directory, use `cmake .. && make`)
2.1.5. 
IMPORTANT: Make sure you do not check any file in the secrets folder into git. The .gitignore should handle this, but make sure not to override.

2.1.6. Goto section Building the Project



# 3 Building the Project
## 3.1 Windows

Use Visual Studio 2022 or CMake to build the project.

## 3.2 Mac & Linux & Docker

3.2.1. In the cen3031_team2 directory, run the command `mkdir build && cd build`

3.2.2. Run `cmake ..` and then run `make`

3.2.3. Goto Running the Project



# 4 Running the Project
* TODO: Merge the database connection into the backend and only have one executable for the backend. 

* NOTE: You will have to run both the frontend and the backend at the same time

* NOTE: In order to connect to the database, you must be on the UF network (access the UF network via VPN)



## 4.1 Frontend
### All OS
4.1.1. cd into the frontend directory

4.1.2. Run `npm start`

4.1.3. Connect the to frontend via web browser at localhost:3000

## 4.2 Backend
### 4.2.1 Windows
* Click the build button or run the exe in the command prompt

* Optional view to the backend API at http://localhost:8080

* TODO: Merge the database connection into the backend and only have one executable for the backend. 

### 4.2.2 Mac & Linux & Docker
* In a terminal, cd into frontend. Run `npm start`. Connect with your web browser at http://localhost:3000

* In a separate terminal, cd into the build directory (cen3031_team2/build). Run `./backend/backend_server` for the backend_api server or run `./backend/database_test` for the database connection test. Optional: connect with curl or your web browser at http://localhost:8080
