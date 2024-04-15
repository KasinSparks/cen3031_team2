from flask import session

from tools.table_prepend import sql_prepend

def login_user(db_pool, bcrypt, email, password):
    user_creds = {}
    with db_pool.acquire() as connection:
        with connection.cursor() as cursor:
            sql = '''SELECT UserID, Password, FirstName, LastName
                     FROM {}.CENUsers
                     WHERE Email=\'{}\''''.format(sql_prepend, email)
            cursor.execute(sql)
            user_creds = cursor.fetchall()
            if (len(user_creds) < 1):
                return "Invalid Username"
            
            ## get the first and only row
            user_creds = user_creds[0]


    if (bcrypt.check_password_hash(str(user_creds[1]), str(password))):
        session['user_id'] = user_creds[0]
        return 'Welcome ' + user_creds[2] + " " + user_creds[3]

    return "Invalid password"

def get_curr_user_id():
    if 'user_id' in session:
        return session['user_id']

    return None

def logout_user():
    session.pop('user_id', None)
    return '200'

def create_user(db_pool, bcrypt, email, password, fname, lname):
    if (email == ""):
        return "Must enter an email" 
    elif (password == ""):
        return "Must enter a password" 
    elif (fname == ""):
        return "Must enter a first name" 
    elif (lname == ""):
        return "Must enter a last name" 


    with db_pool.acquire() as connection:
        with connection.cursor() as cursor:
            sql = '''SELECT Email 
                     FROM {}.CENUsers
                     WHERE Email=\'{}\''''.format(sql_prepend, email)
            cursor.execute(sql)
            if (len(cursor.fetchall()) > 0):
                return "Email already registered"

            ## get the highest userid
            sql = '''SELECT MAX(UserID)
                     FROM {}.CENUsers'''.format(sql_prepend)
            cursor.execute(sql)
            rows = cursor.fetchall()
            highest_user_id = 1 


            if (len(rows) > 0 and rows[0][0] is not None):
                print(rows[0])
                highest_user_id = int(rows[0][0])


            hashed_pass = bcrypt.generate_password_hash(password).decode('utf-8')

            sql = '''INSERT INTO {}.CENUsers
                     (UserID, FirstName, LastName, Password, Email, Verified, AccountType)
                     VALUES({}, \'{}\', \'{}\', \'{}\', \'{}\', {}, \'{}\')'''.format(sql_prepend, highest_user_id + 1, fname, lname, hashed_pass, email, 0, 'REG')

            print(sql)
            cursor.execute(sql) 

        connection.commit()

    # Login the user after creating
    login_user(db_pool, bcrypt, email, password)
    return '200'

## TODO
def is_verified_user(userid):
    return False



