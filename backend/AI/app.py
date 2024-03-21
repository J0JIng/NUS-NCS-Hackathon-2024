from flask import Flask , request , jsonify
import logging
import Controller
from flask_cors import CORS


app = Flask(__name__)
CORS(app)

@app.route('/')
def index():
    return 'Hello World'

@app.route('/create_response', methods=['POST'])
def receive_data():
    
    data = request.get_json() 
    # contoller handle data process
    controller.get_api_data(data)    
    logging.info('Received data from frontend')
    response = jsonify(data)
    response.headers.add("Access-Control-Allow-Origin", "*")
    return response

@app.route('/get_response')
def send_data():
    # replace with actual function to retrieve prompt from LLM
    response = controller.send_api_data()
    if response == "":
        response = "haha"
    data = {
            "response" : response
        }
    response = jsonify(data)
    response.headers.add("Access-Control-Allow-Origin", "*")
    return response


if __name__ == "__main__":
    controller = Controller.Controller()
    app.run(host='0.0.0.0', debug=True)
