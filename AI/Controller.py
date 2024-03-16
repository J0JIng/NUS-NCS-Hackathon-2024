import Prompt_creator
import API_caller
import Gemini_caller
import DB_query
import python_tokens
import logging

class Controller:
    def __init__(self):
        self.Prompt_creator = Prompt_creator.Prompt_creator()
        self.API_caller = API_caller.API_caller()
        self.Gemini_caller = Gemini_caller.Gemini_caller()
        self.DB_query = DB_query.DB_query()

    # get data from flask

    def get_api_data(self, busStop):
        pass