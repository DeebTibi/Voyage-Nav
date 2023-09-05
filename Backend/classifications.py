from request import send_request

"""
receives a prefernce payload from server to construct a request URL
returns the parsed data back
"""
def process_preferences(preferences, nav_info):
    suffix_url = ""

    speed, private, walking, environment = preferences.values()
    
    origin = nav_info.get("origin", None)
    destiantion = nav_info.get("destination", None)
    if origin is None or destiantion is None:
        return {"status": "ERR"}
    region = "il"

    if is_coords(origin):
        origin = parse_coords(origin)
    
    suffix_url += f"?origin={origin}&destination={destiantion}&region={region}"

    if not speed:
        suffix_url += "&avoid=tolls"
    if not private:
        suffix_url += "&mode=transit"

    print(private)
    print(suffix_url)
    # The handling of scooter vs walking is done through the app 
    # Look for scooters nearby and direct the user to them and make them take walking routes using them
    
    parsed_data = send_request(suffix_url)
    return parsed_data



def is_coords(place):
    if isinstance(place, dict):
        return True
    return False


def parse_coords(coords):
    return f"{coords['latitude']},{coords['longitude']}"