from sqlalchemy import create_engine
from sqlalchemy_utils import database_exists, create_database
from sqlalchemy.orm import sessionmaker
from dotenv import load_dotenv
import os

load_dotenv()

username = os.environ.get("PSQL_USERNAME")
password = os.environ.get("PSQL_PASSWORD")
host = os.environ.get("PSQL_HOST")
port = os.environ.get("PSQL_PORT")
dbname = os.environ.get("PSQL_DB")

engine = create_engine(f"postgresql://{username}:{password}@{host}:{port}/{dbname}")

if not database_exists(engine.url):
  create_database(engine.url)

Session = sessionmaker(engine)
session = Session(future=True)
