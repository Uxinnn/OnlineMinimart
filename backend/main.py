from json import dumps
from flask import Flask, request
from src.functions.web.api.v1.items import create, get_all, bulk_update, delete


"""
Easy Flask alternative to serverless for running the app locally.
"""

app = Flask(__name__)


@app.get("/web/api/v1/items")
def get_all_items():
    return get_all(None, None)


@app.post("/web/api/v1/items")
def create_item():
  event = {"body": dumps(request.json)}
  return create(event, None)


@app.put("/web/api/v1/items")
def update_items():
  event = {"body": dumps(request.json)}
  return bulk_update(event, None)


@app.delete("/web/api/v1/items/<item_id>")
def delete_item(item_id):
  event = {"pathParameters": {"id": item_id}}
  return delete(event, None)
