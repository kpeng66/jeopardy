from fastapi import FastAPI, HTTPException
import uuid
from database import get_db

app = FastAPI()

@app.post("/players/")
async def create_player(name: str):
    unique_id = str(uuid.uuid4())
    conn = get_db()
    cursor = conn.cursor()
    cursor.execute('INSERT INTO players (name, unique_id) VALUES (?, ?)', (name, unique_id))
    conn.commit()
    conn.close()
    return {"unique_id": unique_id, "name": name}

