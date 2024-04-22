from flask import Flask, jsonify, request, send_file, url_for
from flask_bcrypt import Bcrypt
from dotenv import load_dotenv
import oracledb
import os
import json

from email.mime.text import MIMEText  
from email.mime.multipart import MIMEMultipart 
import smtplib 

from tools.parse_helper import *

from routes.bookmark_routes import *
from routes.user_auth import *
from routes.top_queries import *
from routes.feedback import *

app = Flask(__name__)

# Bcrypt obj
bcrypt = Bcrypt(app)

# from dotenv import load_dotenv
load_dotenv()

# Load environment variables from .env file


username = os.getenv("DB_USERNAME")
password = os.getenv("DB_PASSWORD")
host = os.getenv("DB_HOST")
port = os.getenv("DB_PORT")
service_name_or_SID = os.getenv("DB_SERVICE_NAME_OR_SID")

# Set the secret key
app.secret_key = os.getenv("SECRET_KEY")

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


@app.route('/get_tuples/<string:table_name>', methods=['POST'])
def get_tuples(table_name):
    # Only accept post requests
    if (request.method != 'POST'):
        return 'Use POST to get data'
    
    # Decode the json provided from the frontend. 
    # NOTE: json.loads is very picky about formating of json
    json_post_data = json.loads(request.get_data().decode('utf-8'))
    where_clause = "";
    temp_count = 0
    
    # Skip the columns the user selected all on
    for key in json_post_data:
        if json_post_data[key] != "All":
            if temp_count != 0:
                where_clause += " AND "

            where_clause += str(key) + "='" + str(json_post_data[key]) + "'"
            temp_count += 1
    
    # Build the query string
    sql_stmt = "SELECT * FROM {}".format(table_name)
    if (temp_count > 0):
        sql_stmt += " WHERE {}".format(where_clause)

    #print(sql_stmt)
    
    # Run the query through the db
    with pool.acquire() as connection:
        with connection.cursor() as cursor:
            rs = cursor.execute(sql_stmt)
            rows = cursor.fetchall()
            column_names = [col[0] for col in cursor.description]
            
            # stucture for the DataViewer
            payload = { 
                    "columns" : [], 
                    "data" : [] 
                }

            for c in column_names:
                payload["columns"].append({ "key":c, "name":c })

            for r in rows:
                temp_dict = dict(zip(column_names, r))
                payload["data"].append(temp_dict)

    update_top_queries_table(pool, json_post_data)
    
    return jsonify(payload)

## Get all of the user's bookmarks
@app.route('/bookmarks/get/', methods=['GET'])
def get_user_bookmarks():
    user_id = get_curr_user_id()
    if (user_id is None):
        return "Must be logged in to retrieve bookmarks"

    return fetch_user_bookmarks(pool, int(user_id));

## E.G. http://localhost:8080/bookmarks/add?state='florida'&tag='test'&md='cigarette sales'&pd='signage required'&pgd='enforcement'
@app.route('/bookmarks/add/', methods=['GET'])
def route_add_user_bookmark():
    # Query arguments
    qa = request.args

    user_id = get_curr_user_id()
    if (user_id is None):
        return "Must be logged in to add a bookmark"


    # Must have a tag and user_id
    if (qa["tag"] is None or qa["tag"] == ""):
        return "A bookmark must have a tag and user id"

    return add_user_bookmark(pool, user_id, qa["md"], qa["pd"], qa["pgd"], qa["state"], qa["tag"]);

## Delete a user's bookmark
@app.route('/bookmarks/delete/<tag>', methods=['GET'])
def route_delete_user_bookmark(tag):
    user_id = get_curr_user_id()
    if (user_id is None):
        return "Must be logged in to delete bookmarks"

    return delete_user_bookmark(pool, user_id, tag);

## Login a user
## TODO: change this to a POST request so the user's password is not stored
##       in the url history
## EXAMPLE: http://localhost:8080/login/
@app.route('/login', methods=['POST'])
def route_login_user():
    if (request.method != 'POST'):
        return 'Use POST to get data'
    
    # Decode the json provided from the frontend. 
    # NOTE: json.loads is very picky about formating of json
    json_post_data = json.loads(request.get_data().decode('utf-8'))


    return login_user(pool, bcrypt, json_post_data["email"], json_post_data["password"]);

## Create a user
## TODO: change this to a POST request so the user's info and password is not 
##       stored in the url history
## EXAMPLE: http://localhost:8080/login/create
@app.route('/login/create', methods=['POST'])
def route_create_user():
    if (request.method != 'POST'):
        return 'Use POST to get data'
    
    # Decode the json provided from the frontend. 
    # NOTE: json.loads is very picky about formating of json
    json_post_data = json.loads(request.get_data().decode('utf-8'))
    
    SendEmail(json_post_data["fname"], json_post_data["email"], "Welcome", 4)

    return create_user(pool, bcrypt, json_post_data["email"], json_post_data["password"], json_post_data["fname"], json_post_data["lname"]);

