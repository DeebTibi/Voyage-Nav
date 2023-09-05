# speed | TRUE => speed | FALSE => economy
# private | TRUE => private car | FALSE => transit
# walking | TRUE => walking | FALSE => scooter
# environment | TRUE | FALSE
from flask import Flask
from flask_restful import Api, Resource, reqparse, abort
from classifications import process_preferences




app = Flask(__name__)
api = Api(app)


def deserialize_preference(serialized):
    res = {}
    bool_map = {"1": True, "0": False}
    serialized = str(serialized)
    res["speed"] = bool_map[serialized[0]]
    res["private"] = bool_map[serialized[1]]
    res["walking"] = bool_map[serialized[2]]
    res["environment"] = bool_map[serialized[3]]
    return res

def check_returned_data(data):
    if data["status"] != "OK":
        abort(404, message="The supplied paramaters are invalid")

direction_args = reqparse.RequestParser()
direction_args.add_argument("origin", type=str, help="no origin was supplied", required=True)
direction_args.add_argument("destination", type=str, help="no destination was supplied", required=True)

class InitialDirection(Resource):
    def get(self, preference):
        preference = deserialize_preference(preference)
        args = direction_args.parse_args()
        data = process_preferences(preference, args)
        check_returned_data(data)
        return data, 200

api.add_resource(InitialDirection, '/<int:preference>')

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000 ,debug=True)