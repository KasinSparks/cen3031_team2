# CMakeList.txt : CMake project for cen3031_team2, include source and define
# project specific logic here.
#
cmake_minimum_required (VERSION 3.8)

#set(CMAKE_CXX_COMPILER "g++")
#set(CMAKE_C_COMPILER "gcc")


if (WIN32)
  # Enable Hot Reload for MSVC compilers if supported.
  if (POLICY CMP0141)
    cmake_policy(SET CMP0141 NEW)
    set(CMAKE_MSVC_DEBUG_INFORMATION_FORMAT "$<IF:$<AND:$<C_COMPILER_ID:MSVC>,$<CXX_COMPILER_ID:MSVC>>,$<$<CONFIG:Debug,RelWithDebInfo>:EditAndContinue>,$<$<CONFIG:Debug,RelWithDebInfo>:ProgramDatabase>>")
  endif()
endif()

project ("cen3031_team2")

# Add source to this project's executable.
#add_executable (cen3031_team2 "cen3031_team2.cpp" "cen3031_team2.h")
add_subdirectory(backend)

if (CMAKE_VERSION VERSION_GREATER 3.12)
  #set_property(TARGET cen3031_team2 PROPERTY CXX_STANDARD 20)
endif()

# TODO: Add tests and install targets if needed.
