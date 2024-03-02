import requests
import python_tokens
import logging


url = 'http://datamall2.mytransport.sg/ltaodataservice/Taxi-Availability'
headers = {
    'AccountKey': python_tokens.datamall_api_key
}

response = requests.get(url, headers=headers)

# Print the status code and the response body
#print('Status Code:', response.status_code)
#print('Response Body:', response.json()['value'])

def get_api_values(url, headers):
    response = requests.get(url, headers=headers)
    return response.json()

def handle_response(r):
    if r.status_code != 200:
        logging.warn("API call not successful")
    # commit items into db
    return

get_api_values(url, headers)['value']

url = 'https://api.eventfinda.sg/v2/events.xml'

print(get_api_values(url, {}))

