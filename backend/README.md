# Using Docker to Set up Instance
1. docker build --tag=[image_name]:[version.minor_version] .

(Do not forget the dot at the end)


2. docker container run --name=[container_name] --net host -it [image_name]:[version.minor_version]

### Addtional Documentation
* CROW: https://crowcpp.org/master/
