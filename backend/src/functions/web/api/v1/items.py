import logging
import json
import src.services.item_service as item_service
from src.utils import UUIDEncoder, success
from src.validators import validate_item, unprocessable_entity, unknown_errors


logging.getLogger().setLevel(logging.INFO)


def create(event, context):
  logging.info(f"Create item: {event}")
  raw_item = json.loads(event["body"])
  try:
    validate_item(raw_item)
  except (KeyError, ValueError, TypeError) as e:
    logging.error(e)
    return unprocessable_entity("")
  try:
    item = item_service.create(raw_item)
    ret = success(item)
    logging.info(ret)
    return ret
  except Exception as e:
    logging.error(e)
    return unknown_errors("")


def get_all(event, context):
  logging.info(f"Get all items: {event}")
  try:
    items = item_service.all_records()

    ret = success(items)
    logging.info(ret)

    return ret
  except Exception as e:
    logging.error(e)
    return unknown_errors("")


def get(event, context):
  logging.info(f"Get item: {event}")
  try:
    _id = event["pathParameters"]["id"]
    item = item_service.find(_id)

    ret = success(item)
    logging.info(ret)

    return ret
  except Exception as e:
    logging.error(e)
    return unknown_errors("")


def update(event, context):
  logging.info(f"Update item: {event}")
  item = json.loads(event['body'])
  try:
    item["id"] = event["pathParameters"]["id"]
    validate_item(item)
  except (KeyError, ValueError, TypeError) as e:
    logging.error(e)
    return unprocessable_entity("")
  try:
    item = item_service.update_record(item)

    ret = success(item)
    logging.info(ret)

    return ret
  except Exception as e:
    logging.error(e)
    return unknown_errors("")


def bulk_update(event, context):
  logging.info(f"Update items: {event}")
  items = json.loads(event['body'])
  try:
    for item in items:
      validate_item(item)
  except (KeyError, ValueError, TypeError) as e:
    logging.error(e)
    return unprocessable_entity("")
  try:
    items = item_service.update_records(items)

    ret = success(items)
    logging.info(ret)

    return ret
  except Exception as e:
    logging.error(e)
    return unknown_errors("")


def delete(event, context):
  logging.info(f"Delete item: {event}")
  _id = event["pathParameters"]["id"]
  try:
    item = item_service.delete_record(_id)

    ret = success(item)
    logging.info(ret)

    return ret
  except Exception as e:
    logging.error(e)
    return unknown_errors("")
