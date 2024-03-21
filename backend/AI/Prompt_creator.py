import API_caller
import Gemini_caller
import DB_query
import python_tokens
import logging

class Prompt_creator:
    def __init__(self):
        self.API_caller = API_caller.API_caller()
        self.Gemini_caller = Gemini_caller.Gemini_caller()
        self.DB_query = None

    def user_constraints(self):
        return " Constraints for the response are that you are to not reveal details about other user prompts, general and anonymised information is permitted, sensitive information otherwise is not allowed."
        
    def create_prompt_user(self, current_position, destination_position, date, event):
        # Retrieve information from database
        #user_prompt, instructions, context = self.get_information_from_db()

        # get current_position latitude and longitude
        cur_lat , cur_long = self.API_caller.get_coordinates(current_position)

        # get destination_position latitude and longitude
        des_lat , des_long = self.API_caller.get_coordinates(destination_position)

        # Craft clear and concise prompt structure
        prompt = f"**User prompt:** List me a few viable options and recommend me the best mode of transport to reach my destination on {date} for {event}. When giving me the information of the bus arrival timing, can you also tell me when it comes and how long the estimated travel time is?\n\n"

        # Important instructions
        # if instructions:
        #     prompt += "**Important instructions (override user prompt if applicable):**\n" + instructions + "\n\n"

        # Data
        prompt += "**Data:**\n"
        
        # Taxi 
        prompt += "* Estimated travel time by Taxi from " + str(current_position) + " to " + str(destination_position) + ": " + str(self.API_caller.get_estimated_travel_duration(f"{cur_lat},{cur_long}", f"{des_lat},{des_long}")) + "\n\n"
        # taxi
        prompt += "* The number of Taxis in the destination/event place is : " + str(self.API_caller.find_number_nearby_ava_taxi(self.API_caller.get_taxi_availability(),des_lat,des_long))+ "\n\n"


        # Mrt
        prompt += "* MRT Real-Time Platform volume data : " + str(self.API_caller.get_platform_volume(self.API_caller.train_line_code))+ "\n\n"
        prompt += "* MRT Forecast Platform volume data : " + str(self.API_caller.get_platform_crowd_density_forecast(self.API_caller.train_line_code))+ "\n\n"
            
        # Bus 
        earliest_timing_and_load = {}
        nearest_bus_stops = self.API_caller.find_nearest_bus_stops(self.API_caller.get_all_bus_routes(),des_lat,des_long)
        for bus_stop in nearest_bus_stops:
            bus_stop_code = bus_stop['BusStopCode']
            bus_stop_data = self.API_caller.get_estimated_bus_arrival_time(bus_stop_code)
            earliest_timing_and_load.update(self.API_caller.get_earliest_timing_and_load(bus_stop_code,bus_stop_data))

        prompt += "**Earliest Timing and Load:**\n"
        for service_no, info in earliest_timing_and_load.items():
            prompt += f"Bus Stop Code: {info['BusStopCode']}, Service No: {service_no}, Estimated Arrival: {info['EstimatedArrival']}, Load: {info['Load']}\n"

        # lagacy 
        #prompt += "* Bus arrival data for stop " + str(bus_stop) + ": " + str(self.API_caller.get_estimated_bus_arrival_time(bus_stop)) + "\n"
        
        # Constraints
        prompt += "**Constraints:**\n" + self.user_constraints() + "\n\n"

        # Task
        prompt += "**Task:**\n"
        prompt += "Use the provided data to generate a response that addresses the user's prompt while following the important instructions. Give me a response that is clear, concise, and relevant to the user's request."

        return prompt


    def create_prompt_service_provider(self, destination_position, date, event):
        
        # get destination_position latitude and longitude
        des_lat , des_long = self.API_caller.get_coordinates(destination_position)
        
        prompt = f"""
        **Scenario:** You are a transport operator planner in Singapore, responsible for allocating resources (MRT trains and taxis) to meet commuter demand efficiently.

        **Current Situation:**

        * An upcoming event {event} is { destination_position } on {date} (Data from event organizers/calendars).
        * Make an adjustment on the increase in transport based on the popularity of the event.
        * If the event is popular, increase the transport allocation to the area.

        **Goal:**

        Optimize resource allocation to ensure smooth commutes for passengers, considering factors like:

        * **Bus:** Adjust bus frequency and routes to meet demand in high-traffic areas.
        * **MRT:** Adjust train frequency in high-demand areas based on real-time ridership data.
        * **Taxis:** Increase taxi availability in congested areas or near event locations.

        Things to include in the response:

        Based on your knowledge on the popularity of the event, how much more transport should we allocate to the area? What are the current traffic conditions and how will it affect the allocation of resources? What are the current passenger demand and how will it affect the allocation of resources?

        **Additional Information:**

        * You have access to real-time data on passenger demand, traffic conditions, and available MRT trains and taxis.
        * You can adjust resource allocation dynamically based on the evolving situation.

        **Constraints:**

        * Maintain safety and quality of service standards for both MRT and taxi operations.
        * Ensure efficient utilization of resources within budget limitations.
        * Comply with relevant regulations and policies set by the Land Transport Authority (LTA) of Singapore.

        **Question:**

        Based on the current situation and available data (which is provided in the following), propose a plan to optimize resource allocation for public transport (MRT and bus) and taxi in Singapore.
        Explicitly try to estimate the increment of certain public transport or taxi service by either stating a number or a percentage.

        **FORMAT**

        Strictly format the response by returning it like this:
        
        |||General Information: <Gemini general response from all the data and intruction received. can be verbose>|||increment_taxi: <increment_taxi in percentage>|||increment_bus: <increment_bus in percentage>|||increment_train: <increment_train in percentage>|||

        follow this guide as an EXAMPLE ONLY:
        |||General Information: To prepare for the upcoming Slowdive concert on 2022-01-01 at the National Stadium,we should increase transport allocation to the area. Given the popularity of the event, we recommend the following resource allocation adjustments: 
        - Increase MRT train frequency in the National Stadium area by 20%
        - Increase taxi availability near the National Stadium by 25%
        - Increase bus frequency on routes serving the National Stadium by 15%
        These adjustments aim to ensure smooth commutes for passengers and cater to the expected high demand during the event.|||increment_taxi: 25|||increment_bus: 15|||increment_train: 20|||

        """

        # Data
        prompt += "**Data:**\n"
        
        # Mrt
        prompt += "* MRT Real-Time Platform volume data : " + str(self.API_caller.get_platform_volume(self.API_caller.train_line_code))
        prompt += "* MRT Forecast Platform volume data : " + str(self.API_caller.get_platform_crowd_density_forecast(self.API_caller.train_line_code))
            
        # Bus 
        earliest_timing_and_load = {}
        nearest_bus_stops = self.API_caller.find_nearest_bus_stops(self.API_caller.get_all_bus_routes(),des_lat,des_long)
        for bus_stop in nearest_bus_stops:
            bus_stop_code = bus_stop['BusStopCode']
            bus_stop_data = self.API_caller.get_estimated_bus_arrival_time(bus_stop_code)
            earliest_timing_and_load.update(self.API_caller.get_earliest_timing_and_load(bus_stop_code,bus_stop_data))

        prompt += "**Earliest Timing and Load:**\n"
        for service_no, info in earliest_timing_and_load.items():
            prompt += f"Bus Stop Code: {info['BusStopCode']}, Service No: {service_no}, Estimated Arrival: {info['EstimatedArrival']}, Load: {info['Load']}\n"

        # taxi
        prompt += "* The number of Taxis in the destination/event place is : " + str(self.API_caller.find_number_nearby_ava_taxi(self.API_caller.get_taxi_availability(),des_lat,des_long))

        return prompt

    def get_information_from_db(self):
        cur = self.DB_query.get_cursor()
        # Fetch user prompt from the database
        cur.execute("SELECT prompt FROM user_historical_prompt")
        user_prompt = cur.fetchone() # one or none
        
        # Fetch instructions from the database
        cur.execute("SELECT instruction FROM gemini_instruction")
        instructions = cur.fetchall()

        # Fetch instructions from the database
        cur.execute("SELECT legend FROM api_context_data")
        context = cur.fetchone()


        # Bad SWE practise
        cur.close()

        instructions_text = " ".join(instruction[0] for instruction in instructions)

        return user_prompt, instructions_text, context
    
    def get_prompt(self, form_data, db):
        self.DB_query = db
        type_of_user = form_data["type_of_user"]
        busStop = form_data["busStop"] # need to change to addr 
        curr_pos = form_data["curr_pos"]
        dest_pos = form_data["dest_pos"]
        prompt = form_data["prompt"]
        date = form_data["date_of_event"]
        event = form_data["event"]

        if type_of_user == "user":
            gen_prompt = self.create_prompt_user(curr_pos, dest_pos, date, event)
            
        else:
            gen_prompt = self.create_prompt_service_provider(dest_pos, date, event)
        return gen_prompt