from sqlalchemy import String
from sqlalchemy.orm import Mapped, mapped_column
from db.models.base import Base
import uuid


class Item(Base):
  __tablename__ = 'item'

  # Columns
  id: Mapped[str] = mapped_column(String, primary_key=True, default= lambda : str(uuid.uuid4()))
  # id: Mapped[UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, default=lambda: uuid.uuid4())
  name: Mapped[str] = mapped_column(String)
  qty: Mapped[int] = mapped_column()
  price: Mapped[float] = mapped_column()

  # Methods
  def to_dict(self):
    item_dict = {col.name: getattr(self, col.name) for col in self.__table__.columns}
    return item_dict
