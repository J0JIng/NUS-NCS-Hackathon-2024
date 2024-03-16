import requests
import json
import python_tokens
import logging

class API_caller:
    
    def call_api_bus_arrival():
        api_key = python_tokens.bus_api_key
        headers = {
            "AccountKey": api_key,
            "accept": "application/json"
        }

        parameters = {
            "BusStopCode": "80219"
        }
        response = requests.get("http://datamall2.mytransport.sg/ltaodataservice/BusArrivalv2", headers = headers, params = parameters)
        if response.status_code == 200:
            return response.json()
        else:
            logging.warn("Error:", response.status_code)
            return None
        
         

    



