import sqlite3 as db
import logging


class DB_schema:

    def __init__(self):
        self.conn = db.connect('database.db')
        self.c = self.conn.cursor()

    def create_db(self):
        create_gemini_instruction_query = """
        CREATE TABLE IF NOT EXISTS gemini_instruction (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            instruction TEXT NOT NULL,
            response TEXT
        );
        """
        create_user_historical_prompt_query = """
        CREATE TABLE IF NOT EXISTS user_historical_prompt (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            prompt TEXT
        );
        """
        create_api_context_data = """
        CREATE TABLE IF NOT EXISTS api_context_data (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            legend TEXT
        );
        """
        
        create_event_counter_table = """
        CREATE TABLE IF NOT EXISTS event_counter_table(
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                event_name TEXT,
                venue TEXT,
                date DATE,
                count INTEGER
                )
        """

        try:
            self.c.execute(create_gemini_instruction_query)
            self.c.execute(create_user_historical_prompt_query)
            self.c.execute(create_api_context_data)
            self.c.execute(create_event_counter_table)
            self.conn.commit()
            print("DB created successfully")
        except db.OperationalError as e:
            print("Database not created due to", e)
        finally:
            self.c.close()
            self.conn.close()

if __name__ == "__main__":
    db = DB_schema()
    db.create_db()
