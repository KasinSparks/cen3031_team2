#include <iostream>
#include <occi.h>

#include "../secrets/db.hpp"

using namespace oracle::occi;

void dbtest()
{
	Environment *env = Environment::createEnvironment();

	Connection *conn = nullptr;
	try {
		conn = env->createConnection(OCDB_USERNAME, OCDB_PASSWORD, OCDB_CONNECTSTRING);
	} catch (SQLException ex) {
		std::cout << "Error code: " << ex.getErrorCode() << std::endl;
		std::cout << "Message: " << ex.getMessage() << std::endl;
		std::cout << "WHAT: " << ex.what() << std::endl;
		std::exit(1);
	}
	Statement *stmt = conn->createStatement(
	"SELECT * FROM City");
	ResultSet *rs = stmt->executeQuery();
	rs->next();
	while (rs->status() != ResultSet::Status::END_OF_FETCH) {
		std::cout << rs->getString(1) << std::endl;
		rs->next();
	}
	//Blob b = rs->getBlob(1);
	//cout << "Length of BLOB : " << b.length();
	//...

	stmt->closeResultSet(rs);
	conn->terminateStatement(stmt);
	env->terminateConnection(conn);

	Environment::terminateEnvironment(env);
}

int main()
{
	dbtest();
	return 0;
}
