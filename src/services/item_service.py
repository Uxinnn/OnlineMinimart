from sqlalchemy import select, update
from db.models import Item
from db.database import session


def create(raw_item):
  item = Item(**raw_item)
  session.add(item)
  session.commit()
  session.refresh(item)

  return item.to_dict()


def all_records():
  items = select(Item)
  result = session.execute(items).scalars().all()

  return [item.to_dict() for item in result]


def find(item_id):
  item = select(Item).where(Item.id == item_id)
  result = session.execute(item).scalars().one_or_none()

  return result.to_dict()


def update_record(item):
  _id = item['id']
  query = update(Item).where(Item.id == _id).values(item).execution_options(synchronize_session="fetch")
  session.execute(query)
  session.commit()

  item = find(item_id=_id)

  return item


def delete_record(_id):
  item = session.query(Item).filter_by(id=_id).first()

  session.delete(item)
  session.commit()
