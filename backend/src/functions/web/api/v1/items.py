import logging
import json
import src.services.item_service as item_service
from src.utils.standard_responses import success, unprocessable_entity, unknown_errors
from src.utils.validators import validate_item


"""
This file contains CRUD functions that will be called by API and are used to modify items in the database.
Functions return a response code based on the success of the function call.
In the event of a failed function call, the error will be logged, and a generic response code will be returned 
to prevent clients from being able to view detailed errors in the backend.
"""

logging.getLogger().setLevel(logging.INFO)


def create(event, context):
  """
  Creates a new item in the items table.
  """
  logging.info(f"Create item: {event}")
  raw_item = json.loads(event["body"])
  # Ensure item key and values are valid.
  try:
    validate_item(raw_item, strict=False)
  except (KeyError, ValueError, TypeError) as e:
    logging.error(e)
    return unprocessable_entity({})
  try:
    item = item_service.create(raw_item)
    ret = success(item)
    logging.info(ret)
    return ret
  except Exception as e:
    logging.error(e)
    return unknown_errors({})


def get_all(event, context):
  """
  Retrieve all items in the items table.
  """
  logging.info(f"Get all items: {event}")
  try:
    items = item_service.all_records()

    ret = success(items)
    logging.info(ret)

    return ret
  except Exception as e:
    logging.error(e)
    return unknown_errors([])


def get(event, context):
  """
  Get a single item by id from the items table.
  """
  logging.info(f"Get item: {event}")
  try:
    _id = event["pathParameters"]["id"]
    item = item_service.find(_id)

    ret = success(item)
    logging.info(ret)

    return ret
  except Exception as e:
    logging.error(e)
    return unknown_errors({})


def update(event, context):
  """
  Update a single item by id in the items table.
  """
  logging.info(f"Update item: {event}")
  item = json.loads(event['body'])
  try:
    # Ensure item key and values are valid.
    item["id"] = event["pathParameters"]["id"]
    validate_item(item, strict=False)
  except (KeyError, ValueError, TypeError) as e:
    logging.error(e)
    return unprocessable_entity({})
  try:
    item = item_service.update_record(item)

    ret = success(item)
    logging.info(ret)

    return ret
  except Exception as e:
    logging.error(e)
    return unknown_errors({})


def bulk_update(event, context):
  """
  Update a list of items by id in the items table.
  """
  logging.info(f"Update items: {event}")
  items = json.loads(event['body'])
  try:
    # Ensure item key and values are valid.
    for item in items:
      validate_item(item, strict=False)
  except (KeyError, ValueError, TypeError) as e:
    logging.error(e)
    return unprocessable_entity([])
  try:
    items = item_service.update_records(items)

    ret = success(items)
    logging.info(ret)

    return ret
  except Exception as e:
    logging.error(e)
    return unknown_errors([])


def delete(event, context):
  """
  Delete an item by id from the items table.
  """
  logging.info(f"Delete item: {event}")
  _id = event["pathParameters"]["id"]
  try:
    item = item_service.delete_record(_id)

    ret = success(item)
    logging.info(ret)

    return ret
  except Exception as e:
    logging.error(e)
    return unknown_errors({})
