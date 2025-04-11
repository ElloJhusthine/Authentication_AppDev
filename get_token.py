import requests

url = "http://127.0.0.1:8000/api-token-auth/"
data = {
    "username": "admin",
    "password": "Jhusthine@123"
}

headers = {
    "Content-Type": "application/x-www-form-urlencoded",
    "Accept": "application/json"
}

response = requests.post(url, data=data, headers=headers)

print("Status Code:", response.status_code)
print("Response:", response.text)
