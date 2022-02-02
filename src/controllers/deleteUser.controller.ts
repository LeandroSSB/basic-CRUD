import { NextFunction, Request, Response } from "express";
import DeleteUserService from "../services/deleteUser.service";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
const secret = process.env.JWT_SECRET;
const expires = process.env.JWT_EXPIRESIN;

const config = {
  secret: secret as string,
  expiresIn: expires as string,
};

class DeleteUserController {
  async handle(req: Request, res: Response, next: NextFunction) {
    let token = req.headers.authorization?.split(" ")[1] || "";
    jwt.verify(token, config.secret, async (_err: any, decode: any) => {
      try {
        const deleteRes = await new DeleteUserService().execute({
          uuid: req.params.uuid,
          owner: decode.email,
          isAdm: req.isAdm as boolean,
        });
        return res.json({ message: deleteRes });
      } catch (e: any) {
        if (e instanceof TypeError) {
          res.status(401).json({ message: "Missing authorization headers" });
        }
        if (e.message == "User not exists") {
          res.status(404).json({ message: e.message });
        }
        res.status(401).json({ message: e.message });
      }
    });
  }
}

export default DeleteUserController;
