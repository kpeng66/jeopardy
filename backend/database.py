import sqlite3
from sqlite3 import Connection

DATABASE_URL = "spyfall.db"

def get_db() -> Connection:
    conn = sqlite3.connect(DATABASE_URL)
    conn.row_factory = sqlite3.Row
    return conn

def create_tables():
    with get_db() as db:
        db.execute("""
                   CREATE TABLE IF NOT EXISTS games (
                   id INTEGER PRIMARY KEY AUTOINCREMENT,
                   name TEXT NOT NULL
                   )
                   """)
        db.execute("""
                   CREATE TABLE IF NOT EXISTS players (
                   id INTEGER PRIMARY KEY AUTOINCREMENT,
                   name TEXT NOT NULL,
                   game_id INTEGER,
                   FOREIGN KEY (game_id) REFERENCES games(id)
                   )
                   """)
    
        db.commit()

create_tables()
        