import requests
import json
import python_tokens
import logging
import math
from math import sqrt

class API_caller:

    def __init__(self):
        self.train_line_code = ['CCL', 'CEL', 'CGL', 'DTL', 'EWL', 'NEL', 'NSL', 'BPL', 'SLRT', 'PLRT']
        self.api_key = python_tokens.bus_api_key
        self.here_routing_api_key = python_tokens.here_routing_api

    # Helper 
    def get_coordinates(self, query):
        # Define the API key and custom headers
        api_key = self.here_routing_api_key
        parameters = {
            "q" : query,
            "apikey": api_key
        }
        url = 'https://geocode.search.hereapi.com/v1/geocode'
        response = requests.get(url, params=parameters)
        
        data = None

        # Check the status code
        if response.status_code == 200:
            print('Response ok')
            data = response.json()
            
            for item in data['items']:
                if 'address' in item and item['address']['countryName'] == "Singapore":
                    position = item['position']
                    return position['lat'], position['lng']
                
            # Process the response data
        else:
            print('Failed to fetch data:', response.status_code)
        
        return data 

    # Bus
    def get_all_bus_routes(self):
        """
        Function to find all bus stops in Singapore. last update (04 Apr 2023)
        """
        headers = {
            "AccountKey": self.api_key,
            "Accept": "application/json" 
        }
        url = 'http://datamall2.mytransport.sg/ltaodataservice/BusStops'
        results = []
        while True:
            response = requests.get(
                url,
                headers=headers,
                params={'$skip': len(results)}
            )
            if response.status_code == 200:
                new_results = response.json()['value']
                if new_results:
                    results += new_results
                else:
                    break
            else:
                print('Failed to fetch data:', response.status_code)
                break


        return results    
        
    def get_distance(self, latitude1, longitude1, latitude2, longitude2):
        """
        Function to calculate the distance between two points using Euclidean distance formula.
        """
        return sqrt((latitude1 - latitude2) ** 2 + (longitude1 - longitude2) ** 2)

    def haversine(lat1, lon1, lat2, lon2):
        """
        Calculate the great circle distance between two points 
        on the earth (specified in decimal degrees)
        """
        # Convert decimal degrees to radians
        lat1, lon1, lat2, lon2 = map(math.radians, [lat1, lon1, lat2, lon2])

        # Haversine formula
        dlon = lon2 - lon1
        dlat = lat2 - lat1
        a = math.sin(dlat/2)**2 + math.cos(lat1) * math.cos(lat2) * math.sin(dlon/2)**2
        c = 2 * math.atan2(math.sqrt(a), math.sqrt(1-a))
        radius_of_earth = 6371  # Radius of earth in kilometers. Use 3956 for miles
        distance = radius_of_earth * c
        return distance
    
    def find_nearest_bus_stops(self,json_data, latitude, longitude, radius=0.005):
        """
        Function to find bus stops within a certain radius of given latitude and longitude. 
        Sorts the bus stops from nearest to farthest.
        Default radius 500 meters
        """
        nearby_bus_stops = []
        for bus_stop in json_data:
            stop_latitude = bus_stop['Latitude']
            stop_longitude = bus_stop['Longitude']
            distance = self.get_distance(latitude, longitude, stop_latitude, stop_longitude)
            if distance <= radius:
                nearby_bus_stops.append((bus_stop, distance))
        
        # Sort the nearby bus stops based on distance
        nearby_bus_stops.sort(key=lambda x: x[1])
        
        # Extract only the bus stop information without distance
        nearby_bus_stops = [bus_stop[0] for bus_stop in nearby_bus_stops]
        
        return nearby_bus_stops
    
    def get_estimated_bus_arrival_time(self, busStop):
        
        """
        Function to find bus stops within a certain radius of given latitude and longitude. 
        
        """
        headers = {
            "AccountKey": self.api_key,
            "Accept": "application/json"
        }
        parameters = {
            "BusStopCode": busStop  
        }
        url = 'http://datamall2.mytransport.sg/ltaodataservice/BusArrivalv2'
        response = requests.get(url, headers=headers, params=parameters)
        
        arrival_data = "None"

        # Check the status code
        if response.status_code == 200:
            arrival_data = response.json()
            # Process the response data
        else:
            print('Failed to fetch data:', response.status_code)

        return arrival_data 
    
    def get_earliest_timing_and_load(self, bus_stop_code, bus_stop_data):
        """
        Function to retrieve the earliest estimated timing of arrival and load for each bus service at each bus stop.
        """
        earliest_timing_and_load = {}
    
        services = bus_stop_data.get('Services', [])
        for service in services:
            service_no = service.get('ServiceNo')
            next_bus = service.get('NextBus', {})
            estimated_arrival = next_bus.get('EstimatedArrival', '')
            load = next_bus.get('Load', '')
            
            if service_no not in earliest_timing_and_load:
                earliest_timing_and_load[service_no] = {'BusStopCode': bus_stop_code, 'EstimatedArrival': estimated_arrival, 'Load': load}
            else:
                # Update if the current estimated arrival is earlier than the stored one
                if estimated_arrival < earliest_timing_and_load[service_no]['EstimatedArrival']:
                    earliest_timing_and_load[service_no] = {'BusStopCode': bus_stop_code, 'EstimatedArrival': estimated_arrival, 'Load': load}
                    
        return earliest_timing_and_load
    
    # Trains
    def get_platform_volume(self, train_line_list):
        """
        Function to retrieve real-time platform crowdedness level for a specific train network line.
        """
        headers = {
            "AccountKey": self.api_key,
            "Accept": "application/json" 
        }
        # Initialize a dictionary to store the results for each train line
        results = {}

        # Iterate over each train line code in the list
        for train_line_code in train_line_list:
            parameters = {
                "TrainLine": train_line_code  
            }
            url = 'http://datamall2.mytransport.sg/ltaodataservice/PCDRealTime'

            response = requests.get(url, headers=headers, params=parameters)
            
            if response.status_code == 200:
                results[train_line_code] = response.json()
                print(f'Response ok for train line {train_line_code}')
            else:
                print(f'Failed to fetch data for train line {train_line_code}:', response.status_code)

        return results

    def get_platform_crowd_density_forecast(self, train_line_list):
        """
        Function to retrieve forecasted platform crowdedness level for a particular train network line.
        """
        headers = {
            "AccountKey": self.api_key,
            "Accept": "application/json" 
        }

        # Initialize a dictionary to store the results for each train line
        results = {}

        # Iterate over each train line code in the list
        for train_line_code in train_line_list:

            parameters = {
                "TrainLine": train_line_code  
            }
            url = 'http://datamall2.mytransport.sg/ltaodataservice/PCDForecast'

            response = requests.get(url, headers=headers, params=parameters)
            
            if response.status_code == 200:
                results[train_line_code] = response.json()
            else:
                print(f'Failed to fetch data for train line {train_line_code}:', response.status_code)

        return results
    
    # Cars

    def get_carpark_availability(self):
        """
        Function to retrieve carpark availability data.
        """
        api_key = "Uo/sa3GATG2/zTJZpkK6Ww=="
        headers = {
            "AccountKey": api_key,
            "Accept": "application/json" 
        }
        url = 'http://datamall2.mytransport.sg/ltaodataservice/CarParkAvailabilityv2'

        response = requests.get(url, headers=headers)
        
        carpark_availability_data = {}
        if response.status_code == 200:
            carpark_availability_data = response.json()
            print(len(carpark_availability_data))
        else:
            print('Failed to fetch data:', response.status_code)

        return carpark_availability_data
    
    def find_nearest_car_park(self, json_data, location, radius=0.015):
        """
        Function to find car parks within a certain radius of given latitude and longitude. 
        Sorts the car parks from nearest to farthest.
        """
        # Extract latitude and longitude of the given location
        lat, lon = location

        # Parse JSON data to get car park information
        car_parks = json_data['value']

        # Filter car parks within the specified radius
        nearby_car_parks = []
        for car_park in car_parks:
            location_str = car_park.get('Location')
            if location_str:
                try:
                    car_park_lat, car_park_lon = map(float, location_str.split())
                    distance = self.get_distance(lat, lon, car_park_lat, car_park_lon)
                    #print(distance) # debug
                    if distance <= radius:
                        nearby_car_parks.append((car_park, distance))
                except ValueError:
                    # Skip this car park if location data is not valid
                    pass

        # Sort nearby car parks based on distance
        nearby_car_parks.sort(key=lambda x: x[1])

        # Return sorted list of nearby car parks
        return [car_park[0] for car_park in nearby_car_parks]
    
    def get_estimated_travel_duration(self, curr_pos: str, dest_pos: str):
        # curr_pos is position of user in the format of "latitude, longitude"
        # dest_pos is position of destination in the format of "latitude, longitude"
        # Define the API key and custom headers
        api_key = self.here_routing_api_key
        parameters = {
            "transportMode" : "car",
            "origin":curr_pos,
            "destination" : dest_pos,
            "apikey": api_key
        }
        url = 'https://router.hereapi.com/v8/routes'
        response = requests.get(url, params=parameters)
        arrival_data = "null"
        
        # Check the status code
        if response.status_code == 200:
            print('Response ok')
            arrival_data = response.json()
            # Process the response data
        else:
            print('Failed to fetch data:', response.status_code)
        
        return str(arrival_data) 