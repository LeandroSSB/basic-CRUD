import { Request, Response } from "express";
import FindUserService from "../services/findUser.service";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
const secret = process.env.JWT_SECRET;
const expires = process.env.JWT_EXPIRESIN;

const config = {
  secret: secret as string,
  expiresIn: expires as string,
};

class FindUserController {
  handle(req: Request, res: Response) {
    let token = req.headers.authorization?.split(" ")[1] || "";
    jwt.verify(token, config.secret, async (_err: any, decode: any) => {
      try {
        const { password, ...user } = await new FindUserService().execute(
          decode.email
        );
        return res.send(user);
      } catch (e: any) {
        res.status(401).json({ message: "Missing authorization headers" });
      }
    });
  }
}

export default FindUserController;
