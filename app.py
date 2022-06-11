import json
import pymysql.cursors
from flask import Flask
from flask_cors import CORS, cross_origin
from flask import jsonify
from datetime import date
from flask import request

# connection = pymysql.connect(host='mysql.labthreesixfive.com',
#                              user='group3a',
#                              password='b[=+>M8jjB3zp43?',
#                              database='group3a',
#                              cursorclass=pymysql.cursors.DictCursor)


app = Flask(__name__)
CORS(app, support_credentials=True)

@app.route("/get_user/<email>/<name>")
@cross_origin(supports_credentials=True)
def get_user(email, name):
    connection = pymysql.connect(
                    host='mysql.labthreesixfive.com',
                    user='group3a',
                    password='b[=+>M8jjB3zp43?',
                    database='group3a',
                    cursorclass=pymysql.cursors.DictCursor)
    with connection:
        with connection.cursor() as cursor:
            # Create a new record
            sql = "select * from Users where Email = %s"
            cursor.execute(sql, (email))
            result = cursor.fetchone()
            if result:
                return jsonify(result)
        with connection.cursor() as cursor:
            sql = f"SELECT COUNT(DISTINCT AccountID) as NumUsers FROM Users"
            cursor.execute(sql)
            id = cursor.fetchone()['NumUsers']
        with connection.cursor() as cursor:
            sql = "INSERT INTO Users VALUES (%s, %s, %s, 'user')"
            cursor.execute(sql, (id, name, email))
        connection.commit()
        return 'User inserted into database'


@app.route("/get_surveys")
@cross_origin(supports_credentials=True)
def get_surveys():
    connection = pymysql.connect(
                    host='mysql.labthreesixfive.com',
                    user='group3a',
                    password='b[=+>M8jjB3zp43?',
                    database='group3a',
                    cursorclass=pymysql.cursors.DictCursor)
    with connection:
        with connection.cursor() as cursor:
            # Create a new record
            sql = "SELECT * FROM Surveys"
            cursor.execute(sql)
            result = cursor.fetchall()
            return jsonify(result)
            
@app.route("/get_response/<email>")
@cross_origin(supports_credentials=True)
def get_response(email):
    connection = pymysql.connect(
                host='mysql.labthreesixfive.com',
                user='group3a',
                password='b[=+>M8jjB3zp43?',
                database='group3a',
                cursorclass=pymysql.cursors.DictCursor)
    with connection:
        with connection.cursor() as cursor:
            sql = """select * from 
                    Users u Join SurveyResponses s ON 
                    u.AccountId = s.UserId
                    WHERE u.Email = %s
                    """
            cursor.execute(sql, (email))
            result = cursor.fetchall()
    return jsonify(result)

@app.route("/get_profile/<email>")
@cross_origin(supports_credentials=True)
def get_profile(email):
    connection = pymysql.connect(
                host='mysql.labthreesixfive.com',
                user='group3a',
                password='b[=+>M8jjB3zp43?',
                database='group3a',
                cursorclass=pymysql.cursors.DictCursor)
    with connection:
        with connection.cursor() as cursor:
            sql = """select DesPID, d.Name, UserID from 
                    Users u Join DesiredProfiles d ON 
                    u.AccountId = d.UserId
                    WHERE u.Email = %s
                    """
            cursor.execute(sql, (email))
            result = cursor.fetchall()
    return jsonify(result)

@app.route("/get_response_options/<id>")
@cross_origin(supports_credentials=True)
def get_response_options(id):
    connection = pymysql.connect(
                host='mysql.labthreesixfive.com',
                user='group3a',
                password='b[=+>M8jjB3zp43?',
                database='group3a',
                cursorclass=pymysql.cursors.DictCursor)
    with connection:
        with connection.cursor() as cursor:
            sql = "SELECT * from ResponseOptions WHERE SurveyID = %s"
            cursor.execute(sql, (id))
            result = cursor.fetchall()
    return jsonify(result)

@app.route("/get_survey_questions/<id>")
@cross_origin(supports_credentials=True)
def get_survey_questions(id):
    connection = pymysql.connect(
                host='mysql.labthreesixfive.com',
                user='group3a',
                password='b[=+>M8jjB3zp43?',
                database='group3a',
                cursorclass=pymysql.cursors.DictCursor)
    with connection:
        with connection.cursor() as cursor:
            sql = "SELECT * from MultipleChoiceQuestions WHERE SurveyID = %s"
            cursor.execute(sql, (id))
            result = cursor.fetchall()
    return jsonify(result)

