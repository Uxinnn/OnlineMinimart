from json import dumps
from flask import Flask, request
from flask_cors import CORS, cross_origin
from src.functions.web.api.v1.items import create, get_all, update, bulk_update, delete, get
from src.utils.standard_responses import sls_2_flask_response


"""
Easy Flask alternative to serverless for running the app locally.
Run this using `flask --app main run` from the `backend` folder.
"""

app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'


@app.get("/web/api/v1/items")
@cross_origin()
def get_all_items():
  """
  Used by customers to browse items in the minimart.
  Also used by admins to see what items the minimart currently has.
  """
  sls_response = get_all(None, None)
  return sls_2_flask_response(sls_response)


@app.get("/web/api/v1/items/<item_id>")
@cross_origin()
def get_item(item_id):
  """
  Used by customers to browse items in the minimart.
  Also used by admins to see what items the minimart currently has.
  """
  event = {"pathParameters": {"id": item_id},
           }
  sls_response = get(event, None)
  return sls_2_flask_response(sls_response)


@app.post("/web/api/v1/items")
@cross_origin()
def create_item():
  """
  Used by admins to create new items in the minimart.
  """
  event = {"body": dumps(request.json)}
  sls_response = create(event, None)
  return sls_2_flask_response(sls_response)


@app.put("/web/api/v1/items/<item_id>")
@cross_origin()
def update_item(item_id):
  """
  Used by admins to edit the attributes for an item.
  """
  event = {"body": dumps(request.json),
           "pathParameters": {"id": item_id},
           }
  sls_response = update(event, None)
  return sls_2_flask_response(sls_response)


@app.put("/web/api/v1/items")
@cross_origin()
def update_items():
  """
  Used by customers when they buy items and the quantity of these items have to be updated.
  """
  event = {"body": dumps(request.json)}
  sls_response = bulk_update(event, None)
  return sls_2_flask_response(sls_response)


@app.delete("/web/api/v1/items/<item_id>")
@cross_origin()
def delete_item(item_id):
  """
  Used by admins to delete an item for the minimart.
  """
  event = {"pathParameters": {"id": item_id}}
  sls_response = delete(event, None)
  return sls_2_flask_response(sls_response)
