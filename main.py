import os
import psycopg2
from flask import Flask

app = Flask(__name__)


def get_db_connection():
    conn = psycopg2.connect(host='localhost',
                            database='minimart',
                            user='postgres',
                            password='p0stgr3s')
    return conn


@app.route('/')
def index():
    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute('SELECT * FROM item;')
    books = cur.fetchall()
    cur.close()
    conn.close()
    return {"body": books, "statusCode": 200, 'headers': {
      'Content-Type': 'application/json'
    }}
