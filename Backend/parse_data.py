from html_to_text import html_to_raw_text
from polyline import decode

"""
parses the data from the request and returns it
"""
def parse_data(data):
    if data["status"] != "OK": return {"status": data["status"]}

    routes = []
    for route in data["routes"]:
        route_legs = []
        for leg in route["legs"]:
            route_leg = {
                "steps": parse_steps(leg),
                "end_address": leg["end_address"],
                "start_address": leg["start_address"],
                "end_location": leg["end_location"],
                "start_location": leg["start_location"]
            }
            route_legs.append(route_leg)
        routes.append({
            "legs": route_legs,
            "overview": decode(route["overview_polyline"]["points"]),
            "summary": route["summary"]
        })
    return {"routes": routes, "status": "OK"}



"""
Parse the steps from a json that contains it
"""
def parse_steps(data):
    steps = []
    
    for step in data["steps"]:
        parsed_step = {
            "duration": step["duration"],
            "end_location": step["end_location"],
            "start_location": step["start_location"],
            "polyline": decode(step["polyline"]["points"]),
            "travel_mode": step["travel_mode"]
        }
        if step.get("html_instructions", None) is not None:
            parsed_step["instruction"] = html_to_raw_text(step["html_instructions"]),
        if step.get("steps", None) is None:
            steps.append(parsed_step)
            continue
        parsed_step["steps"] = parse_steps(step)
        steps.append(parsed_step)
    return steps
