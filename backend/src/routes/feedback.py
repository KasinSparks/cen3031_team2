from flask import session, jsonify
from datetime import datetime
from oracledb import IntegrityError, DatabaseError

from tools.table_prepend import sql_prepend

## Returns the JSON formatted tuples from the feedback table
def get_feedback(db_pool, user_id):
    with db_pool.acquire() as connection:
        with connection.cursor() as cursor:
            ## Create the bulk of the sql string
            sql = '''SELECT {}.CENUsers.UserID, FirstName, LastName, Rating, FeedbackText, FeedbackTime
                     FROM {}.CENFeedback
                     JOIN {}.CENUsers ON {}.CENUsers.UserID = {}.CENFeedback.UserID'''.format(sql_prepend, sql_prepend, sql_prepend, sql_prepend, sql_prepend)
            
            ## Check to ensure the user is logged in
            if (user_id is not None):
                sql += '''\n WHERE {}.CENUsers.UserID = {}'''.format(sql_prepend, user_id)
            
            ## Finish the query string with the order by clause
            sql += '''\n ORDER BY FeedbackTime DESC'''
            
            ## Run the sql command and store the results as a json object
            cursor.execute(sql)
            rows = cursor.fetchall()
            column_names = [col[0] for col in cursor.description]
            data = [dict(zip(column_names, row)) for row in rows]
    
    ## return the JSON data
    return jsonify(data)

## Inserts the feedback from the user using the JSON data provided
## JSON data must have one dictionary containing a key/value for rating and text
def add_feedback(db_pool, json_post_data):
    if 'user_id' in session:
        user_id = session['user_id']

        curr_dt = datetime.now()
        timestamp_sql_str = "TO_TIMESTAMP('" + str(curr_dt.day) + "/" + str(curr_dt.month) + "/" + str(curr_dt.year) + " " + str(curr_dt.hour) + ":" + str(curr_dt.minute) + ":" + str(curr_dt.second) + "', 'DD/MM/YYYY HH24::MI::SS')"

        rating = json_post_data["rating"]
        feedback_text = json_post_data["text"]

        print(timestamp_sql_str)

        sql_str = '''
            INSERT INTO {}.CENFeedback
            (UserID, Rating, FeedbackText, FeedbackTime)
            VALUES ({}, {}, \'{}\', {})
            '''.format(sql_prepend, user_id, rating, feedback_text, timestamp_sql_str)

        print(sql_str)

        with db_pool.acquire() as connection:
            with connection.cursor() as cursor:
                try:
                    cursor.execute(sql_str)
                except IntegrityError:
                    return "Unable to save feedback. Please try again later"

            connection.commit()
        
        # Return a good status code
        return 'Thank you for your feedback!' 

    return 'Must be logged in to submit feedback' 
