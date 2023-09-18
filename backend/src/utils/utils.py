import json
from uuid import UUID, uuid4


class UUIDEncoder(json.JSONEncoder):
  def default(self, obj):
    if isinstance(obj, UUID):
      # if the obj is uuid, we simply return the value of uuid
      return str(obj)
    return json.JSONEncoder.default(self, obj)


sample_items = [
  {
    "id": str(uuid4()),
    "name": "Lays Potato Chips",
    "qty": 50,
    "price": 1.20,
  },
  {
    "id": str(uuid4()),
    "name": "Magnum Classic Ice Cream",
    "qty": 35,
    "price": 3.00,
  },
  {
    "id": str(uuid4()),
    "name": "A pet chicken",
    "qty": 1,
    "price": 10000,
  },
  {
    "id": str(uuid4()),
    "name": "Mentos",
    "qty": 200,
    "price": 1,
  },
  {
    "id": str(uuid4()),
    "name": "Dasani Bottled Water",
    "qty": 2,
    "price": 1.50,
  },
]
