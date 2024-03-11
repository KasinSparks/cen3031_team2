all:
	g++ ./src/main.cpp -lpthread -o ./build/backend_server


dbtest:
	g++ ./src/testdb.cpp -I../../instantclient_21_13/sdk/include/ -L../../instantclient_21_13 -l:libclntshcore.so.21.1 -l:libnnz21.so -locci_gcc53 -lclntsh -lpthread -l:libocci_gcc53.so.21.1 -o ./build/dbtest