@app.route('/post_ure_response', methods = ['POST'])
@cross_origin(supports_credentials=True)
def post_ure_response():
    if request.method == "POST":
        response = request.get_json()
        answers = response["answers"]
        email = response["email"]
        surveyID = 1
        category = 'URE'
        dateCompleted = date.today()
        connection = pymysql.connect(
                    host='mysql.labthreesixfive.com',
                    user='group3a',
                    password='b[=+>M8jjB3zp43?',
                    database='group3a',
                    cursorclass=pymysql.cursors.DictCursor)
        with connection:
            with connection.cursor() as cursor:
                sql = "SELECT COUNT(DISTINCT SurveyResponseID) as Total FROM SurveyResponses"
                cursor.execute(sql)
                surveyResponseID = cursor.fetchone()['Total'] + 1
            with connection.cursor() as cursor:
                sql = "SELECT AccountID FROM Users WHERE Email = %s"
                cursor.execute(sql, (email))
                userID = cursor.fetchone()["AccountID"]
            #Survey Responses
            with connection.cursor() as cursor:
                try:
                    sql = "INSERT INTO SurveyResponses VALUES (%s, %s, %s, %s, %s)"
                    cursor.execute(sql, (surveyResponseID, surveyID, dateCompleted, category, userID))
                except:
                    pass
            connection.commit()
            with connection.cursor() as cursor:
                for item in answers:
                    index = item["index"]
                    answer = item["answer"]
                    sql = "INSERT INTO Responses VALUES (%s, %s, %s, %s)"
                    cursor.execute(sql, (surveyResponseID, surveyID, index+1, answer))
            connection.commit()
        get_mappings(surveyResponseID)
        return "IN POST"
    return "HI"

@app.route('/post_work_response', methods = ['POST'])
@cross_origin(supports_credentials=True)
def post_work_response():
    if request.method == "POST":
        response = request.get_json()
        answers = response["answers"]
        email = response["email"]
        surveyID = 2
        category = 'Work'
        dateCompleted = date.today()
        connection = pymysql.connect(
                    host='mysql.labthreesixfive.com',
                    user='group3a',
                    password='b[=+>M8jjB3zp43?',
                    database='group3a',
                    cursorclass=pymysql.cursors.DictCursor)
        with connection:
            with connection.cursor() as cursor:
                sql = "SELECT COUNT(DISTINCT SurveyResponseID) as Total FROM SurveyResponses"
                cursor.execute(sql)
                surveyResponseID = cursor.fetchone()['Total'] + 1
            with connection.cursor() as cursor:
                sql = "SELECT AccountID FROM Users WHERE Email = %s"
                cursor.execute(sql, (email))
                userID = cursor.fetchone()["AccountID"]
            #Survey Responses
            with connection.cursor() as cursor:
                try:
                    sql = "INSERT INTO SurveyResponses VALUES (%s, %s, %s, %s, %s)"
                    cursor.execute(sql, (surveyResponseID, surveyID, dateCompleted, category, userID))
                except:
                    pass
            connection.commit()
            with connection.cursor() as cursor:
                for item in answers:
                    index = item["index"]
                    answer = item["answer"]
                    sql = "INSERT INTO Responses VALUES (%s, %s, %s, %s)"
                    cursor.execute(sql, (surveyResponseID, surveyID, index+1, answer))
            connection.commit()
        get_mappings(surveyResponseID)
        return "IN POST"
    return "HI"

@app.route("/get_onet_jobs")
@cross_origin(supports_credentials=True)
def get_onet_jobs():
    connection = pymysql.connect(
                    host='mysql.labthreesixfive.com',
                    user='group3a',
                    password='b[=+>M8jjB3zp43?',
                    database='group3a',
                    cursorclass=pymysql.cursors.DictCursor)
    with connection:
        with connection.cursor() as cursor:
            # Create a new record
            sql = "SELECT * FROM ONetJobs"
            cursor.execute(sql)
            result = cursor.fetchall()
    return jsonify(result)

