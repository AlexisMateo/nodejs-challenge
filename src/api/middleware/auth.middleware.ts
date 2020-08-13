import { Request, Response } from "express";
import * as jwt from "jsonwebtoken";
import { CustomException } from "../models/custom.execption";

const authMiddleware = (req: Request, resp: Response, next) => {
  let token = req.headers["authorization"];

  if (!token) {
    const error = new CustomException("Token must be sent",400);
    throw error;
  }

  jwt.verify(token, "supersecretvalue", function (err, decodedToken) {
    if (err) {

      const error = new CustomException("Invalid token",401);
      throw error;
    }

    req.body = decodedToken;
    next();
  });
};

export default authMiddleware;
