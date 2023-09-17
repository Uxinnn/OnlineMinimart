from sqlalchemy import select, update
from db.models.item import Item
from db.database import session


def create(raw_item):
  item = Item(**raw_item)
  session.add(item)
  session.commit()
  session.refresh(item)

  return item.to_dict()


def all_records():
  query = select(Item)
  items = session.execute(query).scalars().all()

  return [item.to_dict() for item in items]


def find(item_id):
  query = select(Item).where(Item.id == item_id)
  item = session.execute(query).scalars().one_or_none()

  return item.to_dict()


def update_record(item):
  _id = item['id']
  query = update(Item).where(Item.id == _id).values(item).execution_options(synchronize_session="fetch")
  session.execute(query)
  session.commit()

  item = find(item_id=_id)

  return item


def update_records(items):
  session.bulk_update_mappings(Item, items)
  session.commit()

  return items


def delete_record(_id):
  item = session.query(Item).filter_by(id=_id).first()
  print(item.to_dict())

  session.delete(item)
  session.commit()

  return item.to_dict()


# if __name__ == "__main__":
#   print(session.bulk_insert_mappings)
