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
            instruction TEXT
        );
        """
        create_user_historical_prompt_query = """
        CREATE TABLE IF NOT EXISTS user_historical_prompt (
            qid INTEGER PRIMARY KEY AUTOINCREMENT,
            prompt TEXT
        );
        """
        create_api_context_data = """
        CREATE TABLE IF NOT EXISTS api_context_data (
            qid INTEGER PRIMARY KEY AUTOINCREMENT,
            legend TEXT
        );
        """
        
        try:
            self.c.execute(create_gemini_instruction_query)
            self.c.execute(create_user_historical_prompt_query)
            self.c.execute(create_api_context_data)
            self.conn.commit()
            logging.info("DB created successfully")
        except db.OperationalError as e:
            logging.warn("Database not created due to", e)
        finally:
            self.c.close()
            self.conn.close()

