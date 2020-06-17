import express, { Application } from "express";
// Middlewares
// Parse Cookie header and allows us to access req.cookies
import cookieParser from "cookie-parser";
// Parses body of requests and allows us to access req.body
import bodyParser from "body-parser";
// Sets Access-Control-Allow-Origin headers
import cors from "cors";
// Allows us to compress responses back
import compression from "compression";
// Logging requests/responses to console
import logger from "morgan";
// Routes
import CuldevationsRoutes from "./culdevations/culdevations.routes";
import AuthRoutes from "./auth/auth.routes";
import RecapsRoutes from "./recaps/recaps.routes";
import ImpactsRoutes from "./impacts/impacts.routes";
import SelfReviewsRoutes from "./selfreviews/selfreviews.routes";

class App {
  public app: Application;

  constructor() {
    this.app = express();

    this.initializeMiddlewares();
    this.initializeRoutes();
  }

  private initializeMiddlewares() {
    // Allows us to access Cookie header cookies by name in req.cookies
    this.app.use(cookieParser());
    // Support application/json type post data
    this.app.use(bodyParser.json());
    // Support application/x-www-form-urlencoded post data
    this.app.use(bodyParser.urlencoded({ extended: false }));
    // By default, sets Access-Control-Allow-Origin to *
    this.app.use(cors());
    // By default, compresses all responses
    this.app.use(compression());
    // Logging response output like :method :url :status :response-time ms - :res[content-length
    this.app.use(logger("dev"));
  }

  private initializeRoutes() {
    // Routes: /culdevations/**/* CRUD
    // Purpose: examples to learn how to set up and test everything
    this.app.use(CuldevationsRoutes.path, CuldevationsRoutes.initializeRoutes());

    // Routes: /auth/**/*
    // Purpose: for User Authentication i.e. signup, login
    this.app.use(AuthRoutes.path, AuthRoutes.initializeRoutes());

    // Routes: /recaps/**/*
    // Purpose: for Recaps CRUD
    this.app.use(RecapsRoutes.path, RecapsRoutes.initializeRoutes());

    // Routes: /impacts/**/*
    // Purpose: for Impacts CRUD
    this.app.use(ImpactsRoutes.path, ImpactsRoutes.initializeRoutes());

    // Routes: /selfreviews/**/*
    // Purpose: for Self Reviews CRUD
    this.app.use(SelfReviewsRoutes.path, SelfReviewsRoutes.initializeRoutes());
  }
}

export default new App().app;
