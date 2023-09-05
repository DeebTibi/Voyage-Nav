from parse_data import parse_data
from to_json import save_data
import requests
import os
from dotenv import load_dotenv



load_dotenv()

API_KEY = os.environ.get("API_KEY")
BASE = "https://maps.googleapis.com/maps/api/directions/json"



secret_key = os.environ.get("SECRET_KEY")

"""
@param: request_suffix, the suffix to be appended to the request, obtained from the classifications module
Sends a GET request to the googlemaps directions api and sends the data to the parse_data module
"""
def send_request(request_suffix):
    request_url = BASE + request_suffix + f"&key={API_KEY}"
    data = {}
    response = requests.get(request_url)
    data = response.json()

    
    return parse_data(data)