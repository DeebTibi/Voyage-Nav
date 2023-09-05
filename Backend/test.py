import requests
from to_json import save_data

BASE = "http://127.0.0.1:5000/"
response = requests.get(BASE + "1000", json = {"origin": "Tel Aviv University", "destination": "Microsoft,Herzilya"})
save_data(response.json(), "new")