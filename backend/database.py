import sqlite3
from sqlite3 import Connection, Error
import logging

logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')

DATABASE_URL = "jeopardy.db"

def get_db() -> Connection:
    try:
        conn = sqlite3.connect(DATABASE_URL)
        conn.row_factory = sqlite3.Row
        return conn
    except Error as e:
        logging.error(f"Failed to connect to database: {e}")
        raise

def create_tables():
    try:
        with get_db() as db:
            db.commit()
            logging.info("Tables created successfully")
    except Error as e:
        logging.error(f"Failed to create tables: {e}")
        raise


# create_tables()
        