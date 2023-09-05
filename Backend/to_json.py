import json

def save_data(lst, name_of_save_file):
    dump = json.dumps(lst)

    with open(f'{name_of_save_file}.json', 'w') as file:
        file.write(dump)

    print("Data has been saved to data.json")