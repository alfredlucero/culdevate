import express, { Application } from "express";
// Middlewares
// Parses body of requests and allows us to access request.body
import bodyParser from "body-parser";
// Sets Access-Control-Allow-Origin headers
import cors from 'cors';
// Allows us to compress responses back
import compression from 'compression';
// Logging requests/responses to console
import logger from 'morgan';
// Routes
import CuldevationsRoutes from "./culdevations/culdevations.routes";

class App {
  public app: Application;

  constructor() {
    this.app = express();

    this.initializeMiddlewares();
    this.initializeRoutes();
  }

  private initializeMiddlewares() {
    // Support application/json type post data
    this.app.use(bodyParser.json());
    // Support application/x-www-form-urlencoded post data
    this.app.use(bodyParser.urlencoded({ extended: false }));
    // By default, sets Access-Control-Allow-Origin to *
    this.app.use(cors());
    // By default, compresses all responses
    this.app.use(compression());
    // Logging response output like :method :url :status :response-time ms - :res[content-length
    this.app.use(logger('dev'));
  }

  private initializeRoutes() {
    // /culdevations/**/* CRUD
    this.app.use(
      CuldevationsRoutes.path,
      CuldevationsRoutes.initializeRoutes()
    );
  }
}

export default new App().app;
