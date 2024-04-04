project(backend_server)

include_directories(include)


if (WIN32)
    include_directories(include/instantclient_21_13/win32_sdk/include)
    link_directories(include/instantclient_21_13/win32_sdk/lib/msvc)
    link_libraries(ociw32.lib)
    link_libraries(oraocci21d.lib)
elseif (UNIX)
    include_directories(include/instantclient_21_13/linux_sdk)
    link_directories(include/instantclient_21_13/linux_libs)
    link_libraries(libclntsh.so)
    link_libraries(libclntshcore.so)
    link_libraries(libnnz21.so)
    #link_libraries(libocci.so)
    link_libraries(libocci_gcc53.so)
    link_libraries(clntsh)
    #link_libraries(libociei.so)
    #link_libraries(libocijdbc21.so)
    #link_libraries(liboramysql.so)
    link_libraries(pthread)
endif()

add_executable(backend_server)

target_sources(backend_server PRIVATE src/main.cpp)

