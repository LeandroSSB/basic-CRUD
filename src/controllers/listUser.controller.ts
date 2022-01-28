import { Request, Response } from "express";
import ListUserService from "../services/listUser.service";

class ListUserController {
  async handle(req: Request, res: Response) {
    try {
      if (!req.isAdm) {
        return res.status(401).json({ message: "Unauthorized" });
      }
      const users = await new ListUserService().execute();
      return res.send(users);
    } catch (e: any) {
      return res.status(404).json({ message: e.message });
    }
  }
}

export default ListUserController;
