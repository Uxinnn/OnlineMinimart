from sqlalchemy import create_engine
from sqlalchemy_utils import database_exists, create_database
from sqlalchemy.orm import sessionmaker
from db.models.base import Base
from db.models.item import Item
from src.utils.utils import sample_items
from config import DB_URL


"""
Creates the database used by the application and populate it with some sample data if the database does not exist.
Then create an SQLAlchemy session object that will be used by the backend to interact with the database.
"""

engine = create_engine(DB_URL)

init_db = not database_exists(engine.url)
if init_db:
  create_database(engine.url)
  Base.metadata.create_all(engine)

Session = sessionmaker(engine)
session = Session(future=True)

if init_db:
  # Populate empty database
  for raw_item in sample_items:
    item = Item(**raw_item)
    session.add(item)
  session.commit()


def get_session():
  Session = sessionmaker(engine)
  # Creates a new session for a database transaction
  session = Session(future=True)
  return session

