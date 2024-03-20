from flask import Flask , request , jsonify
import logging
import Controller

app = Flask(__name__)


@app.route('/')
def index():
    return 'Hello World'

@app.route('/create_response', methods=['POST'])
def receive_data():
    data = request.get_json() 
    # contoller handle data process
    controller.get_api_data(data)    
    logging.info('Received data from frontend')
    return jsonify(data) , 201

@app.route('/get_response')
def send_data():
    # replace with actual function to retrieve prompt from LLM
    response = controller.send_api_data()
    data = {
            "response" : response
        }

    return jsonify(data) , 200


if __name__ == "__main__":
    controller = Controller.Controller()
    app.run(debug=True)