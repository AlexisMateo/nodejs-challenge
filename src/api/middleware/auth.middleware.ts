import { Request, Response } from "express";
import * as jwt from "jsonwebtoken";

const authMiddleware = (req: Request, resp: Response, next) => {
  let token = req.headers["authorization"];

  if (!token) {
    const error = new Error();
    error.message = "Token must be sent";
    error["status"] = 400;
    throw error;
  }

  jwt.verify(token, "supersecretvalue", function (err, decodedToken) {
    if (err) {
      const error = new Error();
      error.message = "Invalid token";
      error["status"] = 401;
      throw error;
    }

    req.body = decodedToken;
    next();
  });
};

export default authMiddleware;
