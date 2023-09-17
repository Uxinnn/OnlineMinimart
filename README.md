# Online Minimart

## Introduction

This is an online minimart application done as part of GovTech's CSG DARE TAP application.
The minimart has basic CRUD functionality of items it sells and has 2 main views:

1. User view for users to purchase items from minimart.
2. Admin view for admins to manage items in minimart.

## Requirements
* Backend
  * [Python 3.8](https://www.python.org/downloads/release/python-380/)
  * [npm](https://nodejs.org/en/download)
  * [Serverless Framework](https://www.serverless.com/framework/docs/getting-started)
  * [Serverless offline](https://www.serverless.com/plugins/serverless-offline#installation)
* Frontend
  * [NodeJS](https://nodejs.org/en)

## Getting Started

1. Download this repository.
2. In a terminal, from the root of this repository, `cd backend`.
3. Run `serverless offline --httpPort 3001`.
4. In another terminal, from the root of this repository, `cd frontend`.
5. Run `npm start`.

## Developer Notes

### Backend

The backend is designed using Serverless Framework offline. And uses [SQLAlchemy](https://www.sqlalchemy.org/)
as the ORM of choice for the backend to interact with the database (SQLite3).

Some notes on files/directories and their respective uses:
* `/backend/db` contains: 
  * ORM database models (`models`).
  * Code to create SQLite3 database and initialize sessions (`database.py`).
  * Database file will be found here upon initialization (`pat_minimart.db`).
* `/backend/src/functions` contains: 
  * Functions called by API endpoints (Currently only for minimart item CRUD). These functions are directly referenced in `serverless.yml`.
* `/backend/src/services` contains:
  * Contains services that are used to abstract out ORM code from API function calls.
* `/backend/validators` contains: 
  * Contains functions used to validate items received from API calls before the items are used to update the database.

### Frontend

The frontend is created using React and consists of 3 main pages:

1. `Home`: Landing page for the frontend. Allows users to choose between the admin and client interfaces. Would ideally be substituted with a proper login page.
2. `UserPage`: Main client interface. Allows for customers of the minimart to browse and buy items.
3. `AdminPage`: Main admin interface. Allows for Pat and his employees to manage items displayed in the minimart.


## Deployment to Cloud

## Backend

This backend of this application can be deployed to the cloud with minimal modifications, as specified below:

1. Database should be changed from SQLite3 to a relational database hosted on the cloud (E.g. RDS for AWS).

After this modification has been made, Serverless Framework allows us to easily deploy to the cloud. Functions specified in `serverless.yml` will 
become serverless, event-driven code (Lambda functions in AWS). The Framework will also create an API gateway. 
The gateway can then be associated with a domain (E.g. Using Route53 in AWS) to expose the backend APIs to the internet.

## Frontend

The Frontend of this application can be deployed to the cloud using a hosting service such as AWS Amplify.

## Security hardening techniques on the cloud

