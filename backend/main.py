from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import uuid
from database import get_db, create_tables

app = FastAPI()

origins = [
    "http://localhost:3000/",
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

@app.on_event("startup")
def startup_event():
    create_tables() # Create tables on startup

class Player(BaseModel):
    name: str

@app.post("/players/")
async def create_player(player: Player):
    conn = get_db()
    cursor = conn.cursor()
    cursor.execute('INSERT INTO players (name) VALUES (?)', (player.name,))
    conn.commit()
    conn.close()
    return {"name": player.name}

