from sqlalchemy import create_engine
from sqlalchemy_utils import database_exists, create_database
from sqlalchemy.orm import sessionmaker

# TODO: Abstract these information into env file
username = ""
password = ""
host = ""
port = 0
dbname = ""

engine = create_engine(f"postgresql://{username}:{password}@{host}:{port}/{dbname}")

if not database_exists(engine.url):
  create_database(engine.url)

Session = sessionmaker(engine)
session = Session(future=True)
