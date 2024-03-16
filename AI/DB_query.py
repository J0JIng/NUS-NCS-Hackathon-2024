import sqlite3 as db

class DB_query:
    def __init__(self):
        self.conn = db.connect('database.db')
        self.c = self.conn.cursor()

    def insert_db(self, query, db_name, field_name):
        self.c.execute(f"INSERT INTO {db_name} ({field_name}) VALUES ({query})")
        self.conn.commit()
        return self.c.fetchall()
    
    def fetch_db(self, db_name, field_name):
        self.c.execute(f"SELECT {field_name} FROM {db_name}")
        return self.c.fetchall()
    
    def close_db(self):
        self.conn.close()

    def get_cusor(self):
        return self.c
    
    