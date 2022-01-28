import { Request, Response } from "express";
import CreateUserService from "../services/createUser.service";

class CreateUserController {
  async handle(req: Request, res: Response) {
    try {
      const user = await new CreateUserService().execute(req.body);
      return res.status(201).send(user);
    } catch (e: any) {
      res.status(400).json({ message: e.message });
    }
  }
}

export default CreateUserController;
