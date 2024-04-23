from tools.table_prepend import sql_prepend
from flask import jsonify

## Returns the given number of top query results
def get_top_queries(db_pool, num_of_rows):
    with db_pool.acquire() as connection:
        with connection.cursor() as cursor:
            sql = '''SELECT * 
                     FROM {}.CENTopQueries
                     WHERE ROWNUM <= {}
                     ORDER BY SearchCount DESC'''.format(sql_prepend, num_of_rows)
            cursor.execute(sql)
            rows = cursor.fetchall()
            column_names = [col[0] for col in cursor.description]
            data = [dict(zip(column_names, row)) for row in rows]

    return jsonify(data)

## Inserts new search into top query table if the search has not be done before.
## If the search has been done at least once, update the number of times the 
## search has been requested.
def update_top_queries_table(db_pool, json_search_vals):
    sql = "SELECT QueryID FROM {}.CENTopQueries".format(sql_prepend)
    
    temp_count = 0
    where_clause = ""
    for key in json_search_vals:
        if temp_count != 0:
            where_clause += " AND "

        if json_search_vals[key] == "All":
            where_clause += str(key) + " is NULL"
        else:
            where_clause += str(key) + "='" + str(json_search_vals[key]) + "'"

        temp_count += 1

    
    if (temp_count > 0):
        sql += " WHERE {}".format(where_clause)

    with db_pool.acquire() as connection:
        with connection.cursor() as cursor:
            cursor.execute(sql)
            rows = cursor.fetchall()
            print(rows)
            modify_sql_stmt = "";
            if (len(rows) > 0 and rows[0][0] is not None):
                # Update the count
                modify_sql_stmt += "UPDATE {}.{}".format(sql_prepend, "CENTopQueries")
                modify_sql_stmt += " SET SearchCount="
                modify_sql_stmt += "(SELECT SearchCount FROM {}.CENTopQueries WHERE QueryID={}) + 1".format(sql_prepend, rows[0][0])
                modify_sql_stmt += " WHERE QueryID={}".format(rows[0][0])


            else:
                cursor.execute("SELECT MAX(QueryID) FROM {}.CENTopQueries".format(sql_prepend))
                highest_id_query = cursor.fetchall()
                highest_id = 1

                if (highest_id_query[0][0] is not None):
                    highest_id = int(highest_id_query[0][0])


                # Add the search
                modify_sql_stmt = "INSERT INTO {}.{}".format(sql_prepend, "CENTopQueries")
                modify_sql_stmt += " (QueryID, SearchCount, StateName, MeasureDesc, ProvisionGroupDesc, ProvisionDesc)"
                modify_sql_stmt += " VALUES ({}, {}, {}, {}, {}, {})".format(
                        int(highest_id) + 1,
                        1, 
                        convert_all_to_empty(json_search_vals["StateName"]), 
                        convert_all_to_empty(json_search_vals["MeasureDesc"]),
                        convert_all_to_empty(json_search_vals["ProvisionGroupDesc"]), 
                        convert_all_to_empty(json_search_vals["ProvisionDesc"])
                    )

            print(modify_sql_stmt)
            
            cursor.execute(modify_sql_stmt)

        connection.commit()
    return

# If the value is "All" change it to "NULL"
def convert_all_to_empty(val):
    if (str(val).lower() == "all"):
        return "NULL"

    return "'" + val + "'"
