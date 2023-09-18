from sqlalchemy import select, update
from db.models.item import Item
from db.database import get_session


"""
This file contains functions used to hide SQLAlchemy logic from API functions (that are situated in 
`src/functions/web/api/v1`).
Functions in this file contains SQLAlchemy logic used to interact with the database.
"""

def create(raw_item):
  session = get_session()
  item = Item(**raw_item)
  session.add(item)
  session.commit()
  session.refresh(item)
  session.close()

  return item.to_dict()


def all_records():
  query = select(Item)
  session = get_session()
  items = session.execute(query).scalars().all()
  session.close()
  return [item.to_dict() for item in items]


def find(item_id):
  session = get_session()
  query = select(Item).where(Item.id == item_id)
  item = session.execute(query).scalars().one_or_none()

  return item.to_dict()


def update_record(item):
  session = get_session()
  _id = item['id']
  query = update(Item).where(Item.id == _id).values(item).execution_options(synchronize_session="fetch")
  session.execute(query)
  session.commit()
  session.close()

  item = find(item_id=_id)

  return item


def update_records(items):
  session = get_session()
  session.bulk_update_mappings(Item, items)
  session.commit()
  session.close()

  return items


def delete_record(_id):
  session = get_session()
  item = session.query(Item).filter_by(id=_id).first()

  session.delete(item)
  session.commit()

  return item.to_dict()
