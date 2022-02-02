import { Request, Response } from "express";
import UpdateUserService from "../services/updateUser.service";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
const secret = process.env.JWT_SECRET;
const expires = process.env.JWT_EXPIRESIN;

const config = {
  secret: secret as string,
  expiresIn: expires as string,
};

class UpdateUserController {
  async handle(req: Request, res: Response) {
    let token = req.headers.authorization?.split(" ")[1] || "";
    jwt.verify(token, config.secret, async (err: any, decode: any) => {
      try {
        if (req.body.isAdm || req.body.createdOn) {
          res
            .status(401)
            .json({ message: `forbidden fields: isAdm, createdOn` });
        }
        const user = await new UpdateUserService().execute({
          uuid: req.params.uuid as string,
          owner: decode.email,
          data: req.body,
          isAdm: req.isAdm as boolean,
        });
        return res.send(user);
      } catch (e: any) {
        if (e instanceof TypeError) {
          res.status(401).json({ message: "Missing authorization headers" });
        }
        res.status(401).json({ message: e.message });
      }
    });
  }
}

export default UpdateUserController;
