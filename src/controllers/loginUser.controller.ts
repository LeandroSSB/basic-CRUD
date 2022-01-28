import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { User } from "../entities";
import dotenv from "dotenv";

dotenv.config();
const secret = process.env.JWT_SECRET;
const expires = process.env.JWT_EXPIRESIN;

const config = {
  secret: secret as string,
  expiresIn: expires as string,
};

class LoginUserController {
  async handle(req: Request, res: Response) {
    const user = req.AuthenticatedUser as User;
    let token = jwt.sign(
      { email: user.email, isAdm: user.isAdm },
      config.secret,
      {
        expiresIn: config.expiresIn,
      }
    );

    res.json({ token: token });
  }
}

export default LoginUserController;
