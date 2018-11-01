import requests
import json

print('Executing...')

raw = {"boop":"butt"}
payload = json.dumps(raw)
print('Sending ', payload)

r = requests.post('http://localhost:5000/api/buddies', data = payload, headers = {"content-type":"application/json"})
print(r)
print(r.text)
print('Finished.')