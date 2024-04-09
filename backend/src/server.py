from flask import Flask, jsonify, request
from dotenv import load_dotenv
import oracledb
import os

from parse_helper import *

app = Flask(__name__)

# from dotenv import load_dotenv
load_dotenv()

# Load environment variables from .env file


username = os.getenv("DB_USERNAME")
password = os.getenv("DB_PASSWORD")
host = os.getenv("DB_HOST")
port = os.getenv("DB_PORT")
service_name_or_SID = os.getenv("DB_SERVICE_NAME_OR_SID")

def start_pool():
    # Create database connection pool
    pool_min = 4
    pool_max = 4
    pool_inc = 0

    pool = oracledb.create_pool(
        user=username,
        password=password,
        dsn=f"{host}:{port}/{service_name_or_SID}",
        min=pool_min,
        max=pool_max,
        increment=pool_inc
    )
    return pool


@app.route('/fetchtable/<string:table_name>')
def fetchtable(table_name):
    count = 0
    with pool.acquire() as connection:
        with connection.cursor() as cursor:
            sql = "SELECT * FROM {}".format(table_name)
            cursor.execute(sql)
            rows = cursor.fetchall()
            column_names = [col[0] for col in cursor.description]
            data = [dict(zip(column_names, row)) for row in rows]
    return jsonify(data)


@app.route('/datafilters/<string:table_name>/<string:column_name>')
def datafilters(table_name, column_name):
    with pool.acquire() as connection:
        with connection.cursor() as cursor:
            sql = "SELECT DISTINCT {} FROM {}".format(column_name, table_name)
            cursor.execute(sql)
            rows = cursor.fetchall()
            data = [row[0] for row in rows]
    return data


@app.route('/get_tuples', methods=['POST'])
def get_tuples():
    content_type = request.headers.get('Content-Type')
    if content_type == 'application/json':
        json = request.json
        count = 0

        body_vals={}
        parse_post_body_params(json.body, body_vals)

        sql_stmt = "SELECT " + body_vals["SELECT"]
        sql_stmt += " FROM " + body_vals["FROM"]
        if body_vals["WHERE"] != "":
            sql_stmt += " WHERE " + body_vals["WHERE"]

        column_names = []
        parse_simple_csv(body_vals["SELECT"], column_names)
        num_of_cols = 0

        try :
            num_of_cols = int(body_vals["NumOfCols"])
        except Exception as e:
            print("Could not get the number of cols from frontend.\n", e)

        if len(column_names) != num_of_cols:
            print("NumOfCols: ", num_of_cols)
            print("does not match number of columns supplied: ", len(column_names))

        for i in range(num_of_cols):
            json["columns"][i]["key"] = column_names[i]
            json["columns"][i]["name"] = column_names[i]
        with pool.acquire() as connection:
            with connection.cursor() as cursor:
                rs = cursor.execute(sql_stmt)
                for i in range(num_of_cols):
                    json["data"][count][column_names[i]] = rs.getString(i + 1)
                count+=1

        return json
    else:
        return 'Content-Type not supported!'



if __name__ == '__main__':
    pool = start_pool()
    app.run(host="localhost", port=8080, debug=True)
