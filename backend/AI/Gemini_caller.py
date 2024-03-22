import pathlib
import textwrap
import google.generativeai as genai
from IPython.display import display
from IPython.core.display import Markdown
import python_tokens
import logging

class Gemini_caller:

    def __init__(self, modelname = "gemini-1.0-pro-latest"):
        genai.configure(api_key=python_tokens.google_api_key)
        self.model = genai.GenerativeModel(modelname)
        self.chat = self.model.start_chat(history=[])
        self.previous_response = ""

    def to_markdown(text):
        text = text.replace('•', '  *')
        return Markdown(textwrap.indent(text, '> ', predicate=lambda _: True))
    
    def get_response(self, prompt):
        response = self.chat.send_message(prompt)
        self.previous_response = response.text
        logging.info(f"Response from Gemini: {self.chat.history}")
        return self.previous_response

    def get_model(self):
        return self.model
    
    def data_cleaning(self, prompt):
        # clean prompt
        return prompt