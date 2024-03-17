import Prompt_creator
import API_caller
import Gemini_caller
import DB_query
import json
import python_tokens
import logging

class Controller:
    def __init__(self):
        self.Prompt_creator = Prompt_creator.Prompt_creator()
        self.API_caller = API_caller.API_caller()
        self.Gemini_caller = Gemini_caller.Gemini_caller()
        self.DB_query = DB_query.DB_query()

    # get data from flask

    def get_api_data(self, form_data):
        # form data should be a json that minimally has these information
        # "type_of_user" : "user" or "service_provider"
        # "busStop" : "bus stop code"
        # "curr_pos" : "latitude,longitude"
        # "dest_pos" : "latitude,longitude"
        # "prompt" : "user prompt"

        prompt = self.Prompt_creator.get_prompt(form_data)
        # self.DB_query.insert_db(prompt, "user_historical_prompt", "prompt")

        # row of new entry
        # need to transform this transaction into atomic method
        try:
            self.DB_query.insert_gem_in_out_db(prompt, None)
            row = self.DB_query.get_latest_row("gemini_instruction")
            response = self.Gemini_caller.get_response(prompt)
            self.DB_query.update_gem_in_out_db(row[0], response)
        except Exception as e:
            logging.warn("Something went wrong", e)
    

        return response
    