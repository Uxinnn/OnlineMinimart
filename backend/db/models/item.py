from sqlalchemy import String
from sqlalchemy.orm import Mapped, mapped_column
from db.models.base import Base
import uuid


class Item(Base):
  """
  Item class model used by SQLAlchemy. This should be an accurate model of the item table in the database.
  """
  __tablename__ = 'item'

  # Columns
  id: Mapped[str] = mapped_column(String,  # str is used since sqlite does not have a UUID datatype.
                                  primary_key=True,
                                  default=lambda: str(uuid.uuid4()))
  name: Mapped[str] = mapped_column(String)
  qty: Mapped[int] = mapped_column()
  price: Mapped[float] = mapped_column()

  # Methods
  def to_dict(self):
    # Used to convert Item objects to a python dictionary.
    item_dict = {col.name: getattr(self, col.name) for col in self.__table__.columns}
    return item_dict