# @app.route("/get_onet_jobs/<ExpPID>")
# @cross_origin(supports_credentials=True)
def get_mappings(ExpPID):
    surveyResponseID = ExpPID
    connection = pymysql.connect(
                host='mysql.labthreesixfive.com',
                user='group3a',
                password='b[=+>M8jjB3zp43?',
                database='group3a',
                cursorclass=pymysql.cursors.DictCursor)
    with connection:
        # Calculating scores for the completed survey
        with connection.cursor() as cursor:
            sql = """
                    select ResponseID, Characteristic, SUM(Answer)/Count(*) as Value
                    from MultipleChoiceQuestions
                    inner join Responses on Responses.SurveyID=MultipleChoiceQuestions.SurveyID and Responses.QuestionNo=MultipleChoiceQuestions.Position
                    where Responses.ResponseID=%s and Characteristic is NOT NULL
                    group by Characteristic;
                """
            cursor.execute(sql, (ExpPID))
            result = cursor.fetchall()

        with connection.cursor() as cursor:
            for index, item in enumerate(result):
                characteristic = item["Characteristic"]
                score = item["Value"]
                if characteristic is None:
                    continue
                sql = "INSERT INTO SurveyScores VALUES (%s, %s, %s)"
                cursor.execute(sql, (ExpPID, characteristic, score,))
        connection.commit()

        with connection.cursor() as cursor:
            sql = """
                    select ONetScores.ONetPID,
                    SUM(SurveyScores.Value*ONetScores.Value)/(SQRT(SUM(SurveyScores.Value*SurveyScores.Value))*SQRT(SUM(ONetScores.Value*ONetScores.Value))) as Score
                    from SurveyScores 
                    inner join ONetScores on SurveyScores.Characteristic=ONetScores.Characteristic
                    inner join ONetProfiles on ONetProfiles.ONetPID=ONetScores.ONetPId
                    inner join ONetJobs on ONetJobs.JobID=ONetProfiles.ONetJobID
                    where SurveyScores.SurveyResponseID=%s
                    group by ONetScores.ONetPID
                    order by Score DESC
                    limit 10;
                """
            cursor.execute(sql, (ExpPID))
            result = cursor.fetchall()

        with connection.cursor() as cursor:
            sql = "INSERT INTO ExpProfiles VALUES (%s, %s)"
            cursor.execute(sql, (ExpPID, surveyResponseID))
            for index, item in enumerate(result):
                oNetPid = item["ONetPID"]
                score = item["Score"]
                sql = "INSERT INTO ExpRecommendations VALUES (%s, %s, %s, %s)"
                cursor.execute(sql, (oNetPid, ExpPID, score, index + 1))
        connection.commit()
    return "HI"

# @app.route("/get_onet_jobs/<ExpPID>")
# @cross_origin(supports_credentials=True)
def get_desired_mapping(DesPID):
    connection = pymysql.connect(
                host='mysql.labthreesixfive.com',
                user='group3a',
                password='b[=+>M8jjB3zp43?',
                database='group3a',
                cursorclass=pymysql.cursors.DictCursor)
    with connection:
        with connection.cursor() as cursor:
            sql = """
                    select ONetScores.ONetPID,
                    SUM(DesiredScores.Value*ONetScores.Value*DesiredScores.Importance)/
                    (SQRT(SUM(DesiredScores.Value*DesiredScores.Value))*
                    SQRT(SUM(ONetScores.Value*ONetScores.Value))*
                    SQRT(SUM(DesiredScores.Importance*DesiredScores.Importance))) 
                    as Score
                    from DesiredScores 
                    inner join ONetScores on DesiredScores.Characteristic=ONetScores.Characteristic
                    inner join ONetProfiles on ONetProfiles.ONetPID=ONetScores.ONetPId
                    inner join ONetJobs on ONetJobs.JobID=ONetProfiles.ONetJobID
                    where DesiredScores.DesPID=%s
                    group by ONetScores.ONetPID
                    order by Score DESC
                    limit 10;
                """
            cursor.execute(sql, (DesPID))
            result = cursor.fetchall()

        with connection.cursor() as cursor:
            for index, item in enumerate(result):
                oNetPid = item["ONetPID"]
                score = item["Score"]
                sql = "INSERT INTO DesiredRecommendations VALUES (%s, %s, %s, %s)"
                cursor.execute(sql, (DesPID, oNetPid, score, index + 1))
        connection.commit()
    return "HI"

