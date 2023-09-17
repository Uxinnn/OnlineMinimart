from uuid import UUID


def validate_item(item, strict=True):
  """
  Validate the key and values of an item before it is sent over to the database
  for processing. Ensures all items in the database is sanitised.
  :param item: item to be validated.
  :param strict: If True, make sure item contains all fields necessary for an item.
                 If False, just ensure the item contains a subset of necessary
                 fields (Used for item updates).
  :return: Whether the item passes validation or not.
  """
  item_cols = {"id", "name", "qty", "price"}
  # Ensure item does not have any unknown columns
  for col in item.keys():
    if col not in item_cols:
      raise KeyError(f"Invalid item column: {col}")
  # Ensure item contains all necessary columns
  if strict and len(item.keys()) != len(item_cols):
    raise ValueError(f"Incorrect number of item columns: {len(item)}")

  # Validate each key value pair in item
  col_2_validator = {
    "id": validate_item_id,
    "name": validate_item_name,
    "qty": validate_item_qty,
    "price": validate_item_price,
  }
  for col, validator in col_2_validator.items():
    if col in item.keys():
      validator(item[col])


def validate_item_id(_id):
  # Check valid UUID string for id column
  if type(_id) != str:
    raise TypeError(f"Invalid item id type: {type(_id)}")
  try:
    UUID(_id)
  except ValueError:
    raise ValueError(f"Invalid item UUID: {_id}")


def validate_item_name(name):
  # Check valid name for name column (contains only alphanumeric characters
  # and spaces)
  if type(name) != str:
    raise TypeError(f"Invalid item name type: {type(name)}")
  if not (name.isalnum() or name.isspace()):
    raise ValueError(f"Invalid item name: {name}")


def validate_item_qty(qty):
  # Check valid quantity for qty column (non-negative integer)
  if type(qty) != int:
    raise TypeError(f"Invalid item qty type: {type(qty)}")
  if qty < 0:
    raise ValueError(f"Invalid item qty: {qty}")


def validate_item_price(price):
  # Check valid price for price column (non-negative float)
  if type(price) != float and type(price) != int:
    raise TypeError(f"Invalid item price type: {type(price)}")
  if price < 0:
    raise ValueError(f"Invalid item price: {price}")
