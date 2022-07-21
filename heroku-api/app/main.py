from email import message
from tracemalloc import start
from flask import Flask, request
from flask import jsonify
# from requests import request
import scheduler
import flask_cors



app = Flask(__name__)
cors = flask_cors.CORS(app)


@app.route('/')
def index():
    return "Hello World"

@app.route('/api', methods=['POST'])
@flask_cors.cross_origin()
def api():
    a = request.get_json()
    t = scheduler.ScheduleGenerator(**a)
    ret = t.FinalizedSchedule()
    return ret


