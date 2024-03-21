import sqlite3 as db
import logging

class DB_query:
    def __init__(self):
        self.conn = db.connect('database.db', check_same_thread=False)
        self.c = self.conn.cursor()

    def insert_db(self, query, db_name, field_name):
        self.c.execute(f"INSERT INTO {db_name} ({field_name}) VALUES ({query})")
        self.conn.commit()

    def fetch_db(self, db_name, field_name):
        self.c.execute(f"SELECT {field_name} FROM {db_name}")
        return self.c.fetchall()

    def insert_gem_in_out_db(self, instruction, response):
        self.c.execute(f"INSERT INTO gemini_instruction (instruction, response) VALUES (?, ?)", (instruction, response))
        try:
            self.conn.commit()
        except db.OperationalError as e:
            print("Entry not created due to", e)
            self.conn.rollback()

    #TODO: Add a query to CRU events info + users counter



    def update_gem_in_out_db(self, id, new_value):
        self.c.execute(f"UPDATE gemini_instruction SET response = '{new_value}' WHERE id = '{id}'")
        self.conn.commit()
        print(f"Updated gemini_instruction with hash value {id}")

    def get_latest_row(self, table_name):
        self.c.execute(f"SELECT id FROM {table_name} ORDER BY id DESC LIMIT 1")
        return self.c.fetchone()
    
    def close_db(self):
        self.c.close()
        self.conn.close()

    def get_cursor(self):
        return self.c
    
    