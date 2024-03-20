import Prompt_creator
import API_caller
import Gemini_caller
import DB_query
import json
import logging

class Controller:
    def __init__(self):
        self.Prompt_creator = Prompt_creator.Prompt_creator()
        self.API_caller = API_caller.API_caller()
        self.Gemini_caller = Gemini_caller.Gemini_caller()
        self.DB_query = DB_query.DB_query()
        self.text = ""

    # get data from flask

    def get_api_data(self, form_data):
        # form data should be a json that minimally has these information
        # "type_of_user" : "user" or "service_provider"
        # "busStop" : "bus stop code"
        # "curr_pos" : "latitude,longitude" or "district"
        # "dest_pos" : "latitude,longitude" or "district"
        # "date_of_event": "date"
        # "time" : "AM / PM"
        # "prompt" : "user prompt",
        if type(form_data) != dict:
            form_data = json.loads(form_data)
        prompt = self.Prompt_creator.get_prompt(form_data)

        # self.DB_query.insert_db(prompt, "user_historical_prompt", "prompt")

        # row of new entry
        # need to transform this transaction into atomic method
        try:

            self.DB_query.insert_gem_in_out_db(prompt, "None")

            row = self.DB_query.get_latest_row("gemini_instruction")

            response = self.Gemini_caller.get_response(prompt)
            #print(row[0])
            self.DB_query.update_gem_in_out_db(row[0], response)
            self.text = str(response)
        
        except Exception as e:
            print("Something went wrong", e)

        finally:

            self.DB_query.close_db()
        
    def send_api_data(self):

        # return the LLM's response
        return self.text

# if __name__ == "__main__":
#     fake_data = json.dumps({
#         "type_of_user": "server",
#         "busStop": "80219",
#         "curr_pos": "1.3503458,103.9386226",
#         "dest_pos": "1.3036642,103.8722496",
#         "date_of_event": "2022-01-01",
#         "time": "AM",
#         "prompt": "hello",
#         "date": "02/02/2024",
#         "event": "Slowdive concert"},
#         indent = 4)
#     controller = Controller()
#     controller.get_api_data(fake_data)
