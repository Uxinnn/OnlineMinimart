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


def sls_2_flask_response(sls_response):
  return sls_response["body"], sls_response["statusCode"], sls_response["headers"]


# API call return values
def success(body):
  return {
    'statusCode': 200,
    'headers': {
      'Content-Type': 'application/json'
    },
    'body': json.dumps(body, cls=UUIDEncoder),
  }


def bad_request(body):
  return {
    'statusCode': 400,
    'headers': {
      'Content-Type': 'application/json'
    },
    'body': json.dumps(body, cls=UUIDEncoder),
  }


def unauthorized(body):
  return {
    'statusCode': 401,
    'headers': {
      'Content-Type': 'application/json'
    },
    'body': json.dumps(body, cls=UUIDEncoder),
  }


def not_found(body):
  return {
    'statusCode': 404,
    'headers': {
      'Content-Type': 'application/json'
    },
    'body': json.dumps(body, cls=UUIDEncoder),
  }


def unprocessable_entity(body):
  return {
    'statusCode': 422,
    'headers': {
      'Content-Type': 'application/json'
    },
    'body': json.dumps(body, cls=UUIDEncoder),
  }


def unknown_errors(body):
  return {
    'statusCode': 422,
    'headers': {
      'Content-Type': 'application/json'
    },
    'body': json.dumps(body, cls=UUIDEncoder),
  }
