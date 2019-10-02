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
// For user authentication based on strategies i.e. local, facebook, twitter
import passport from "passport";
// Routes
import CuldevationsRoutes from "./culdevations/culdevations.routes";
// Configs
import { configurePassport } from "./passportConfig";

class App {
  public app: Application;

  constructor() {
    this.app = express();

    configurePassport();
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
    // User authentication based on strategies i.e. local, jwt, social media
    this.app.use(passport.initialize());
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
