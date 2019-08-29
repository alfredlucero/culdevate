import express, { Application } from "express";
// Middlewares
// Parses body of requests and allows us to access request.body
import bodyParser from "body-parser";
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
