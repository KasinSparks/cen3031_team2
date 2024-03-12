# Using Docker to Set up Instance
1. docker build --tag=[image_name]:[version.minor_version] .

(Do not forget the dot at the end)


2. docker container run --name=[container_name] --net=host -it [image_name]:[version.minor_version]

3. Restart the docker service for the network to work correctly. (Linux: systemctl restart docker)

# Add connection details for database
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

### Addtional Documentation
* CROW: https://crowcpp.org/master/


TODO:
* Put this as a env var, but make sure the path is correct for generic docker container export LD_LIBRARY_PATH=$LD_LIBRARY_PATH:~/instantclient_21_13/
