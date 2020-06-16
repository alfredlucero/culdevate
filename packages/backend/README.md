# Culdevate Backend

## Overview

The Culdevate Backend REST API uses [MongoDB](https://www.mongodb.com/) as its data store and with routes running on a [Node](https://nodejs.org/en/) Express server implemented with [TypeScript](https://www.typescriptlang.org/).

The backend routes are broken up by feature folders with culdevations as an example of the pattern using Mongoose and separate files for the models, controllers, daos aka data access objects, validations, and routes with thorough unit tests implemented with [Jest](https://jestjs.io/) and integration tests with [Supertest](https://github.com/visionmedia/supertest) and an [in-memory MongoDB server](https://github.com/nodkz/mongodb-memory-server).

`Model` files define the Mongoose Schema/validation and TypeScript types for the document data we we would like to store in collections. We implement unit tests with Jest to ensure certain model functions and validations work as expected. These files end in `.model.*`

`DAO` files, aka Data Access Objects, define wrapper objects with functions for interacting with the database in a decoupled way such that it is possible to replace the database if necessary and allows for easier mocking of the database calls in our unit tests of other pieces such as the controller. We integration test these functions with the in-memory MongoDB to be sure we're updating the database in the right way. These files end in `.dao.*`.

`Controller` files define wrapper objects with functions taking in the request and response objects in the Express routes and use the DAOs to make calls to the database and return the corresponding status codes and payloads. These controller functions are then passed to the Express routes to separate the logic between the two. We unit test these files with Jest and mock out the DAOs to ensure the right payloads and statuses are returned given different mocked out database responses. These files end in `.controller.*`.

`Validation` files define schemas/validations for the request bodies to ensure the right data is passed into endpoints or otherwise return 400s when passed into the validation middleware functions. We unit test the validations are working as expected for sanity checks to ensure we're using the validation helper libraries correctly. These files end in `.validation.*`.

`Routes` files define the endpoints for a certain base route i.e. "/auth" or "/recaps" and these use the controllers to handle the logic for certain routes. We integration test the API routes as a whole with the in-memory MongoDB and Supertest to make HTTP requests to the server and expect the database to have the right values. These files end in `.routes.*`.

There are middleware functions meant to be run before the route endpoint logic happens for things like protected user auth required endpoints and for validating request bodies of API calls.

## Pre-requisites

First, you'll need to have [Node](https://nodejs.org/en/) installed on your machine.
You may download the latest stable version i.e. 12.17.0 LTS at the time of this writing.

Second, you'll need to install MongoDB locally on your machine for local development.
On Mac, you can install with `brew install mongodb` and you should be able to do commands with `mongod` in your terminal.
Otherwise, with Windows or if the earlier command did not work, you may follow along in MongoDB's [installation tutorial](https://docs.mongodb.com/guides/server/install/).

We also recommend installing the [MongoDB Compass GUI](https://www.mongodb.com/download-center/compass) so you can connect to your local MongoDB or the staging MongoDB through a connection string and save those connections for future use. It is also easier to filter through the data and update documents through the GUI rather than through the command-line.
The connection string for your local MongoDB development will be `mongodb://localhost:27017/culdevate-dev` and you can verify it connects properly by starting up your local MongoDB with a command like `npm run mongodb:mac` and then using the connection string in the MongoDB Compass GUI.

Third, you'll notice there are separate environment configuration files named as `.env.*`. `.env.dev` is configured to work against the local MongoDB instance running on your machine and you can inspect the values inside. This file is provided since it does not have sensitive information but for staging and production we did not commit them to avoid security issues. There are example files of the required environment variables as shown in `.env.staging.example` and `.env.production.example`. You will need to contact the admins for the credentials/values to certain fields once you copy and create your own `.env.staging` and `.env.production` in your repo directory.

## How to get up and runnning

After installing MongoDB for local development and tools such as the MongoDB Compass GUI,
we are ready to start installing more code dependencies.

To install the server dependencies, run this command

`npm ci`

### Local Development

To start up the backend server against your local MongoDB instance, you can run these commands

```bash
# Start up your local MongoDB. On Windows, you'll have to do npm run mongodb:windows
npm run mongodb:mac

# Starts up the server using the .env.dev environment variable configuration
npm run dev
```

### Staging

First, you'll need to copy the `.env.staging.example` file and rename it to `.env.staging`. Contact the admins and fill out the credentials and other required fields properly.

To start up the backend server against the hosted staging MongoDB Atlas cluster, you can run this command

```bash
npm run staging
```

## Unit and Integration Tests

To start up the Unit and Integration Tests you can run this command

`npm run test`

## Deployments to Heroku

[culdevatestagingapi](https://culdevateapistaging.herokuapp.com/) aka the staging API server hosted on Heroku uses the Heroku CLI to deploy things locally and is automated through the `backendMasterStagingDeployAction.yml`. It relies on the `npm run start` command being available to detect a Node server, and we make sure to push only this backend subdirectory for the application since this folder is part of a monorepo.

Make sure to set the environment variables in the `Config Vars` area in the Heroku culdevatestagingapi. They should match the proper `.env.staging` values to properly read the `process.env.*` variables within our code.

For local deployment:

Add a remote git reference to the Heroku staging application
`heroku git:remote -a culdevateapistaging`

Check to make sure you see the new remote added with
`git remote -v`

Rename the remote to be something more readable
`git remote rename heroku culdevateapistaging`

Deploy the backend folder code to Heroku
`git subtree push --prefix packages/backend/ culdevateapistaging master`
