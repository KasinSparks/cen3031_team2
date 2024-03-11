# Using Docker to Set up Instance
1. docker build --tag=[image_name]:[version.minor_version] .

(Do not forget the dot at the end)


2. docker container run --name=[container_name] --net=host -it [image_name]:[version.minor_version]

3. Restart the docker service for the network to work correctly. (Linux: systemctl restart docker)

### Addtional Documentation
* CROW: https://crowcpp.org/master/


TODO:
* Put this as a env var, but make sure the path is correct for generic docker container export LD_LIBRARY_PATH=$LD_LIBRARY_PATH:~/instantclient_21_13/
