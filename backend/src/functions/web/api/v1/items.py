import logging
import json
import src.services.item_service as item_service
from src.utils import UUIDEncoder


def create(event, context):
  raw_item = json.loads(event["body"])
  print(raw_item)
  item = item_service.create(raw_item)

  return {"statusCode": 200,
          "body": json.dumps(item, cls=UUIDEncoder),
          }


def get_all(event, context):
  items = item_service.all_records()

  return {"statusCode": 200,
          "body": json.dumps(items, cls=UUIDEncoder),
          }


def get(event, context):
  _id = event["pathParameters"]["id"]
  print(_id)
  item = item_service.find(_id)

  return {"statusCode": 200,
          "body": json.dumps(item, cls=UUIDEncoder),
          }


def update(event, context):
  item = json.loads(event['body'])
  item["id"] = event["pathParameters"]["id"]
  item = item_service.update_record(item)

  return {"statusCode": 200,
          "body": json.dumps(item, cls=UUIDEncoder),
          }


def delete(event, context):
  _id = event["pathParameters"]["id"]
  print(_id)
  item = item_service.delete_record(_id)

  return {"statusCode": 200,
          "body": json.dumps(item, cls=UUIDEncoder),
          }
