from flask import jsonify
from oracledb import IntegrityError, DatabaseError

from tools.table_prepend import sql_prepend


## Returns a JSON array of all the bookmarks associated with this user based on
## the user's id.
def fetch_user_bookmarks(db_pool, user_id):
    with db_pool.acquire() as connection:
        with connection.cursor() as cursor:
            sql = '''SELECT * 
                     FROM {}.CENBookmarks
                     WHERE UserID={}'''.format(sql_prepend, user_id)
            cursor.execute(sql)
            rows = cursor.fetchall()
            column_names = [col[0] for col in cursor.description]
            data = [dict(zip(column_names, row)) for row in rows]
    return jsonify(data)

## Adds a bookmark to the CENBookmark table
## NOTE: User verification shall be handled outside of this function.
## md  : MeasureDesc
## pd  : ProvisionDesc
## pgd : ProvisionGroupDesc
def add_user_bookmark(db_pool, user_id, md, pd, pgd, state, tag):
    ## Set up the sql insert string
    sql_str = '''
        INSERT INTO {}.CENBookmarks
        (UserID, MeasureDesc, ProvisionDesc, ProvisionGroupDesc, StateName, Tag)
        VALUES ({}, {}, {}, {}, {}, {})
        '''.format(sql_prepend, user_id, md, pd, pgd, state, tag)

    print(sql_str)

    with db_pool.acquire() as connection:
        with connection.cursor() as cursor:
            try:
                cursor.execute(sql_str)
            except IntegrityError:
                print("User bookmark already saved in DB")
                return "User bookmark already saved in DB"

        connection.commit()
    
    # Return a good status code
    return '200' 

## Returns status code 200 on success or an error message on failure
def delete_user_bookmark(db_pool, user_id, tag):
    sql_str = '''DELETE 
                 FROM {}.CENBookmarks
                 WHERE UserID={} AND Tag=\'{}\''''.format(sql_prepend, user_id, tag)
    with db_pool.acquire() as connection:
        with connection.cursor() as cursor:
            try:
                cursor.execute(sql_str)
            except DatabaseError:
                print("Could not delete bookmark with user_id:{} and tag:{}".format(user_id, tag))
                return "Could not delete bookmark with user_id:{} and tag:{}".format(user_id, tag)
        
        connection.commit()
    
    # Return a good status code
    return '200' 