@app.route('/logout', methods=['GET'])
def route_logout_user():
    return logout_user();

## Testing endpoint
@app.route('/login/get_user_id', methods=['GET'])
def route_curr_user():
    return str(get_curr_user_id())

@app.route('/topqueries/get/<int:count>', methods=['GET'])
def route_get_top_queries(count):
    return get_top_queries(pool, count);


@app.route('/feedback/get/<int:user_id>', methods=['GET'])
def route_get_feedback(user_id):
    if (user_id == 0):
        return get_feedback(pool, None)

    return get_feedback(pool, user_id)


@app.route('/feedback/add', methods=['POST'])
def route_add_feedback():
    if (request.method != 'POST'):
        return 'Use POST to get data'
    
    # Decode the json provided from the frontend. 
    # NOTE: json.loads is very picky about formating of json
    json_post_data = json.loads(request.get_data().decode('utf-8'))
    
    return add_feedback(pool, json_post_data)
        
def SendEmail(username, userEmail, topic, responseType):
    # Full credit to https://www.geeksforgeeks.org/how-to-send-automated-email-messages-in-python/ for module selection and overall approach.

    # Ititializes connection to gmail sever and logs into product email account.
    smtp = smtplib.SMTP('smtp.gmail.com', 587) 
    smtp.ehlo() 
    smtp.starttls() 
    smtp.login('tabaccotracker@gmail.com', 'jmuk cznm zopr sfmq') 

    # Assignment of strings for email options.
    subject1 = "Tobacco Tracker: User Generated Accuracy Review"
    subject2 = "Status Update: User Generated Accuracy Review"
    subject3 = "Welcome to Tobacco Tracker!"
    body1 = '''Hello {},

We have received your accuracy review request regarding {}. At Tobacco Tracker, we are strongly committed to providing users with only the most accurate information available. As such, we thoroughly investigate every claim of inaccuracy we receive. 
    
We will provide you with an update after a final determination is made. Thank you for your email! User feedback is indispensable in our mission to make Tobacco Tracker the preeminent informational tool for users seeking lifesaving information on Youth Tobacco Access Prevention Laws. 

Please be advised - this inbox is not monitored for replies.
    '''.format(username, topic)

    body2 = '''Hello {},

We have completed an accuracy review based on the information you provided regarding {}. At this time, we have determined our current information is accurate. Please refer to our About section for information regarding our category definitions and inclusion criteria. If you still feel our determination was made in error, please feel free to submit an additional accuracy review request with updated information.

Thank you again for your email! User feedback is indispensable in our mission to make Tobacco Tracker the preeminent informational tool for users seeking lifesaving information on Youth Tobacco Access Prevention Laws. 

Please be advised - this inbox is not monitored for replies.
    '''.format(username, topic)

    body3 = '''Hello {},

We have completed an acuracy review based on the information you provided regarding {}. At this time, we have decided to update our information. All changes are currently in effect on Tobacco Tracker. Also, public notices of updates will be displayed on the login screen for a period of 30 days.

Thank you again for your email! User feedback is indispensable in our mission to make Tobacco Tracker the preeminent informational tool for users seeking lifesaving information on Youth Tobacco Access Prevention Laws. 

Please be advised - this inbox is not monitored for replies.
    '''.format(username, topic)
    body4 = '''Hello {},
    
Welcome to Tobacco Tracker! This informational tool allows our users to gather lifesaving information on Youth Tobacco Access Prevention Laws.

Here are a few things you can do to get started:

1.	Check out our About section to learn more about our datasets and mission.
2.	Search laws by state or territory, category of restricted behavior, and type of law. 
3.	Bookmark searches for future review.
4.	Submit feedback about our information and suggest future additions.

We are thrilled you have joined us!

Please be advised - this inbox is not monitored for replies.
    '''.format(username)

    # Constructs email depending on response type
    email = MIMEMultipart()
    if (responseType == 1):
        email['Subject'] = subject1     
        email.attach(MIMEText(body1))
    elif (responseType == 2):
        email['Subject'] = subject2     
        email.attach(MIMEText(body2))
    elif (responseType == 3):
        email['Subject'] = subject2     
        email.attach(MIMEText(body3))
    else:
        email['Subject'] = subject3     
        email.attach(MIMEText(body4))
  
  
    # Uses the smtp module to send email
    smtp.sendmail(from_addr="tabaccotracker@gmail.com", 
                  to_addrs=userEmail, msg=email.as_string()) 
  
     # close connection
    smtp.quit()


if __name__ == '__main__':
    pool = start_pool()
    app.run(host="localhost", port=8080, debug=True)
