# cen3031_team2
The semester group project for CEN3031


# Setting up Your Development Enviroment
## Windows
1. Install git from https://git-scm.com/downloads (You may want to change the default editor to notepad or something else, unless you know how to use Vim) (The other default options should be fine).

2. Open the Command Propmt (cmd)

3. Run the following commands:

    * `git clone https://github.com/kasinsparks/cen3031_team2

    * `cd cen3031_team2`

4. Install nodejs (https://nodejs.org/dist/v21.7.1/node-v21.7.1-x64.msi)

5. Use `cd` and `dir` to change and list directories. Change into wherever you cloned the cen3031_team2 repo, then `cd` into the frontend folder.

6. Run the following commands when you are in the frontend folder:

    * `npm install`

    * `npm start`

7. If propmted, allow firewall access

7.1. Check in your browser at localhost:3000 to see if the front end worked!

8. Use ctrl+x in the command prompt to stop the frontend server.

9. Copy all the .dll files in the backend\include\instantclient_21_13\windows_libs\ to C:\Windows\

10. Open Visual Studio 2022, and choose the cen3031_team2 folder as the "Open a local folder" option.

11. Goto section "Connecting to the DB"

11. You are ready to begin developing!

## Mac
TODO

## Linux
1. Download the oracle libraries at (https://download.oracle.com/otn_software/linux/instantclient/2113000/instantclient-basic-linux.x64-21.13.0.0.0dbru.zip).

2. Move all the .so files to cen3031_team2/backend/include/instantclient_21_13/linux_libs/

TODO

## Docker
# Using Docker to Set up Instance
1. docker build --tag=[image_name]:[version.minor_version] .

(Do not forget the dot at the end)


2. docker container run --name=[container_name] --net=host -it [image_name]:[version.minor_version]

3. Restart the docker service for the network to work correctly. (Linux: systemctl restart docker)

4. Start and attach to the continaer using the following commands:

    * docker container start [container_name]

    * docker container attach [container_name]

5. Goto the section "Connecting the the DB"

6. Goto Building the Project

TODO: NOTE: Put this as a env var everytime you run start up the container, but make sure the path is correct for generic docker container export LD_LIBRARY_PATH=$LD_LIBRARY_PATH:/cen3031_team2/backend/include/instantclient_21_13/linux_libs/


# Connecting to the DB
## First Time Setup
1. Create the folder secrets in the cen3031_team2 directory
2. Create the file db.hpp in the secrets directory
3. Add the following to db.hpp and insert your details inside the double-quotes
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
4. IMPORTANT: Make sure you do not check any file in the secrets folder into git. The gitignore should handle this, but make sure not to override. 



# Building the Project
## Windows

Use Visual Studio 2022 or CMake to build the project.

## Mac & Linux & Docker

1. In the cen3031_team2 directory, run the command `mkdir build && cd build`

2. Run `cmake ..` and then run `make`


# Running the Project
TODO: Merge the database connection into the backend, and only have one executable for the backend. 
## (NOTE: You will have to run both the frontend and the backend at the same time)
## (NOTE: In order to connect to the database, you must be on UF campus or access the UF network via vpn)

## Frontend
1. cd into the frontend directory

2. Run `npm start`

3. Connect the to frontend via web-browser at localhost:3000

## Backend
### Windows
1. Click the build button or run the exe in the command prompt

2. Optional, connect to the backend api at localhost:8080

3. TODO: Merge the database connection into the backend, and only have one executable for the backend. 

### Mac & Linux & Docker
1. In a terminal, cd into frontend. Run `npm start`. Connect with your web-browser at localhost:3000

2. In a separate terminal, cd into the build directory (cen3031_team2/build). Run `./backend/backend_server` for the backend_api server or run `./backend/database_test` for the database connection test. Optional: connect with curl or your web-browser at localhost:8080
