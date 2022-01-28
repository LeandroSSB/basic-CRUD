import { NextFunction, Request, Response } from "express";
import LoginUserService from "../services/loginUser.service";

const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, password } = req.body;
  try {
    const Authenticated = await new LoginUserService().execute(email, password);
    req.AuthenticatedUser = Authenticated;
    return next();
  } catch (e: any) {
    res.json({ message: e.message });
  }
};

export default authenticate;
