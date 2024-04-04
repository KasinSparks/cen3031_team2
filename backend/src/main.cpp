#include "crow.h"
#include "crow/middlewares/cors.h"
#include <iostream>
#include <occi.h>
#include <exception>

#include "../secrets/db.hpp"

#include "./parse_helper.hpp"

using namespace oracle::occi;


int main()
{

    // Create the Crow backend api app handler
    // Enable CORS
    crow::App<crow::CORSHandler> app;

    // Customize CORS
    auto& cors = app.get_middleware<crow::CORSHandler>();

    // clang-format off
    cors
        .global()
        .headers("X-Custom-Header", "Upgrade-Insecure-Requests")
        .methods("POST"_method, "GET"_method)
        .prefix("/cors")
        .origin("localhost:3000")
        .prefix("/nocors")
        .ignore();
    // clang-format on

    CROW_ROUTE(app, "/")([]() {
        return "Hello world";
        });

    CROW_ROUTE(app, "/json")
        ([] {
        crow::json::wvalue x({ {"message", "Hello, World!"} });
        x["message2"] = "Hello, World.. Again!";
        return x;
            });


    CROW_ROUTE(app, "/hello/<int>")
        ([](int count) {
        return crow::response(std::to_string(count));
            });

    CROW_ROUTE(app, "/testapi")([]() {
        return "Connected";
        });

    // WARNING: This does not defend against SQL Injection attacks!!!!
    //          Do NOT use in a production environment
    // EXAMPLE: http://localhost/datafilters/CENHealthData/Year
    CROW_ROUTE(app, "/datafilters/<string>/<string>")
        ([](std::string table_name, std::string column_name) {
        crow::json::wvalue x({});
        unsigned long count = 0;

        Environment* env = Environment::createEnvironment();
        Connection* conn = nullptr;
        try {
            conn = env->createConnection(OCDB_USERNAME, OCDB_PASSWORD, OCDB_CONNECTSTRING);
        }
        catch (SQLException ex) {
            std::cout << "Error code: " << ex.getErrorCode() << std::endl;
            std::cout << "Message: " << ex.getMessage() << std::endl;
            std::cout << "WHAT: " << ex.what() << std::endl;
            std::exit(1);
        }

        // Inefficient way to do this, but hey, it works
        std::string query_stmt = "SELECT Distinct " + column_name + " FROM " + table_name;

        std::cout << query_stmt << std::endl;

        Statement* stmt = conn->createStatement(query_stmt);
        ResultSet* rs = stmt->executeQuery();
        rs->next();
        while (rs->status() != ResultSet::Status::END_OF_FETCH) {
            //std::cout << rs->getString(1) << std::endl;
            //my_vec.push_back(rs->getString(1));
            x[count++] = rs->getString(1);
            rs->next();
        }
        //Blob b = rs->getBlob(1);
        //cout << "Length of BLOB : " << b.length();
        //...

        stmt->closeResultSet(rs);
        conn->terminateStatement(stmt);


        // Close the DB connection when we are done with the backend app
        env->terminateConnection(conn);

        Environment::terminateEnvironment(env);
        return x;
            });


    // WARNING: This does not defend against SQL Injection attacks!!!!
    //          Do NOT use in a production environment
    // NOTE: /run_query
    // EXAMPLE: /run_query
    CROW_ROUTE(app, "/get_tuples").methods(crow::HTTPMethod::POST)
        ([](const crow::request& req) {
        crow::json::wvalue x({});
        unsigned long count = 0;

        std::cout << "Body: " << std::endl;
        std::cout << req.body << std::endl;

        std::map<std::string, std::string> body_vals;
        parse_post_body_params(req.body, body_vals);

        for (auto p : body_vals) {
            std::cout << p.first << ", " << p.second << std::endl;
        }

        // Not the best way to do this, but it works
        std::string sql_stmt = "SELECT " + body_vals["SELECT"];
        sql_stmt += " FROM " + body_vals["FROM"];
        if (body_vals["WHERE"] != "") {
            sql_stmt += " WHERE " + body_vals["WHERE"];
        }

        std::cout << sql_stmt << std::endl;

        std::vector<std::string> column_names;
        parse_simple_csv(body_vals["SELECT"], column_names);

        int num_of_cols = 0;
        try {
            num_of_cols = std::stoi(body_vals["NumOfCols"]);
        }
        catch (std::invalid_argument ex) {
            std::cerr << "Could not get the number of cols from frontend.\n" << ex.what() << std::endl;
        }

        if (column_names.size() != num_of_cols) {
            std::cerr << "NumOfCols: " << num_of_cols;
            std::cerr << " does not match number of columns supplied: ";
            std::cerr << column_names.size() << std::endl;
        }

        for (int i = 0; i < num_of_cols; ++i) {
            x["columns"][i]["key"] = column_names[i];
            x["columns"][i]["name"] = column_names[i];
        }


        Environment* env = Environment::createEnvironment();
        Connection* conn = nullptr;
        try {
            conn = env->createConnection(OCDB_USERNAME, OCDB_PASSWORD, OCDB_CONNECTSTRING);
        }
        catch (SQLException ex) {
            std::cout << "Error code: " << ex.getErrorCode() << std::endl;
            std::cout << "Message: " << ex.getMessage() << std::endl;
            std::cout << "WHAT: " << ex.what() << std::endl;
            std::exit(1);
        }

        Statement* stmt = conn->createStatement(sql_stmt);
        ResultSet* rs = stmt->executeQuery();
        rs->next();
        while (rs->status() != ResultSet::Status::END_OF_FETCH) {
            for (int i = 0; i < num_of_cols; ++i) {
                x["data"][count][column_names[i]] = rs->getString(i + 1);
            }
            count++;
            //std::cout << test << std::endl;
            rs->next();
        }

        stmt->closeResultSet(rs);
        conn->terminateStatement(stmt);
        env->terminateConnection(conn);

        Environment::terminateEnvironment(env);

        return x;
            });

    app.port(8080).run();
}
