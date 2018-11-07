import requests
import json
import threading

def sendIt():

	print('Executing...')

	raw = {"student_id":"123"}
	payload = json.dumps(raw)
	print('Sending ', payload)

	r = requests.post('http://localhost:5000/api/buddies', data = payload, headers = {"content-type":"application/json"})
	print(r)
	print(r.text)
	print('Finished.')


def hello():
	threading.Timer(5.0, hello).start()
	print("Helloooo")

sendIt()
hello()
