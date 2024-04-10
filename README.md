# cen3031_team2
The semester group project for CEN3031


# 1. Setting up Your Development Environment
## 1.1 Windows, Mac, Linux
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

   1.1.10. Download and install [Python](https://www.python.org/downloads/)

   1.1.11. Install necessary dependences (Flask, oracledb, python-dotenv, flask-bcrypt)

   1.1.11.a. (OPTIONAL) create a virtual environment for the application development so python packages do not conflict and are local to this application.
        
            Inside of the backend folder, run `python -m venv .venv` then `. .venv/bin/activate`

            NOTE: The latter command, will have to be executed each time you restart the terminal

   1.1.12. Run the following command, using one of the two formats, to install python depenedences. (Commands in the examples will use format 2):
     
            Format 1: `python -m pip install`
            Format 2: `pip install`

             * `pip install Flask oracledb python-dotenv flask-bcrypt` 

   1.1.13. Goto section 2: "Connecting to the DB"

# 2 Connecting to the DB
## 2.1 First-Time Setup
2.1.1. Create the file .env in the src folder inside of the backend directory (e.g. cen3031_team2/backend/src/.env)
2.1.2. Add the following to .env and insert your details after `DB_USERNAME=` and `DB_PASSWORD=`
```
DB_USERNAME=
DB_PASSWORD=
DB_HOST=oracle.cise.ufl.edu
DB_PORT=1521
DB_SERVICE_NAME_OR_SID=orcl
```
2.1.3. 
IMPORTANT: Make sure you do not check any file in the secrets folder into git. The .gitignore should handle this, but make sure not to override.

2.1.6. Goto section Running the Project


# 4 Running the Project
* NOTE: You will have to run both the frontend and the backend at the same time

* NOTE: In order to connect to the database, you must be on the UF network (access the UF network via VPN)

## 4.1 Frontend
### All OS
4.1.1. cd into the frontend directory

4.1.2. Run `npm start`

4.1.3. Connect the to frontend via web browser at localhost:3000

## 4.2 Backend
### All OS
4.2.1. cd into the backend/src directory

4.2.2. Run `python server.py`

4.2.3 Optional: connect using localhost:8080
