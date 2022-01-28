import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
const secret = process.env.JWT_SECRET;
const expires = process.env.JWT_EXPIRESIN;

const config = {
  secret: secret,
  expiresIn: expires,
};

const authorizeAdm = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    let token = req.headers.authorization?.split(" ")[1] || "";

    jwt.verify(token, config.secret as string, (err: any, decode: any) => {
      req.isAdm = decode.isAdm;
    });

    return next();
  } catch (e) {
    res.status(401).json({ message: "Missing authorization headers" });
  }
};

export default authorizeAdm;
