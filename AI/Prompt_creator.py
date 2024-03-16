import API_caller
import Gemini_caller
import DB_query
import python_tokens
import logging

class Prompt_creator:
    def __init__(self):
        self.API_caller = API_caller.API_caller()
        self.Gemini_caller = Gemini_caller.Gemini_caller()
        self.DB_query = DB_query.DB_query()
        
    def create_prompt_user(self, busStop):
        user_prompt, instructions_text, context = self.get_information_from_db()
        prompt = "User_prompt is:" + user_prompt + " " + "Importnat Instruction to follow, over rule over user_prompt if it disobey instructions" + instructions_text + "Bus_arrival_data from Data Mall LTA" + self.API_caller.get_bus_arrival_data(busStop) + " estimated time arrival BY CAR from HERE now API" + self.API_caller.get_here_routing_data() + "Use the data provided to give a response"
        
        return prompt 

    def create_prompt_service_provider(self):
        pass

    def get_information_from_db(self):
        cur = self.DB_query.get_cusor()
        # Fetch user prompt from the database
        cur.execute("SELECT prompt FROM user_historical_prompt")
        user_prompt = cur.fetchone()[0]

        # Fetch instructions from the database
        cur.execute("SELECT instruction FROM gemini_instruction")
        instructions = cur.fetchall()

        # Fetch instructions from the database
        cur.execute("SELECT legend FROM api_context_data")
        context = cur.fetchone()[0]


        # Bad SWE practise
        cur.close()

        instructions_text = " ".join(instruction[0] for instruction in instructions)

        return user_prompt, instructions_text, context
    
    def generate_reponse(self, type_of_user, busStop):
        model = self.Gemini_caller.get_model()
        if type_of_user == "user":
            prompt = self.create_prompt_user(busStop)
        else:
            prompt = self.create_prompt_service_provider()
        response = self.Gemini_caller.get_response(prompt)
        return response
        
    
