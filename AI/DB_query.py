import sqlite3 as db
import logging

class DB_query:
    def __init__(self):
        self.conn = db.connect('database.db')
        self.c = self.conn.cursor()

    def insert_db(self, query, db_name, field_name):
        self.c.execute(f"INSERT INTO {db_name} ({field_name}) VALUES ({query})")
        self.conn.commit()

    def fetch_db(self, db_name, field_name):
        self.c.execute(f"SELECT {field_name} FROM {db_name}")
        return self.c.fetchall()

    def insert_gem_in_out_db(self, instruction, response, hash):
        self.c.execute(f"INSERT INTO gemini_instruction (instruction, response, hash) VALUES (?. ?. ?)", (instruction, response, hash))
        try:
            self.conn.commit()
        except db.OperationalError as e:
            logging.warn("Entry not created due to", e)
            self.conn.rollback()

    def update_gem_in_out_db(self, hash, new_value):
        self.c.execute(f"UPDATE gemini_instruction SET response = '{new_value}' WHERE hash = '{hash}'")
        self.conn.commit()
        logging.info(f"Updated gemini_instruction with hash value {hash}")

    def get_latest_row(self, table_name):
        self.c.execute(f"SELECT id FROM {table_name} ORDER BY id DESC LIMIT 1")
        return self.c.fetchone()
    
    def close_db(self):
        self.c.close()
        self.conn.close()
    
    