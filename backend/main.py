from fastapi import FastAPI, Depends
from fastapi.security import OAuth2PasswordBearer
from fastapi.middleware.cors import CORSMiddleware
from starlette.middleware.sessions import SessionMiddleware
from starlette.requests import Request
import requests
from jose import jwt
from urllib.parse import urlencode
from dotenv import load_dotenv
import os

load_dotenv()

GOOGLE_CLIENT_SECRET = os.getenv("GOOGLE_CLIENT_SECRET")

origins = [
    "http://localhost:3000/",
    "http://localhost:3000",
]

app = FastAPI()
oauth = OAuth2PasswordBearer(tokenUrl="token")

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

app.add_middleware(
    SessionMiddleware,
    secret_key="secretkey"
)

GOOGLE_CLIENT_ID = "141550567018-6db3dedne2ofhd4q4dq0ihfnogpnbm8o.apps.googleusercontent.com"
GOOGLE_REDIRECT_URI = "http://localhost:8000"

@app.get("/")
def read_root():
    return {"Hello": "World"}

@app.get("/login/google")
async def login_google():
   base_google_url = "https://accounts.google.com/o/oauth2/auth"
   params = {
        "response_type": "code",
        "client_id": GOOGLE_CLIENT_ID,
        "redirect_uri": GOOGLE_REDIRECT_URI,
        "scope": "openid profile email",
        "access_type": "offline",  # Ensure this is correctly included if needed
        "prompt": "consent"
    }
   
   url = f"{base_google_url}?{urlencode(params)}"
   return {"url": url}

@app.get("/auth/google")
async def auth_google(code: str):
    token_url = "https://accounts.google.com/o/oauth2/token"
    data = {
        "code": code,
        "client_id": GOOGLE_CLIENT_ID,
        "client_secret": GOOGLE_CLIENT_SECRET,
        'redirect_uri': GOOGLE_REDIRECT_URI,
        "grant_type": "authorization_code",
    }
    response = requests.post(token_url, data=data)
    access_token = response.json().get("access_token")
    user_info = requests.get("https://www.googleapis.com/oauth2/v1/userinfo", headers={"Authorization": f"Bearer {access_token}"})
    return user_info.json()

@app.get("/token")
async def get_token(token: str = Depends(oauth)):
    return jwt.decode(token, GOOGLE_CLIENT_SECRET, algorithms=["HS256"])

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", post=8000)