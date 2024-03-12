#include "crow.h"
#include "crow/middlewares/cors.h"

int main()
{
    crow::App<crow::CORSHandler> app;

    CROW_ROUTE(app, "/")([](){
        return "Hello world";
    });

    CROW_ROUTE(app, "/json")
    ([]{
        crow::json::wvalue x({{"message", "Hello, World!"}});
	x["message2"] = "Hello, World.. Again!";
	return x;
    });


    CROW_ROUTE(app,"/hello/<int>")
    ([](int count){
        return crow::response(std::to_string(count));
    });

    CROW_ROUTE(app, "/testapi")([](){
        return "Connected";
    });

    app.port(8080).run();
}
