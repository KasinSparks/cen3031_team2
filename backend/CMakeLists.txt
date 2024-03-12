project(backend_server)

if (WIN32)
include_directories(include)
endif()

add_executable(backend_server)

target_sources(backend_server PRIVATE src/main.cpp)




project(database_test)

if (WIN32)
include_directories(include/instantclient_21_13/sdk/include)
link_directories(include/instantclient_21_13/sdk/lib/msvc)
link_libraries(ociw32.lib)
link_libraries(oraocci21d.lib)
endif()

add_executable(database_test src/testdb.cpp)

target_sources(database_test PRIVATE src/testdb.cpp)