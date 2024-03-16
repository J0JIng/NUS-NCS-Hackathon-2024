
#import pathlib
import textwrap

import google.generativeai as genai

#from IPython.display import display
from IPython.display import Markdown
google_api_key = "AIzaSyBbu2paQYudElhSBKRD93vF1Wf3jmxDCEo"


class GeminiPrompter:
    
    def __init__(self, modelname = "gemini-1.0-pro-latest"):
        genai.configure(api_key=google_api_key)
        self.model = genai.GenerativeModel(modelname)
        self.previous_response = ""

    def to_markdown(self, text):
      text = text.replace('•', '  *')
      return Markdown(textwrap.indent(text, '> ', predicate=lambda _: True))

    def print_models(self):
        for m in genai.list_models():
            if 'generateContent' in m.supported_generation_methods:
                print(m.name)


    
    def get_response(self, prompt):
        response = self.model.generate_content(prompt)
        self.previous_response = response.text
        print(self.previous_response)
        return response
    
    def become_markdown(self, response):
        self.to_markdown(response.text)

gem = GeminiPrompter()
gem.get_response("What is the meaning to life?")
gem.print_models()

