import pathlib
import textwrap
import google.generativeai as genai
from IPython.display import display
from IPython.core.display import Markdown
import python_tokens

class Gemini_caller:

    def __init__(self, modelname = "gemini-1.0-pro-latest"):
        genai.configure(api_key=python_tokens.google_api_key)
        self.model = genai.GenerativeModel(modelname)
        self.previous_response = ""

    def to_markdown(text):
        text = text.replace('•', '  *')
        return Markdown(textwrap.indent(text, '> ', predicate=lambda _: True))
    
    def get_response(self, prompt):
        response = self.model.generate_content(prompt)
        self.previous_response = response.text
        print("WOW", self.previous_response)
        return response

    def get_model(self):
        return self.model
    
    def data_cleaning(self, prompt):
        # clean prompt
        return prompt