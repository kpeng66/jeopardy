from fastapi import FastAPI, Depends, HTTPException
from sqlite3 import Connection
from database import get_db

app = FastAPI()

@app.get("/")
def read_root():
    return {"Hello": "World"}