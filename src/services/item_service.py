from sqlalchemy import select, update
from db.models import Item
from db.database import session


def create(**kwargs):
  item = Item(**kwargs)
  session.add(item)
  session.commit()
  session.refresh(item)

  return item


def find(item_id):
  item = select(Item).where(Item.id == item_id)
  result = session.execute(item).scalars().one_or_none()

  return result


def update_record(**kwargs):
  _id = kwargs['id']
  body = kwargs['body']
  query = update(Item).where(Item.id == _id).values(body).execution_options(synchronize_session="fetch")
  session.execute(query)
  session.commit()

  item = find(item_id=_id)

  return item


def delete_record(**kwargs):
  item = session.query(Item).filter_by(id=kwargs['id']).first()

  session.delete(item)
  session.commit()
