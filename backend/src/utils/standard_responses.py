import json
from src.utils.utils import UUIDEncoder


"""
This file contains all standard API responses used by the backend.
Note that they are formatted for use in serverless framework.
To use these responses in Flask, use the helper function `sls_2_flask_responses` to 
convert serverless responses to flask responses.
"""


def sls_2_flask_response(sls_response):
  return sls_response["body"], sls_response["statusCode"], sls_response["headers"]


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