@app.route("/get_desired_recommendations/<id>")
@cross_origin(supports_credentials=True)
def get_desired_recommendations(id):
    connection = pymysql.connect(
                    host='mysql.labthreesixfive.com',
                    user='group3a',
                    password='b[=+>M8jjB3zp43?',
                    database='group3a',
                    cursorclass=pymysql.cursors.DictCursor)
    with connection:
        with connection.cursor() as cursor:
            # Create a new record
            sql = """
                    select *
                    from DesiredRecommendations e
                    inner join ONetProfiles o on o.ONetPID = e.DesPID
                    inner join ONetJobs j on j.JobID = o.ONetJobID
                    where e.DesPID=%s
                """
            cursor.execute(sql, (id))
            result = cursor.fetchall()
    return jsonify(result)

@app.route("/get_recommendations/<id>")
@cross_origin(supports_credentials=True)
def get_recommendations(id):
    connection = pymysql.connect(
                    host='mysql.labthreesixfive.com',
                    user='group3a',
                    password='b[=+>M8jjB3zp43?',
                    database='group3a',
                    cursorclass=pymysql.cursors.DictCursor)
    with connection:
        with connection.cursor() as cursor:
            # Create a new record
            sql = """
                    select *
                    from ExpRecommendations e
                    inner join ONetProfiles o on o.ONetPID = e.ONetPID
                    inner join ONetJobs j on j.JobID = o.ONetJobID
                    where e.ExpPID=%s
                    order by Score desc
                """
            cursor.execute(sql, (id))
            result = cursor.fetchall()
    return jsonify(result)

@app.route("/get_recommendations_profile/<id>")
@cross_origin(supports_credentials=True)
def get_recommendations_profile(id):
    connection = pymysql.connect(
                    host='mysql.labthreesixfive.com',
                    user='group3a',
                    password='b[=+>M8jjB3zp43?',
                    database='group3a',
                    cursorclass=pymysql.cursors.DictCursor)
    with connection:
        with connection.cursor() as cursor:
            # Create a new record
            sql = """
                    select *
                    from DesiredRecommendations d
                    inner join ONetProfiles o on o.ONetPID = d.ONetPID
                    inner join ONetJobs j on j.JobID = o.ONetJobID
                    where d.DesPID=%s
                    order by Score desc
                """
            cursor.execute(sql, (id))
            result = cursor.fetchall()
    return jsonify(result)

@app.route('/post_desired_profile', methods = ['POST'])
@cross_origin(supports_credentials=True)
def post_desired_profile():
    if request.method == "POST":
        response = request.get_json()
        answers = response["answers"]
        importances = response["importances"]
        email = response["email"]
        profileName = response['name']
        connection = pymysql.connect(
                    host='mysql.labthreesixfive.com',
                    user='group3a',
                    password='b[=+>M8jjB3zp43?',
                    database='group3a',
                    cursorclass=pymysql.cursors.DictCursor)
        with connection:
            with connection.cursor() as cursor:
                sql = "SELECT COUNT(DISTINCT DesPID) as Total FROM DesiredProfiles"
                cursor.execute(sql)
                desPID = cursor.fetchone()['Total'] + 1
            with connection.cursor() as cursor:
                sql = "SELECT AccountID FROM Users WHERE Email = %s"
                cursor.execute(sql, (email))
                userID = cursor.fetchone()["AccountID"]
            with connection.cursor() as cursor:
                sql = "INSERT INTO DesiredProfiles VALUES (%s, %s, %s)"
                cursor.execute(sql, (desPID, profileName, userID))
            connection.commit()
            with connection.cursor() as cursor:
                sql = "SELECT Characteristic FROM MultipleChoiceQuestions WHERE Characteristic is NOT NULL GROUP BY Characteristic;"
                cursor.execute(sql)
                characteristics = cursor.fetchall()
            with connection.cursor() as cursor:
                for item in zip(answers, importances, characteristics):
                    value = item[0]['answer']
                    importance = item[1]['answer']
                    characteristic = item[2]['Characteristic']
                    sql = "INSERT INTO DesiredScores VALUES (%s, %s, %s, %s)"
                    cursor.execute(sql, (desPID, characteristic, value, importance))
            connection.commit()
        get_desired_mapping(desPID)
        return "IN POST"
    return "HI"


if __name__ == "__main__":
  app.run(host='0.0.0.0', port=8000, debug=True)