import express from "express";
require("express-async-errors");
import bodyParser from "body-parser";
import Routes from "./configuration/Routes";
import { CreateDatabaseConnection } from "./infrastructure/databases/mysql/MysqlConnection";
import AuthMiddleware from "./api/middleware/auth.middleware";

class App {
  public app: express.Application;

  constructor() {
    this.app = express();
    this.config();
    this.registerRoutes();
    this.ConnectToDatabase();
    this.registerMiddlewares();
  }

  private config(): void {
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: false }));
  }

  private registerRoutes(): void {
    this.app.use("/api/v1/auth", Routes.AuthRoutes);
    this.app.use("/api/v1/catalog", AuthMiddleware, Routes.CatalogRoute);
  }

  private registerMiddlewares(): void {
    this.app.use(function (err, req, res, next) {
      if (!err) {
        return next();
      }
      res.status(err.status);
      res.send({ message: err.message || "Internal server error" });
    });
  }

  private ConnectToDatabase() {
    CreateDatabaseConnection()
      .then(() => {
        console.log(" connection success");
      })
      .catch((error) => console.log(" connection error: ", error));
  }
}

export default new App().app;
