from flask import Flask , request , jsonify

app = Flask(__name__)


@app.route('/')
def index():
    return 'Hello World'

@app.route('/send_data', methods=['POST'])
def receive_data():
    data = request.json 
    input_data = data.get('inputData') # assume key 'inputData'
    # process the data
    print('Received data from frontend:', input_data)
    return jsonify({'message':'Data received successfully'})

@app.route('/receive_data')
def send_data():
    # replace with actual function to retrieve prompt from LLM
    result = 'sample_data_text'
    return jsonify(result)

if __name__ == "__main__":
    app.run(debug=True)